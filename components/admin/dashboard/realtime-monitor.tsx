"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, AlertCircle, CheckCircle2, Clock } from "lucide-react"

export function RealtimeMonitor() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [systemStatus, setSystemStatus] = useState({
    attendance: "operational",
    database: "operational",
    notifications: "operational",
    api: "operational",
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-sm flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              System Status Monitor
            </CardTitle>
            <CardDescription>Real-time system health and activity</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground font-bold">{currentTime.toLocaleTimeString()}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3">
          <Badge variant="outline" className="flex items-center gap-1 px-2 py-1">
            <CheckCircle2 className="h-3 w-3 text-green-500" />
            <span>Attendance System: Online</span>
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1 px-2 py-1">
            <CheckCircle2 className="h-3 w-3 text-green-500" />
            <span>Database: Operational</span>
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1 px-2 py-1">
            <CheckCircle2 className="h-3 w-3 text-green-500" />
            <span>Notification Service: Active</span>
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1 px-2 py-1">
            <AlertCircle className="h-3 w-3 text-yellow-500" />
            <span>API: High Load</span>
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1 px-2 py-1">
            <CheckCircle2 className="h-3 w-3 text-green-500" />
            <span>Active Users: 42</span>
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

//         </CardContent>