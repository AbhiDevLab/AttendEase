import { type NextRequest, NextResponse } from "next/server"

// Mock database for demonstration
const notifications: Record<string, any>[] = [
  {
    id: "1",
    userId: "student1",
    type: "attendance_warning",
    title: "Low Attendance Warning",
    message:
      "Your attendance in CS301 is below 75%. You need to attend at least 3 more classes to meet the minimum requirement.",
    courseId: "CS301",
    attendancePercentage: 68,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    read: false,
  },
  {
    id: "2",
    userId: "student1",
    type: "class_reminder",
    title: "Upcoming Class Reminder",
    message: "You have CS401 - Artificial Intelligence class today at 16:00 in Room 405.",
    courseId: "CS401",
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    read: true,
  },
  {
    id: "3",
    userId: "teacher1",
    type: "attendance_summary",
    title: "Attendance Summary",
    message: "CS101 class had 85% attendance today. 34 students present, 6 absent.",
    courseId: "CS101",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    read: false,
  },
]

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const userId = url.searchParams.get("userId")
    const unreadOnly = url.searchParams.get("unreadOnly") === "true"

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    let userNotifications = notifications.filter((notification) => notification.userId === userId)

    if (unreadOnly) {
      userNotifications = userNotifications.filter((notification) => !notification.read)
    }

    // Sort by creation date (newest first)
    userNotifications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return NextResponse.json({ notifications: userNotifications })
  } catch (error) {
    console.error("Error fetching notifications:", error)
    return NextResponse.json({ error: "Failed to fetch notifications" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const { userId, type, title, message, courseId, attendancePercentage } = data

    // Validate required fields
    if (!userId || !type || !title || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create notification
    const notification = {
      id: generateId(),
      userId,
      type,
      title,
      message,
      courseId,
      attendancePercentage,
      createdAt: new Date().toISOString(),
      read: false,
    }

    // Store in our mock database
    notifications.push(notification)

    // In a real app, we would also send an email notification here
    if (type === "attendance_warning") {
      console.log(`Sending email to user ${userId}: ${title}`)
    }

    return NextResponse.json({
      success: true,
      notification,
    })
  } catch (error) {
    console.error("Error creating notification:", error)
    return NextResponse.json({ error: "Failed to create notification" }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const data = await req.json()
    const { id, read } = data

    if (!id) {
      return NextResponse.json({ error: "Notification ID is required" }, { status: 400 })
    }

    // Find and update the notification
    const notificationIndex = notifications.findIndex((n) => n.id === id)

    if (notificationIndex === -1) {
      return NextResponse.json({ error: "Notification not found" }, { status: 404 })
    }

    notifications[notificationIndex].read = read

    return NextResponse.json({
      success: true,
      notification: notifications[notificationIndex],
    })
  } catch (error) {
    console.error("Error updating notification:", error)
    return NextResponse.json({ error: "Failed to update notification" }, { status: 500 })
  }
}

// Helper function
function generateId(): string {
  return Math.random().toString(36).substring(2, 15)
}
