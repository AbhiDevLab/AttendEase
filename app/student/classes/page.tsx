import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, User } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function StudentClassesPage() {
  // Mock data for classes
  const classes = [
    {
      id: "cs101",
      name: "CS101: Introduction to Programming",
      instructor: "Dr. Smith",
      schedule: "Mon, Wed, Fri 09:00 - 10:30",
      location: "Room 101",
      attendance: 90,
      nextClass: "2023-05-17T09:00:00Z",
    },
    {
      id: "cs201",
      name: "CS201: Data Structures",
      instructor: "Dr. Johnson",
      schedule: "Tue, Thu 11:00 - 12:30",
      location: "Room 203",
      attendance: 85,
      nextClass: "2023-05-16T11:00:00Z",
    },
    {
      id: "cs301",
      name: "CS301: Algorithms",
      instructor: "Dr. Williams",
      schedule: "Mon, Thu 14:00 - 15:30",
      location: "Room 305",
      attendance: 68,
      nextClass: "2023-05-15T14:00:00Z",
    },
    {
      id: "cs401",
      name: "CS401: Artificial Intelligence",
      instructor: "Dr. Davis",
      schedule: "Wed, Fri 16:00 - 17:30",
      location: "Room 405",
      attendance: 88,
      nextClass: "2023-05-17T16:00:00Z",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Classes</h1>
        <p className="text-muted-foreground">View your enrolled classes and attendance</p>
      </div>

      <Tabs defaultValue="current" className="space-y-4">
        <TabsList>
          <TabsTrigger value="current">Current Classes</TabsTrigger>
          <TabsTrigger value="upcoming">Today's Schedule</TabsTrigger>
          <TabsTrigger value="past">Past Classes</TabsTrigger>
        </TabsList>
        <TabsContent value="current" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {classes.map((cls) => (
              <Card key={cls.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle>{cls.name}</CardTitle>
                    <Badge variant={cls.attendance >= 75 ? "default" : "destructive"} className="ml-2">
                      {cls.attendance}% Attendance
                    </Badge>
                  </div>
                  <CardDescription>{cls.id}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{cls.instructor}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{cls.schedule}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{cls.location}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Next class: {new Date(cls.nextClass).toLocaleString()}</span>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between items-center mb-1 text-sm">
                        <span>Attendance</span>
                        <span className={cls.attendance < 75 ? "text-destructive" : ""}>{cls.attendance}%</span>
                      </div>
                      <Progress value={cls.attendance} className={cls.attendance < 75 ? "bg-destructive/20" : ""} />
                      {cls.attendance < 75 && (
                        <p className="text-xs text-destructive mt-1">Warning: Below 75% attendance threshold</p>
                      )}
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      <Button size="sm">Mark Attendance</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
              <CardDescription>Your classes for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {classes
                  .filter((cls) => {
                    const nextClass = new Date(cls.nextClass)
                    const today = new Date()
                    return (
                      nextClass.getDate() === today.getDate() &&
                      nextClass.getMonth() === today.getMonth() &&
                      nextClass.getFullYear() === today.getFullYear()
                    )
                  })
                  .map((cls) => (
                    <div key={cls.id} className="flex items-start space-x-4 rounded-md border p-3">
                      <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Clock className="h-5 w-5" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">{cls.name}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <span>
                            {new Date(cls.nextClass).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </span>
                          <span className="px-1">•</span>
                          <span>{cls.location}</span>
                        </div>
                        <div className="flex items-center pt-2">
                          <Button size="sm" className="ml-auto">
                            Mark Attendance
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                {classes.filter((cls) => {
                  const nextClass = new Date(cls.nextClass)
                  const today = new Date()
                  return (
                    nextClass.getDate() === today.getDate() &&
                    nextClass.getMonth() === today.getMonth() &&
                    nextClass.getFullYear() === today.getFullYear()
                  )
                }).length === 0 && (
                  <p className="text-center text-muted-foreground py-4">No classes scheduled for today.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="past" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Past Classes</CardTitle>
              <CardDescription>Your attendance history</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Select a class to view past attendance records.</p>
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                Past attendance records will appear here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
