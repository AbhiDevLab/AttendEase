import { type NextRequest, NextResponse } from "next/server"

// Mock database for demonstration
const attendanceRecords: Record<string, any>[] = []

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const { studentId, courseId, qrToken, timestamp, deviceInfo, isLiveCapture } = data

    // Validate required fields
    if (!studentId || !courseId || !qrToken || !timestamp) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate QR token (in a real app, this would verify against a database)
    if (!validateQrToken(qrToken)) {
      return NextResponse.json({ error: "Invalid or expired QR code" }, { status: 400 })
    }

    // Check for proxy attempts
    if (!isLiveCapture) {
      return NextResponse.json({ error: "Proxy detection: QR code from image detected" }, { status: 403 })
    }

    // Record the attendance
    const attendanceRecord = {
      id: generateId(),
      studentId,
      courseId,
      timestamp,
      deviceInfo,
      status: "present",
    }

    attendanceRecords.push(attendanceRecord)

    return NextResponse.json(
      {
        success: true,
        message: "Attendance recorded successfully",
        record: attendanceRecord,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error recording attendance:", error)
    return NextResponse.json({ error: "Failed to record attendance" }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const studentId = url.searchParams.get("studentId")
    const courseId = url.searchParams.get("courseId")

    let filteredRecords = [...attendanceRecords]

    if (studentId) {
      filteredRecords = filteredRecords.filter((record) => record.studentId === studentId)
    }

    if (courseId) {
      filteredRecords = filteredRecords.filter((record) => record.courseId === courseId)
    }

    return NextResponse.json({ records: filteredRecords })
  } catch (error) {
    console.error("Error fetching attendance records:", error)
    return NextResponse.json({ error: "Failed to fetch attendance records" }, { status: 500 })
  }
}

// Helper functions
function validateQrToken(token: string): boolean {
  // In a real app, this would verify the token against a database
  // and check if it's expired
  return token.length > 10
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 15)
}
