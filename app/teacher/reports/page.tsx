import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Calendar, Download, FileText, PieChart } from "lucide-react"
import { AttendanceChart } from "@/components/attendance-chart"

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Attendance Reports</h1>
          <p className="text-muted-foreground">View and analyze attendance data</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Data
          </Button>
          <Button variant="outline" className="gap-2">
            <FileText className="h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Attendance</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85.7%</div>
            <p className="text-xs text-muted-foreground">Across all courses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124</div>
            <p className="text-xs text-muted-foreground">This semester</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Students at Risk</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">Below 75% attendance</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">By Course</TabsTrigger>
            <TabsTrigger value="students">By Student</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <Select defaultValue="semester">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="semester">This Semester</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Overview</CardTitle>
              <CardDescription>Weekly attendance across all courses</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <AttendanceChart />
            </CardContent>
          </Card>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Course Comparison</CardTitle>
                <CardDescription>Attendance rates by course</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "CS101 - Introduction to Programming", attendance: 90 },
                    { name: "CS201 - Data Structures", attendance: 85 },
                    { name: "CS301 - Algorithms", attendance: 78 },
                    { name: "CS401 - Artificial Intelligence", attendance: 88 },
                  ].map((course) => (
                    <div key={course.name} className="flex items-center justify-between">
                      <div className="font-medium">{course.name}</div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 rounded-full bg-muted overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: `${course.attendance}%` }} />
                        </div>
                        <span className="text-sm">{course.attendance}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Time of Day Analysis</CardTitle>
                <CardDescription>Attendance patterns by class time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { time: "Morning (8AM - 12PM)", attendance: 92 },
                    { time: "Afternoon (12PM - 4PM)", attendance: 85 },
                    { time: "Evening (4PM - 8PM)", attendance: 78 },
                  ].map((timeSlot) => (
                    <div key={timeSlot.time} className="flex items-center justify-between">
                      <div className="font-medium">{timeSlot.time}</div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 rounded-full bg-muted overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: `${timeSlot.attendance}%` }} />
                        </div>
                        <span className="text-sm">{timeSlot.attendance}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="courses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Course-wise Attendance</CardTitle>
              <CardDescription>Detailed attendance data for each course</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Select a course to view detailed attendance statistics.</p>
              <Select defaultValue="cs101">
                <SelectTrigger className="w-full mb-4">
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cs101">CS101 - Introduction to Programming</SelectItem>
                  <SelectItem value="cs201">CS201 - Data Structures</SelectItem>
                  <SelectItem value="cs301">CS301 - Algorithms</SelectItem>
                  <SelectItem value="cs401">CS401 - Artificial Intelligence</SelectItem>
                </SelectContent>
              </Select>
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                Course-specific attendance chart will appear here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Student-wise Attendance</CardTitle>
              <CardDescription>Detailed attendance data for individual students</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Select a student to view their attendance details.</p>
              <Select>
                <SelectTrigger className="w-full mb-4">
                  <SelectValue placeholder="Select student" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="st10234">Alex Johnson (ST10234)</SelectItem>
                  <SelectItem value="st10542">Maria Garcia (ST10542)</SelectItem>
                  <SelectItem value="st10876">David Kim (ST10876)</SelectItem>
                  <SelectItem value="st10123">Sarah Williams (ST10123)</SelectItem>
                </SelectContent>
              </Select>
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                Student-specific attendance chart will appear here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Trends</CardTitle>
              <CardDescription>Long-term attendance patterns and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                Trend analysis chart will appear here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
