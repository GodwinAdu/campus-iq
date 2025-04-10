"use client"

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, CheckCheck, Settings } from "lucide-react"

export function NotificationCenter() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
            5
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between border-b p-3">
          <h4 className="font-medium">Notifications</h4>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <CheckCheck className="h-4 w-4" />
              <span className="sr-only">Mark all as read</span>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Settings className="h-4 w-4" />
              <span className="sr-only">Settings</span>
            </Button>
          </div>
        </div>
        <Tabs defaultValue="all">
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
            <TabsTrigger
              value="all"
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="unread"
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              Unread
            </TabsTrigger>
            <TabsTrigger
              value="important"
              className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              Important
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="max-h-[300px] overflow-auto p-0">
            <div className="flex items-start gap-3 border-b p-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <Bell className="h-4 w-4 text-primary" />
              </span>
              <div>
                <p className="text-sm font-medium">New announcement posted</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 border-b p-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <Bell className="h-4 w-4 text-primary" />
              </span>
              <div>
                <p className="text-sm font-medium">Parent meeting scheduled</p>
                <p className="text-xs text-muted-foreground">Yesterday</p>
              </div>
            </div>
            <div className="flex items-start gap-3 border-b p-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <Bell className="h-4 w-4 text-primary" />
              </span>
              <div>
                <p className="text-sm font-medium">New student registered</p>
                <p className="text-xs text-muted-foreground">2 days ago</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        <div className="border-t p-3">
          <Button variant="outline" className="w-full">
            View All Notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

