import { headers } from "next/headers"
import path from "path"
import fs from "fs"
import { Reader } from "@maxmind/geoip2-node"
import { UAParser } from "ua-parser-js"
import UserLogin from "../models/login-history.models"

// Initialize the GeoIP reader once outside the function
let geoReaderPromise: Promise<Reader> | null = null

// Initialize the reader only if the file exists
const dbPath = path.join(process.cwd(), "GeoLite2-City.mmdb")
if (fs.existsSync(dbPath)) {
    geoReaderPromise = Reader.open(dbPath)
}

export async function trackUserLogin(userId: string, userType: "Student" | "Parent" | "Employee", schoolId: string) {
    try {
        // Get headers in Next.js App Router - headers() is now async in Next.js 15
        const headersList = await headers()

        // Get IP address (x-forwarded-for is used when behind a proxy)
        const ip = headersList.get("x-forwarded-for") || "0.0.0.0"

        // Get location info from IP using MaxMind
        let locationData: {
            country: string
            city: string
            region: string
            latitude: number | null
            longitude: number | null
        } = {
            country: "Unknown",
            city: "Unknown",
            region: "Unknown",
            latitude: null,
            longitude: null,
        }

        if (geoReaderPromise && ip !== "0.0.0.0") {
            try {
                const geoReader = await geoReaderPromise
                const geo: CityResponse = await geoReader?.city(ip)

                locationData = {
                    country: geo.country?.names?.en || "Unknown",
                    city: geo.city?.names?.en || "Unknown",
                    region: geo.subdivisions?.[0]?.names?.en || "Unknown",
                    latitude: geo.location?.latitude || null,
                    longitude: geo.location?.longitude || null, // Fixed the inconsistent optional chaining
                }

                console.log("GeoIP lookup successful:", locationData)
            } catch (err) {
                console.error("Error getting location:", err)
                console.error("IP address that caused the error:", ip)
            }
        } else {
            console.warn("GeoIP database not available or IP is 0.0.0.0")
        }

        // Parse user agent details
        const userAgentString = headersList.get("user-agent") || ""
        const parser = UAParser(userAgentString)
        const device = parser.device
        const browser = parser.browser
        const os = parser.os
        const engine = parser.engine
        const cpu = parser.cpu

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

