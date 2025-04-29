import crypto from "crypto"

// Generate a secure QR token with expiration
export function generateQRToken(
  teacherId: string,
  courseId: string,
  expiryMinutes: number,
): { token: string; expiresAt: Date } {
  // Create a payload with necessary information
  const payload = {
    teacherId,
    courseId,
    timestamp: Date.now(),
    nonce: crypto.randomBytes(8).toString("hex"), // Add randomness
  }

  // Convert payload to string
  const payloadStr = JSON.stringify(payload)

  // Create a hash of the payload for verification
  const hash = crypto.createHash("sha256").update(payloadStr).digest("hex")

  // Combine payload and hash
  const token = Buffer.from(payloadStr + "." + hash).toString("base64")

  // Calculate expiry time
  const expiresAt = new Date()
  expiresAt.setMinutes(expiresAt.getMinutes() + expiryMinutes)

  return { token, expiresAt }
}

// Verify a QR token
export function verifyQRToken(token: string): {
  valid: boolean
  expired: boolean
  payload?: any
} {
  try {
    // Decode the token
    const decoded = Buffer.from(token, "base64").toString()
    const [payloadStr, receivedHash] = decoded.split(".")

    // Verify the hash
    const expectedHash = crypto.createHash("sha256").update(payloadStr).digest("hex")

    if (receivedHash !== expectedHash) {
      return { valid: false, expired: false }
    }

    // Parse the payload
    const payload = JSON.parse(payloadStr)

    // Check if token is expired (tokens valid for the specified duration)
    const tokenTimestamp = payload.timestamp
    const currentTimestamp = Date.now()

    // Calculate expiry based on the token's creation time and the specified duration
    // This would normally come from the database in a real application
    const expiryMinutes = 60 // Default to 60 minutes if not specified
    const expiryTimestamp = tokenTimestamp + expiryMinutes * 60 * 1000

    if (currentTimestamp > expiryTimestamp) {
      return { valid: true, expired: true, payload }
    }

    return { valid: true, expired: false, payload }
  } catch (error) {
    console.error("Error verifying QR token:", error)
    return { valid: false, expired: false }
  }
}

// Detect if the QR code is from an image (anti-proxy)
export function detectImageQR(imageData: any): boolean {
  // In a real application, this would use computer vision techniques
  // to detect if the QR code is from a screenshot or photo
  // For this demo, we'll simulate the detection

  // Placeholder for actual implementation
  // This could analyze image metadata, check for camera artifacts,
  // or use machine learning to detect screenshots

  // For demo purposes, return a random result
  // In a real app, this would be a sophisticated detection algorithm
  return Math.random() > 0.2 // 80% chance of detecting a proxy attempt
}

// Verify geolocation is within allowed radius
export function verifyGeolocation(
  userLat: number,
  userLng: number,
  classLat: number,
  classLng: number,
  radiusMeters: number,
): boolean {
  // Calculate distance between two points using Haversine formula
  const R = 6371e3 // Earth radius in meters
  const φ1 = (userLat * Math.PI) / 180
  const φ2 = (classLat * Math.PI) / 180
  const Δφ = ((classLat - userLat) * Math.PI) / 180
  const Δλ = ((classLng - userLng) * Math.PI) / 180

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c

  // Return true if user is within the allowed radius
  return distance <= radiusMeters
}
