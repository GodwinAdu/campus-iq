import crypto from "crypto";

export function generateTransactionId() {
    const timestamp = Date.now().toString(36); // Convert current timestamp to base36
    const randomString = crypto.randomBytes(4).toString("hex"); // Generate random hex string
    return `TXN-${timestamp}-${randomString}`.toUpperCase();
}
