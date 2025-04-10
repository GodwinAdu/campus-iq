"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts"
import { Brain, Download, TrendingUp } from "lucide-react"

const performanceData = [
  { month: "Jan", actual: 72, predicted: 70 },
  { month: "Feb", actual: 75, predicted: 73 },
  { month: "Mar", actual: 78, predicted: 76 },
  { month: "Apr", actual: 80, predicted: 79 },
  { month: "May", actual: null, predicted: 82 },
  { month: "Jun", actual: null, predicted: 84 },
]

const attendanceData = [
  { month: "Jan", actual: 92, predicted: 90 },
  { month: "Feb", actual: 90, predicted: 89 },
  { month: "Mar", actual: 88, predicted: 87 },
  { month: "Apr", actual: 89, predicted: 88 },
  { month: "May", actual: null, predicted: 90 },
  { month: "Jun", actual: null, predicted: 91 },
]

const dropoutRiskData = [
  { grade: "Grade 6", lowRisk: 85, mediumRisk: 10, highRisk: 5 },
  { grade: "Grade 7", lowRisk: 80, mediumRisk: 15, highRisk: 5 },
  { grade: "Grade 8", lowRisk: 75, mediumRisk: 15, highRisk: 10 },
  { grade: "Grade 9", lowRisk: 70, mediumRisk: 20, highRisk: 10 },
  { grade: "Grade 10", lowRisk: 65, mediumRisk: 25, highRisk: 10 },
  { grade: "Grade 11", lowRisk: 70, mediumRisk: 20, highRisk: 10 },
  { grade: "Grade 12", lowRisk: 75, mediumRisk: 15, highRisk: 10 },
]

export function PredictiveAnalytics() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-500" />
            <CardTitle>Predictive Analytics</CardTitle>
          </div>
          <Badge variant="outline" className="bg-white/50 dark:bg-black/20">
            AI Powered
          </Badge>
        </div>
        <CardDescription>AI-powered predictions based on historical data and trends</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="performance">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="performance">Academic Performance</TabsTrigger>
            <TabsTrigger value="attendance">Attendance Forecast</TabsTrigger>
            <TabsTrigger value="dropout">Dropout Risk Analysis</TabsTrigger>
          </TabsList>
          <TabsContent value="performance" className="space-y-4">
            <div className="pt-4">
              <h3 className="text-sm font-medium mb-2">Predicted vs. Actual Average Scores</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[60, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="actual" stroke="#3b82f6" name="Actual" strokeWidth={2} />
                  <Line
                    type="monotone"
                    dataKey="predicted"
                    stroke="#8884d8"
                    name="Predicted"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-4 bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <h4 className="font-medium">AI Insight</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Based on current trends, we predict a 5% increase in overall academic performance by the end of the
                  semester. Science and Mathematics show the strongest growth potential.
                </p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="attendance" className="space-y-4">
            <div className="pt-4">
              <h3 className="text-sm font-medium mb-2">Attendance Rate Forecast</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[80, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="actual" stroke="#3b82f6" name="Actual" strokeWidth={2} />
                  <Line
                    type="monotone"
                    dataKey="predicted"
                    stroke="#8884d8"
                    name="Predicted"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-4 bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <h4 className="font-medium">AI Insight</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Attendance is predicted to improve in the coming months. The new attendance policy implementation
                  shows positive early results. Consider maintaining the current approach.
                </p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="dropout" className="space-y-4">
            <div className="pt-4">
              <h3 className="text-sm font-medium mb-2">Student Dropout Risk Assessment</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dropoutRiskData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="grade" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="lowRisk" name="Low Risk" stackId="a" fill="#10b981" />
                  <Bar dataKey="mediumRisk" name="Medium Risk" stackId="a" fill="#f59e0b" />
                  <Bar dataKey="highRisk" name="High Risk" stackId="a" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-yellow-500" />
                  <h4 className="font-medium">AI Insight</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Grades 9 and 10 show the highest dropout risk. Our AI model has identified key factors: attendance
                  patterns, academic performance, and social engagement. Consider targeted intervention programs for
                  these grades.
                </p>
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
        <Button>View Detailed Analysis</Button>
      </CardFooter>
    </Card>
  )
}

