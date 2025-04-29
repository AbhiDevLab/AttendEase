import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

// Mock database for demonstration
const qrCodes: Record<string, any>[] = []

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const { teacherId, courseId, sessionType, duration, location, enableGeofencing, geofenceRadius } = data

    // Validate required fields
    if (!teacherId || !courseId || !sessionType || !duration || !location) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Generate a secure token
    const token = generateSecureToken()

    // Calculate expiry time
    const expiryTime = new Date()
    expiryTime.setMinutes(expiryTime.getMinutes() + duration)

    // Create QR code record
    const qrCode = {
      id: generateId(),
      token,
      teacherId,
      courseId,
      sessionType,
      location,
      createdAt: new Date().toISOString(),
      expiryTime: expiryTime.toISOString(),
      geofencing: enableGeofencing
        ? {
            enabled: true,
            radius: geofenceRadius,
          }
        : {
            enabled: false,
          },
    }

    // Store in our mock database
    qrCodes.push(qrCode)

    // In a real app, we would generate an actual QR code image
    // For this demo, we'll just return the token that would be encoded in the QR
    return NextResponse.json({
      success: true,
      qrCode: {
        token,
        expiryTime: qrCode.expiryTime,
      },
    })
  } catch (error) {
    console.error("Error generating QR code:", error)
    return NextResponse.json({ error: "Failed to generate QR code" }, { status: 500 })
  }
}

// Helper functions
function generateSecureToken(): string {
  // Generate a secure random token
  return crypto.randomBytes(32).toString("hex")
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 15)
}
