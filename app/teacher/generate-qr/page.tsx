"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { QrCode, Copy, Check, RefreshCw, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const formSchema = z.object({
  courseId: z.string().min(1, { message: "Please select a course" }),
  sessionType: z.string().min(1, { message: "Please select a session type" }),
  duration: z.number().min(5).max(180),
  location: z.string().min(1, { message: "Location is required" }),
  enableGeofencing: z.boolean().default(false),
  geofenceRadius: z.number().min(10).max(500).default(100),
  enableProxyDetection: z.boolean().default(true),
})

export default function GenerateQRPage() {
  const [qrGenerated, setQrGenerated] = useState(false)
  const [copied, setCopied] = useState(false)
  const [qrExpiry, setQrExpiry] = useState<number | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseId: "",
      sessionType: "",
      duration: 60,
      location: "",
      enableGeofencing: true,
      geofenceRadius: 100,
      enableProxyDetection: true,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    setQrGenerated(true)

    // Set QR expiry time in minutes
    setQrExpiry(values.duration)

    // Start countdown timer
    startCountdown(values.duration)
  }

  function startCountdown(minutes: number) {
    let remainingTime = minutes

    const timer = setInterval(() => {
      remainingTime -= 1
      setQrExpiry(remainingTime)

      if (remainingTime <= 0) {
        clearInterval(timer)
        setQrGenerated(false)
      }
    }, 60000) // Update every minute

    // Cleanup on component unmount
    return () => clearInterval(timer)
  }

  function copyQrCode() {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function regenerateQrCode() {
    // Reset the form and generate a new QR code
    form.handleSubmit(onSubmit)()
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Generate QR Code</h1>
        <p className="text-muted-foreground">Create a secure QR code for your class attendance</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Class Details</CardTitle>
            <CardDescription>Configure the settings for your attendance QR code</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="courseId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a course" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="cs101">CS101 - Introduction to Programming</SelectItem>
                          <SelectItem value="cs201">CS201 - Data Structures</SelectItem>
                          <SelectItem value="cs301">CS301 - Algorithms</SelectItem>
                          <SelectItem value="cs401">CS401 - Artificial Intelligence</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sessionType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Session Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select session type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="lecture">Lecture</SelectItem>
                          <SelectItem value="lab">Lab</SelectItem>
                          <SelectItem value="tutorial">Tutorial</SelectItem>
                          <SelectItem value="seminar">Seminar</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>QR Code Duration (minutes)</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          <Slider
                            min={5}
                            max={180}
                            step={5}
                            defaultValue={[field.value]}
                            onValueChange={(vals) => field.onChange(vals[0])}
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>5 min</span>
                            <span>{field.value} min</span>
                            <span>180 min</span>
                          </div>
                        </div>
                      </FormControl>
                      <FormDescription>QR code will expire after this duration</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Room number or building name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Separator className="my-4" />
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Security Settings</h3>
                  <FormField
                    control={form.control}
                    name="enableGeofencing"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Geofencing</FormLabel>
                          <FormDescription>Restrict attendance to students within campus</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  {form.watch("enableGeofencing") && (
                    <FormField
                      control={form.control}
                      name="geofenceRadius"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Geofence Radius (meters)</FormLabel>
                          <FormControl>
                            <div className="space-y-2">
                              <Slider
                                min={10}
                                max={500}
                                step={10}
                                defaultValue={[field.value]}
                                onValueChange={(vals) => field.onChange(vals[0])}
                              />
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>10m</span>
                                <span>{field.value}m</span>
                                <span>500m</span>
                              </div>
                            </div>
                          </FormControl>
                          <FormDescription>Students must be within this radius to mark attendance</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  <FormField
                    control={form.control}
                    name="enableProxyDetection"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Anti-Proxy Detection</FormLabel>
                          <FormDescription>Detect and prevent attendance by proxy</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Generate QR Code
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>QR Code</CardTitle>
            <CardDescription>
              {qrGenerated ? "Scan this QR code to mark attendance" : "Fill in the form to generate a QR code"}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center min-h-[400px]">
            {qrGenerated ? (
              <div className="text-center space-y-4">
                <div className="bg-white p-4 rounded-lg inline-block">
                  <QrCode className="h-48 w-48 text-primary" />
                </div>
                {qrExpiry !== null && (
                  <Alert variant="default" className="bg-muted">
                    <AlertTitle className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      QR Code Expiry
                    </AlertTitle>
                    <AlertDescription>This QR code will expire in {qrExpiry} minutes</AlertDescription>
                  </Alert>
                )}
              </div>
            ) : (
              <div className="text-center text-muted-foreground">
                <QrCode className="h-24 w-24 mx-auto mb-4 opacity-20" />
                <p>QR code will appear here</p>
              </div>
            )}
          </CardContent>
          {qrGenerated && (
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="gap-2" onClick={copyQrCode}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied" : "Copy"}
              </Button>
              <Button variant="outline" className="gap-2" onClick={regenerateQrCode}>
                <RefreshCw className="h-4 w-4" />
                Regenerate
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  )
}
