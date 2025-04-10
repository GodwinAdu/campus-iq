"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Brain, ChevronRight, Lightbulb, TrendingDown, TrendingUp } from "lucide-react"

export function AiInsights() {
    return (
        <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border-purple-200 dark:border-purple-800">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Brain className="h-5 w-5 text-purple-500" />
                        <CardTitle>AI Insights & Recommendations</CardTitle>
                    </div>
                    <Badge variant="outline" className="bg-white/50 dark:bg-black/20">
                        Powered by AI
                    </Badge>
                </div>
                <CardDescription>Actionable insights based on your school's data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-sm font-medium">Attendance Trend</CardTitle>
                                <TrendingDown className="h-4 w-4 text-red-500" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Grade 10B attendance has dropped by 8% in the last two weeks. Consider scheduling a parent-teacher
                                meeting.
                            </p>
                            <Button variant="link" className="p-0 h-auto mt-2 text-xs flex items-center">
                                View detailed analysis
                                <ChevronRight className="h-3 w-3 ml-1" />
                            </Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-sm font-medium">Performance Insight</CardTitle>
                                <TrendingUp className="h-4 w-4 text-green-500" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Science scores have improved by 12% after the new lab equipment was introduced. Consider expanding the
                                program.
                            </p>
                            <Button variant="link" className="p-0 h-auto mt-2 text-xs flex items-center">
                                View detailed analysis
                                <ChevronRight className="h-3 w-3 ml-1" />
                            </Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-sm font-medium">Resource Optimization</CardTitle>
                                <Lightbulb className="h-4 w-4 text-yellow-500" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                Computer lab utilization is at 35%. Consider rescheduling classes to optimize resource usage.
                            </p>
                            <Button variant="link" className="p-0 h-auto mt-2 text-xs flex items-center">
                                View recommendation
                                <ChevronRight className="h-3 w-3 ml-1" />
                            </Button>
                        </CardContent>
                    </Card>
                </div>
                <Button variant="outline" className="w-full">
                    View All AI Insights
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
            </CardContent>
        </Card>
    )
}

