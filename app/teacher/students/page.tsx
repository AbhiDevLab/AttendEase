"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, UserPlus, Download, AlertCircle } from "lucide-react"

export default function StudentsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data for students
  const students = [
    {
      id: "ST10234",
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      course: "CS101",
      attendance: 68,
      status: "at-risk",
    },
    {
      id: "ST10542",
      name: "Maria Garcia",
      email: "maria.garcia@example.com",
      course: "CS201",
      attendance: 72,
      status: "at-risk",
    },
    {
      id: "ST10876",
      name: "David Kim",
      email: "david.kim@example.com",
      course: "CS301",
      attendance: 65,
      status: "at-risk",
    },
    {
      id: "ST10123",
      name: "Sarah Williams",
      email: "sarah.williams@example.com",
      course: "CS101",
      attendance: 95,
      status: "good",
    },
    {
      id: "ST10456",
      name: "James Brown",
      email: "james.brown@example.com",
      course: "CS201",
      attendance: 88,
      status: "good",
    },
    {
      id: "ST10789",
      name: "Emily Davis",
      email: "emily.davis@example.com",
      course: "CS301",
      attendance: 92,
      status: "good",
    },
  ]

  // Filter students based on search query
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.course.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Get at-risk students
  const atRiskStudents = students.filter((student) => student.status === "at-risk")

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Students</h1>
          <p className="text-muted-foreground">Manage and monitor student attendance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gap-2">
            <UserPlus className="h-4 w-4" />
            Add Student
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Students</TabsTrigger>
          <TabsTrigger value="at-risk">At Risk ({atRiskStudents.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Student Directory</CardTitle>
              <CardDescription>View and manage all enrolled students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-4">
                <Search className="h-4 w-4 mr-2 text-muted-foreground" />
                <Input
                  placeholder="Search by name, ID, email, or course..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
              </div>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Attendance</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.length > 0 ? (
                      filteredStudents.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">{student.id}</TableCell>
                          <TableCell>{student.name}</TableCell>
                          <TableCell>{student.email}</TableCell>
                          <TableCell>{student.course}</TableCell>
                          <TableCell>{student.attendance}%</TableCell>
                          <TableCell>
                            <Badge variant={student.status === "at-risk" ? "destructive" : "default"}>
                              {student.status === "at-risk" ? "At Risk" : "Good Standing"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                          No students found matching your search.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="at-risk" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-destructive" />
                <CardTitle>Students at Risk</CardTitle>
              </div>
              <CardDescription>Students with attendance below 75%</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Attendance</TableHead>
                      <TableHead>Classes Needed</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {atRiskStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.id}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.email}</TableCell>
                        <TableCell>{student.course}</TableCell>
                        <TableCell className="text-destructive">{student.attendance}%</TableCell>
                        <TableCell>{Math.ceil((75 - student.attendance) / 5)}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            Send Alert
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
