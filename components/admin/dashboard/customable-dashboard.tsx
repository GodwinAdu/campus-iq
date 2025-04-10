"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { LayoutDashboard } from "lucide-react"

export function CustomizableDashboard() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1">
          <LayoutDashboard className="h-4 w-4" />
          Customize
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Customize Dashboard</DialogTitle>
          <DialogDescription>Select which widgets to display on your dashboard.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="attendance" defaultChecked />
            <Label htmlFor="attendance">Attendance Summary</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="announcements" defaultChecked />
            <Label htmlFor="announcements">Recent Announcements</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="events" defaultChecked />
            <Label htmlFor="events">Upcoming Events</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="fees" defaultChecked />
            <Label htmlFor="fees">Fee Collection</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="new-students" defaultChecked />
            <Label htmlFor="new-students">New Students</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="attendance-alerts" defaultChecked />
            <Label htmlFor="attendance-alerts">Attendance Alerts</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="ai-insights" defaultChecked />
            <Label htmlFor="ai-insights">AI Insights</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="calendar" defaultChecked />
            <Label htmlFor="calendar">Calendar</Label>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

