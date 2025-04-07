import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Activity, Clock, Code, FileText, Mail, Settings, Zap, CheckCircle2, PlusCircle } from "lucide-react"
import { DocsLayout } from "@/components/docs-layout"
import { PageHeader } from "@/components/page-header"
import CodeBlock from "@/components/code-block"
import { Callout } from "@/components/callout"
import { Steps } from "@/components/steps"
import { Step } from "@/components/step"

export default function WorkflowAutomationPage() {
  return (
    <DocsLayout>
      <div className="space-y-8">
        <PageHeader
          title="Workflow Automation"
          description="Automate routine tasks and processes to save time and ensure consistency"
          breadcrumbs={[{ title: "Workflow Automation", href: "/workflow-automation" }]}
        />

        <div className="flex items-center space-x-2 pt-4">
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <span>Last updated:</span>
            <time dateTime="2023-05-05">May 5, 2023</time>
          </div>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2 id="introduction" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Introduction
          </h2>
          <p>
            Workflow automation in SchoolSync allows you to create automated processes that execute predefined actions
            when specific triggers occur. This powerful feature helps reduce manual work, eliminate human error, and
            ensure consistent processes across your school management activities.
          </p>

          <div className="not-prose my-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-primary" />
                  Save Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Automate repetitive tasks to free up staff time for more valuable activities.</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 mr-2 text-primary" />
                  Ensure Consistency
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Standardize processes to ensure they're executed the same way every time.</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-primary" />
                  Improve Responsiveness
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Trigger immediate actions when important events occur in your school.</p>
              </CardContent>
            </Card>
          </div>

          <h2 id="workflow-types" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Types of Workflows
          </h2>
          <p>SchoolSync supports several types of workflows to address different automation needs:</p>

          <div className="not-prose my-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Workflow Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Use Cases</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="font-medium flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-primary" />
                      Notification Workflows
                    </div>
                  </TableCell>
                  <TableCell>Send automated notifications based on system events</TableCell>
                  <TableCell>Attendance alerts, grade updates, upcoming deadlines</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium flex items-center">
                      <Activity className="h-4 w-4 mr-2 text-primary" />
                      Data Processing Workflows
                    </div>
                  </TableCell>
                  <TableCell>Automatically process and transform data</TableCell>
                  <TableCell>Grade calculations, attendance summaries, report generation</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium flex items-center">
                      <Settings className="h-4 w-4 mr-2 text-primary" />
                      Administrative Workflows
                    </div>
                  </TableCell>
                  <TableCell>Automate administrative tasks and approvals</TableCell>
                  <TableCell>Leave requests, resource bookings, enrollment processes</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium flex items-center">
                      <Code className="h-4 w-4 mr-2 text-primary" />
                      Integration Workflows
                    </div>
                  </TableCell>
                  <TableCell>Connect SchoolSync with external systems</TableCell>
                  <TableCell>Sync with LMS, update accounting systems, export to state reporting systems</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <h2 id="creating-workflows" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Creating Workflows
          </h2>
          <p>Follow these steps to create a new workflow in SchoolSync:</p>

          <Steps>
            <Step number={1} title="Navigate to the Workflow section">
              <p className="text-muted-foreground">
                Go to <strong>Settings</strong> {"->"} <strong>Automation</strong> {"->"} <strong>Workflows</strong>
              </p>
            </Step>
            <Step number={2} title="Create a new workflow">
              <p className="text-muted-foreground">
                Click the <PlusCircle className="h-4 w-4 inline" /> <strong>New Workflow</strong> button
              </p>
            </Step>
            <Step number={3} title="Configure basic settings">
              <ul className="list-disc list-inside ml-4 text-muted-foreground">
                <li>Workflow Name: A descriptive name for the workflow</li>
                <li>Description: Optional details about the workflow's purpose</li>
                <li>Active: Whether the workflow is enabled or disabled</li>
                <li>Schedule: When the workflow should run (event-based or scheduled)</li>
              </ul>
            </Step>
            <Step number={4} title="Define triggers">
              <p className="text-muted-foreground">Select the events or conditions that will activate the workflow</p>
            </Step>
            <Step number={5} title="Set conditions">
              <p className="text-muted-foreground">Optionally add conditions to filter when the workflow should run</p>
            </Step>
            <Step number={6} title="Configure actions">
              <p className="text-muted-foreground">
                Define the actions that will execute when the workflow is triggered
              </p>
            </Step>
            <Step number={7} title="Test and activate">
              <p className="text-muted-foreground">Test the workflow with sample data and activate it when ready</p>
            </Step>
          </Steps>

          <h2 id="triggers" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Triggers and Conditions
          </h2>
          <p>
            Triggers define when a workflow should start, while conditions refine when the workflow should execute its
            actions.
          </p>

          <div className="not-prose my-6">
            <Tabs defaultValue="event" className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="event">Event Triggers</TabsTrigger>
                <TabsTrigger value="schedule">Scheduled Triggers</TabsTrigger>
                <TabsTrigger value="conditions">Conditions</TabsTrigger>
              </TabsList>

              <TabsContent value="event" className="p-4 border rounded-md mt-2">
                <p className="mb-4">Event triggers activate workflows when specific events occur in the system:</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Record Events</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <ul className="space-y-1">
                        <li className="flex items-center">
                          <Badge className="mr-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                            Create
                          </Badge>
                          <span>When a new record is created</span>
                        </li>
                        <li className="flex items-center">
                          <Badge className="mr-2 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                            Update
                          </Badge>
                          <span>When a record is modified</span>
                        </li>
                        <li className="flex items-center">
                          <Badge className="mr-2 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300">
                            Delete
                          </Badge>
                          <span>When a record is deleted</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">System Events</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <ul className="space-y-1">
                        <li className="flex items-center">
                          <Badge className="mr-2 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                            Login
                          </Badge>
                          <span>When a user logs in</span>
                        </li>
                        <li className="flex items-center">
                          <Badge className="mr-2 bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300">
                            Import
                          </Badge>
                          <span>When data is imported</span>
                        </li>
                        <li className="flex items-center">
                          <Badge className="mr-2 bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300">
                            Error
                          </Badge>
                          <span>When a system error occurs</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <CodeBlock
                  code={`// Example event trigger configuration
{
  "triggerType": "event",
  "entity": "student",
  "event": "update",
  "specificFields": ["grade_level", "enrollment_status"]
}`}
                  language="json"
                  filename="event-trigger.json"
                />
              </TabsContent>

              <TabsContent value="schedule" className="p-4 border rounded-md mt-2">
                <p className="mb-4">Scheduled triggers activate workflows at specified times or intervals:</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Time-Based Schedules</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <ul className="space-y-1">
                        <li className="flex items-center">
                          <Badge className="mr-2">Daily</Badge>
                          <span>Run once per day at a specific time</span>
                        </li>
                        <li className="flex items-center">
                          <Badge className="mr-2">Weekly</Badge>
                          <span>Run on specific days of the week</span>
                        </li>
                        <li className="flex items-center">
                          <Badge className="mr-2">Monthly</Badge>
                          <span>Run on specific days of the month</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Interval-Based Schedules</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <ul className="space-y-1">
                        <li className="flex items-center">
                          <Badge className="mr-2">Hourly</Badge>
                          <span>Run every X hours</span>
                        </li>
                        <li className="flex items-center">
                          <Badge className="mr-2">Minutes</Badge>
                          <span>Run every X minutes</span>
                        </li>
                        <li className="flex items-center">
                          <Badge className="mr-2">Custom</Badge>
                          <span>Define custom CRON expressions</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <CodeBlock
                  code={`// Example scheduled trigger configuration
{
  "triggerType": "schedule",
  "scheduleType": "cron",
  "cronExpression": "0 0 7 * * 1-5",  // 7:00 AM on weekdays
  "timezone": "America/New_York"
}`}
                  language="json"
                  filename="schedule-trigger.json"
                />
              </TabsContent>

              <TabsContent value="conditions" className="p-4 border rounded-md mt-2">
                <p className="mb-4">Conditions refine when a triggered workflow should actually execute its actions:</p>

                <div className="space-y-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Field Conditions</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <p className="mb-2">Evaluate field values against specific criteria:</p>
                      <ul className="space-y-1">
                        <li>
                          <strong>Equals</strong>: Field exactly matches a value
                        </li>
                        <li>
                          <strong>Contains</strong>: Field contains a substring
                        </li>
                        <li>
                          <strong>Greater/Less Than</strong>: Numeric comparisons
                        </li>
                        <li>
                          <strong>Changed To/From</strong>: Field value transitions
                        </li>
                        <li>
                          <strong>Is Empty/Not Empty</strong>: Field presence checks
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Complex Conditions</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <p className="mb-2">Combine multiple conditions with logical operators:</p>
                      <ul className="space-y-1">
                        <li>
                          <strong>AND</strong>: All conditions must be true
                        </li>
                        <li>
                          <strong>OR</strong>: At least one condition must be true
                        </li>
                        <li>
                          <strong>NOT</strong>: Invert a condition
                        </li>
                        <li>
                          <strong>Nested Groups</strong>: Create complex logical expressions
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <CodeBlock
                  code={`// Example condition configuration
{
  "operator": "AND",
  "conditions": [
    {
      "field": "grade_level",
      "operator": "equals",
      "value": "9"
    },
    {
      "operator": "OR",
      "conditions": [
        {
          "field": "attendance_rate",
          "operator": "lessThan",
          "value": 90
        },
        {
          "field": "gpa",
          "operator": "lessThan",
          "value": 2.0
        }
      ]
    }
  ]
}`}
                  language="json"
                  filename="conditions.json"
                />
              </TabsContent>
            </Tabs>
          </div>

          <h2 id="actions" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Workflow Actions
          </h2>
          <p>
            Actions are the tasks that a workflow performs when triggered. SchoolSync supports a wide range of actions
            that can be combined to create powerful automation sequences.
          </p>

          <div className="not-prose my-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-base">
                  <Mail className="h-4 w-4 mr-2 text-primary" />
                  Communication Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <ul className="space-y-1">
                  <li>Send email notifications</li>
                  <li>Send SMS messages</li>
                  <li>Create in-app notifications</li>
                  <li>Generate and send reports</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-base">
                  <FileText className="h-4 w-4 mr-2 text-primary" />
                  Data Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <ul className="space-y-1">
                  <li>Create new records</li>
                  <li>Update existing records</li>
                  <li>Delete records</li>
                  <li>Calculate and update fields</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-base">
                  <Code className="h-4 w-4 mr-2 text-primary" />
                  Integration Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <ul className="space-y-1">
                  <li>Call external APIs</li>
                  <li>Execute custom scripts</li>
                  <li>Export data to external systems</li>
                  <li>Import data from external sources</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <h3 id="action-sequences" className="scroll-m-20 text-2xl font-semibold tracking-tight mt-8">
            Action Sequences
          </h3>
          <p>Actions can be arranged in sequences with conditional branching to create complex workflows:</p>

          <CodeBlock
            code={`// Example action sequence
[
  {
    "actionType": "updateRecord",
    "entity": "student",
    "data": {
      "risk_flag": true,
      "last_evaluated": "{{now}}"
    }
  },
  {
    "actionType": "condition",
    "condition": {
      "field": "parent_email",
      "operator": "isNotEmpty"
    },
    "then": [
      {
        "actionType": "sendEmail",
        "to": "{{parent_email}}",
        "subject": "Academic Performance Alert",
        "template": "academic_alert",
        "data": {
          "student_name": "{{first_name}} {{last_name}}",
          "grade_level": "{{grade_level}}",
          "current_gpa": "{{gpa}}"
        }
      }
    ],
    "else": [
      {
        "actionType": "createTask",
        "assignee": "counselor",
        "title": "Contact Parent - No Email",
        "description": "Student {{first_name}} {{last_name}} requires intervention, but no parent email is available. Please contact by phone."
      }
    ]
  },
  {
    "actionType": "createRecord",
    "entity": "intervention",
    "data": {
      "student_id": "{{id}}",
      "type": "academic",
      "status": "pending",
      "created_date": "{{now}}",
      "notes": "Automatically created by academic risk workflow"
    }
  }
]`}
            language="json"
            filename="action-sequence.json"
          />

          <Callout icon="tip" title="Dynamic Data">
            Use double curly braces <code>{"{{variable}}"}</code> to reference dynamic data in your actions, including
            record fields, system variables, and calculated values.
          </Callout>

          <h2 id="testing-monitoring" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Testing and Monitoring
          </h2>
          <p>
            Before activating a workflow in your production environment, it's important to test it thoroughly and set up
            proper monitoring.
          </p>

          <div className="not-prose my-6">
            <Tabs defaultValue="testing" className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="testing">Testing Workflows</TabsTrigger>
                <TabsTrigger value="monitoring">Monitoring Execution</TabsTrigger>
                <TabsTrigger value="troubleshooting">Troubleshooting</TabsTrigger>
              </TabsList>

              <TabsContent value="testing" className="p-4 border rounded-md mt-2">
                <p className="mb-4">SchoolSync provides tools to test workflows before activating them:</p>

                <Steps>
                  <Step number={1} title="Test Mode">
                    <p className="text-muted-foreground">
                      Enable test mode when creating or editing a workflow to prevent actual actions from executing
                    </p>
                  </Step>
                  <Step number={2} title="Sample Data">
                    <p className="text-muted-foreground">
                      Use the sample data tool to simulate triggers with different data scenarios
                    </p>
                  </Step>
                  <Step number={3} title="Execution Preview">
                    <p className="text-muted-foreground">
                      Review the execution preview to see which actions would run and what data would be used
                    </p>
                  </Step>
                  <Step number={4} title="Test Run">
                    <p className="text-muted-foreground">
                      Perform a test run that logs all actions but doesn't actually execute them
                    </p>
                  </Step>
                </Steps>

                <Callout icon="warning" title="Important">
                  Always test workflows with a variety of data scenarios to ensure they handle edge cases correctly.
                </Callout>
              </TabsContent>

              <TabsContent value="monitoring" className="p-4 border rounded-md mt-2">
                <p className="mb-4">
                  Once a workflow is active, monitor its execution to ensure it's working as expected:
                </p>

                <div className="space-y-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Workflow Logs</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <p>The workflow logs show a detailed history of each workflow execution, including:</p>
                      <ul className="list-disc list-inside mt-2">
                        <li>Trigger events and timestamps</li>
                        <li>Conditions evaluated and results</li>
                        <li>Actions executed and their outcomes</li>
                        <li>Any errors or warnings encountered</li>
                        <li>Execution time and resource usage</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Performance Metrics</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <p>Monitor workflow performance metrics to identify potential issues:</p>
                      <ul className="list-disc list-inside mt-2">
                        <li>Execution frequency and patterns</li>
                        <li>Average execution time</li>
                        <li>Error rates and common failure points</li>
                        <li>Resource consumption</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="troubleshooting" className="p-4 border rounded-md mt-2">
                <p className="mb-4">When workflows don't behave as expected, use these troubleshooting techniques:</p>

                <div className="space-y-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Common Issues</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <div className="space-y-2">
                        <div>
                          <p className="font-medium">Workflow Not Triggering</p>
                          <ul className="list-disc list-inside ml-4">
                            <li>Verify the workflow is active</li>
                            <li>Check that trigger conditions are being met</li>
                            <li>Ensure the trigger event is occurring as expected</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-medium">Actions Not Executing</p>
                          <ul className="list-disc list-inside ml-4">
                            <li>Verify conditions are evaluating as expected</li>
                            <li>Check for missing or invalid dynamic data</li>
                            <li>Look for permission issues or rate limits</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Debugging Tools</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <ul className="list-disc list-inside">
                        <li>Enable debug mode for detailed execution logs</li>
                        <li>Use the workflow simulator to test specific scenarios</li>
                        <li>Check the system logs for related errors</li>
                        <li>Use the workflow visualizer to identify logic issues</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <Callout icon="info" title="Support Resources">
                  If you can't resolve a workflow issue, contact SchoolSync support with the workflow ID and execution
                  logs for assistance.
                </Callout>
              </TabsContent>
            </Tabs>
          </div>

          <h2 id="best-practices" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Best Practices
          </h2>
          <p>Follow these recommendations to create effective and maintainable workflows:</p>

          <div className="not-prose my-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
              <CardHeader>
                <CardTitle>Design Principles</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex">
                    <span className="text-primary mr-2">•</span>
                    <span>Keep workflows focused on a single purpose</span>
                  </li>
                  <li className="flex">
                    <span className="text-primary mr-2">•</span>
                    <span>Use clear, descriptive names for workflows</span>
                  </li>
                  <li className="flex">
                    <span className="text-primary mr-2">•</span>
                    <span>Document the purpose and expected behavior</span>
                  </li>
                  <li className="flex">
                    <span className="text-primary mr-2">•</span>
                    <span>Break complex processes into multiple workflows</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
              <CardHeader>
                <CardTitle>Implementation Practices</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex">
                    <span className="text-primary mr-2">•</span>
                    <span>Test workflows thoroughly before activation</span>
                  </li>
                  <li className="flex">
                    <span className="text-primary mr-2">•</span>
                    <span>Include error handling in your workflows</span>
                  </li>
                  <li className="flex">
                    <span className="text-primary mr-2">•</span>
                    <span>Monitor workflow performance regularly</span>
                  </li>
                  <li className="flex">
                    <span className="text-primary mr-2">•</span>
                    <span>Limit the number of actions in a single workflow</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Callout icon="warning" title="Performance Considerations">
            Complex workflows with many actions can impact system performance. Monitor execution times and consider
            breaking up very large workflows into smaller, more focused ones.
          </Callout>

          <div className="not-prose my-8 flex flex-col items-center rounded-lg bg-gradient-to-r from-slate-50 to-slate-100 p-8 dark:from-slate-800/50 dark:to-slate-800 md:flex-row md:justify-between">
            <div>
              <h3 className="text-xl font-bold">Ready to integrate with external systems?</h3>
              <p className="text-slate-700 dark:text-slate-400">
                Learn how to connect SchoolSync with other applications using our API.
              </p>
            </div>
            <a
              href="/api-integration"
              className="mt-4 md:mt-0 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              API Integration
            </a>
          </div>
        </div>
      </div>
    </DocsLayout>
  )
}

