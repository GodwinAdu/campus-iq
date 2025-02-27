import { headers } from "next/headers"
import path from "path"
import fs from "fs"
import { Reader } from "@maxmind/geoip2-node"
import {UAParser} from "ua-parser-js"
import UserLogin from "../models/login-history.models"


// Initialize the GeoIP reader with better error handling
let geoReaderPromise: Promise<Reader | null> | null = null
const dbPath = path.join(process.cwd(), "GeoLite2-City.mmdb")

// Check if the database file exists and log the result
try {
  if (fs.existsSync(dbPath)) {
    console.log(`✅ GeoIP database found at: ${dbPath}`)
    geoReaderPromise = Reader.open(dbPath).catch((err) => {
      console.error(`❌ Failed to open GeoIP database: ${err.message}`)
      return null
    })
  } else {
    console.error(`❌ GeoIP database not found at: ${dbPath}`)
    // List files in the directory to help debugging
    const dirPath = process.cwd()
    console.log(`Files in ${dirPath}:`, fs.readdirSync(dirPath))
  }
} catch (error) {
  console.error(`❌ Error checking for GeoIP database: ${error}`)
}

// Fallback geolocation function using a free API
async function fallbackGeolocation(ip: string) {
  try {
    if (ip === "0.0.0.0" || ip === "127.0.0.1") {
      return null
    }

    const response = await fetch(`https://ipapi.co/${ip}/json/`)
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }

    const data = await response.json()

    return {
      country: data.country_name || "Unknown",
      city: data.city || "Unknown",
      region: data.region || "Unknown",
      latitude: data.latitude || null,
      longitude: data.longitude || null,
    }
  } catch (error) {
    console.error(`❌ Fallback geolocation failed: ${error}`)
    return null
  }
}

export async function trackUserLogin(userId: string, userType: "Student" | "Parent" | "Employee", schoolId: string) {
  try {
    // Get headers in Next.js App Router
    const headersList = await headers()

    // Get IP address (x-forwarded-for is used when behind a proxy)
    let ip = headersList.get("x-forwarded-for") || "0.0.0.0"

    // If there are multiple IPs in x-forwarded-for, take the first one
    if (ip.includes(",")) {
      ip = ip.split(",")[0].trim()
    }

    console.log(`📍 Processing login for IP: ${ip}`)

    // Default location data
    let locationData = {
      country: "Unknown",
      city: "Unknown",
      region: "Unknown",
      latitude: null,
      longitude: null,
    }

    // Try MaxMind GeoIP first
    let geoIpSuccess = false
    if (geoReaderPromise && ip !== "0.0.0.0" && ip !== "127.0.0.1") {
      try {
        const geoReader = await geoReaderPromise
        if (geoReader) {
          console.log(`🔍 Looking up location for IP: ${ip}`)
          const geo = geoReader.city(ip)

          locationData = {
            country: geo.country?.names?.en || "Unknown",
            city: geo.city?.names?.en || "Unknown",
            region: geo.subdivisions?.[0]?.names?.en || "Unknown",
            latitude: geo.location?.latitude || null,
            longitude: geo.location?.longitude || null,
          }

          console.log(`✅ GeoIP lookup successful:`, locationData)
          geoIpSuccess = true
        } else {
          console.warn(`⚠️ GeoReader is null despite promise resolving`)
        }
      } catch (err) {
        console.error(`❌ Error getting location from MaxMind: ${err}`)
        console.error(`IP address that caused the error: ${ip}`)
      }
    } else {
      console.warn(`⚠️ Skipping MaxMind lookup: geoReaderPromise=${!!geoReaderPromise}, ip=${ip}`)
    }

    // If MaxMind failed, try the fallback
    if (!geoIpSuccess && ip !== "0.0.0.0" && ip !== "127.0.0.1") {
      console.log(`🔄 Trying fallback geolocation for IP: ${ip}`)
      const fallbackData = await fallbackGeolocation(ip)
      if (fallbackData) {
        locationData = fallbackData
        console.log(`✅ Fallback geolocation successful:`, locationData)
      } else {
        console.warn(`⚠️ Fallback geolocation also failed`)
      }
    }

    // Parse user agent details
    const userAgentString = headersList.get("user-agent") || ""
    const parser = new UAParser(userAgentString)
    const device = parser.getDevice()
    const browser = parser.getBrowser()
    const os = parser.getOS()
    const engine = parser.getEngine()
    const cpu = parser.getCPU()

    // Construct login data
    const loginData = {
      schoolId,
      userId,
      userType,
      ipAddress: ip,
      device: device.vendor || device.model || "Unknown",
      browser: browser.name || "Unknown",
      os: os.name || "Unknown",
      engine: engine.name || "Unknown",
      cpu: cpu.architecture || "Unknown",
      location: locationData,
      status: "active",
    }

    // Save login history to database
    const loginEntry = new UserLogin(loginData)
    await loginEntry.save()

    console.log("✅ User login tracked:", loginEntry)
    return loginEntry
  } catch (error) {
    console.error("❌ Error tracking user login:", error)
    throw error
  }
}

