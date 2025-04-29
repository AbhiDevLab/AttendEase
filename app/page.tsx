import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, QrCode, Shield, Bell } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <QrCode className="h-6 w-6 text-primary" />
            <span>AttendEase</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </Link>
            <Link href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Log In</Button>
            </Link>
            <Link href="/register">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 md:py-28">
          <div className="container flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Smart Attendance Tracking <br className="hidden md:inline" />
              <span className="text-primary">Without Proxies</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-[800px] mb-10">
              AttendEase uses secure QR technology to track attendance with anti-proxy measures, helping educational
              institutions maintain accurate attendance records.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/register?role=teacher">
                <Button size="lg" className="gap-2">
                  For Teachers
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/register?role=student">
                <Button size="lg" variant="outline" className="gap-2">
                  For Students
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 bg-muted/50">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <QrCode className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Dynamic QR Generation</CardTitle>
                  <CardDescription>Teachers generate unique QR codes for each class session</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Time-limited QR codes that expire after class starts, preventing late marking.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Shield className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Anti-Proxy Measures</CardTitle>
                  <CardDescription>Advanced security to prevent attendance fraud</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Live camera verification, device authentication, and image detection to prevent proxy attendance.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Bell className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Attendance Alerts</CardTitle>
                  <CardDescription>Automatic notifications for attendance status</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Students receive alerts when attendance falls below 75% with recovery recommendations.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Teacher Generates QR</h3>
                      <p className="text-muted-foreground">
                        Teachers generate a unique QR code at the beginning of each class.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Students Scan QR</h3>
                      <p className="text-muted-foreground">Students scan the QR using the app's live camera feature.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Verification Process</h3>
                      <p className="text-muted-foreground">
                        System verifies it's a live scan, not an image, and checks location.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      4
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Attendance Recorded</h3>
                      <p className="text-muted-foreground">
                        Attendance is securely recorded in the database with timestamp.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-muted rounded-lg p-6 aspect-square flex items-center justify-center">
                <img
                  src="/placeholder.svg?height=400&width=400"
                  alt="AttendEase workflow illustration"
                  className="max-w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-10 bg-muted/30">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-bold">
            <QrCode className="h-5 w-5 text-primary" />
            <span>AttendEase</span>
          </div>
          <p className="text-sm text-muted-foreground text-center md:text-left">
            &copy; {new Date().getFullYear()} AttendEase. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
