import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, Database, Settings, PlusCircle, Edit, Trash2 } from "lucide-react"
import { DocsLayout } from "@/components/docs-layout"
import { PageHeader } from "@/components/page-header"
import CodeBlock from "@/components/code-block"
import { Callout } from "@/components/callout"
import { Steps } from "@/components/steps"
import { Step } from "@/components/step"

export default function CustomFieldsPage() {
  return (
    <DocsLayout>
      <div className="space-y-8">
        <PageHeader
          title="Custom Fields"
          description="Extend your school management system with custom fields to capture and manage additional data specific to your institution's needs."
          breadcrumbs={[{ title: "Custom Fields", href: "/custom-fields" }]}
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
            Custom fields allow you to extend the standard data model of the school management system to capture
            information specific to your institution's requirements. Whether you need to track additional student
            information, specialized teacher qualifications, or unique facility attributes, custom fields provide the
            flexibility to tailor the system to your needs.
          </p>

          <div className="not-prose my-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-primary" />
                  Flexibility
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Add custom fields to any entity in the system including students, staff, classes, and more.</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Database className="h-5 w-5 mr-2 text-primary" />
                  Data Integrity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Enforce data validation rules to maintain consistency and accuracy of your custom data.</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2 text-primary" />
                  Integration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Use custom fields in reports, forms, and workflows just like standard system fields.</p>
              </CardContent>
            </Card>
          </div>

          <h2 id="field-types" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Field Types
          </h2>
          <p>The system supports various field types to accommodate different data requirements.</p>

          <div className="not-prose my-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Field Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Use Cases</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Text</div>
                    <Badge variant="outline" className="mt-1">
                      Single line
                    </Badge>
                  </TableCell>
                  <TableCell>Short text entries up to 255 characters</TableCell>
                  <TableCell>Student nicknames, ID numbers, brief notes</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Text Area</div>
                    <Badge variant="outline" className="mt-1">
                      Multi-line
                    </Badge>
                  </TableCell>
                  <TableCell>Longer text entries with formatting options</TableCell>
                  <TableCell>Detailed comments, descriptions, observations</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Number</div>
                  </TableCell>
                  <TableCell>Numeric values with optional decimal places</TableCell>
                  <TableCell>Scores, measurements, quantities</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Date / Time</div>
                  </TableCell>
                  <TableCell>Date and time values with formatting options</TableCell>
                  <TableCell>Important dates, deadlines, timestamps</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Dropdown</div>
                    <Badge variant="outline" className="mt-1">
                      Single select
                    </Badge>
                  </TableCell>
                  <TableCell>Selection from predefined options</TableCell>
                  <TableCell>Status indicators, categories, ratings</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Multi-select</div>
                  </TableCell>
                  <TableCell>Multiple selections from predefined options</TableCell>
                  <TableCell>Skills, interests, applicable categories</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Checkbox</div>
                  </TableCell>
                  <TableCell>Boolean true/false values</TableCell>
                  <TableCell>Consent flags, eligibility indicators</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">File Upload</div>
                  </TableCell>
                  <TableCell>Attachment of documents and files</TableCell>
                  <TableCell>Certificates, signed forms, supporting documents</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <h2 id="creating-fields" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Creating Custom Fields
          </h2>
          <p>Follow these steps to create custom fields for any entity in the system.</p>

          <div className="not-prose my-6">
            <Tabs defaultValue="ui" className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="ui">Using the UI</TabsTrigger>
                <TabsTrigger value="api">Using the API</TabsTrigger>
              </TabsList>
              <TabsContent value="ui" className="p-4 border rounded-md mt-2">
                <Steps>
                  <Step number={1} title="Navigate to the Custom Fields section">
                    <p className="text-muted-foreground">
                      Go to <strong>Settings</strong> {"->"} <strong>System Configuration</strong> {"->"}{" "}
                      <strong>Custom Fields</strong>
                    </p>
                  </Step>
                  <Step number={2} title="Select the entity type">
                    <p className="text-muted-foreground">
                      Choose which entity (Students, Staff, Classes, etc.) you want to add the custom field to
                    </p>
                  </Step>
                  <Step number={3} title="Click 'Add New Field'">
                    <p className="text-muted-foreground">
                      Use the <PlusCircle className="h-4 w-4 inline" /> button in the top-right corner of the entity's
                      custom fields list
                    </p>
                  </Step>
                  <Step number={4} title="Configure the field properties">
                    <ul className="list-disc list-inside ml-4 text-muted-foreground">
                      <li>Field Label: The name displayed to users</li>
                      <li>Field Type: Select from available types</li>
                      <li>Required: Whether the field must be filled</li>
                      <li>Default Value: Pre-populated value (optional)</li>
                      <li>Help Text: Guidance for users (optional)</li>
                      <li>Validation Rules: Data constraints (optional)</li>
                    </ul>
                  </Step>
                  <Step number={5} title="Set permissions">
                    <p className="text-muted-foreground">Define which user roles can view and/or edit this field</p>
                  </Step>
                  <Step number={6} title="Save the field">
                    <p className="text-muted-foreground">
                      Click "Save" to create the field and make it available in the system
                    </p>
                  </Step>
                </Steps>

                <Callout icon="info" title="Field Placement">
                  You can specify where the custom field appears in forms by setting its display order and section.
                </Callout>
              </TabsContent>
              <TabsContent value="api" className="p-4 border rounded-md mt-2">
                <p>Custom fields can also be created programmatically using the API:</p>

                <CodeBlock
                  code={`// POST /api/v1/custom-fields
{
  "entityType": "student",
  "name": "emergency_contact_relationship",
  "label": "Emergency Contact Relationship",
  "type": "dropdown",
  "required": true,
  "options": [
    "Parent", "Guardian", "Sibling", "Grandparent", "Other Family", "Friend"
  ],
  "helpText": "Relationship of the emergency contact to the student",
  "displayOrder": 3,
  "section": "Emergency Contacts",
  "permissions": {
    "view": ["admin", "teacher", "staff"],
    "edit": ["admin", "staff"]
  }
}`}
                  language="json"
                  filename="api-request.json"
                />

                <p className="text-muted-foreground">
                  The API allows for batch creation of multiple custom fields in a single request, making it efficient
                  for system setup and migrations.
                </p>

                <Callout icon="warning" title="API Key Required">
                  API operations require a valid API key with administrative permissions.
                </Callout>
              </TabsContent>
            </Tabs>
          </div>

          <h2 id="managing-fields" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Managing Custom Fields
          </h2>
          <p>Once created, custom fields can be edited, reordered, or removed as needed.</p>

          <div className="not-prose my-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Edit className="h-5 w-5 mr-2 text-primary" />
                  Editing Fields
                </CardTitle>
                <CardDescription>Modify existing custom fields while preserving data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>To edit a custom field:</p>
                <ol className="list-decimal list-inside ml-4 text-muted-foreground">
                  <li>Navigate to the Custom Fields section</li>
                  <li>Find the field you want to modify</li>
                  <li>Click the Edit (pencil) icon</li>
                  <li>Make your changes</li>
                  <li>Save the updated field</li>
                </ol>
                <Callout icon="warning" title="Important" className="mt-4">
                  Changing a field's type may result in data loss if the new type is incompatible with existing values.
                </Callout>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trash2 className="h-5 w-5 mr-2 text-primary" />
                  Removing Fields
                </CardTitle>
                <CardDescription>Delete custom fields that are no longer needed</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>To remove a custom field:</p>
                <ol className="list-decimal list-inside ml-4 text-muted-foreground">
                  <li>Navigate to the Custom Fields section</li>
                  <li>Find the field you want to remove</li>
                  <li>Click the Delete (trash) icon</li>
                  <li>Confirm the deletion</li>
                </ol>
                <Callout icon="warning" title="Warning" className="mt-4">
                  Deleting a custom field permanently removes all data stored in that field across all records.
                </Callout>
              </CardContent>
            </Card>
          </div>

          <h2 id="using-fields" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Using Custom Fields
          </h2>
          <p>Custom fields integrate seamlessly with the rest of the system and can be used in various contexts.</p>

          <div className="not-prose my-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Forms</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Custom fields appear automatically in data entry forms based on their configuration. They respect all
                  validation rules and required settings.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Include custom fields in custom reports and data exports. Filter, sort, and group by custom field
                  values.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Workflows</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Use custom fields in workflow conditions and actions. Trigger automations based on custom field
                  values.
                </p>
              </CardContent>
            </Card>
          </div>

          <h3 id="advanced-search" className="scroll-m-20 text-2xl font-semibold tracking-tight mt-8">
            Example: Advanced Search with Custom Fields
          </h3>
          <p>Custom fields can be used in advanced search queries to filter records based on specific criteria:</p>

          <CodeBlock
            code={`// Example of using custom fields in an advanced search query
const searchResults = await api.students.search({
  filters: [
    { field: "grade_level", operator: "equals", value: "10" },
    { field: "custom.extracurricular_activities", operator: "contains", value: "Chess Club" },
    { field: "custom.transportation_mode", operator: "equals", value: "School Bus" }
  ],
  sort: [
    { field: "last_name", direction: "asc" }
  ],
  limit: 50
});`}
            language="javascript"
            filename="advanced-search.js"
          />

          <h2 id="best-practices" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Best Practices
          </h2>
          <p>Follow these recommendations to make the most of custom fields in your school management system.</p>

          <div className="not-prose my-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
              <CardHeader>
                <CardTitle>Planning</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex">
                    <span className="text-primary mr-2">•</span>
                    <span>Audit your data needs before creating custom fields</span>
                  </li>
                  <li className="flex">
                    <span className="text-primary mr-2">•</span>
                    <span>Group related fields in logical sections</span>
                  </li>
                  <li className="flex">
                    <span className="text-primary mr-2">•</span>
                    <span>Use consistent naming conventions</span>
                  </li>
                  <li className="flex">
                    <span className="text-primary mr-2">•</span>
                    <span>Document the purpose of each custom field</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
              <CardHeader>
                <CardTitle>Implementation</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex">
                    <span className="text-primary mr-2">•</span>
                    <span>Use dropdown fields instead of text when possible to ensure data consistency</span>
                  </li>
                  <li className="flex">
                    <span className="text-primary mr-2">•</span>
                    <span>Set appropriate validation rules to maintain data quality</span>
                  </li>
                  <li className="flex">
                    <span className="text-primary mr-2">•</span>
                    <span>Provide clear help text for complex fields</span>
                  </li>
                  <li className="flex">
                    <span className="text-primary mr-2">•</span>
                    <span>Test custom fields with sample data before full deployment</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Callout icon="tip" title="Tip: Regular Review">
            Periodically review your custom fields to ensure they're still relevant and being used effectively. Remove
            or archive unused fields to keep your forms clean and efficient.
          </Callout>

          <h2 id="advanced-usage" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Advanced Usage
          </h2>
          <p>Explore these advanced techniques to maximize the value of custom fields.</p>

          <div className="not-prose my-6">
            <Tabs defaultValue="conditional" className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="conditional">Conditional Display</TabsTrigger>
                <TabsTrigger value="calculated">Calculated Fields</TabsTrigger>
                <TabsTrigger value="import">Bulk Import/Export</TabsTrigger>
              </TabsList>

              <TabsContent value="conditional" className="p-4 border rounded-md mt-2">
                <p>
                  Configure fields to appear only when certain conditions are met, creating dynamic forms that adapt to
                  the data being entered.
                </p>

                <div className="bg-muted p-4 rounded-md my-4">
                  <h4 className="font-medium mb-2">Example: Conditional Fields</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    When "Transportation Mode" is set to "School Bus", show additional fields:
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground ml-4">
                    <li>Bus Route Number</li>
                    <li>Bus Stop Location</li>
                    <li>Estimated Pickup Time</li>
                    <li>Estimated Drop-off Time</li>
                  </ul>
                </div>

                <CodeBlock
                  code={`// Conditional display configuration
{
  "field": "bus_route_number",
  "displayConditions": [
    {
      "field": "transportation_mode",
      "operator": "equals",
      "value": "School Bus"
    }
  ]
}`}
                  language="json"
                  filename="conditional-display.json"
                />
              </TabsContent>

              <TabsContent value="calculated" className="p-4 border rounded-md mt-2">
                <p>
                  Create fields that automatically calculate values based on other fields, reducing manual data entry
                  and ensuring consistency.
                </p>

                <div className="bg-muted p-4 rounded-md my-4">
                  <h4 className="font-medium mb-2">Example: GPA Calculation</h4>
                  <p className="text-sm text-muted-foreground">
                    A calculated field that computes a student's GPA based on their course grades and credit hours.
                  </p>
                </div>

                <CodeBlock
                  code={`// Calculated field formula
{
  "field": "calculated_gpa",
  "type": "calculated",
  "formula": "SUM(grades.points * grades.credits) / SUM(grades.credits)",
  "precision": 2,
  "recalculateTriggers": [
    "grades.points",
    "grades.credits"
  ]
}`}
                  language="json"
                  filename="calculated-field.json"
                />
              </TabsContent>

              <TabsContent value="import" className="p-4 border rounded-md mt-2">
                <p>Efficiently manage custom field data across many records using bulk import and export tools.</p>

                <div className="bg-muted p-4 rounded-md my-4">
                  <h4 className="font-medium mb-2">Supported Import Formats</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground ml-4">
                    <li>CSV</li>
                    <li>Excel (.xlsx)</li>
                    <li>JSON</li>
                  </ul>
                </div>

                <Callout icon="info" title="Template Download">
                  You can download import templates that include your custom fields from the Import/Export section.
                  These templates include validation rules to help ensure your data is formatted correctly.
                </Callout>
              </TabsContent>
            </Tabs>
          </div>

          <div className="not-prose my-8 flex flex-col items-center rounded-lg bg-gradient-to-r from-slate-50 to-slate-100 p-8 dark:from-slate-800/50 dark:to-slate-800 md:flex-row md:justify-between">
            <div>
              <h3 className="text-xl font-bold">Ready to explore workflow automation?</h3>
              <p className="text-slate-700 dark:text-slate-400">
                Learn how to automate processes using custom fields and triggers.
              </p>
            </div>
            <a
              href="/workflow-automation"
              className="mt-4 md:mt-0 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Workflow Automation
            </a>
          </div>
        </div>
      </div>
    </DocsLayout>
  )
}

