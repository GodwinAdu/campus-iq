import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Search,
  FileText,
  RefreshCw,
  Database,
  Lock,
  Users,
  Settings,
  Wifi,
  Laptop,
  Server,
} from "lucide-react"
import { DocsLayout } from "@/components/docs-layout"
import { PageHeader } from "@/components/page-header"
import { Callout } from "@/components/callout"
import CodeBlock from "@/components/code-block"

export default function TroubleshootingPage() {
  return (
    <DocsLayout>
      <div className="space-y-8">
        <PageHeader
          title="Troubleshooting"
          description="Diagnose and resolve common issues with SchoolSync"
          breadcrumbs={[{ title: "Troubleshooting", href: "/troubleshooting" }]}
        />

        <div className="flex items-center space-x-2 pt-4">
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <span>Last updated:</span>
            <time dateTime="2023-05-05">May 5, 2023</time>
          </div>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <div className="not-prose mb-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                type="search"
                placeholder="Search troubleshooting topics..."
                className="w-full pl-10 py-2 border rounded-md bg-background"
              />
            </div>
          </div>

          <div className="not-prose grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
                  Common Issues
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Quick solutions to the most frequently reported problems.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href="#common-issues">View Common Issues</a>
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-primary" />
                  Error Messages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Explanations and solutions for specific error messages.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href="#error-messages">View Error Messages</a>
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <HelpCircle className="h-5 w-5 mr-2 text-primary" />
                  Diagnostic Tools
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Tools to help identify and resolve complex issues.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href="#diagnostic-tools">View Diagnostic Tools</a>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <h2 id="common-issues" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Common Issues
          </h2>
          <p>The following are solutions to the most frequently reported issues with SchoolSync.</p>

          <div className="not-prose my-6">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="login">Login Issues</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="data">Data & Reports</TabsTrigger>
                <TabsTrigger value="integration">Integration</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="p-4 border rounded-md mt-2">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2 flex items-center">
                      <Lock className="h-5 w-5 mr-2 text-primary" />
                      Forgotten Password
                    </h3>
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        If you've forgotten your password, you can reset it using the "Forgot Password" link on the
                        login page.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-muted p-4 rounded-md">
                          <h4 className="font-medium flex items-center">
                            <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                            Steps to Reset Password
                          </h4>
                          <ol className="mt-2 space-y-2 text-sm">
                            <li>1. Click the "Forgot Password" link on the login page</li>
                            <li>2. Enter your email address</li>
                            <li>3. Check your email for a password reset link</li>
                            <li>4. Click the link and follow the instructions to create a new password</li>
                          </ol>
                        </div>
                        <div className="bg-muted p-4 rounded-md">
                          <h4 className="font-medium flex items-center">
                            <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                            Troubleshooting
                          </h4>
                          <ul className="mt-2 space-y-2 text-sm">
                            <li>• If you don't receive the email, check your spam folder</li>
                            <li>• Verify that you're using the correct email address</li>
                            <li>• Password reset links expire after 24 hours</li>
                            <li>• Contact your administrator if you continue to have issues</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2 flex items-center">
                      <Lock className="h-5 w-5 mr-2 text-primary" />
                      Account Locked
                    </h3>
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        Your account may be temporarily locked after multiple failed login attempts.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-muted p-4 rounded-md">
                          <h4 className="font-medium flex items-center">
                            <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                            How to Unlock Your Account
                          </h4>
                          <ul className="mt-2 space-y-2 text-sm">
                            <li>• Wait 30 minutes for the account to automatically unlock</li>
                            <li>• Use the "Forgot Password" link to reset your password</li>
                            <li>• Contact your system administrator for immediate assistance</li>
                          </ul>
                        </div>
                        <div className="bg-muted p-4 rounded-md">
                          <h4 className="font-medium flex items-center">
                            <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                            Prevention
                          </h4>
                          <ul className="mt-2 space-y-2 text-sm">
                            <li>• Use a password manager to avoid typing errors</li>
                            <li>• Ensure Caps Lock is not enabled when typing your password</li>
                            <li>• Reset your password if you're unsure about it</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2 flex items-center">
                      <Users className="h-5 w-5 mr-2 text-primary" />
                      Single Sign-On (SSO) Issues
                    </h3>
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        If you're experiencing issues with Single Sign-On (SSO), try these solutions.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-muted p-4 rounded-md">
                          <h4 className="font-medium flex items-center">
                            <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                            Common Solutions
                          </h4>
                          <ul className="mt-2 space-y-2 text-sm">
                            <li>• Ensure you're using the correct identity provider</li>
                            <li>• Clear your browser cookies and cache</li>
                            <li>• Try using a different browser</li>
                            <li>• Check if your SSO credentials are valid for other services</li>
                          </ul>
                        </div>
                        <div className="bg-muted p-4 rounded-md">
                          <h4 className="font-medium flex items-center">
                            <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                            When to Contact IT
                          </h4>
                          <ul className="mt-2 space-y-2 text-sm">
                            <li>• If you receive an "Invalid Configuration" error</li>
                            <li>• If multiple users are experiencing the same issue</li>
                            <li>• If the SSO login page doesn't load</li>
                            <li>• If you're redirected to an error page after login</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="performance" className="p-4 border rounded-md mt-2">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2 flex items-center">
                      <Laptop className="h-5 w-5 mr-2 text-primary" />
                      Slow Page Loading
                    </h3>
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        If pages are loading slowly or timing out, try these solutions.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-muted p-4 rounded-md">
                          <h4 className="font-medium flex items-center">
                            <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                            Client-Side Solutions
                          </h4>
                          <ul className="mt-2 space-y-2 text-sm">
                            <li>• Clear your browser cache and cookies</li>
                            <li>• Try using a different browser</li>
                            <li>• Disable browser extensions that might interfere</li>
                            <li>• Check your internet connection speed</li>
                            <li>• Restart your browser or device</li>
                          </ul>
                        </div>
                        <div className="bg-muted p-4 rounded-md">
                          <h4 className="font-medium flex items-center">
                            <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                            When to Report
                          </h4>
                          <ul className="mt-2 space-y-2 text-sm">
                            <li>• If the issue persists across different devices</li>
                            <li>• If multiple users are experiencing the same problem</li>
                            <li>• If the issue occurs only with specific pages</li>
                            <li>• If you notice a sudden change in performance</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2 flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-primary" />
                      Report Generation Timeouts
                    </h3>
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        Large or complex reports may time out during generation. Here's how to address this issue.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-muted p-4 rounded-md">
                          <h4 className="font-medium flex items-center">
                            <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                            Optimization Strategies
                          </h4>
                          <ul className="mt-2 space-y-2 text-sm">
                            <li>• Narrow the report criteria to reduce data volume</li>
                            <li>• Break large reports into smaller, more focused reports</li>
                            <li>• Schedule reports to run during off-peak hours</li>
                            <li>• Remove unnecessary columns or calculations</li>
                            <li>• Export raw data and process it externally if needed</li>
                          </ul>
                        </div>
                        <div className="bg-muted p-4 rounded-md">
                          <h4 className="font-medium flex items-center">
                            <Settings className="h-4 w-4 mr-2 text-primary" />
                            Advanced Options
                          </h4>
                          <ul className="mt-2 space-y-2 text-sm">
                            <li>• Use the "Background Processing" option for large reports</li>
                            <li>• Enable "Paginated Output" for better performance</li>
                            <li>• Consider using the API for custom report generation</li>
                            <li>• Request a temporary increase in report timeout limits</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2 flex items-center">
                      <Wifi className="h-5 w-5 mr-2 text-primary" />
                      Browser Compatibility
                    </h3>
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        SchoolSync works best with modern browsers. If you're experiencing issues, your browser might be
                        the cause.
                      </p>
                      <div className="bg-muted p-4 rounded-md">
                        <h4 className="font-medium">Supported Browsers</h4>
                        <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="font-medium">Chrome</p>
                            <p className="text-muted-foreground">Version 90+</p>
                          </div>
                          <div>
                            <p className="font-medium">Firefox</p>
                            <p className="text-muted-foreground">Version 88+</p>
                          </div>
                          <div>
                            <p className="font-medium">Safari</p>
                            <p className="text-muted-foreground">Version 14+</p>
                          </div>
                          <div>
                            <p className="font-medium">Edge</p>
                            <p className="text-muted-foreground">Version 90+</p>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center">
                          <XCircle className="h-4 w-4 mr-2 text-red-500" />
                          <p className="text-sm">Internet Explorer is not supported</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="data" className="p-4 border rounded-md mt-2">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2 flex items-center">
                      <Database className="h-5 w-5 mr-2 text-primary" />
                      Import Validation Errors
                    </h3>
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        Data import failures are often caused by validation errors in the import file.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-muted p-4 rounded-md">
                          <h4 className="font-medium flex items-center">
                            <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                            Common Solutions
                          </h4>
                          <ul className="mt-2 space-y-2 text-sm">
                            <li>• Download and use the latest import template</li>
                            <li>• Ensure all required fields are populated</li>
                            <li>• Check for formatting issues (dates, numbers, etc.)</li>
                            <li>• Remove special characters from text fields</li>
                            <li>• Verify that referenced IDs exist in the system</li>
                          </ul>
                        </div>
                        <div className="bg-muted p-4 rounded-md">
                          <h4 className="font-medium flex items-center">
                            <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                            Troubleshooting
                          </h4>
                          <ul className="mt-2 space-y-2 text-sm">
                            <li>• Review the error log for specific validation errors</li>
                            <li>• Try importing a small batch to identify issues</li>
                            <li>• Use the "Validate Only" option before importing</li>
                            <li>• Check for duplicate records in your import file</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2 flex items-center">
                      <RefreshCw className="h-5 w-5 mr-2 text-primary" />
                      Data Synchronization Issues
                    </h3>
                    <div className="space-y-4" />
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2 flex items-center">
                      <RefreshCw className="h-5 w-5 mr-2 text-primary" />
                      Data Synchronization Issues
                    </h3>
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        If data isn't syncing properly between different parts of the system or with external
                        integrations, try these solutions.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-muted p-4 rounded-md">
                          <h4 className="font-medium flex items-center">
                            <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                            Troubleshooting Steps
                          </h4>
                          <ul className="mt-2 space-y-2 text-sm">
                            <li>• Check the sync logs for specific error messages</li>
                            <li>• Verify that integration credentials are valid</li>
                            <li>• Ensure that required permissions are granted</li>
                            <li>• Try manually triggering a sync operation</li>
                            <li>• Check for network connectivity issues</li>
                          </ul>
                        </div>
                        <div className="bg-muted p-4 rounded-md">
                          <h4 className="font-medium flex items-center">
                            <Settings className="h-4 w-4 mr-2 text-primary" />
                            Advanced Solutions
                          </h4>
                          <ul className="mt-2 space-y-2 text-sm">
                            <li>• Reset the sync state for problematic records</li>
                            <li>• Check for data format incompatibilities</li>
                            <li>• Verify field mappings in integration settings</li>
                            <li>• Contact the third-party service provider</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2 flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-primary" />
                      Missing or Incorrect Data
                    </h3>
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        If you notice missing or incorrect data in reports or displays, here's how to address it.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-muted p-4 rounded-md">
                          <h4 className="font-medium flex items-center">
                            <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                            Investigation Steps
                          </h4>
                          <ul className="mt-2 space-y-2 text-sm">
                            <li>• Check if the data exists in the source records</li>
                            <li>• Verify user permissions for the data in question</li>
                            <li>• Look for filters that might be excluding the data</li>
                            <li>• Check for recent changes to report definitions</li>
                            <li>• Verify that calculations are configured correctly</li>
                          </ul>
                        </div>
                        <div className="bg-muted p-4 rounded-md">
                          <h4 className="font-medium flex items-center">
                            <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                            When to Report
                          </h4>
                          <ul className="mt-2 space-y-2 text-sm">
                            <li>• If data is missing from multiple reports</li>
                            <li>• If calculations produce unexpected results</li>
                            <li>• If data appears to be corrupted</li>
                            <li>• If historical data has changed unexpectedly</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="integration" className="p-4 border rounded-md mt-2">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2 flex items-center">
                      <Server className="h-5 w-5 mr-2 text-primary" />
                      API Authentication Errors
                    </h3>
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        If you're experiencing API authentication issues, try these solutions.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-muted p-4 rounded-md">
                          <h4 className="font-medium flex items-center">
                            <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                            Common Solutions
                          </h4>
                          <ul className="mt-2 space-y-2 text-sm">
                            <li>• Verify that your API key is valid and not expired</li>
                            <li>• Check that you're using the correct authentication method</li>
                            <li>• Ensure the API key has the necessary permissions</li>
                            <li>• Verify that the API key is being sent in the correct header</li>
                          </ul>
                        </div>
                        <div className="bg-muted p-4 rounded-md">
                          <h4 className="font-medium">Example API Request</h4>
                          <CodeBlock
                            code={`// Correct API authentication
fetch('https://api.schoolsync.example.com/v1/students', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'your_api_key_here'
  }
})`}
                            language="javascript"
                            showLineNumbers={false}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2 flex items-center">
                      <Server className="h-5 w-5 mr-2 text-primary" />
                      Webhook Delivery Failures
                    </h3>
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        If webhooks aren't being delivered to your endpoint, try these troubleshooting steps.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-muted p-4 rounded-md">
                          <h4 className="font-medium flex items-center">
                            <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                            Troubleshooting Steps
                          </h4>
                          <ul className="mt-2 space-y-2 text-sm">
                            <li>• Ensure your webhook endpoint is publicly accessible</li>
                            <li>• Verify that your endpoint responds with a 200 status code</li>
                            <li>• Check that your endpoint responds within the timeout period</li>
                            <li>• Review webhook logs for specific error messages</li>
                            <li>• Test your endpoint with a webhook simulator</li>
                          </ul>
                        </div>
                        <div className="bg-muted p-4 rounded-md">
                          <h4 className="font-medium flex items-center">
                            <Settings className="h-4 w-4 mr-2 text-primary" />
                            Advanced Solutions
                          </h4>
                          <ul className="mt-2 space-y-2 text-sm">
                            <li>• Implement proper signature verification</li>
                            <li>• Add logging to your webhook handler</li>
                            <li>• Set up a test endpoint for debugging</li>
                            <li>• Consider using a webhook relay service</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2 flex items-center">
                      <RefreshCw className="h-5 w-5 mr-2 text-primary" />
                      Third-Party Integration Issues
                    </h3>
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        If you're having trouble with third-party integrations, try these solutions.
                      </p>
                      <div className="bg-muted p-4 rounded-md">
                        <h4 className="font-medium">Common Integration Issues</h4>
                        <div className="mt-2 space-y-4 text-sm">
                          <div>
                            <p className="font-medium">Authentication Problems</p>
                            <ul className="list-disc list-inside ml-4">
                              <li>Verify credentials are current and correct</li>
                              <li>Check if the integration requires re-authorization</li>
                              <li>Ensure OAuth tokens haven't expired</li>
                            </ul>
                          </div>
                          <div>
                            <p className="font-medium">Data Mapping Issues</p>
                            <ul className="list-disc list-inside ml-4">
                              <li>Verify field mappings in integration settings</li>
                              <li>Check for required fields that might be missing</li>
                              <li>Look for data format incompatibilities</li>
                            </ul>
                          </div>
                          <div>
                            <p className="font-medium">Service Availability</p>
                            <ul className="list-disc list-inside ml-4">
                              <li>Check the third-party service status page</li>
                              <li>Verify network connectivity to the service</li>
                              <li>Contact the service provider for known issues</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <h2 id="error-messages" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Error Messages
          </h2>
          <p>
            This section provides explanations and solutions for specific error messages you might encounter in
            SchoolSync.
          </p>

          <div className="not-prose my-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="error-1">
                <AccordionTrigger>
                  <div className="flex items-center">
                    <Badge className="mr-2 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">Error 1001</Badge>
                    <span>Authentication Failed</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      This error occurs when the system cannot authenticate your credentials.
                    </p>
                    <div className="bg-muted p-4 rounded-md">
                      <h4 className="font-medium">Possible Causes</h4>
                      <ul className="mt-2 space-y-1 text-sm">
                        <li>• Incorrect username or password</li>
                        <li>• Account has been locked due to too many failed attempts</li>
                        <li>• Account has been deactivated by an administrator</li>
                        <li>• SSO configuration issue</li>
                      </ul>
                    </div>
                    <div className="bg-muted p-4 rounded-md">
                      <h4 className="font-medium">Solutions</h4>
                      <ul className="mt-2 space-y-1 text-sm">
                        <li>• Verify your username and password</li>
                        <li>• Use the "Forgot Password" link to reset your password</li>
                        <li>• Wait 30 minutes if your account is locked</li>
                        <li>• Contact your administrator to check your account status</li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="error-2">
                <AccordionTrigger>
                  <div className="flex items-center">
                    <Badge className="mr-2 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">Error 2003</Badge>
                    <span>Permission Denied</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      This error occurs when you attempt to access a resource or perform an action that requires
                      permissions you don't have.
                    </p>
                    <div className="bg-muted p-4 rounded-md">
                      <h4 className="font-medium">Possible Causes</h4>
                      <ul className="mt-2 space-y-1 text-sm">
                        <li>• Your user role doesn't have the required permissions</li>
                        <li>• You're trying to access data outside your assigned scope</li>
                        <li>• A specific permission has been revoked</li>
                        <li>• The resource has restricted access</li>
                      </ul>
                    </div>
                    <div className="bg-muted p-4 rounded-md">
                      <h4 className="font-medium">Solutions</h4>
                      <ul className="mt-2 space-y-1 text-sm">
                        <li>• Contact your administrator to request the necessary permissions</li>
                        <li>• Check if you're accessing the correct resource</li>
                        <li>• Verify that you're logged in with the appropriate account</li>
                        <li>• If you believe this is an error, provide details to your administrator</li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="error-3">
                <AccordionTrigger>
                  <div className="flex items-center">
                    <Badge className="mr-2 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">Error 3005</Badge>
                    <span>Data Validation Error</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      This error occurs when the data you're trying to save or import doesn't meet the system's
                      validation requirements.
                    </p>
                    <div className="bg-muted p-4 rounded-md">
                      <h4 className="font-medium">Possible Causes</h4>
                      <ul className="mt-2 space-y-1 text-sm">
                        <li>• Missing required fields</li>
                        <li>• Invalid data format (e.g., incorrect date format)</li>
                        <li>• Value outside of acceptable range</li>
                        <li>• Duplicate unique values</li>
                        <li>• Reference to non-existent records</li>
                      </ul>
                    </div>
                    <div className="bg-muted p-4 rounded-md">
                      <h4 className="font-medium">Solutions</h4>
                      <ul className="mt-2 space-y-1 text-sm">
                        <li>• Review the specific validation errors in the error message</li>
                        <li>• Correct the data according to the validation requirements</li>
                        <li>• For imports, use the validation tool before submitting</li>
                        <li>• Check for duplicate records</li>
                        <li>• Verify that referenced records exist in the system</li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="error-4">
                <AccordionTrigger>
                  <div className="flex items-center">
                    <Badge className="mr-2 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">Error 4002</Badge>
                    <span>Request Timeout</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      This error occurs when a request takes too long to complete and exceeds the system's timeout
                      limit.
                    </p>
                    <div className="bg-muted p-4 rounded-md">
                      <h4 className="font-medium">Possible Causes</h4>
                      <ul className="mt-2 space-y-1 text-sm">
                        <li>• Processing a large amount of data</li>
                        <li>• Complex report calculations</li>
                        <li>• Network latency or connectivity issues</li>
                        <li>• System under heavy load</li>
                        <li>• Resource-intensive operations</li>
                      </ul>
                    </div>
                    <div className="bg-muted p-4 rounded-md">
                      <h4 className="font-medium">Solutions</h4>
                      <ul className="mt-2 space-y-1 text-sm">
                        <li>• Reduce the scope of your request (e.g., fewer records, shorter time period)</li>
                        <li>• Break large operations into smaller batches</li>
                        <li>• Try during off-peak hours</li>
                        <li>• Use scheduled or background processing for large operations</li>
                        <li>• Check your network connection</li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="error-5">
                <AccordionTrigger>
                  <div className="flex items-center">
                    <Badge className="mr-2 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">Error 5001</Badge>
                    <span>API Rate Limit Exceeded</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      This error occurs when you've made too many API requests in a short period and have exceeded your
                      rate limit.
                    </p>
                    <div className="bg-muted p-4 rounded-md">
                      <h4 className="font-medium">Possible Causes</h4>
                      <ul className="mt-2 space-y-1 text-sm">
                        <li>• Making too many requests in a short time period</li>
                        <li>• Multiple applications using the same API key</li>
                        <li>• Inefficient API usage patterns</li>
                        <li>• Scripts or integrations running in tight loops</li>
                      </ul>
                    </div>
                    <div className="bg-muted p-4 rounded-md">
                      <h4 className="font-medium">Solutions</h4>
                      <ul className="mt-2 space-y-1 text-sm">
                        <li>• Implement rate limiting in your application</li>
                        <li>• Use exponential backoff for retries</li>
                        <li>• Batch requests where possible</li>
                        <li>• Cache responses to reduce API calls</li>
                        <li>• Consider upgrading to a plan with higher rate limits</li>
                      </ul>
                    </div>
                    <CodeBlock
                      code={`// Example response headers for rate limit error
HTTP/1.1 429 Too Many Requests
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1620000000
Retry-After: 30`}
                      language="http"
                      showLineNumbers={false}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <h2 id="diagnostic-tools" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Diagnostic Tools
          </h2>
          <p>SchoolSync provides several diagnostic tools to help identify and resolve issues.</p>

          <div className="not-prose my-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-primary" />
                  System Logs
                </CardTitle>
                <CardDescription>Access detailed system logs for troubleshooting</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  System logs provide detailed information about errors, warnings, and system events. Administrators can
                  access these logs to diagnose issues.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                    <span className="text-sm">Filter logs by severity, date, and component</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                    <span className="text-sm">Export logs for sharing with support</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                    <span className="text-sm">Search for specific error codes or messages</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  Access System Logs
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Server className="h-5 w-5 mr-2 text-primary" />
                  Connection Tester
                </CardTitle>
                <CardDescription>Verify connectivity to external services</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  The Connection Tester tool helps diagnose issues with external integrations by testing connectivity
                  and authentication.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                    <span className="text-sm">Test API endpoints and webhooks</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                    <span className="text-sm">Verify authentication credentials</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                    <span className="text-sm">Check network connectivity and latency</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  Run Connection Test
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="h-5 w-5 mr-2 text-primary" />
                  Data Validator
                </CardTitle>
                <CardDescription>Validate data before import or submission</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  The Data Validator tool checks your data against system validation rules before you attempt to import
                  or save it.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                    <span className="text-sm">Validate CSV and Excel files before import</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                    <span className="text-sm">Check for data format and integrity issues</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                    <span className="text-sm">Identify and fix validation errors</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  Open Data Validator
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Laptop className="h-5 w-5 mr-2 text-primary" />
                  Browser Compatibility Checker
                </CardTitle>
                <CardDescription>Verify your browser meets requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  This tool checks if your current browser and device meet the system requirements for optimal
                  performance.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                    <span className="text-sm">Check browser version compatibility</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                    <span className="text-sm">Verify required browser features</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                    <span className="text-sm">Test network speed and connectivity</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  Check Compatibility
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Callout icon="info" title="Need More Help?">
            If you're unable to resolve your issue using these troubleshooting resources, please contact our support
            team for assistance. Be sure to include any error messages and the steps you've already taken to
            troubleshoot the problem.
          </Callout>

          <div className="not-prose my-8 flex flex-col items-center rounded-lg bg-gradient-to-r from-slate-50 to-slate-100 p-8 dark:from-slate-800/50 dark:to-slate-800 md:flex-row md:justify-between">
            <div>
              <h3 className="text-xl font-bold">Still having issues?</h3>
              <p className="text-slate-700 dark:text-slate-400">
                Our support team is ready to help you resolve any problems.
              </p>
            </div>
            <Button className="mt-4 md:mt-0" asChild>
              <Link href="/support-resources">Contact Support</Link>
            </Button>
          </div>
        </div>
      </div>
    </DocsLayout>
  )
}

