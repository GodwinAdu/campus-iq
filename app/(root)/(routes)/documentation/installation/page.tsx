import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DocsSidebar } from "@/components/docs-sidebar"
import { DocsToc } from "@/components/docs-toc"
import { PageHeader } from "@/components/page-header"
import { DocsLayout } from "@/components/docs-layout"

export default function InstallationPage() {
  return (
    <DocsLayout>
      <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_100px]">
        <div className="mx-auto w-full min-w-0">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Installation</h1>
          <div className="flex items-center space-x-2 pt-4">
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <span>Last updated:</span>
              <time dateTime="2023-05-05">May 5, 2023</time>
            </div>
          </div>
          <div className="pb-12 pt-8">
            <div className="prose prose-slate dark:prose-invert max-w-none space-y-4">
              <h2 className="font-bold text-2xl" id="overview">Overview</h2>
              <p>
                CampusIQ is a cloud-based solution, so there's no need for complex installation. Simply follow these
                steps to get started:
              </p>

              <h2 className="font-bold text-2xl" id="step-1-sign-up">Step 1: Sign Up for an Account</h2>
              <p>
                Visit the CampusIQ website and click on the "Sign Up" button. Fill in your school's information and
                create an administrator account.
              </p>
              <ol>
                <li>
                  Go to{" "}
                  <a href="https://schoolsync.example.com/signup" className="font-medium">
                    schoolsync.example.com/signup
                  </a>
                </li>
                <li>Enter your school name, address, and contact information</li>
                <li>Create an administrator account with your email and password</li>
                <li>Verify your email address by clicking the link sent to your inbox</li>
              </ol>

              <div className="my-6 rounded-md bg-slate-100 p-4 dark:bg-slate-800">
                <div className="flex items-start">
                  <div className="flex-1">
                    <p className="font-medium">Pro Tip</p>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      Use an email address that is accessible by multiple administrators in case the primary
                      administrator is unavailable.
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="font-bold text-2xl" id="step-2-setup-wizard">Step 2: Complete the Setup Wizard</h2>
              <p>
                After signing up, you'll be guided through a setup wizard to configure your school's profile, academic
                year, departments, and initial user accounts.
              </p>
              <ol>
                <li>Set your school's basic information (logo, colors, timezone, etc.)</li>
                <li>Configure the academic calendar (terms, semesters, holidays)</li>
                <li>Set up departments and grade levels</li>
                <li>Create initial user accounts for key staff members</li>
              </ol>

              <div className="my-6 rounded-md bg-slate-100 p-4 dark:bg-slate-800">
                <div className="flex items-start">
                  <div className="flex-1">
                    <p className="font-medium">Pro Tip</p>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      Prepare a CSV file with your staff and student information before starting the setup process to
                      make importing data faster and easier.
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="font-bold text-2xl" id="step-3-data-import">Step 3: Import Your Data</h2>
              <p>
                Use our data import tools to migrate existing information from spreadsheets or other school management
                systems.
              </p>

              <div className="relative my-6 overflow-hidden rounded-lg border">
                <div className="flex items-center border-b bg-muted px-4">
                  <div className="flex h-10 items-center gap-2">
                    <button className="rounded border border-slate-300 bg-slate-50 px-3 py-1 text-sm dark:border-slate-700 dark:bg-slate-800">
                      CSV
                    </button>
                    <button className="rounded px-3 py-1 text-sm text-slate-600 dark:text-slate-400">JSON</button>
                    <button className="rounded px-3 py-1 text-sm text-slate-600 dark:text-slate-400">Excel</button>
                  </div>
                </div>
                <div className="relative overflow-auto p-4">
                  <pre className="text-sm">
                    <code className="language-csv">
                      id,first_name,last_name,email,role 1001,John,Smith,john.smith@example.com,teacher
                      1002,Jane,Doe,jane.doe@example.com,teacher 2001,Michael,Johnson,m.johnson@example.com,student
                      2002,Emily,Williams,e.williams@example.com,student
                    </code>
                  </pre>
                </div>
                <div className="absolute right-4 top-[3.2rem]">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <span className="sr-only">Copy code</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                    </svg>
                  </Button>
                </div>
              </div>

              <p>CampusIQ supports importing the following types of data:</p>
              <ul>
                <li>Student information</li>
                <li>Staff and teacher information</li>
                <li>Classes and course information</li>
                <li>Parent/guardian information</li>
                <li>Historical grades and attendance (optional)</li>
              </ul>

              <h2 className="font-bold text-2xl" id="step-4-configuration">Step 4: Configure System Settings</h2>
              <p>Customize CampusIQ to match your school's specific needs:</p>
              <ul>
                <li>Set up grading scales and reporting periods</li>
                <li>Configure attendance codes and policies</li>
                <li>Customize user permissions and roles</li>
                <li>Set up communication preferences</li>
                <li>Configure integration with other systems (optional)</li>
              </ul>

              <h2 className="font-bold text-2xl" id="step-5-training">Step 5: User Training</h2>
              <p>Before fully deploying CampusIQ, we recommend training your staff:</p>
              <ul>
                <li>Schedule administrator training sessions</li>
                <li>Conduct teacher training workshops</li>
                <li>Prepare student and parent orientation materials</li>
                <li>Utilize our training videos and documentation</li>
              </ul>

              <h2 className="font-bold text-2xl" id="self-hosted-option">Self-Hosted Installation (Optional)</h2>
              <p>
                For schools that prefer to host CampusIQ on their own servers, we offer a self-hosted option. Please
                contact our sales team for detailed installation instructions and requirements.
              </p>

              <div className="not-prose my-8 flex flex-col items-center rounded-lg bg-slate-50 p-8 dark:bg-slate-800/50 md:flex-row md:justify-between">
                <div>
                  <h3 className="text-xl font-bold">Ready to get started?</h3>
                  <p className="text-slate-700 dark:text-slate-400">
                    Check out our quick start guide to begin using CampusIQ.
                  </p>
                </div>
                <Button className="mt-4 md:mt-0" asChild>
                  <Link href="/quick-start-guide">Quick Start Guide</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </DocsLayout>
  )
}

