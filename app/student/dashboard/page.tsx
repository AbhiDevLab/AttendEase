import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, Calendar, CheckCircle, Clock, QrCode, XCircle } from "lucide-react"
import Link from "next/link"
import { AttendanceChart } from "@/components/attendance-chart"
import { StudentClasses } from "@/components/student-classes"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function StudentDashboard() {
  // Mock data
  const attendancePercentage = 82
  const totalClasses = 45
  const attendedClasses = 37
  const missedClasses = 8
  const isAtRisk = attendancePercentage < 75
  const classesToAttend = isAtRisk ? Math.ceil((0.75 * totalClasses - attendedClasses) / 0.25) : 0

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, John</h1>
          <p className="text-muted-foreground">Here's your attendance overview.</p>
        </div>
        <Link href="/student/scan-qr">
          <Button className="gap-2">
            <QrCode className="h-4 w-4" />
            Scan QR Code
          </Button>
        </Link>
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Attendance Trend</CardTitle>
            <CardDescription>Your attendance over the past weeks</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <AttendanceChart />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Today's Classes</CardTitle>
            <CardDescription>Your schedule for today</CardDescription>
          </CardHeader>
          <CardContent>
            <StudentClasses />
          </CardContent>
        </Card>
      </div>

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
              { name: "CS301 - Algorithms", attendance: 78 },
              { name: "CS401 - Artificial Intelligence", attendance: 68 },
            ].map((course) => (
              <div key={course.name} className="flex items-center justify-between">
                <div className="font-medium">{course.name}</div>
                <div className="flex items-center gap-2">
                  <Progress value={course.attendance} className="w-24 h-2" />
                  <span className="w-10 text-right text-sm">{course.attendance}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
