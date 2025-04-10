"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Link, Plus, RefreshCw } from "lucide-react"

export function IntegrationHub() {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>Integration Hub</CardTitle>
                    <Button variant="outline" size="sm" className="gap-1">
                        <Plus className="h-4 w-4" />
                        Add Integration
                    </Button>
                </div>
                <CardDescription>Connect with other systems and services</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-sm font-medium">Student Information System</CardTitle>
                                <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                                    Connected
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="pb-2">
                            <p className="text-xs text-muted-foreground">
                                Student records are syncing automatically every 30 minutes.
                            </p>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="ghost" size="sm" className="h-8 gap-1">
                                <RefreshCw className="h-3 w-3" />
                                Sync Now
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8">
                                Configure
                            </Button>
                        </CardFooter>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-sm font-medium">Learning Management System</CardTitle>
                                <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                                    Connected
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="pb-2">
                            <p className="text-xs text-muted-foreground">
                                Course data and grades are syncing automatically every hour.
                            </p>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="ghost" size="sm" className="h-8 gap-1">
                                <RefreshCw className="h-3 w-3" />
                                Sync Now
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8">
                                Configure
                            </Button>
                        </CardFooter>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-sm font-medium">Financial System</CardTitle>
                                <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                                    Connected
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="pb-2">
                            <p className="text-xs text-muted-foreground">Fee data and payment records sync automatically daily.</p>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="ghost" size="sm" className="h-8 gap-1">
                                <RefreshCw className="h-3 w-3" />
                                Sync Now
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8">
                                Configure
                            </Button>
                        </CardFooter>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-sm font-medium">Library Management</CardTitle>
                                <Badge
                                    variant="outline"
                                    className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                                >
                                    Setup Required
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="pb-2">
                            <p className="text-xs text-muted-foreground">
                                Connect to track book checkouts and returns automatically.
                            </p>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="ghost" size="sm" className="h-8 gap-1">
                                <Link className="h-3 w-3" />
                                Connect
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8">
                                Learn More
                            </Button>
                        </CardFooter>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-sm font-medium">Parent Portal</CardTitle>
                                <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                                    Connected
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="pb-2">
                            <p className="text-xs text-muted-foreground">
                                Parent communication and notifications are syncing in real-time.
                            </p>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="ghost" size="sm" className="h-8 gap-1">
                                <RefreshCw className="h-3 w-3" />
                                Sync Now
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8">
                                Configure
                            </Button>
                        </CardFooter>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-sm font-medium">HR System</CardTitle>
                                <Badge
                                    variant="outline"
                                    className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                                >
                                    Setup Required
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="pb-2">
                            <p className="text-xs text-muted-foreground">
                                Connect to manage staff records and attendance automatically.
                            </p>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button variant="ghost" size="sm" className="h-8 gap-1">
                                <Link className="h-3 w-3" />
                                Connect
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8">
                                Learn More
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </CardContent>
            <CardFooter>
                <div className="w-full bg-muted/50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <h4 className="font-medium text-sm">Data Synchronization Status</h4>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        All systems are syncing correctly. Last successful sync: 15 minutes ago. 5 integrations active, 2 pending
                        setup.
                    </p>
                </div>
            </CardFooter>
        </Card>
    )
}

