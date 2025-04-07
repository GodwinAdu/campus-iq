import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DocsSidebar } from "@/components/docs-sidebar"
import { DocsToc } from "@/components/docs-toc"
import { PageHeader } from "@/components/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Users, UserCog, ShieldCheck, UserX, FileSpreadsheet, AlertTriangle } from "lucide-react"

export default function UserManagementPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <DocsSidebar className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block" />
        <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
          <div className="mx-auto w-full min-w-0">
            <PageHeader
              title="User Management"
              description="Managing users, roles, and permissions in SchoolSync"
              breadcrumbs={[{ title: "User Management", href: "/user-management" }]}
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
                  User management in SchoolSync allows you to create, modify, and organize user accounts for
                  administrators, teachers, students, and parents. This guide will help you understand how to
                  effectively manage users and their permissions.
                </p>

                <Alert className="my-6">
                  <ShieldCheck className="h-4 w-4" />
                  <AlertTitle>Administrator Access Required</AlertTitle>
                  <AlertDescription>
                    Most user management features require administrator privileges. If you don't have access to these
                    features, contact your system administrator.
                  </AlertDescription>
                </Alert>

                <h2 id="user-types">User Types and Roles</h2>
                <p>SchoolSync supports different types of users, each with specific roles and permissions:</p>

                <div className="not-prose my-6">
                  <Tabs defaultValue="administrators" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="administrators">Administrators</TabsTrigger>
                      <TabsTrigger value="teachers">Teachers</TabsTrigger>
                      <TabsTrigger value="students">Students</TabsTrigger>
                      <TabsTrigger value="parents">Parents/Guardians</TabsTrigger>
                    </TabsList>
                    <TabsContent value="administrators" className="p-4 border rounded-md mt-2">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="p-2 rounded-md bg-primary/10">
                          <ShieldCheck className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="text-lg font-medium">Administrators</h3>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        Administrators have the highest level of access and can manage all aspects of the system.
                      </p>
                      <div className="space-y-2">
                        <h4 className="font-medium">Default Permissions:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Manage all user accounts</li>
                          <li>Configure system settings</li>
                          <li>Access all data and reports</li>
                          <li>Manage roles and permissions</li>
                          <li>Create and manage school-wide announcements</li>
                          <li>Audit system activity</li>
                        </ul>
                      </div>
                    </TabsContent>
                    <TabsContent value="teachers" className="p-4 border rounded-md mt-2">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="p-2 rounded-md bg-primary/10">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="text-lg font-medium">Teachers</h3>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        Teachers can manage their classes, students, and teaching materials.
                      </p>
                      <div className="space-y-2">
                        <h4 className="font-medium">Default Permissions:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Manage assigned classes</li>
                          <li>Take attendance</li>
                          <li>Create and grade assignments</li>
                          <li>Communicate with students and parents</li>
                          <li>Access student information for assigned classes</li>
                          <li>Create and share teaching materials</li>
                        </ul>
                      </div>
                    </TabsContent>
                    <TabsContent value="students" className="p-4 border rounded-md mt-2">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="p-2 rounded-md bg-primary/10">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="text-lg font-medium">Students</h3>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        Students can access their academic information, assignments, and communicate with teachers.
                      </p>
                      <div className="space-y-2">
                        <h4 className="font-medium">Default Permissions:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>View their own grades and attendance</li>
                          <li>Access and submit assignments</li>
                          <li>View class schedules and materials</li>
                          <li>Communicate with teachers</li>
                          <li>Receive announcements and notifications</li>
                          <li>Update personal profile information</li>
                        </ul>
                      </div>
                    </TabsContent>
                    <TabsContent value="parents" className="p-4 border rounded-md mt-2">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="p-2 rounded-md bg-primary/10">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="text-lg font-medium">Parents/Guardians</h3>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        Parents can monitor their children's progress and communicate with teachers.
                      </p>
                      <div className="space-y-2">
                        <h4 className="font-medium">Default Permissions:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>View their children's grades and attendance</li>
                          <li>Monitor assignment completion</li>
                          <li>Communicate with teachers</li>
                          <li>Receive announcements and notifications</li>
                          <li>Update contact information</li>
                          <li>Access school calendar and events</li>
                        </ul>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>

                <h2 id="creating-users">Creating User Accounts</h2>
                <p>There are several ways to create user accounts in SchoolSync:</p>

                <h3 id="individual-users">Creating Individual Users</h3>
                <p>To create a single user account:</p>
                <ol>
                  <li>Go to "Users" in the administration menu</li>
                  <li>Click "Add User"</li>
                  <li>Select the user type (Administrator, Teacher, Student, or Parent)</li>
                  <li>Fill in the required information (name, email, etc.)</li>
                  <li>Assign roles and permissions as needed</li>
                  <li>Click "Create User"</li>
                </ol>

                <h3 id="bulk-import">Bulk Importing Users</h3>
                <p>For adding multiple users at once:</p>
                <ol>
                  <li>Go to "Users" in the administration menu</li>
                  <li>Click "Import Users"</li>
                  <li>Download the template CSV file</li>
                  <li>Fill in the user information in the template</li>
                  <li>Upload the completed CSV file</li>
                  <li>Review and confirm the import</li>
                </ol>

                <div className="not-prose my-6 overflow-hidden rounded-lg border">
                  <div className="flex items-center border-b bg-muted px-4">
                    <div className="flex h-10 items-center gap-2">
                      <button className="rounded border border-slate-300 bg-slate-50 px-3 py-1 text-sm dark:border-slate-700 dark:bg-slate-800">
                        CSV
                      </button>
                    </div>
                  </div>
                  <div className="relative overflow-auto p-4">
                    <pre className="text-sm">
                      <code className="language-csv">
                        first_name,last_name,email,user_type,class_id John,Smith,john.smith@example.com,teacher,
                        Jane,Doe,jane.doe@example.com,teacher, Michael,Johnson,m.johnson@example.com,student,10B
                        Emily,Williams,e.williams@example.com,student,9A Robert,Brown,robert.brown@example.com,parent,
                        Sarah,Miller,sarah.miller@example.com,parent,
                      </code>
                    </pre>
                  </div>
                </div>

                <div className="not-prose my-6 rounded-md bg-amber-50 p-4 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 mr-2 text-amber-600 dark:text-amber-400 mt-0.5" />
                    <div>
                      <p className="font-medium text-amber-800 dark:text-amber-300">Important Note</p>
                      <p className="text-sm text-amber-700 dark:text-amber-400">
                        When importing users, ensure that email addresses are unique. The system will send invitation
                        emails to all imported users automatically.
                      </p>
                    </div>
                  </div>
                </div>

                <h3 id="user-invitations">User Invitations</h3>
                <p>You can also invite users to create their own accounts:</p>
                <ol>
                  <li>Go to "Users" in the administration menu</li>
                  <li>Click "Invite Users"</li>
                  <li>Enter the email addresses of the users you want to invite</li>
                  <li>Select the user type for each email</li>
                  <li>Customize the invitation message (optional)</li>
                  <li>Click "Send Invitations"</li>
                </ol>

                <h2 id="managing-users">Managing Existing Users</h2>
                <p>Once users are created, you can manage their accounts in various ways:</p>

                <div className="not-prose my-6 grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <UserCog className="h-5 w-5 mr-2 text-primary" />
                        Editing User Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ol className="space-y-2 ml-4 list-decimal">
                        <li>Go to "Users" in the administration menu</li>
                        <li>Find the user you want to edit</li>
                        <li>Click the "Edit" button</li>
                        <li>Update the user's information</li>
                        <li>Click "Save Changes"</li>
                      </ol>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <UserX className="h-5 w-5 mr-2 text-primary" />
                        Deactivating Users
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ol className="space-y-2 ml-4 list-decimal">
                        <li>Go to "Users" in the administration menu</li>
                        <li>Find the user you want to deactivate</li>
                        <li>Click the "Deactivate" button</li>
                        <li>Confirm the deactivation</li>
                        <li>The user will no longer be able to log in</li>
                      </ol>
                    </CardContent>
                  </Card>
                </div>

                <h2 id="roles-permissions">Roles and Permissions</h2>
                <p>
                  SchoolSync uses a role-based permission system to control what users can access and do within the
                  system.
                </p>

                <h3 id="default-roles">Default Roles</h3>
                <p>SchoolSync comes with the following default roles:</p>
                <ul>
                  <li>
                    <strong>Super Administrator</strong> - Complete access to all system features
                  </li>
                  <li>
                    <strong>School Administrator</strong> - Administrative access limited to a specific school
                  </li>
                  <li>
                    <strong>Department Head</strong> - Administrative access limited to a specific department
                  </li>
                  <li>
                    <strong>Teacher</strong> - Access to teaching and classroom management features
                  </li>
                  <li>
                    <strong>Student</strong> - Access to learning and academic information features
                  </li>
                  <li>
                    <strong>Parent/Guardian</strong> - Access to monitor their children's progress
                  </li>
                </ul>

                <h3 id="custom-roles">Creating Custom Roles</h3>
                <p>You can create custom roles with specific permissions:</p>
                <ol>
                  <li>Go to "Roles & Permissions" in the administration menu</li>
                  <li>Click "Add Role"</li>
                  <li>Enter a name and description for the role</li>
                  <li>Select the permissions you want to assign to this role</li>
                  <li>Click "Create Role"</li>
                </ol>

                <h3 id="assigning-roles">Assigning Roles to Users</h3>
                <p>To assign roles to users:</p>
                <ol>
                  <li>Go to "Users" in the administration menu</li>
                  <li>Find the user you want to modify</li>
                  <li>Click the "Edit" button</li>
                  <li>Go to the "Roles & Permissions" tab</li>
                  <li>Select the roles you want to assign</li>
                  <li>Click "Save Changes"</li>
                </ol>

                <h2 id="user-groups">User Groups</h2>
                <p>
                  User groups allow you to organize users and apply permissions or settings to multiple users at once.
                </p>

                <h3 id="creating-groups">Creating User Groups</h3>
                <p>To create a user group:</p>
                <ol>
                  <li>Go to "User Groups" in the administration menu</li>
                  <li>Click "Add Group"</li>
                  <li>Enter a name and description for the group</li>
                  <li>Select the users you want to add to the group</li>
                  <li>Click "Create Group"</li>
                </ol>

                <h3 id="managing-groups">Managing Group Membership</h3>
                <p>To add or remove users from a group:</p>
                <ol>
                  <li>Go to "User Groups" in the administration menu</li>
                  <li>Find the group you want to modify</li>
                  <li>Click the "Edit" button</li>
                  <li>Add or remove users from the group</li>
                  <li>Click "Save Changes"</li>
                </ol>

                <h2 id="user-data-export">User Data Export</h2>
                <p>You can export user data for reporting or backup purposes:</p>
                <ol>
                  <li>Go to "Users" in the administration menu</li>
                  <li>Click "Export Users"</li>
                  <li>Select the user types you want to export</li>
                  <li>Choose the export format (CSV, Excel, or JSON)</li>
                  <li>Click "Export"</li>
                </ol>

                <div className="not-prose my-6 rounded-md bg-slate-50 p-4 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-start">
                    <FileSpreadsheet className="h-5 w-5 mr-2 text-slate-600 dark:text-slate-400 mt-0.5" />
                    <div>
                      <p className="font-medium text-slate-800 dark:text-slate-300">Data Privacy Note</p>
                      <p className="text-sm text-slate-700 dark:text-slate-400">
                        When exporting user data, ensure you comply with relevant data protection regulations such as
                        GDPR or FERPA. The exported data may contain personally identifiable information.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="not-prose my-8 flex flex-col items-center rounded-lg bg-slate-50 p-8 dark:bg-slate-800/50 md:flex-row md:justify-between">
                  <div>
                    <h3 className="text-xl font-bold">Ready to explore advanced configuration?</h3>
                    <p className="text-slate-700 dark:text-slate-400">
                      Learn how to customize SchoolSync to fit your specific needs.
                    </p>
                  </div>
                  <Button className="mt-4 md:mt-0" asChild>
                    <Link href="/advanced-configuration">Advanced Configuration</Link>
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

