import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DocsSidebar } from "@/components/docs-sidebar"
import { DocsToc } from "@/components/docs-toc"
import { PageHeader } from "@/components/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  Calendar,
  MessageSquare,
  Bell,
  Users,
  BookOpen,
  ClipboardList,
  Settings,
  HelpCircle,
} from "lucide-react"

export default function DashboardOverviewPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <DocsSidebar className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block" />
        <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
          <div className="mx-auto w-full min-w-0">
            <PageHeader
              title="Dashboard Overview"
              description="Understanding the SchoolSync dashboard and its features"
              breadcrumbs={[{ title: "Dashboard Overview", href: "/dashboard-overview" }]}
            />

            <div className="flex items-center space-x-2 pt-4">
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <span>Last updated:</span>
                <time dateTime="2023-05-05">May 5, 2023</time>
              </div>
            </div>

            <div className="pb-12 pt-8">
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <h2 id="introduction">Introduction</h2>
                <p>
                  The SchoolSync dashboard is your command center for accessing all system features and getting a quick
                  overview of important information. This guide will help you understand the dashboard layout and how to
                  navigate through the various features.
                </p>

                <div className="not-prose my-6 rounded-lg border overflow-hidden">
                  <div className="bg-muted px-4 py-3 font-medium">Dashboard Preview</div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-900">
                    <div className="aspect-video rounded-lg bg-white dark:bg-slate-800 border shadow-sm p-4 flex flex-col">
                      <div className="h-12 border-b flex items-center justify-between px-4 mb-4">
                        <div className="font-bold">SchoolSync</div>
                        <div className="flex items-center gap-4">
                          <Bell className="h-5 w-5 text-slate-500" />
                          <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                        </div>
                      </div>
                      <div className="flex flex-1 gap-4">
                        <div className="w-48 border-r px-2">
                          <div className="space-y-1">
                            <div className="rounded-md bg-primary/10 text-primary px-3 py-2 text-sm font-medium">
                              Dashboard
                            </div>
                            <div className="rounded-md px-3 py-2 text-sm text-slate-500">Students</div>
                            <div className="rounded-md px-3 py-2 text-sm text-slate-500">Teachers</div>
                            <div className="rounded-md px-3 py-2 text-sm text-slate-500">Classes</div>
                            <div className="rounded-md px-3 py-2 text-sm text-slate-500">Attendance</div>
                            <div className="rounded-md px-3 py-2 text-sm text-slate-500">Grades</div>
                            <div className="rounded-md px-3 py-2 text-sm text-slate-500">Reports</div>
                            <div className="rounded-md px-3 py-2 text-sm text-slate-500">Settings</div>
                          </div>
                        </div>
                        <div className="flex-1 p-2">
                          <div className="grid grid-cols-3 gap-4 mb-4">
                            <div className="rounded-md border bg-white dark:bg-slate-800 p-3">
                              <div className="text-xs text-slate-500 mb-1">Students</div>
                              <div className="text-2xl font-bold">1,245</div>
                            </div>
                            <div className="rounded-md border bg-white dark:bg-slate-800 p-3">
                              <div className="text-xs text-slate-500 mb-1">Teachers</div>
                              <div className="text-2xl font-bold">86</div>
                            </div>
                            <div className="rounded-md border bg-white dark:bg-slate-800 p-3">
                              <div className="text-xs text-slate-500 mb-1">Classes</div>
                              <div className="text-2xl font-bold">124</div>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="rounded-md border bg-white dark:bg-slate-800 p-3 col-span-1">
                              <div className="text-sm font-medium mb-2">Attendance Today</div>
                              <div className="h-24 bg-slate-100 dark:bg-slate-700 rounded-md"></div>
                            </div>
                            <div className="rounded-md border bg-white dark:bg-slate-800 p-3 col-span-1">
                              <div className="text-sm font-medium mb-2">Recent Activity</div>
                              <div className="space-y-2">
                                <div className="text-xs text-slate-500 flex justify-between">
                                  <span>New student registered</span>
                                  <span>2m ago</span>
                                </div>
                                <div className="text-xs text-slate-500 flex justify-between">
                                  <span>Grade updated</span>
                                  <span>15m ago</span>
                                </div>
                                <div className="text-xs text-slate-500 flex justify-between">
                                  <span>New announcement</span>
                                  <span>1h ago</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <h2 id="dashboard-layout">Dashboard Layout</h2>
                <p>
                  The SchoolSync dashboard is organized into several key sections to help you quickly access information
                  and features:
                </p>

                <div className="not-prose my-6">
                  <Tabs defaultValue="navigation" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="navigation">Navigation</TabsTrigger>
                      <TabsTrigger value="quickstats">Quick Stats</TabsTrigger>
                      <TabsTrigger value="activity">Activity Feed</TabsTrigger>
                      <TabsTrigger value="widgets">Widgets</TabsTrigger>
                    </TabsList>
                    <TabsContent value="navigation" className="p-4 border rounded-md mt-2">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="p-2 rounded-md bg-primary/10">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="text-lg font-medium">Navigation Menu</h3>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        The left sidebar contains links to all major sections of SchoolSync. The menu adapts based on
                        your user role and permissions.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 p-2 rounded-md bg-muted">
                          <BarChart3 className="h-4 w-4" />
                          <span className="font-medium">Dashboard</span>
                          <Badge variant="outline" className="ml-auto">
                            All Users
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded-md">
                          <Users className="h-4 w-4" />
                          <span>Students</span>
                          <Badge variant="outline" className="ml-auto">
                            Admin, Teacher
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded-md">
                          <BookOpen className="h-4 w-4" />
                          <span>Classes</span>
                          <Badge variant="outline" className="ml-auto">
                            All Users
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded-md">
                          <ClipboardList className="h-4 w-4" />
                          <span>Attendance</span>
                          <Badge variant="outline" className="ml-auto">
                            Admin, Teacher
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded-md">
                          <MessageSquare className="h-4 w-4" />
                          <span>Messages</span>
                          <Badge variant="outline" className="ml-auto">
                            All Users
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded-md">
                          <Settings className="h-4 w-4" />
                          <span>Settings</span>
                          <Badge variant="outline" className="ml-auto">
                            All Users
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded-md">
                          <HelpCircle className="h-4 w-4" />
                          <span>Help</span>
                          <Badge variant="outline" className="ml-auto">
                            All Users
                          </Badge>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="quickstats" className="p-4 border rounded-md mt-2">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="p-2 rounded-md bg-primary/10">
                          <BarChart3 className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="text-lg font-medium">Quick Stats</h3>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        The Quick Stats section provides at-a-glance metrics relevant to your role. These cards update
                        in real-time to show the most current information.
                      </p>
                      <div className="grid grid-cols-3 gap-4">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Students</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">1,245</div>
                            <p className="text-xs text-muted-foreground">+12 this week</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">94.2%</div>
                            <p className="text-xs text-muted-foreground">+1.5% from last week</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">8</div>
                            <p className="text-xs text-muted-foreground">3 high priority</p>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>
                    <TabsContent value="activity" className="p-4 border rounded-md mt-2">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="p-2 rounded-md bg-primary/10">
                          <Bell className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="text-lg font-medium">Activity Feed</h3>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        The Activity Feed shows recent events and notifications relevant to you. Click on any item to
                        see more details or take action.
                      </p>
                      <div className="space-y-4">
                        <div className="flex gap-3 p-3 border rounded-md">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Users className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <p className="font-medium">New student registered</p>
                              <span className="text-xs text-muted-foreground">2m ago</span>
                            </div>
                            <p className="text-sm text-muted-foreground">Michael Johnson has been added to Class 10B</p>
                          </div>
                        </div>
                        <div className="flex gap-3 p-3 border rounded-md">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <BookOpen className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <p className="font-medium">Grade updated</p>
                              <span className="text-xs text-muted-foreground">15m ago</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Math test grades have been posted for Class 9A
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-3 p-3 border rounded-md">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <MessageSquare className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <p className="font-medium">New announcement</p>
                              <span className="text-xs text-muted-foreground">1h ago</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              School assembly scheduled for Friday at 9:00 AM
                            </p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="widgets" className="p-4 border rounded-md mt-2">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="p-2 rounded-md bg-primary/10">
                          <Calendar className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="text-lg font-medium">Dashboard Widgets</h3>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        Widgets provide interactive functionality and data visualization. You can customize which
                        widgets appear on your dashboard.
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Calendar</CardTitle>
                            <CardDescription>Upcoming events and deadlines</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="h-32 bg-muted rounded-md flex items-center justify-center text-sm text-muted-foreground">
                              Calendar Widget Preview
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Attendance Chart</CardTitle>
                            <CardDescription>Weekly attendance statistics</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="h-32 bg-muted rounded-md flex items-center justify-center text-sm text-muted-foreground">
                              Attendance Chart Preview
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>

                <h2 id="customizing-dashboard">Customizing Your Dashboard</h2>
                <p>
                  SchoolSync allows you to personalize your dashboard to show the information that's most relevant to
                  you:
                </p>

                <h3 id="widget-customization">Widget Customization</h3>
                <p>You can add, remove, and rearrange widgets on your dashboard:</p>
                <ol>
                  <li>Click the "Customize" button in the top-right corner of your dashboard</li>
                  <li>Drag and drop widgets to rearrange them</li>
                  <li>Click the "+" button to add new widgets from the widget library</li>
                  <li>Click the "x" on any widget to remove it</li>
                  <li>Click "Save Layout" when you're done</li>
                </ol>

                <h3 id="display-preferences">Display Preferences</h3>
                <p>Adjust how information is displayed on your dashboard:</p>
                <ol>
                  <li>Go to "Settings" from your profile dropdown</li>
                  <li>Select "Display Preferences"</li>
                  <li>Choose your preferred date format, time format, and number format</li>
                  <li>Set your default view for lists and tables</li>
                  <li>Adjust the density of information displayed</li>
                  <li>Save your preferences</li>
                </ol>

                <h2 id="role-specific-dashboards">Role-Specific Dashboards</h2>
                <p>SchoolSync provides different dashboard views based on your role in the system:</p>

                <div className="not-prose my-6 grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>Administrator Dashboard</CardTitle>
                      <CardDescription>School-wide overview and management tools</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li>Enrollment statistics</li>
                        <li>Staff management</li>
                        <li>Financial overview</li>
                        <li>System health metrics</li>
                        <li>School-wide announcements</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Teacher Dashboard</CardTitle>
                      <CardDescription>Class management and teaching tools</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li>Class schedules</li>
                        <li>Attendance tracking</li>
                        <li>Assignment management</li>
                        <li>Grade book</li>
                        <li>Student performance metrics</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Student/Parent Dashboard</CardTitle>
                      <CardDescription>Academic progress and communication</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li>Current grades</li>
                        <li>Upcoming assignments</li>
                        <li>Attendance record</li>
                        <li>Teacher communications</li>
                        <li>School announcements</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <h2 id="keyboard-shortcuts">Keyboard Shortcuts</h2>
                <p>SchoolSync offers keyboard shortcuts to help you navigate the dashboard more efficiently:</p>

                <div className="not-prose my-6 overflow-hidden rounded-lg border">
                  <div className="bg-muted px-4 py-3 font-medium">Keyboard Shortcuts</div>
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-y-2">
                      <div className="flex items-center">
                        <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
                          Alt + D
                        </kbd>
                        <span className="ml-3">Go to Dashboard</span>
                      </div>
                      <div className="flex items-center">
                        <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
                          Alt + C
                        </kbd>
                        <span className="ml-3">Go to Calendar</span>
                      </div>
                      <div className="flex items-center">
                        <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
                          Alt + M
                        </kbd>
                        <span className="ml-3">Go to Messages</span>
                      </div>
                      <div className="flex items-center">
                        <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
                          Alt + S
                        </kbd>
                        <span className="ml-3">Go to Settings</span>
                      </div>
                      <div className="flex items-center">
                        <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
                          Alt + N
                        </kbd>
                        <span className="ml-3">Create New Item</span>
                      </div>
                      <div className="flex items-center">
                        <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
                          Alt + H
                        </kbd>
                        <span className="ml-3">Show Help</span>
                      </div>
                      <div className="flex items-center">
                        <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
                          Alt + P
                        </kbd>
                        <span className="ml-3">Go to Profile</span>
                      </div>
                      <div className="flex items-center">
                        <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
                          Alt + R
                        </kbd>
                        <span className="ml-3">Refresh Data</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="not-prose my-8 flex flex-col items-center rounded-lg bg-slate-50 p-8 dark:bg-slate-800/50 md:flex-row md:justify-between">
                  <div>
                    <h3 className="text-xl font-bold">Ready to learn about user management?</h3>
                    <p className="text-slate-700 dark:text-slate-400">
                      Discover how to manage users and permissions in SchoolSync.
                    </p>
                  </div>
                  <Button className="mt-4 md:mt-0" asChild>
                    <Link href="/user-management">User Management</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <DocsToc className="hidden text-sm xl:block" />
        </main>
      </div>
    </div>
  )
}

