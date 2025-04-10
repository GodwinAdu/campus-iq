import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  HelpCircle,
  BookOpen,
  MessageSquare,
  Mail,
  Phone,
  Video,
  FileText,
  Users,
  Headphones,
  Search,
  ExternalLink,
  Calendar,
  CheckCircle2,
} from "lucide-react"
import { DocsLayout } from "@/components/docs-layout"
import { Callout } from "@/components/callout"

export default function SupportResourcesPage() {
  return (
    <DocsLayout>
      <div className="space-y-8">
      <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Help & Support</h1>

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
              <Input type="search" placeholder="Search the knowledge base..." className="pl-10" />
            </div>
          </div>

          <div className="not-prose grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-primary" />
                  Documentation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Comprehensive guides and reference materials for all CampusIQ features.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/">Browse Documentation</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <HelpCircle className="h-5 w-5 mr-2 text-primary" />
                  Knowledge Base
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Find answers to common questions and solutions to known issues.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  Search Knowledge Base
                </Button>
              </CardFooter>
            </Card>

            <Card className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-primary" />
                  Community Forum
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Connect with other CampusIQ users to share tips and best practices.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  Join the Community
                </Button>
              </CardFooter>
            </Card>
          </div>

          <h2 id="contact-support" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Contact Support
          </h2>
          <p>
            Our dedicated support team is ready to assist you with any questions or issues you may have with CampusIQ.
          </p>

          <div className="not-prose my-6">
            <Tabs defaultValue="standard" className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="standard">Standard Support</TabsTrigger>
                <TabsTrigger value="premium">Premium Support</TabsTrigger>
                <TabsTrigger value="enterprise">Enterprise Support</TabsTrigger>
              </TabsList>

              <TabsContent value="standard" className="p-4 border rounded-md mt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Standard Support Features</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                        <span>Email support during business hours</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                        <span>Response within 24 business hours</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                        <span>Access to knowledge base and documentation</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                        <span>Community forum access</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Contact Methods</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <Mail className="h-5 w-5 mr-3 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Email Support</p>
                          <p className="text-sm text-muted-foreground">support@schoolsync.example.com</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <MessageSquare className="h-5 w-5 mr-3 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Support Portal</p>
                          <p className="text-sm text-muted-foreground">
                            <a href="#" className="underline">
                              support.schoolsync.example.com
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="premium" className="p-4 border rounded-md mt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Premium Support Features</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                        <span>All Standard Support features</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                        <span>Priority email and phone support</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                        <span>Response within 8 business hours</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                        <span>Monthly check-in calls</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                        <span>Remote troubleshooting sessions</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Contact Methods</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <Mail className="h-5 w-5 mr-3 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Priority Email</p>
                          <p className="text-sm text-muted-foreground">premium-support@schoolsync.example.com</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Phone className="h-5 w-5 mr-3 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Phone Support</p>
                          <p className="text-sm text-muted-foreground">1-800-555-0123</p>
                          <p className="text-xs text-muted-foreground">Monday-Friday, 8am-6pm EST</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <MessageSquare className="h-5 w-5 mr-3 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Support Portal</p>
                          <p className="text-sm text-muted-foreground">
                            <a href="#" className="underline">
                              premium.schoolsync.example.com
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="enterprise" className="p-4 border rounded-md mt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Enterprise Support Features</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                        <span>All Premium Support features</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                        <span>24/7 emergency support</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                        <span>Response within 2 hours for critical issues</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                        <span>Dedicated account manager</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                        <span>Quarterly business reviews</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 mt-0.5" />
                        <span>Custom development support</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Contact Methods</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <Headphones className="h-5 w-5 mr-3 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Dedicated Hotline</p>
                          <p className="text-sm text-muted-foreground">Your school's dedicated support number</p>
                          <p className="text-xs text-muted-foreground">Available 24/7 for critical issues</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Users className="h-5 w-5 mr-3 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Account Manager</p>
                          <p className="text-sm text-muted-foreground">Your dedicated point of contact</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <MessageSquare className="h-5 w-5 mr-3 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Enterprise Portal</p>
                          <p className="text-sm text-muted-foreground">
                            <a href="#" className="underline">
                              enterprise.schoolsync.example.com
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <Callout icon="info" title="Support Hours">
            Standard support is available Monday through Friday, 9:00 AM to 5:00 PM Eastern Time, excluding holidays.
            Premium and Enterprise support have extended hours as specified in their respective plans.
          </Callout>

          <h2 id="troubleshooting" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight mt-8">
            Troubleshooting
          </h2>
          <p>Before contacting support, you may be able to resolve common issues using our troubleshooting guides.</p>

          <div className="not-prose my-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Login and Authentication Issues</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">Forgotten Password</h4>
                      <p className="text-sm text-muted-foreground">
                        Use the "Forgot Password" link on the login page to reset your password. A password reset link
                        will be sent to your registered email address.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">Account Locked</h4>
                      <p className="text-sm text-muted-foreground">
                        After multiple failed login attempts, accounts may be temporarily locked for security. Wait 30
                        minutes and try again, or contact your system administrator.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">Single Sign-On (SSO) Issues</h4>
                      <p className="text-sm text-muted-foreground">
                        If you're using SSO and experiencing issues, ensure you're using the correct identity provider.
                        Contact your IT department to verify SSO configuration.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Data Import and Export Problems</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">Import Validation Errors</h4>
                      <p className="text-sm text-muted-foreground">
                        Ensure your import file follows the required format. Download the latest import template from
                        the Import/Export section and verify all required fields are present.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">Export Timeout</h4>
                      <p className="text-sm text-muted-foreground">
                        For large data exports, try reducing the scope of your export or use the scheduled export
                        feature to process the export during off-peak hours.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">Duplicate Records</h4>
                      <p className="text-sm text-muted-foreground">
                        Use the "Check for Duplicates" option before importing to identify and resolve potential
                        duplicate records.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Performance and Loading Issues</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">Slow Page Loading</h4>
                      <p className="text-sm text-muted-foreground">
                        Clear your browser cache and cookies. Try using a different browser or device to determine if
                        the issue is specific to your current setup.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">Report Generation Timeouts</h4>
                      <p className="text-sm text-muted-foreground">
                        For complex reports with large data sets, try narrowing the report criteria or schedule the
                        report to run during off-peak hours.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">Browser Compatibility</h4>
                      <p className="text-sm text-muted-foreground">
                        CampusIQ works best with the latest versions of Chrome, Firefox, Safari, and Edge. Update your
                        browser to the latest version for optimal performance.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Integration and API Issues</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">API Authentication Errors</h4>
                      <p className="text-sm text-muted-foreground">
                        Verify that your API key is valid and has not expired. Check that you're using the correct
                        authentication method for your API endpoint.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">Webhook Delivery Failures</h4>
                      <p className="text-sm text-muted-foreground">
                        Ensure your webhook endpoint is accessible from the internet and responds within the required
                        timeout period. Check the webhook logs for specific error messages.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">Third-Party Integration Sync Issues</h4>
                      <p className="text-sm text-muted-foreground">
                        Verify that the integration credentials are current and that the third-party service is
                        operational. Check the integration logs for specific error messages.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>Mobile App Troubleshooting</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">App Crashes</h4>
                      <p className="text-sm text-muted-foreground">
                        Ensure you're using the latest version of the CampusIQ mobile app. Try force-closing the app
                        and restarting it, or reinstall the app if issues persist.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">Sync Issues</h4>
                      <p className="text-sm text-muted-foreground">
                        Check your internet connection and try manually syncing from the app settings. Ensure you have
                        sufficient storage space on your device.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">Notification Problems</h4>
                      <p className="text-sm text-muted-foreground">
                        Verify that notifications are enabled both in the app settings and in your device's system
                        settings for the CampusIQ app.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <h2 id="faqs" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Frequently Asked Questions
          </h2>
          <p>Find quick answers to common questions about CampusIQ.</p>

          <div className="not-prose my-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="faq-1">
                <AccordionTrigger>How do I reset my password?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    Click the "Forgot Password" link on the login page. Enter your email address, and you'll receive a
                    password reset link. Follow the instructions in the email to create a new password. If you don't
                    receive the email, check your spam folder or contact your system administrator.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-2">
                <AccordionTrigger>Can I access CampusIQ on my mobile device?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">Yes, CampusIQ is accessible on mobile devices in two ways:</p>
                  <ul className="list-disc list-inside mt-2 text-muted-foreground">
                    <li>Through any mobile web browser by visiting your school's CampusIQ URL</li>
                    <li>Via the CampusIQ mobile app, available for iOS and Android devices</li>
                  </ul>
                  <p className="mt-2 text-muted-foreground">
                    The mobile app provides additional features like offline access and push notifications.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-3">
                <AccordionTrigger>How do I add a new student to the system?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">To add a new student:</p>
                  <ol className="list-decimal list-inside mt-2 text-muted-foreground">
                    <li>Navigate to the Students section</li>
                    <li>Click the "Add Student" button</li>
                    <li>Fill in the required information (name, grade level, contact details, etc.)</li>
                    <li>Assign the student to the appropriate classes</li>
                    <li>Click "Save" to create the student record</li>
                  </ol>
                  <p className="mt-2 text-muted-foreground">
                    For bulk student additions, use the Import feature under the Students section.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-4">
                <AccordionTrigger>How do I generate report cards?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">To generate report cards:</p>
                  <ol className="list-decimal list-inside mt-2 text-muted-foreground">
                    <li>Go to the Reports section</li>
                    <li>Select "Report Cards" from the available report types</li>
                    <li>Choose the grading period and classes/students to include</li>
                    <li>Select the report card template to use</li>
                    <li>Click "Generate Reports" to create the report cards</li>
                    <li>Once generated, you can download, print, or email the report cards</li>
                  </ol>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-5">
                <AccordionTrigger>How do I set up parent access?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">To set up parent access:</p>
                  <ol className="list-decimal list-inside mt-2 text-muted-foreground">
                    <li>Go to the Users section and select "Parents"</li>
                    <li>Click "Add Parent" to create a new parent account</li>
                    <li>Enter the parent's information, including email address</li>
                    <li>Link the parent to their child/children using the student selector</li>
                    <li>Set appropriate permissions for the parent account</li>
                    <li>Click "Save" and an invitation email will be sent to the parent</li>
                  </ol>
                  <p className="mt-2 text-muted-foreground">
                    Parents will receive an email with instructions to activate their account and set a password.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-6">
                <AccordionTrigger>What browsers are supported by CampusIQ?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">CampusIQ supports the following browsers:</p>
                  <ul className="list-disc list-inside mt-2 text-muted-foreground">
                    <li>Google Chrome (version 90 or later)</li>
                    <li>Mozilla Firefox (version 88 or later)</li>
                    <li>Apple Safari (version 14 or later)</li>
                    <li>Microsoft Edge (version 90 or later, Chromium-based)</li>
                  </ul>
                  <p className="mt-2 text-muted-foreground">
                    For the best experience, we recommend keeping your browser updated to the latest version. Internet
                    Explorer is not supported.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <h2 id="training-resources" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Training Resources
          </h2>
          <p>Enhance your CampusIQ skills with our comprehensive training resources.</p>

          <div className="not-prose my-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Video className="h-5 w-5 mr-2 text-primary" />
                  Video Tutorials
                </CardTitle>
                <CardDescription>Step-by-step video guides</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <ExternalLink className="h-4 w-4 mr-2 text-muted-foreground" />
                    <a href="#" className="hover:underline">
                      Getting Started with CampusIQ
                    </a>
                  </li>
                  <li className="flex items-center">
                    <ExternalLink className="h-4 w-4 mr-2 text-muted-foreground" />
                    <a href="#" className="hover:underline">
                      Student Management Basics
                    </a>
                  </li>
                  <li className="flex items-center">
                    <ExternalLink className="h-4 w-4 mr-2 text-muted-foreground" />
                    <a href="#" className="hover:underline">
                      Attendance Tracking
                    </a>
                  </li>
                  <li className="flex items-center">
                    <ExternalLink className="h-4 w-4 mr-2 text-muted-foreground" />
                    <a href="#" className="hover:underline">
                      Grading and Assessment
                    </a>
                  </li>
                  <li className="flex items-center">
                    <ExternalLink className="h-4 w-4 mr-2 text-muted-foreground" />
                    <a href="#" className="hover:underline">
                      Reporting and Analytics
                    </a>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  Browse Video Library
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-primary" />
                  Webinars
                </CardTitle>
                <CardDescription>Live and recorded sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>Upcoming: Advanced Reporting (June 15)</span>
                  </li>
                  <li className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>Upcoming: Custom Fields Workshop (June 22)</span>
                  </li>
                  <li className="flex items-center">
                    <ExternalLink className="h-4 w-4 mr-2 text-muted-foreground" />
                    <a href="#" className="hover:underline">
                      Recorded: Workflow Automation
                    </a>
                  </li>
                  <li className="flex items-center">
                    <ExternalLink className="h-4 w-4 mr-2 text-muted-foreground" />
                    <a href="#" className="hover:underline">
                      Recorded: API Integration
                    </a>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  View Webinar Schedule
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-primary" />
                  Documentation
                </CardTitle>
                <CardDescription>Comprehensive guides and references</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <ExternalLink className="h-4 w-4 mr-2 text-muted-foreground" />
                    <a href="#" className="hover:underline">
                      Administrator Guide
                    </a>
                  </li>
                  <li className="flex items-center">
                    <ExternalLink className="h-4 w-4 mr-2 text-muted-foreground" />
                    <a href="#" className="hover:underline">
                      Teacher Guide
                    </a>
                  </li>
                  <li className="flex items-center">
                    <ExternalLink className="h-4 w-4 mr-2 text-muted-foreground" />
                    <a href="#" className="hover:underline">
                      Student/Parent Guide
                    </a>
                  </li>
                  <li className="flex items-center">
                    <ExternalLink className="h-4 w-4 mr-2 text-muted-foreground" />
                    <a href="#" className="hover:underline">
                      API Documentation
                    </a>
                  </li>
                  <li className="flex items-center">
                    <ExternalLink className="h-4 w-4 mr-2 text-muted-foreground" />
                    <a href="#" className="hover:underline">
                      Integration Guides
                    </a>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                  Browse Documentation
                </Button>
              </CardFooter>
            </Card>
          </div>

          <h3 id="training-programs" className="scroll-m-20 text-2xl font-semibold tracking-tight mt-8">
            Training Programs
          </h3>
          <p>We offer structured training programs for different user roles and experience levels.</p>

          <div className="not-prose my-6">
            <Tabs defaultValue="admin" className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="admin">Administrator Training</TabsTrigger>
                <TabsTrigger value="teacher">Teacher Training</TabsTrigger>
                <TabsTrigger value="parent">Parent/Student Training</TabsTrigger>
              </TabsList>

              <TabsContent value="admin" className="p-4 border rounded-md mt-2">
                <h4 className="text-lg font-medium mb-4">Administrator Training Program</h4>
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-md">
                    <h5 className="font-medium">Basic Administrator Certification</h5>
                    <p className="text-sm text-muted-foreground mt-1">
                      A comprehensive introduction to CampusIQ administration covering user management, system
                      configuration, and basic troubleshooting.
                    </p>
                    <div className="mt-2 text-sm">
                      <span className="font-medium">Duration:</span> 8 hours
                    </div>
                    <div className="mt-1 text-sm">
                      <span className="font-medium">Format:</span> Self-paced online or instructor-led virtual
                    </div>
                  </div>

                  <div className="bg-muted p-4 rounded-md">
                    <h5 className="font-medium">Advanced Administrator Certification</h5>
                    <p className="text-sm text-muted-foreground mt-1">
                      Deep dive into advanced configuration, custom fields, workflow automation, API integration, and
                      performance optimization.
                    </p>
                    <div className="mt-2 text-sm">
                      <span className="font-medium">Duration:</span> 12 hours
                    </div>
                    <div className="mt-1 text-sm">
                      <span className="font-medium">Format:</span> Instructor-led virtual or on-site
                    </div>
                    <div className="mt-1 text-sm">
                      <span className="font-medium">Prerequisite:</span> Basic Administrator Certification
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <Button>Request Administrator Training</Button>
                </div>
              </TabsContent>

              <TabsContent value="teacher" className="p-4 border rounded-md mt-2">
                <h4 className="text-lg font-medium mb-4">Teacher Training Program</h4>
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-md">
                    <h5 className="font-medium">Teacher Essentials</h5>
                    <p className="text-sm text-muted-foreground mt-1">
                      Learn the fundamentals of CampusIQ for classroom management, including attendance, grading, and
                      communication with students and parents.
                    </p>
                    <div className="mt-2 text-sm">
                      <span className="font-medium">Duration:</span> 4 hours
                    </div>
                    <div className="mt-1 text-sm">
                      <span className="font-medium">Format:</span> Self-paced online or group workshop
                    </div>
                  </div>

                  <div className="bg-muted p-4 rounded-md">
                    <h5 className="font-medium">Advanced Teaching Tools</h5>
                    <p className="text-sm text-muted-foreground mt-1">
                      Master advanced features like custom assessments, rubrics, data analysis, and curriculum planning
                      tools.
                    </p>
                    <div className="mt-2 text-sm">
                      <span className="font-medium">Duration:</span> 6 hours
                    </div>
                    <div className="mt-1 text-sm">
                      <span className="font-medium">Format:</span> Self-paced online or instructor-led virtual
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <Button>Request Teacher Training</Button>
                </div>
              </TabsContent>

              <TabsContent value="parent" className="p-4 border rounded-md mt-2">
                <h4 className="text-lg font-medium mb-4">Parent/Student Training Resources</h4>
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-md">
                    <h5 className="font-medium">Parent Portal Quick Start</h5>
                    <p className="text-sm text-muted-foreground mt-1">
                      A brief introduction to the parent portal, covering how to view grades, attendance, and
                      communicate with teachers.
                    </p>
                    <div className="mt-2 text-sm">
                      <span className="font-medium">Duration:</span> 30 minutes
                    </div>
                    <div className="mt-1 text-sm">
                      <span className="font-medium">Format:</span> Video tutorial and quick reference guide
                    </div>
                  </div>

                  <div className="bg-muted p-4 rounded-md">
                    <h5 className="font-medium">Student Portal Orientation</h5>
                    <p className="text-sm text-muted-foreground mt-1">
                      Helps students learn how to check assignments, submit work, track grades, and communicate with
                      teachers.
                    </p>
                    <div className="mt-2 text-sm">
                      <span className="font-medium">Duration:</span> 30 minutes
                    </div>
                    <div className="mt-1 text-sm">
                      <span className="font-medium">Format:</span> Interactive tutorial and PDF guide
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <Button>Access Parent/Student Resources</Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="not-prose my-8 flex flex-col items-center rounded-lg bg-gradient-to-r from-slate-50 to-slate-100 p-8 dark:from-slate-800/50 dark:to-slate-800 md:flex-row md:justify-between">
            <div>
              <h3 className="text-xl font-bold">Need additional help?</h3>
              <p className="text-slate-700 dark:text-slate-400">
                Our support team is ready to assist you with any questions or issues.
              </p>
            </div>
            <Button className="mt-4 md:mt-0">Contact Support</Button>
          </div>
        </div>
      </div>
    </DocsLayout>
  )
}

