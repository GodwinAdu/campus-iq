import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DocsSidebar } from "@/components/docs-sidebar"
import { DocsToc } from "@/components/docs-toc"
import { PageHeader } from "@/components/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Clock, Lightbulb, AlertTriangle } from "lucide-react"
import { DocsLayout } from "@/components/docs-layout"

export default function QuickStartGuidePage() {
  return (
    <DocsLayout>
        <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_100px]">
          <div className="mx-auto w-full min-w-0">
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Quick Start Guide</h1>

            <div className="flex items-center space-x-2 pt-4">
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <span>Last updated:</span>
                <time dateTime="2023-05-05">April 8, 2025</time>
              </div>
            </div>

            <div className="pb-12 pt-8">
              <div className="prose prose-slate dark:prose-invert max-w-none space-y-4">
                <div className="flex items-center space-x-2 rounded-md bg-primary/10 p-4 mb-6">
                  <Clock className="h-5 w-5 text-primary" />
                  <p className="m-0 text-sm">
                    This guide will take approximately <strong>15 minutes</strong> to complete.
                  </p>
                </div>

                <h2 className="font-bold text-2xl" id="overview">Overview</h2>
                <p>
                  This quick start guide will help you get up and running with CampusIQ quickly. We'll cover the
                  essential features you need to know to start using the system effectively.
                </p>

                <div className="not-prose my-6">
                  <Tabs defaultValue="admin" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="admin">Administrators</TabsTrigger>
                      <TabsTrigger value="teacher">Teachers</TabsTrigger>
                      <TabsTrigger value="parent">Parents/Students</TabsTrigger>
                    </TabsList>
                    <TabsContent value="admin" className="p-4 border rounded-md mt-2">
                      <h3 className="text-lg font-medium mb-2">For Administrators</h3>
                      <p className="text-muted-foreground mb-4">
                        Follow these steps to set up your school in CampusIQ.
                      </p>
                      <ol className="space-y-2 ml-4 list-decimal">
                        <li>Complete the initial setup wizard</li>
                        <li>Import staff and student data</li>
                        <li>Configure academic calendar and grading periods</li>
                        <li>Set up user roles and permissions</li>
                        <li>Customize school settings and branding</li>
                      </ol>
                    </TabsContent>
                    <TabsContent value="teacher" className="p-4 border rounded-md mt-2">
                      <h3 className="text-lg font-medium mb-2">For Teachers</h3>
                      <p className="text-muted-foreground mb-4">
                        Get started with classroom management and teaching tools.
                      </p>
                      <ol className="space-y-2 ml-4 list-decimal">
                        <li>Set up your teacher profile</li>
                        <li>Create and organize your classes</li>
                        <li>Take attendance and record grades</li>
                        <li>Communicate with students and parents</li>
                        <li>Create and share assignments</li>
                      </ol>
                    </TabsContent>
                    <TabsContent value="parent" className="p-4 border rounded-md mt-2">
                      <h3 className="text-lg font-medium mb-2">For Parents/Students</h3>
                      <p className="text-muted-foreground mb-4">Learn how to access and use CampusIQ features.</p>
                      <ol className="space-y-2 ml-4 list-decimal">
                        <li>Activate your account using the invitation email</li>
                        <li>Set up your profile and preferences</li>
                        <li>View grades, attendance, and assignments</li>
                        <li>Communicate with teachers</li>
                        <li>Set up notifications for important updates</li>
                      </ol>
                    </TabsContent>
                  </Tabs>
                </div>

                <h2 className="font-bold text-2xl" id="first-login">First Login</h2>
                <p>
                  After your account has been created, you'll receive an email with login instructions. Follow these
                  steps to access CampusIQ for the first time:
                </p>

                <ol>
                  <li>Click the link in your invitation email</li>
                  <li>Create a secure password</li>
                  <li>Complete your user profile</li>
                  <li>Review and accept the terms of service</li>
                  <li>Complete the optional guided tour</li>
                </ol>

                <div className="not-prose my-6 grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center">
                        <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
                        Do This
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 ml-4 list-disc">
                        <li>Use a strong, unique password</li>
                        <li>Complete your profile with accurate information</li>
                        <li>Take the guided tour to learn the interface</li>
                        <li>Bookmark the login page for easy access</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center">
                        <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
                        Avoid This
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 ml-4 list-disc">
                        <li>Using simple or reused passwords</li>
                        <li>Skipping the profile setup</li>
                        <li>Sharing your login credentials</li>
                        <li>Leaving your account logged in on public computers</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <h2 className="font-bold text-2xl" id="dashboard-overview">Dashboard Overview</h2>
                <p>
                  The dashboard is your central hub for accessing all CampusIQ features. Here's a quick overview of
                  what you'll find:
                </p>

                <div className="not-prose my-6 overflow-hidden rounded-lg border">
                  <div className="bg-muted px-4 py-3 font-medium">Dashboard Elements</div>
                  <div className="p-4 grid gap-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-md">
                        <span className="font-mono">1</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Navigation Menu</h4>
                        <p className="text-sm text-muted-foreground">
                          Access all system features from the left sidebar
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-md">
                        <span className="font-mono">2</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Quick Stats</h4>
                        <p className="text-sm text-muted-foreground">View key metrics and information at a glance</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-md">
                        <span className="font-mono">3</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Recent Activity</h4>
                        <p className="text-sm text-muted-foreground">See the latest updates and notifications</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-md">
                        <span className="font-mono">4</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Quick Actions</h4>
                        <p className="text-sm text-muted-foreground">Perform common tasks with a single click</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-md">
                        <span className="font-mono">5</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Calendar</h4>
                        <p className="text-sm text-muted-foreground">View upcoming events and deadlines</p>
                      </div>
                    </div>
                  </div>
                </div>

                <h2 className="font-bold text-2xl" id="essential-tasks">Essential Tasks</h2>
                <p>Here are some essential tasks you'll want to perform to get the most out of CampusIQ:</p>

                <h3 className="font-bold text-xl" id="profile-setup">Profile Setup</h3>
                <p>Complete your profile to ensure all your information is up-to-date:</p>
                <ol>
                  <li>Click on your profile picture in the top-right corner</li>
                  <li>Select "Profile Settings" from the dropdown menu</li>
                  <li>Fill in your personal information, contact details, and preferences</li>
                  <li>Upload a profile picture (optional but recommended)</li>
                  <li>Save your changes</li>
                </ol>

                <h3 className="font-bold text-xl" id="notification-settings">Notification Settings</h3>
                <p>Configure your notification preferences to stay informed about important updates:</p>
                <ol>
                  <li>Go to "Settings" from your profile dropdown</li>
                  <li>Select "Notifications" from the sidebar</li>
                  <li>Choose which notifications you want to receive via email, SMS, or in-app</li>
                  <li>Set your preferred notification frequency</li>
                  <li>Save your preferences</li>
                </ol>

                <div className="not-prose my-6 rounded-md bg-amber-50 p-4 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800">
                  <div className="flex items-start">
                    <Lightbulb className="h-5 w-5 mr-2 text-amber-600 dark:text-amber-400 mt-0.5" />
                    <div>
                      <p className="font-medium text-amber-800 dark:text-amber-300">Pro Tip</p>
                      <p className="text-sm text-amber-700 dark:text-amber-400">
                        We recommend enabling email notifications for critical updates such as grade changes, attendance
                        issues, and important announcements, even if you prefer to receive most notifications in-app.
                      </p>
                    </div>
                  </div>
                </div>

                <h2 className="font-bold text-2xl" id="next-steps">Next Steps</h2>
                <p>Now that you're familiar with the basics, here are some next steps to explore:</p>

                <div className="not-prose my-6 grid gap-4 md:grid-cols-3">
                  <Link href="/documentation/dashboard-overview" className="block">
                    <Card className="h-full transition-colors hover:bg-muted/50">
                      <CardHeader>
                        <CardTitle>Dashboard Overview</CardTitle>
                        <CardDescription>Learn about all dashboard features</CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>

                  <Link href="/documentation/user-management" className="block">
                    <Card className="h-full transition-colors hover:bg-muted/50">
                      <CardHeader>
                        <CardTitle>User Management</CardTitle>
                        <CardDescription>Manage users and permissions</CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>

                  <Link href="/documentation/advanced-configuration" className="block">
                    <Card className="h-full transition-colors hover:bg-muted/50">
                      <CardHeader>
                        <CardTitle>Advanced Configuration</CardTitle>
                        <CardDescription>Customize CampusIQ for your needs</CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                </div>

                <div className="not-prose my-8 flex flex-col items-center rounded-lg bg-slate-50 p-8 dark:bg-slate-800/50 md:flex-row md:justify-between">
                  <div>
                    <h3 className="text-xl font-bold">Ready to explore the dashboard?</h3>
                    <p className="text-slate-700 dark:text-slate-400">
                      Learn about all the features available on your dashboard.
                    </p>
                  </div>
                  <Button className="mt-4 md:mt-0" asChild>
                    <Link href="/documentation/dashboard-overview">Dashboard Overview</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
     </DocsLayout>
  )
}

