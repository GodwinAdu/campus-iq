import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DocsSidebar } from "@/components/docs-sidebar"
import { DocsToc } from "@/components/docs-toc"
import { PageHeader } from "@/components/page-header"

export default function KeyFeaturesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <DocsSidebar className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block" />
        <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
          <div className="mx-auto w-full min-w-0">
            <PageHeader
              title="Key Features"
              description="Explore the powerful features of SchoolSync"
              breadcrumbs={[{ title: "Key Features", href: "/key-features" }]}
            />
            <div className="flex items-center space-x-2 pt-4">
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <span>Last updated:</span>
                <time dateTime="2023-05-05">May 5, 2023</time>
              </div>
            </div>
            <div className="pb-12 pt-8">
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <h2 id="student-information-management">Student Information Management</h2>
                <p>Maintain comprehensive student records in a secure, centralized database:</p>
                <ul>
                  <li>Personal and contact information</li>
                  <li>Academic history and transcripts</li>
                  <li>Attendance records</li>
                  <li>Behavioral notes and disciplinary records</li>
                  <li>Health and medical information</li>
                  <li>Custom fields for school-specific data</li>
                </ul>

                <h2 id="curriculum-planning">Curriculum Planning</h2>
                <p>Create and manage curriculum content with powerful tools:</p>
                <ul>
                  <li>Lesson plan creation and management</li>
                  <li>Curriculum mapping to educational standards</li>
                  <li>Resource sharing between teachers</li>
                  <li>Integration with popular learning management systems</li>
                  <li>Assessment creation and grading</li>
                </ul>

                <h2 id="attendance-tracking">Attendance Tracking</h2>
                <p>Monitor and manage student and staff attendance efficiently:</p>
                <ul>
                  <li>Digital attendance taking via web or mobile</li>
                  <li>Automated absence notifications to parents</li>
                  <li>Attendance pattern analysis</li>
                  <li>Tardy and early dismissal tracking</li>
                  <li>Reporting for compliance requirements</li>
                </ul>

                <h2 id="grade-management">Grade Management</h2>
                <p>Comprehensive tools for recording, calculating, and analyzing student grades:</p>
                <ul>
                  <li>Customizable grading scales and rubrics</li>
                  <li>Weighted grade calculations</li>
                  <li>Progress reports and report card generation</li>
                  <li>Grade trend analysis</li>
                  <li>Parent and student grade portals</li>
                </ul>

                <h2 id="communication-tools">Communication Tools</h2>
                <p>Connect all stakeholders with integrated communication features:</p>
                <ul>
                  <li>Announcements and news feeds</li>
                  <li>Direct messaging between teachers, students, and parents</li>
                  <li>Email and SMS notifications</li>
                  <li>Document sharing</li>
                  <li>Event calendars and reminders</li>
                  <li>Virtual conference scheduling</li>
                </ul>

                <h2 id="calendar-scheduling">Calendar & Scheduling</h2>
                <p>Manage school events, classes, and appointments efficiently:</p>
                <ul>
                  <li>Academic calendar management</li>
                  <li>Class scheduling and room assignments</li>
                  <li>Event planning and coordination</li>
                  <li>Parent-teacher conference scheduling</li>
                  <li>Resource booking (rooms, equipment, etc.)</li>
                </ul>

                <h2 id="financial-management">Financial Management</h2>
                <p>Track fees, payments, and generate financial reports:</p>
                <ul>
                  <li>Tuition and fee management</li>
                  <li>Online payment processing</li>
                  <li>Financial aid tracking</li>
                  <li>Budget planning and monitoring</li>
                  <li>Financial reporting</li>
                  <li>Payroll integration</li>
                </ul>

                <h2 id="reporting-analytics">Reporting & Analytics</h2>
                <p>Gain insights through comprehensive data visualization:</p>
                <ul>
                  <li>Customizable dashboards for different user roles</li>
                  <li>Performance analytics for students and classes</li>
                  <li>Attendance and behavior trend analysis</li>
                  <li>Regulatory compliance reporting</li>
                  <li>Data export in multiple formats</li>
                </ul>

                <div className="not-prose my-8 flex flex-col items-center rounded-lg bg-slate-50 p-8 dark:bg-slate-800/50 md:flex-row md:justify-between">
                  <div>
                    <h3 className="text-xl font-bold">Ready to get started?</h3>
                    <p className="text-slate-700 dark:text-slate-400">
                      Check the system requirements and installation guide.
                    </p>
                  </div>
                  <Button className="mt-4 md:mt-0" asChild>
                    <Link href="/system-requirements">System Requirements</Link>
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

