import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DocsSidebar } from "@/components/docs-sidebar"
import { DocsToc } from "@/components/docs-toc"
import { PageHeader } from "@/components/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Settings, Palette, Globe, Mail, Shield, FileJson, AlertTriangle, Bell, MessageSquare } from "lucide-react"
import { DocsLayout } from "@/components/docs-layout"

export default function AdvancedConfigurationPage() {
  return (
    <DocsLayout>
      <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_100px]">
        <div className="mx-auto w-full min-w-0">
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Advance Configuration</h1>

          <div className="flex items-center space-x-2 pt-4">
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <span>Last updated:</span>
              <time dateTime="2023-05-05">April 8, 2025</time>
            </div>
          </div>

          <div className="pb-12 pt-8">
            <div className="prose prose-slate dark:prose-invert max-w-none space-y-4">
              <h2 className="font-bold text-2xl" id="introduction">Introduction</h2>
              <p>
                SchoolSync offers extensive customization options to adapt the system to your school's specific
                requirements. This guide covers advanced configuration settings that allow you to tailor the platform
                to your unique needs.
              </p>

              <Alert className="my-6">
                <Settings className="h-4 w-4" />
                <AlertTitle>Administrator Access Required</AlertTitle>
                <AlertDescription>
                  Advanced configuration features require administrator privileges. If you don't have access to these
                  features, contact your system administrator.
                </AlertDescription>
              </Alert>

              <h2 className="font-bold text-2xl" id="system-settings">System Settings</h2>
              <p>
                The System Settings section allows you to configure global settings that affect the entire SchoolSync
                platform.
              </p>

              <div className="not-prose my-6">
                <Tabs defaultValue="general" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="branding">Branding</TabsTrigger>
                    <TabsTrigger value="localization">Localization</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                  </TabsList>
                  <TabsContent value="general" className="p-4 border rounded-md mt-2">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-2 rounded-md bg-primary/10">
                        <Settings className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-lg font-medium">General Settings</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">Configure basic system settings and defaults.</p>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium">School Information</h4>
                          <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li>School name and contact details</li>
                            <li>Address and location settings</li>
                            <li>School website and social media links</li>
                          </ul>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium">System Defaults</h4>
                          <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li>Default landing pages for user roles</li>
                            <li>Session timeout settings</li>
                            <li>File upload size limits</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="branding" className="p-4 border rounded-md mt-2">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-2 rounded-md bg-primary/10">
                        <Palette className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-lg font-medium">Branding Settings</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Customize the look and feel of SchoolSync to match your school's brand.
                    </p>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium">Visual Branding</h4>
                          <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li>School logo and favicon</li>
                            <li>Custom color scheme</li>
                            <li>Login page background</li>
                          </ul>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium">Content Branding</h4>
                          <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li>Custom welcome messages</li>
                            <li>Email templates and signatures</li>
                            <li>System terminology customization</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="localization" className="p-4 border rounded-md mt-2">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-2 rounded-md bg-primary/10">
                        <Globe className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-lg font-medium">Localization Settings</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Configure regional settings and language preferences.
                    </p>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium">Regional Settings</h4>
                          <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li>Default timezone</li>
                            <li>Date and time formats</li>
                            <li>Number and currency formats</li>
                          </ul>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium">Language Settings</h4>
                          <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li>Default system language</li>
                            <li>Available languages for users</li>
                            <li>Translation management</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="security" className="p-4 border rounded-md mt-2">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-2 rounded-md bg-primary/10">
                        <Shield className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-lg font-medium">Security Settings</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">Configure security policies and access controls.</p>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h4 className="font-medium">Authentication</h4>
                          <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li>Password complexity requirements</li>
                            <li>Multi-factor authentication settings</li>
                            <li>Single sign-on configuration</li>
                          </ul>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium">Access Control</h4>
                          <ul className="list-disc pl-5 space-y-1 text-sm">
                            <li>IP address restrictions</li>
                            <li>Session management</li>
                            <li>Audit logging settings</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <h2 className="font-bold text-2xl" id="academic-settings">Academic Settings</h2>
              <p>Configure settings related to academic structure, grading, and scheduling.</p>

              <h3 id="academic-structure">Academic Structure</h3>
              <p>Define your school's academic organization:</p>
              <ol>
                <li>
                  Go to "Settings" {">"} "Academic" {">"} "Structure"
                </li>
                <li>Configure departments, grade levels, and class sections</li>
                <li>Define subject areas and courses</li>
                <li>Setup academic tracks or specializations</li>
                <li>Save your changes</li>
              </ol>

              <h3 id="grading-system">Grading System</h3>
              <p>Customize your school's grading scales and calculation methods:</p>
              <ol>
                <li>
                  Go to "Settings" {">"} "Academic" {">"} "Grading"
                </li>
                <li>Define grading scales (e.g., A-F, 0-100, etc.)</li>
                <li>Set up grade point calculations</li>
                <li>Configure grade categories and weightings</li>
                <li>Define passing thresholds</li>
                <li>Save your changes</li>
              </ol>

              <div className="not-prose my-6 overflow-hidden rounded-lg border">
                <div className="bg-muted px-4 py-3 font-medium">Sample Grading Scale Configuration</div>
                <div className="p-4">
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div className="font-medium">Letter Grade</div>
                    <div className="font-medium">Percentage Range</div>
                    <div className="font-medium">Grade Points</div>
                    <div className="font-medium">Status</div>

                    <div>A+</div>
                    <div>97-100</div>
                    <div>4.0</div>
                    <div>Pass</div>

                    <div>A</div>
                    <div>93-96</div>
                    <div>4.0</div>
                    <div>Pass</div>

                    <div>A-</div>
                    <div>90-92</div>
                    <div>3.7</div>
                    <div>Pass</div>

                    <div>B+</div>
                    <div>87-89</div>
                    <div>3.3</div>
                    <div>Pass</div>

                    <div>B</div>
                    <div>83-86</div>
                    <div>3.0</div>
                    <div>Pass</div>

                    <div>B-</div>
                    <div>80-82</div>
                    <div>2.7</div>
                    <div>Pass</div>

                    <div>C+</div>
                    <div>77-79</div>
                    <div>2.3</div>
                    <div>Pass</div>

                    <div>C</div>
                    <div>73-76</div>
                    <div>2.0</div>
                    <div>Pass</div>

                    <div>C-</div>
                    <div>70-72</div>
                    <div>1.7</div>
                    <div>Pass</div>

                    <div>D+</div>
                    <div>67-69</div>
                    <div>1.3</div>
                    <div>Pass</div>

                    <div>D</div>
                    <div>63-66</div>
                    <div>1.0</div>
                    <div>Pass</div>

                    <div>D-</div>
                    <div>60-62</div>
                    <div>0.7</div>
                    <div>Pass</div>

                    <div>F</div>
                    <div>0-59</div>
                    <div>0.0</div>
                    <div>Fail</div>
                  </div>
                </div>
              </div>

              <h3 id="academic-calendar">Academic Calendar</h3>
              <p>Set up your school's academic calendar:</p>
              <ol>
                <li>
                  Go to "Settings" {">"} "Academic" {">"} "Calendar"
                </li>
                <li>Define academic years and terms</li>
                <li>Set up grading periods and report card schedules</li>
                <li>Configure school days and holidays</li>
                <li>Define class schedules and rotation cycles</li>
                <li>Save your changes</li>
              </ol>

              <div className="not-prose my-6 rounded-md bg-amber-50 p-4 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 mr-2 text-amber-600 dark:text-amber-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-amber-800 dark:text-amber-300">Important Note</p>
                    <p className="text-sm text-amber-700 dark:text-amber-400">
                      Changes to the academic calendar after the school year has started may affect existing
                      attendance records, assignments, and schedules. It's recommended to configure the calendar
                      before the academic year begins.
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="font-bold text-2xl" id="communication-settings">Communication Settings</h2>
              <p>Configure how SchoolSync handles communications between users.</p>

              <h3 id="email-configuration">Email Configuration</h3>
              <p>Set up email integration for system notifications:</p>
              <ol>
                <li>
                  Go to "Settings" {">"} "Communication" {">"} "Email"
                </li>
                <li>Configure SMTP server settings</li>
                <li>Set up sender email addresses and names</li>
                <li>Customize email templates</li>
                <li>Configure email signature</li>
                <li>Test the email configuration</li>
                <li>Save your changes</li>
              </ol>

              <h3 id="notification-settings">Notification Settings</h3>
              <p>Configure system-wide notification preferences:</p>
              <ol>
                <li>
                  Go to "Settings" {">"} "Communication" {">"} "Notifications"
                </li>
                <li>Define which events trigger notifications</li>
                <li>Configure notification channels (in-app, email, SMS)</li>
                <li>Set up default notification preferences by user role</li>
                <li>Configure notification frequency and batching</li>
                <li>Save your changes</li>
              </ol>

              <div className="not-prose my-6 grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Mail className="h-5 w-5 mr-2 text-primary" />
                      Email Notifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>Account activation and password reset</li>
                      <li>Grade updates and report cards</li>
                      <li>Attendance alerts</li>
                      <li>Assignment deadlines</li>
                      <li>School announcements</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Bell className="h-5 w-5 mr-2 text-primary" />
                      In-App Notifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>New messages and comments</li>
                      <li>Assignment submissions</li>
                      <li>Calendar events and reminders</li>
                      <li>System updates and maintenance</li>
                      <li>Task assignments and completions</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MessageSquare className="h-5 w-5 mr-2 text-primary" />
                      SMS Notifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li>Emergency alerts</li>
                      <li>Attendance issues</li>
                      <li>Critical grade updates</li>
                      <li>School closures</li>
                      <li>Important deadline reminders</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <h2 className="font-bold text-2xl" id="integration-settings">Integration Settings</h2>
              <p>Configure integrations with third-party systems and services.</p>

              <h3 id="api-configuration">API Configuration</h3>
              <p>Set up API access for external integrations:</p>
              <ol>
                <li>
                  Go to "Settings" {">"} "Integrations" {">"} "API"
                </li>
                <li>Enable or disable the API</li>
                <li>Generate API keys</li>
                <li>Configure API rate limits and access controls</li>
                <li>View API documentation</li>
                <li>Save your changes</li>
              </ol>

              <div className="not-prose my-6 overflow-hidden rounded-lg border">
                <div className="flex items-center border-b bg-muted px-4">
                  <div className="flex h-10 items-center gap-2">
                    <button className="rounded border border-slate-300 bg-slate-50 px-3 py-1 text-sm dark:border-slate-700 dark:bg-slate-800">
                      JSON
                    </button>
                  </div>
                </div>
                <div className="relative overflow-auto p-4">
                  <pre className="text-sm">
                    <code className="language-json">{`{
  "api_key": "YOUR_API_KEY",
  "endpoint": "https://api.schoolsync.example.com/v1",
  "rate_limit": {
    "requests_per_minute": 60,
    "burst": 10
  },
  "allowed_origins": [
    "https://your-school-website.edu",
    "https://your-app.example.com"
  ],
  "scopes": [
    "read:students",
    "read:classes",
    "write:attendance"
  ]
}`}</code>
                  </pre>
                </div>
              </div>

              <h3 id="third-party-services">Third-Party Service Integrations</h3>
              <p>Configure integrations with external services:</p>
              <ol>
                <li>
                  Go to "Settings" {">"} "Integrations" {">"} "Services"
                </li>
                <li>Select the service you want to integrate (Google Workspace, Microsoft 365, etc.)</li>
                <li>Follow the service-specific configuration steps</li>
                <li>Test the integration</li>
                <li>Save your changes</li>
              </ol>

              <h2 className="font-bold text-2xl" id="backup-restore">Backup and Restore</h2>
              <p>Configure data backup and restore settings:</p>
              <ol>
                <li>
                  Go to "Settings" {">"} "System" {">"} "Backup & Restore"
                </li>
                <li>Configure automatic backup schedule</li>
                <li>Select backup storage location (local, cloud, etc.)</li>
                <li>Set backup retention policy</li>
                <li>Configure backup encryption</li>
                <li>Test backup and restore procedures</li>
                <li>Save your changes</li>
              </ol>

              <div className="not-prose my-6 rounded-md bg-slate-50 p-4 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <div className="flex items-start">
                  <FileJson className="h-5 w-5 mr-2 text-slate-600 dark:text-slate-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-slate-800 dark:text-slate-300">Best Practice</p>
                    <p className="text-sm text-slate-700 dark:text-slate-400">
                      We recommend scheduling daily backups and storing them in at least two different locations
                      (e.g., local server and cloud storage). Test your restore process regularly to ensure your
                      backup strategy is effective.
                    </p>
                  </div>
                </div>
              </div>

              <div className="not-prose my-8 flex flex-col items-center rounded-lg bg-slate-50 p-8 dark:bg-slate-800/50 md:flex-row md:justify-between">
                <div>
                  <h3 className="text-xl font-bold">Ready to learn about custom fields?</h3>
                  <p className="text-slate-700 dark:text-slate-400">
                    Discover how to extend SchoolSync with custom data fields.
                  </p>
                </div>
                <Button className="mt-4 md:mt-0" asChild>
                  <Link href="/custom-fields">Custom Fields</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </DocsLayout>
  )
}

