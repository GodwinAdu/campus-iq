"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Apple, ComputerIcon as Windows, SmartphoneIcon as Android, Smartphone } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type React from "react"

interface DownloadOption {
  name: string
  icon: React.ReactNode
  version: string
  size: string
  url: string
  description: string
}

const desktopOptions: DownloadOption[] = [
  {
    name: "macOS",
    icon: <Apple className="h-6 w-6" />,
    version: "2.1.0",
    size: "145 MB",
    url: "#macos-download",
    description: "Optimized for macOS with native Apple Silicon support.",
  },
  {
    name: "Windows",
    icon: <Windows className="h-6 w-6" />,
    version: "2.1.0",
    size: "150 MB",
    url: "#windows-download",
    description: "Full-featured Windows app with touch screen support.",
  },
]

const mobileOptions: DownloadOption[] = [
  {
    name: "Android",
    icon: <Android className="h-6 w-6" />,
    version: "2.0.5",
    size: "50 MB",
    url: "#android-download",
    description: "Compatible with Android 8.0 and above, optimized for tablets.",
  },
  {
    name: "iOS",
    icon: <Smartphone className="h-6 w-6" />,
    version: "2.0.5",
    size: "48 MB",
    url: "#ios-download",
    description: "Designed for iOS 13.0 and above, with iPad multitasking support.",
  },
]

const DownloadCard = ({ option, downloads }: { option: DownloadOption; downloads: number }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        {option.icon}
        {option.name}
      </CardTitle>
      <CardDescription>Version {option.version}</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="mb-4 text-sm text-muted-foreground">{option.description}</p>
      <div className="flex justify-between mb-4">
        <Badge variant="secondary">Size: {option.size}</Badge>
        <Badge variant="outline">{downloads.toLocaleString()} downloads</Badge>
      </div>
      <Button onClick={() => window.open(option.url, "_blank")} className="w-full">
        Download for {option.name}
      </Button>
    </CardContent>
  </Card>
)

const DownloadSection = () => {
  const [deviceType, setDeviceType] = useState<"desktop" | "mobile" | null>(null)
  const [downloadCounts, setDownloadCounts] = useState({
    macOS: 50000,
    Windows: 75000,
    Android: 100000,
    iOS: 95000,
  })

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase()
    const isMobile = /iphone|ipad|ipod|android|blackberry|windows phone/g.test(userAgent)
    setDeviceType(isMobile ? "mobile" : "desktop")
  }, [])

  return (
    <div className="mb-16">
      <Tabs defaultValue={deviceType || "desktop"} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="desktop">Desktop</TabsTrigger>
          <TabsTrigger value="mobile">Mobile</TabsTrigger>
        </TabsList>
        <TabsContent value="desktop">
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            {desktopOptions.map((option) => (
              <DownloadCard
                key={option.name}
                option={option}
                downloads={downloadCounts[option.name as keyof typeof downloadCounts]}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="mobile">
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            {mobileOptions.map((option) => (
              <DownloadCard
                key={option.name}
                option={option}
                downloads={downloadCounts[option.name as keyof typeof downloadCounts]}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center"
      >
        <p className="text-lg font-semibold mb-2">Recommended for your device:</p>
        <p className="text-xl font-bold">
          {deviceType === "mobile"
            ? navigator.platform.toLowerCase().includes("iphone")
              ? "iOS"
              : "Android"
            : navigator.platform.toLowerCase().includes("mac")
              ? "macOS"
              : "Windows"}
        </p>
      </motion.div>
    </div>
  )
}

export default DownloadSection

