import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, Plus, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function ClassesPage() {
  // Mock data for classes
  const classes = [
    {
      id: "cs101",
      name: "CS101: Introduction to Programming",
      schedule: "Mon, Wed, Fri 09:00 - 10:30",
      location: "Room 101",
      students: 35,
      attendance: 92,
    },
    {
      id: "cs201",
      name: "CS201: Data Structures",
      schedule: "Tue, Thu 11:00 - 12:30",
      location: "Room 203",
      students: 28,
      attendance: 85,
    },
    {
      id: "cs301",
      name: "CS301: Algorithms",
      schedule: "Mon, Thu 14:00 - 15:30",
      location: "Room 305",
      students: 24,
      attendance: 78,
    },
    {
      id: "cs401",
      name: "CS401: Artificial Intelligence",
      schedule: "Wed, Fri 16:00 - 17:30",
      location: "Room 405",
      students: 22,
      attendance: 88,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Classes</h1>
          <p className="text-muted-foreground">Manage your classes and schedules</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add New Class
        </Button>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Classes</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Classes</TabsTrigger>
          <TabsTrigger value="archived">Archived Classes</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {classes.map((cls) => (
              <Card key={cls.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle>{cls.name}</CardTitle>
                    <Badge variant={cls.attendance >= 85 ? "default" : "secondary"}>{cls.attendance}% Attendance</Badge>
                  </div>
                  <CardDescription>{cls.id}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{cls.schedule}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{cls.location}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{cls.students} Students</span>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      <Button size="sm">Generate QR</Button>
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
              <CardTitle>Upcoming Classes</CardTitle>
              <CardDescription>Classes that will start in the next semester</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No upcoming classes scheduled yet.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="archived" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Archived Classes</CardTitle>
              <CardDescription>Past classes that have been completed</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No archived classes available.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
