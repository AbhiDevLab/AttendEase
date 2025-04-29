"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export default function TeacherSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your application preferences</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="qr">QR Code Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage general application settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-y-0">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-logout">Auto Logout</Label>
                  <p className="text-sm text-muted-foreground">Automatically log out after a period of inactivity</p>
                </div>
                <Switch id="auto-logout" defaultChecked />
              </div>
              <div className="space-y-2">
                <Label>Auto Logout Timer</Label>
                <div className="flex items-center space-x-2">
                  <Select defaultValue="30">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center justify-between space-y-0">
                <div className="space-y-0.5">
                  <Label htmlFor="save-attendance">Auto-Save Attendance</Label>
                  <p className="text-sm text-muted-foreground">Automatically save attendance data periodically</p>
                </div>
                <Switch id="save-attendance" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-y-0">
                <div className="space-y-0.5">
                  <Label htmlFor="analytics">Share Analytics</Label>
                  <p className="text-sm text-muted-foreground">
                    Share anonymous usage data to help improve the application
                  </p>
                </div>
                <Switch id="analytics" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Language & Region</CardTitle>
              <CardDescription>Set your language and regional preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Time Zone</Label>
                <Select defaultValue="utc-5">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select time zone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                    <SelectItem value="utc-7">Mountain Time (UTC-7)</SelectItem>
                    <SelectItem value="utc-6">Central Time (UTC-6)</SelectItem>
                    <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Theme Settings</CardTitle>
              <CardDescription>Customize the appearance of the application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Theme Mode</Label>
                <div className="flex items-center space-x-4">
                  <ThemeToggle />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Font Size</Label>
                <Slider defaultValue={[16]} min={12} max={20} step={1} className="w-full" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Small</span>
                  <span>Medium</span>
                  <span>Large</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-y-0">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch id="email-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-y-0">
                <div className="space-y-0.5">
                  <Label htmlFor="attendance-alerts">Attendance Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get alerts when students fall below attendance threshold
                  </p>
                </div>
                <Switch id="attendance-alerts" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-y-0">
                <div className="space-y-0.5">
                  <Label htmlFor="class-reminders">Class Reminders</Label>
                  <p className="text-sm text-muted-foreground">Receive reminders before your scheduled classes</p>
                </div>
                <Switch id="class-reminders" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-y-0">
                <div className="space-y-0.5">
                  <Label htmlFor="system-updates">System Updates</Label>
                  <p className="text-sm text-muted-foreground">Get notified about system updates and maintenance</p>
                </div>
                <Switch id="system-updates" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="qr" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>QR Code Settings</CardTitle>
              <CardDescription>Configure QR code generation settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-y-0">
                <div className="space-y-0.5">
                  <Label htmlFor="geofencing">Enable Geofencing</Label>
                  <p className="text-sm text-muted-foreground">Restrict attendance to students within campus</p>
                </div>
                <Switch id="geofencing" defaultChecked />
              </div>
              <div className="space-y-2">
                <Label>Default Geofence Radius (meters)</Label>
                <Slider defaultValue={[100]} min={10} max={500} step={10} className="w-full" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>10m</span>
                  <span>100m</span>
                  <span>500m</span>
                </div>
              </div>
              <div className="flex items-center justify-between space-y-0">
                <div className="space-y-0.5">
                  <Label htmlFor="proxy-detection">Anti-Proxy Detection</Label>
                  <p className="text-sm text-muted-foreground">Detect and prevent attendance by proxy</p>
                </div>
                <Switch id="proxy-detection" defaultChecked />
              </div>
              <div className="space-y-2">
                <Label>Default QR Code Duration</Label>
                <Select defaultValue="60">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                    <SelectItem value="180">3 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <div className="flex items-center space-x-4">
      <Button
        variant={theme === "light" ? "default" : "outline"}
        size="icon"
        onClick={() => setTheme("light")}
        className="h-10 w-10"
      >
        <Sun className="h-5 w-5" />
        <span className="sr-only">Light Mode</span>
      </Button>
      <Button
        variant={theme === "dark" ? "default" : "outline"}
        size="icon"
        onClick={() => setTheme("dark")}
        className="h-10 w-10"
      >
        <Moon className="h-5 w-5" />
        <span className="sr-only">Dark Mode</span>
      </Button>
      <Button variant={theme === "system" ? "default" : "outline"} size="sm" onClick={() => setTheme("system")}>
        System
      </Button>
    </div>
  )
}
