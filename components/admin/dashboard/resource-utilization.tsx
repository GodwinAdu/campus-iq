"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"
import { AlertCircle, ArrowUpRight, CheckCircle2, Download, LayoutGrid } from "lucide-react"

const classroomData = [
  { name: "In Use", value: 28, color: "#3b82f6" },
  { name: "Available", value: 14, color: "#10b981" },
]

const labUtilizationData = [
  { name: "Computer Lab", utilization: 75, capacity: 100 },
  { name: "Science Lab", utilization: 60, capacity: 100 },
  { name: "Language Lab", utilization: 45, capacity: 100 },
  { name: "Art Studio", utilization: 80, capacity: 100 },
  { name: "Music Room", utilization: 50, capacity: 100 },
  { name: "Sports Hall", utilization: 90, capacity: 100 },
]

const maintenanceData = [
  { name: "Projectors", operational: 18, maintenance: 2 },
  { name: "Computers", operational: 85, maintenance: 15 },
  { name: "Lab Equipment", operational: 45, maintenance: 5 },
  { name: "AC Units", operational: 32, maintenance: 8 },
  { name: "Furniture", operational: 250, maintenance: 20 },
]

export function ResourceUtilization() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LayoutGrid className="h-5 w-5 text-green-500" />
            <CardTitle>Resource Utilization</CardTitle>
          </div>
          <Badge variant="outline">Real-time Data</Badge>
        </div>
        <CardDescription>Monitor and optimize school resources and facilities</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="classrooms">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="classrooms">Classroom Utilization</TabsTrigger>
            <TabsTrigger value="facilities">Specialized Facilities</TabsTrigger>
            <TabsTrigger value="equipment">Equipment Status</TabsTrigger>
          </TabsList>
          <TabsContent value="classrooms" className="space-y-4">
            <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Current Classroom Status</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={classroomData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {classroomData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Classroom Availability</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Available Now</span>
                    </div>
                    <span className="font-medium">14 rooms</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">Available in 1 hour</span>
                    </div>
                    <span className="font-medium">8 rooms</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      <span className="text-sm">Fully Booked Today</span>
                    </div>
                    <span className="font-medium">20 rooms</span>
                  </div>
                </div>
                <div className="pt-4">
                  <h3 className="text-sm font-medium mb-2">Peak Usage Times</h3>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">9:00 AM - 11:00 AM</span>
                      <Badge>95% Utilization</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">11:00 AM - 1:00 PM</span>
                      <Badge>90% Utilization</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">1:00 PM - 3:00 PM</span>
                      <Badge>85% Utilization</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="facilities" className="space-y-4">
            <div className="pt-4">
              <h3 className="text-sm font-medium mb-2">Specialized Facilities Utilization</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={labUtilizationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="utilization" name="Current Utilization (%)" fill="#3b82f6" />
                  <Bar dataKey="capacity" name="Maximum Capacity (%)" fill="#d1d5db" />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Optimization Opportunities</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5" />
                    <span>
                      Computer Lab utilization is at 75%. Consider scheduling additional classes during off-peak hours.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5" />
                    <span>
                      Language Lab is underutilized at 45%. Consider promoting additional language activities or
                      allowing it to be used for other purposes.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
                    <span>
                      Sports Hall is nearing capacity at 90%. Consider expanding facilities or staggering usage times.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="equipment" className="space-y-4">
            <div className="pt-4">
              <h3 className="text-sm font-medium mb-2">Equipment Maintenance Status</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={maintenanceData} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="operational" name="Operational" stackId="a" fill="#10b981" />
                  <Bar dataKey="maintenance" name="Needs Maintenance" stackId="a" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Maintenance Schedule</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span>Computer Lab Maintenance</span>
                      <Badge variant="outline">April 15</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Projector Servicing</span>
                      <Badge variant="outline">April 22</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>AC Unit Inspection</span>
                      <Badge variant="outline">May 5</Badge>
                    </div>
                  </div>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Equipment Procurement</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span>New Computers (20 units)</span>
                      <Badge variant="outline" className="bg-green-100 text-green-800">
                        Approved
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Science Lab Equipment</span>
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                        Pending
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Smart Boards (5 units)</span>
                      <Badge variant="outline" className="bg-blue-100 text-blue-800">
                        Ordered
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" className="gap-1">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
        <Button className="gap-1">
          Resource Management
          <ArrowUpRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}

