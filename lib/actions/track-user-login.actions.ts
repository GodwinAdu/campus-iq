import { headers } from "next/headers";
import { UAParser } from "ua-parser-js";
import { Reader } from "@maxmind/geoip2-node";
import fs from "fs";
import path from "path";
import UserLogin from "../models/login-history.models";

// Load the MaxMind GeoIP2 database
const dbPath = path.join(process.cwd(), "GeoLite2-City.mmdb"); // Ensure this file is downloaded
const geoReader = fs.existsSync(dbPath) ? Reader.open(dbPath) : null;

export async function trackUserLogin(userId: string, userType: "Student" | "Parent" | "Employee", schoolId: string) {
    try {
        // Get headers in Next.js App Router
        const header = await headers();

        // Get IP address (x-forwarded-for is used when behind a proxy)
        const ip = header.get("x-forwarded-for") || "0.0.0.0";

        // Get location info from IP using MaxMind
        let locationData: {
            country: string;
            city: string;
            region: string;
            latitude: number | null;
            longitude: number | null;
        } = {
            country: "Unknown",
            city: "Unknown",
            region: "Unknown",
            latitude: null,
            longitude: null,
        };

        if (geoReader && ip !== "0.0.0.0") {
            try {
                const geo = await (await geoReader).city(ip);
                locationData = {
                    country: geo.country?.names?.en || "Unknown",
                    city: geo.city?.names.en || "Unknown",
                    region: geo.subdivisions?.[0]?.names.en || "Unknown",
                    latitude: geo.location?.latitude || null,
                    longitude: geo?.location?.longitude || null,
                };
            } catch (err) {
                console.error("Error getting location:", err);
            }
        }

        // Parse user agent details
        const userAgentString = header.get("user-agent") || "";
        const parser = new UAParser(userAgentString);
        const device = parser.getDevice();
        const browser = parser.getBrowser();
        const os = parser.getOS();

        // Construct login data
        const loginData = {
            schoolId,
            userId,
            userType,
            ipAddress: ip,
            device: device.vendor || device.model || "Unknown",
            browser: browser.name || "Unknown",
            os: os.name || "Unknown",
            location: locationData,
            status: "active",
        };

        // Save login history to database
        const loginEntry = new UserLogin(loginData);
        await loginEntry.save();

        console.log("✅ User login tracked:", loginEntry);
    } catch (error) {
        console.error("❌ Error tracking user login:", error);
    }
}
