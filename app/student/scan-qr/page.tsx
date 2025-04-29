"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Camera, CheckCircle, FileWarning, Upload, XCircle } from "lucide-react"

export default function ScanQRPage() {
  const [activeTab, setActiveTab] = useState("camera")
  const [scanStatus, setScanStatus] = useState<"idle" | "scanning" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [cameraActive, setCameraActive] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  // Start camera when tab is active
  useEffect(() => {
    if (activeTab === "camera") {
      startCamera()
    } else {
      stopCamera()
    }

    return () => {
      stopCamera()
    }
  }, [activeTab])

  const startCamera = async () => {
    try {
      const constraints = {
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      }

      const stream = await navigator.mediaDevices.getUserMedia(constraints)

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setCameraActive(true)
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
      setErrorMessage("Could not access camera. Please check permissions.")
      setScanStatus("error")
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      const tracks = stream.getTracks()

      tracks.forEach((track) => track.stop())
      videoRef.current.srcObject = null
      setCameraActive(false)
    }
  }

  const scanQR = () => {
    setScanStatus("scanning")

    // Simulate QR scanning process
    setTimeout(() => {
      // Randomly succeed or fail for demo purposes
      const isSuccess = Math.random() > 0.3

      if (isSuccess) {
        setScanStatus("success")
        setSuccessMessage("Attendance marked successfully for CS101 - Introduction to Programming")
      } else {
        setScanStatus("error")
        setErrorMessage("Invalid or expired QR code. Please try again.")
      }
    }, 2000)
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    setSelectedFile(file)

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setPreviewUrl(null)
    }
  }

  const uploadAndScan = () => {
    if (!selectedFile) return

    setScanStatus("scanning")

    // Simulate QR scanning from image
    setTimeout(() => {
      // For demo purposes, always fail with image uploads to demonstrate anti-proxy feature
      setScanStatus("error")
      setErrorMessage("Proxy detection: QR code from image detected. Please use live camera scan.")
    }, 2000)
  }

  const resetScan = () => {
    setScanStatus("idle")
    setErrorMessage("")
    setSuccessMessage("")
    setSelectedFile(null)
    setPreviewUrl(null)
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Scan QR Code</h1>
        <p className="text-muted-foreground">Scan the QR code displayed by your teacher to mark attendance</p>
      </div>

      <Tabs defaultValue="camera" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="camera">Camera Scan</TabsTrigger>
          <TabsTrigger value="upload">Upload Image</TabsTrigger>
        </TabsList>

        <TabsContent value="camera" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scan with Camera</CardTitle>
              <CardDescription>Point your camera at the QR code displayed by your teacher</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video overflow-hidden rounded-md bg-muted">
                {scanStatus === "idle" || scanStatus === "scanning" ? (
                  <>
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <canvas
                      ref={canvasRef}
                      className="absolute inset-0 h-full w-full object-cover"
                      style={{ display: "none" }}
                    />
                    {scanStatus === "scanning" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
                        <div className="text-center">
                          <div className="animate-spin h-8 w-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-2"></div>
                          <p>Scanning...</p>
                        </div>
                      </div>
                    )}
                  </>
                ) : scanStatus === "success" ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-green-100 text-green-800">
                    <div className="text-center p-4">
                      <CheckCircle className="h-12 w-12 mx-auto mb-2" />
                      <p className="font-medium">Success!</p>
                      <p className="text-sm">{successMessage}</p>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-red-100 text-red-800">
                    <div className="text-center p-4">
                      <XCircle className="h-12 w-12 mx-auto mb-2" />
                      <p className="font-medium">Error</p>
                      <p className="text-sm">{errorMessage}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              {scanStatus === "idle" ? (
                <Button onClick={scanQR} className="w-full gap-2">
                  <Camera className="h-4 w-4" />
                  Scan QR Code
                </Button>
              ) : (
                <Button
                  onClick={resetScan}
                  className="w-full"
                  variant={scanStatus === "success" ? "default" : "outline"}
                >
                  {scanStatus === "success" ? "Mark Another Attendance" : "Try Again"}
                </Button>
              )}
            </CardFooter>
          </Card>

          <Alert>
            <Camera className="h-4 w-4" />
            <AlertTitle>Live Scan Required</AlertTitle>
            <AlertDescription>
              For security reasons, only live camera scans are accepted. Uploaded images or screenshots will be detected
              and rejected.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="upload" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload QR Image</CardTitle>
              <CardDescription>Upload an image containing the QR code</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <label htmlFor="qr-image" className="cursor-pointer">
                  <div className="flex flex-col items-center justify-center w-full h-[200px] rounded-md border border-dashed border-muted-foreground/50 p-4">
                    {previewUrl ? (
                      <img
                        src={previewUrl || "/placeholder.svg"}
                        alt="QR Preview"
                        className="max-h-full object-contain"
                      />
                    ) : (
                      <>
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">Click to select a QR code image</p>
                      </>
                    )}
                  </div>
                  <input id="qr-image" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                </label>
              </div>

              {scanStatus === "scanning" && (
                <div className="mt-4 flex items-center justify-center">
                  <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full mr-2"></div>
                  <p className="text-sm">Processing image...</p>
                </div>
              )}

              {scanStatus === "error" && (
                <Alert variant="destructive" className="mt-4">
                  <FileWarning className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              {scanStatus === "idle" ? (
                <Button onClick={uploadAndScan} className="w-full gap-2" disabled={!selectedFile}>
                  <Upload className="h-4 w-4" />
                  Process Image
                </Button>
              ) : (
                <Button onClick={resetScan} className="w-full" variant="outline">
                  Try Again
                </Button>
              )}
            </CardFooter>
          </Card>

          <Alert variant="destructive">
            <FileWarning className="h-4 w-4" />
            <AlertTitle>Anti-Proxy Measures Active</AlertTitle>
            <AlertDescription>
              Our system can detect if you're trying to mark attendance using a screenshot or photo of a QR code. For
              security reasons, only live camera scans are accepted.
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>
    </div>
  )
}
