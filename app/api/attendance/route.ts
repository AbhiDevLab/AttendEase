import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Attendance from '@/models/Attendance';
import { verifyQRToken } from '@/lib/qr-utils';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { studentId, courseId, qrToken, timestamp, deviceInfo, isLiveCapture, location } = data;

    // Validate required fields
    if (!studentId || !courseId || !qrToken) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Connect to the database
    await connectToDatabase();

    // Validate QR token
    const tokenValidation = verifyQRToken(qrToken);
    if (!tokenValidation.valid) {
      return NextResponse.json({ error: "Invalid QR code" }, { status: 400 });
    }
    
    if (tokenValidation.expired) {
      return NextResponse.json({ error: "QR code has expired" }, { status: 400 });
    }

    // Check for proxy attempts
    if (!isLiveCapture) {
      return NextResponse.json({ error: "Proxy detection: QR code from image detected" }, { status: 403 });
    }

    // Record the attendance
    const attendanceRecord = await Attendance.create({
      studentId,
      courseId,
      timestamp: timestamp || new Date(),
      qrToken,
      deviceInfo,
      location,
      status: 'present',
    });

    return NextResponse.json({
      success: true,
      message: "Attendance recorded successfully",
      record: attendanceRecord,
    }, { status: 201 });
    
  } catch (error) {
    console.error("Error recording attendance:", error);
    return NextResponse.json({ error: "Failed to record attendance" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const studentId = url.searchParams.get("studentId");
    const courseId = url.searchParams.get("courseId");

    // Connect to the database
    await connectToDatabase();

    // Build query
    const query: any = {};
    if (studentId) query.studentId = studentId;
    if (courseId) query.courseId = courseId;

    // Get attendance records
    const records = await Attendance.find(query).sort({ timestamp: -1 });

    return NextResponse.json({ records });
    
  } catch (error) {
    console.error("Error fetching attendance records:", error);
    return NextResponse.json({ error: "Failed to fetch attendance records" }, { status: 500 });
  }
}