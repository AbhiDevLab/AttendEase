"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Bell, CheckCircle, Clock } from "lucide-react"

export default function StudentNotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      type: "attendance_warning",
      title: "Low Attendance Warning",
      message:
        "Your attendance in CS301 is below 75%. You need to attend at least 3 more classes to meet the minimum requirement.",
      courseId: "CS301",
      timestamp: "2023-05-15T10:30:00Z",
      read: false,
    },
    {
      id: "2",
      type: "class_reminder",
      title: "Upcoming Class Reminder",
      message: "You have CS401 - Artificial Intelligence class today at 16:00 in Room 405.",
      courseId: "CS401",
      timestamp: "2023-05-15T09:00:00Z",
      read: true,
    },
    {
      id: "3",
      type: "attendance_marked",
      title: "Attendance Marked",
      message: "Your attendance for CS101 - Introduction to Programming has been successfully recorded.",
      courseId: "CS101",
      timestamp: "2023-05-14T09:15:00Z",
      read: false,
    },
    {
      id: "4",
      type: "system",
      title: "New Assignment Posted",
      message: "A new assignment has been posted for CS201 - Data Structures. Due date: May 25, 2023.",
      courseId: "CS201",
      timestamp: "2023-05-13T14:20:00Z",
      read: true,
    },
    {
      id: "5",
      type: "attendance_warning",
      title: "Attendance Improvement",
      message:
        "Your attendance in CS301 has improved to 68%. Keep it up! You need to attend 2 more classes to reach 75%.",
      courseId: "CS301",
      timestamp: "2023-05-10T11:45:00Z",
      read: false,
    },
  ])

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  const unreadCount = notifications.filter((notification) => !notification.read).length

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">Stay updated with important alerts and reminders</p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" onClick={markAllAsRead}>
            Mark All as Read
          </Button>
        )}
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Notifications</TabsTrigger>
          <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Notifications</CardTitle>
              <CardDescription>View all your notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex items-start space-x-4 rounded-md border p-4 ${
                        !notification.read ? "bg-muted/50" : ""
                      }`}
                    >
                      <div
                        className={`mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full ${
                          notification.type === "attendance_warning"
                            ? "bg-destructive/10 text-destructive"
                            : "bg-primary/10 text-primary"
                        }`}
                      >
                        {notification.type.includes("attendance") ? (
                          <Bell className="h-5 w-5" />
                        ) : (
                          <Clock className="h-5 w-5" />
                        )}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium leading-none">{notification.title}</p>
                          {!notification.read && <Badge variant="outline">New</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                        <div className="flex items-center pt-2">
                          <p className="text-xs text-muted-foreground">
                            {new Date(notification.timestamp).toLocaleString()}
                          </p>
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                              className="ml-auto h-7 gap-1"
                            >
                              <CheckCircle className="h-3.5 w-3.5" />
                              <span>Mark as Read</span>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-4">No notifications to display.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="unread" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Unread Notifications</CardTitle>
              <CardDescription>Notifications you haven't read yet</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.filter((n) => !n.read).length > 0 ? (
                  notifications
                    .filter((n) => !n.read)
                    .map((notification) => (
                      <div
                        key={notification.id}
                        className="flex items-start space-x-4 rounded-md border p-4 bg-muted/50"
                      >
                        <div
                          className={`mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full ${
                            notification.type === "attendance_warning"
                              ? "bg-destructive/10 text-destructive"
                              : "bg-primary/10 text-primary"
                          }`}
                        >
                          {notification.type.includes("attendance") ? (
                            <Bell className="h-5 w-5" />
                          ) : (
                            <Clock className="h-5 w-5" />
                          )}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium leading-none">{notification.title}</p>
                            <Badge variant="outline">New</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{notification.message}</p>
                          <div className="flex items-center pt-2">
                            <p className="text-xs text-muted-foreground">
                              {new Date(notification.timestamp).toLocaleString()}
                            </p>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                              className="ml-auto h-7 gap-1"
                            >
                              <CheckCircle className="h-3.5 w-3.5" />
                              <span>Mark as Read</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                ) : (
                  <p className="text-center text-muted-foreground py-4">No unread notifications.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="attendance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Notifications</CardTitle>
              <CardDescription>Notifications related to your attendance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.filter((n) => n.type.includes("attendance")).length > 0 ? (
                  notifications
                    .filter((n) => n.type.includes("attendance"))
                    .map((notification) => (
                      <div
                        key={notification.id}
                        className={`flex items-start space-x-4 rounded-md border p-4 ${
                          !notification.read ? "bg-muted/50" : ""
                        }`}
                      >
                        <div
                          className={`mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full ${
                            notification.type === "attendance_warning"
                              ? "bg-destructive/10 text-destructive"
                              : "bg-primary/10 text-primary"
                          }`}
                        >
                          <Bell className="h-5 w-5" />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium leading-none">{notification.title}</p>
                            {!notification.read && <Badge variant="outline">New</Badge>}
                          </div>
                          <p className="text-sm text-muted-foreground">{notification.message}</p>
                          <div className="flex items-center pt-2">
                            <p className="text-xs text-muted-foreground">
                              {new Date(notification.timestamp).toLocaleString()}
                            </p>
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                                className="ml-auto h-7 gap-1"
                              >
                                <CheckCircle className="h-3.5 w-3.5" />
                                <span>Mark as Read</span>
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                ) : (
                  <p className="text-center text-muted-foreground py-4">No attendance notifications.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
