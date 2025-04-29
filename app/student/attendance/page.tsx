import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Calendar, CheckCircle, Clock, XCircle } from "lucide-react"
import { AttendanceChart } from "@/components/attendance-chart"

export default function StudentAttendancePage() {
  // Mock data
  const attendancePercentage = 82
  const totalClasses = 45
  const attendedClasses = 37
  const missedClasses = 8
  const isAtRisk = attendancePercentage < 75
  const classesToAttend = isAtRisk ? Math.ceil((0.75 * totalClasses - attendedClasses) / 0.25) : 0

  // Mock attendance records
  const attendanceRecords = [
    { date: "2023-05-15", course: "CS101", status: "present", time: "09:15:22" },
    { date: "2023-05-15", course: "CS301", status: "absent", time: "-" },
    { date: "2023-05-12", course: "CS201", status: "present", time: "11:05:47" },
    { date: "2023-05-12", course: "CS401", status: "present", time: "16:02:33" },
    { date: "2023-05-10", course: "CS101", status: "present", time: "09:08:12" },
    { date: "2023-05-10", course: "CS301", status: "present", time: "14:01:59" },
    { date: "2023-05-08", course: "CS101", status: "absent", time: "-" },
    { date: "2023-05-08", course: "CS301", status: "present", time: "14:00:45" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Attendance</h1>
        <p className="text-muted-foreground">Track and monitor your attendance across all courses</p>
      </div>

      {isAtRisk && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Attendance Warning</AlertTitle>
          <AlertDescription>
            Your attendance is below 75%. You need to attend at least {classesToAttend} more classes to meet the minimum
            requirement.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Attendance</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendancePercentage}%</div>
            <Progress value={attendancePercentage} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-2">Minimum required: 75%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClasses}</div>
            <p className="text-xs text-muted-foreground">Across all courses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Classes Attended</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendedClasses}</div>
            <p className="text-xs text-muted-foreground">
              {((attendedClasses / totalClasses) * 100).toFixed(1)}% of total classes
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Classes Missed</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{missedClasses}</div>
            <p className="text-xs text-muted-foreground">
              {((missedClasses / totalClasses) * 100).toFixed(1)}% of total classes
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="records">Attendance Records</TabsTrigger>
          <TabsTrigger value="courses">Course Breakdown</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Trend</CardTitle>
              <CardDescription>Your attendance over the past weeks</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <AttendanceChart />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="records" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Records</CardTitle>
              <CardDescription>Detailed history of your attendance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="min-w-full divide-y divide-border">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Course
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Time
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-card divide-y divide-border">
                    {attendanceRecords.map((record, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          {new Date(record.date).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">{record.course}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              record.status === "present"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                            }`}
                          >
                            {record.status === "present" ? "Present" : "Absent"}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-muted-foreground">{record.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="courses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Course-wise Attendance</CardTitle>
              <CardDescription>Your attendance breakdown by course</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "CS101 - Introduction to Programming", attendance: 90 },
                  { name: "CS201 - Data Structures", attendance: 85 },
                  { name: "CS301 - Algorithms", attendance: 68 },
                  { name: "CS401 - Artificial Intelligence", attendance: 88 },
                ].map((course) => (
                  <div key={course.name} className="flex items-center justify-between">
                    <div className="font-medium">{course.name}</div>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={course.attendance}
                        className={`w-24 h-2 ${course.attendance < 75 ? "bg-destructive/20" : ""}`}
                      />
                      <span className={`w-10 text-right text-sm ${course.attendance < 75 ? "text-destructive" : ""}`}>
                        {course.attendance}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
