"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Bell, CheckCircle, Clock, Send, Users } from "lucide-react"

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      type: "attendance_warning",
      title: "Low Attendance Warning",
      message: "Alex Johnson's attendance in CS301 is below 75%. Currently at 68%.",
      studentId: "ST10234",
      studentName: "Alex Johnson",
      courseId: "CS301",
      timestamp: "2023-05-15T10:30:00Z",
      read: false,
      sent: true,
    },
    {
      id: "2",
      type: "attendance_warning",
      title: "Low Attendance Warning",
      message: "Maria Garcia's attendance in CS201 is below 75%. Currently at 72%.",
      studentId: "ST10542",
      studentName: "Maria Garcia",
      courseId: "CS201",
      timestamp: "2023-05-14T14:45:00Z",
      read: true,
      sent: true,
    },
    {
      id: "3",
      type: "attendance_summary",
      title: "CS101 Attendance Summary",
      message: "Today's CS101 class had 85% attendance. 34 students present, 6 absent.",
      courseId: "CS101",
      timestamp: "2023-05-13T16:20:00Z",
      read: false,
      sent: true,
    },
    {
      id: "4",
      type: "system",
      title: "New Student Added",
      message: "A new student, Emily Davis, has been added to your CS401 class.",
      studentId: "ST10789",
      studentName: "Emily Davis",
      courseId: "CS401",
      timestamp: "2023-05-12T09:15:00Z",
      read: true,
      sent: true,
    },
    {
      id: "5",
      type: "attendance_warning",
      title: "Low Attendance Warning",
      message: "David Kim's attendance in CS301 is below 75%. Currently at 65%.",
      studentId: "ST10876",
      studentName: "David Kim",
      courseId: "CS301",
      timestamp: "2023-05-11T11:50:00Z",
      read: false,
      sent: false,
    },
  ])

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const sendNotification = (id: string) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, sent: true } : notification)),
    )
  }

  const unreadCount = notifications.filter((notification) => !notification.read).length
  const unsentCount = notifications.filter((notification) => !notification.sent).length

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">Manage and send notifications to students</p>
        </div>
        <Button className="gap-2">
          <Bell className="h-4 w-4" />
          Create Notification
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread Notifications</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unreadCount}</div>
            <p className="text-xs text-muted-foreground">Notifications awaiting your review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unsent Notifications</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unsentCount}</div>
            <p className="text-xs text-muted-foreground">Notifications ready to be sent</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Students Notified</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Students received attendance warnings</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Notifications</TabsTrigger>
          <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
          <TabsTrigger value="unsent">Unsent ({unsentCount})</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Notifications</CardTitle>
              <CardDescription>View and manage all notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
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
                      {notification.type === "attendance_warning" ? (
                        <Bell className="h-5 w-5" />
                      ) : notification.type === "attendance_summary" ? (
                        <Users className="h-5 w-5" />
                      ) : (
                        <Clock className="h-5 w-5" />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium leading-none">{notification.title}</p>
                        <div className="flex items-center gap-2">
                          {!notification.read && <Badge variant="outline">Unread</Badge>}
                          {!notification.sent && <Badge variant="destructive">Not Sent</Badge>}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      <div className="flex items-center pt-2">
                        <p className="text-xs text-muted-foreground">
                          {new Date(notification.timestamp).toLocaleString()}
                        </p>
                        <div className="ml-auto flex gap-2">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                              className="h-7 gap-1"
                            >
                              <CheckCircle className="h-3.5 w-3.5" />
                              <span>Mark as Read</span>
                            </Button>
                          )}
                          {!notification.sent && (
                            <Button size="sm" onClick={() => sendNotification(notification.id)} className="h-7 gap-1">
                              <Send className="h-3.5 w-3.5" />
                              <span>Send</span>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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
                          {notification.type === "attendance_warning" ? (
                            <Bell className="h-5 w-5" />
                          ) : notification.type === "attendance_summary" ? (
                            <Users className="h-5 w-5" />
                          ) : (
                            <Clock className="h-5 w-5" />
                          )}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium leading-none">{notification.title}</p>
                            {!notification.sent && <Badge variant="destructive">Not Sent</Badge>}
                          </div>
                          <p className="text-sm text-muted-foreground">{notification.message}</p>
                          <div className="flex items-center pt-2">
                            <p className="text-xs text-muted-foreground">
                              {new Date(notification.timestamp).toLocaleString()}
                            </p>
                            <div className="ml-auto flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                                className="h-7 gap-1"
                              >
                                <CheckCircle className="h-3.5 w-3.5" />
                                <span>Mark as Read</span>
                              </Button>
                              {!notification.sent && (
                                <Button
                                  size="sm"
                                  onClick={() => sendNotification(notification.id)}
                                  className="h-7 gap-1"
                                >
                                  <Send className="h-3.5 w-3.5" />
                                  <span>Send</span>
                                </Button>
                              )}
                            </div>
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
        <TabsContent value="unsent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Unsent Notifications</CardTitle>
              <CardDescription>Notifications that haven't been sent to students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.filter((n) => !n.sent).length > 0 ? (
                  notifications
                    .filter((n) => !n.sent)
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
                          {notification.type === "attendance_warning" ? (
                            <Bell className="h-5 w-5" />
                          ) : notification.type === "attendance_summary" ? (
                            <Users className="h-5 w-5" />
                          ) : (
                            <Clock className="h-5 w-5" />
                          )}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium leading-none">{notification.title}</p>
                            <Badge variant="destructive">Not Sent</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{notification.message}</p>
                          <div className="flex items-center pt-2">
                            <p className="text-xs text-muted-foreground">
                              {new Date(notification.timestamp).toLocaleString()}
                            </p>
                            <div className="ml-auto">
                              <Button size="sm" onClick={() => sendNotification(notification.id)} className="h-7 gap-1">
                                <Send className="h-3.5 w-3.5" />
                                <span>Send</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                ) : (
                  <p className="text-center text-muted-foreground py-4">No unsent notifications.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
