import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileJson, Key, Lock, Server, Shield, Webhook, CheckCircle2, XCircle } from "lucide-react"
import { DocsLayout } from "@/components/docs-layout"
import { PageHeader } from "@/components/page-header"
import CodeBlock from "@/components/code-block"
import { Callout } from "@/components/callout"
import { Steps } from "@/components/steps"
import { Step } from "@/components/step"

export default function ApiIntegrationPage() {
  return (
    <DocsLayout>
      <div className="space-y-8">
      <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Api Integration</h1>

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
            SchoolSync provides a comprehensive REST API that allows you to integrate with external systems, build
            custom applications, and extend the platform's functionality. This guide will help you understand how to use
            the API effectively.
          </p>

          <div className="not-prose my-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Server className="h-5 w-5 mr-2 text-primary" />
                  REST Architecture
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Standard HTTP methods and status codes with JSON responses for easy integration.</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-primary" />
                  Secure Access
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>API keys and OAuth 2.0 authentication with fine-grained permission controls.</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Webhook className="h-5 w-5 mr-2 text-primary" />
                  Webhooks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Real-time notifications for system events to keep external systems in sync.</p>
              </CardContent>
            </Card>
          </div>

          <h2 id="authentication" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Authentication
          </h2>
          <p>All API requests require authentication. SchoolSync supports two authentication methods:</p>

          <div className="not-prose my-6">
            <Tabs defaultValue="api-key" className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="api-key">API Key Authentication</TabsTrigger>
                <TabsTrigger value="oauth">OAuth 2.0</TabsTrigger>
              </TabsList>

              <TabsContent value="api-key" className="p-4 border rounded-md mt-2">
                <div className="flex items-center gap-2 mb-4">
                  <Key className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-medium m-0">API Key Authentication</h3>
                </div>

                <p className="mb-4">
                  API keys provide a simple way to authenticate API requests. Each key is associated with a specific
                  user account and inherits that user's permissions.
                </p>

                <Steps>
                  <Step number={1} title="Generate an API Key">
                    <p className="text-muted-foreground">
                      Go to <strong>Settings</strong> {"->"} <strong>API</strong> {"->"} <strong>API Keys</strong> and
                      click "Generate New Key"
                    </p>
                  </Step>
                  <Step number={2} title="Name your key and set permissions">
                    <p className="text-muted-foreground">
                      Give your key a descriptive name and select the appropriate permission scope
                    </p>
                  </Step>
                  <Step number={3} title="Store your key securely">
                    <p className="text-muted-foreground">
                      Copy and store your API key in a secure location. It will only be shown once.
                    </p>
                  </Step>
                  <Step number={4} title="Use the key in API requests">
                    <p className="text-muted-foreground">Include the API key in the request header</p>
                  </Step>
                </Steps>

                <CodeBlock
                  code={`// Example API request with API key authentication
fetch('https://api.schoolsync.example.com/v1/students', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'your_api_key_here'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}
                  language="javascript"
                  filename="api-key-example.js"
                />

                <Callout icon="warning" title="Security Warning">
                  Never expose your API key in client-side code or public repositories. Always make API calls from your
                  server-side code.
                </Callout>
              </TabsContent>

              <TabsContent value="oauth" className="p-4 border rounded-md mt-2">
                <div className="flex items-center gap-2 mb-4">
                  <Lock className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-medium m-0">OAuth 2.0 Authentication</h3>
                </div>

                <p className="mb-4">
                  OAuth 2.0 is recommended for applications that need to access SchoolSync on behalf of users. It
                  provides a secure way to grant limited access without sharing user credentials.
                </p>

                <Steps>
                  <Step number={1} title="Register your application">
                    <p className="text-muted-foreground">
                      Go to <strong>Settings</strong> {"->"} <strong>API</strong> {"->"}{" "}
                      <strong>OAuth Applications</strong> and click "Register New App"
                    </p>
                  </Step>
                  <Step number={2} title="Configure OAuth settings">
                    <p className="text-muted-foreground">
                      Provide your application name, website URL, and redirect URI
                    </p>
                  </Step>
                  <Step number={3} title="Define required scopes">
                    <p className="text-muted-foreground">Select the permission scopes your application needs</p>
                  </Step>
                  <Step number={4} title="Implement OAuth flow">
                    <p className="text-muted-foreground">
                      Use the client ID and secret to implement the OAuth authorization flow
                    </p>
                  </Step>
                </Steps>

                <div className="bg-muted p-4 rounded-md my-4">
                  <h4 className="font-medium mb-2">Available OAuth Scopes</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center">
                      <Badge className="mr-2">read:students</Badge>
                      <span className="text-sm">Read student data</span>
                    </div>
                    <div className="flex items-center">
                      <Badge className="mr-2">write:students</Badge>
                      <span className="text-sm">Modify student data</span>
                    </div>
                    <div className="flex items-center">
                      <Badge className="mr-2">read:classes</Badge>
                      <span className="text-sm">Read class data</span>
                    </div>
                    <div className="flex items-center">
                      <Badge className="mr-2">write:classes</Badge>
                      <span className="text-sm">Modify class data</span>
                    </div>
                    <div className="flex items-center">
                      <Badge className="mr-2">read:grades</Badge>
                      <span className="text-sm">Read grade data</span>
                    </div>
                    <div className="flex items-center">
                      <Badge className="mr-2">write:grades</Badge>
                      <span className="text-sm">Modify grade data</span>
                    </div>
                  </div>
                </div>

                <CodeBlock
                  code={`// Example OAuth 2.0 authorization flow
// Step 1: Redirect user to authorization URL
const authUrl = 'https://schoolsync.example.com/oauth/authorize?' +
  'client_id=YOUR_CLIENT_ID&' +
  'redirect_uri=YOUR_REDIRECT_URI&' +
  'response_type=code&' +
  'scope=read:students read:classes';

// Step 2: Exchange authorization code for access token
// After user authorizes and is redirected back with a code
async function getAccessToken(authorizationCode) {
  const response = await fetch('https://api.schoolsync.example.com/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      client_id: 'YOUR_CLIENT_ID',
      client_secret: 'YOUR_CLIENT_SECRET',
      code: authorizationCode,
      grant_type: 'authorization_code',
      redirect_uri: 'YOUR_REDIRECT_URI'
    })
  });
  
  return await response.json();
  // Returns: { access_token, refresh_token, expires_in, token_type }
}`}
                  language="javascript"
                  filename="oauth-flow.js"
                />
              </TabsContent>
            </Tabs>
          </div>

          <h2 id="api-endpoints" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            API Endpoints
          </h2>
          <p>
            SchoolSync's API is organized around RESTful resources. All requests should be made to the base URL:{" "}
            <code>https://api.schoolsync.example.com/v1/</code>
          </p>

          <div className="not-prose my-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Resource</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Endpoints</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Students</div>
                  </TableCell>
                  <TableCell>Manage student records</TableCell>
                  <TableCell>
                    <code className="text-xs">/students</code>
                    <br />
                    <code className="text-xs">/students/:id</code>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Staff</div>
                  </TableCell>
                  <TableCell>Manage staff and teacher records</TableCell>
                  <TableCell>
                    <code className="text-xs">/staff</code>
                    <br />
                    <code className="text-xs">/staff/:id</code>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Classes</div>
                  </TableCell>
                  <TableCell>Manage classes and sections</TableCell>
                  <TableCell>
                    <code className="text-xs">/classes</code>
                    <br />
                    <code className="text-xs">/classes/:id</code>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Attendance</div>
                  </TableCell>
                  <TableCell>Record and retrieve attendance data</TableCell>
                  <TableCell>
                    <code className="text-xs">/attendance</code>
                    <br />
                    <code className="text-xs">/attendance/:id</code>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Grades</div>
                  </TableCell>
                  <TableCell>Manage grades and assessments</TableCell>
                  <TableCell>
                    <code className="text-xs">/grades</code>
                    <br />
                    <code className="text-xs">/grades/:id</code>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Calendar</div>
                  </TableCell>
                  <TableCell>Access school calendar and events</TableCell>
                  <TableCell>
                    <code className="text-xs">/calendar</code>
                    <br />
                    <code className="text-xs">/calendar/events/:id</code>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <Callout icon="info" title="API Documentation">
            For a complete list of endpoints, parameters, and response formats, refer to our{" "}
            <a href="#" className="font-medium underline">
              API Reference Documentation
            </a>
            .
          </Callout>

          <h3 id="common-operations" className="scroll-m-20 text-2xl font-semibold tracking-tight mt-8">
            Common API Operations
          </h3>
          <p>Here are examples of common operations you can perform with the SchoolSync API:</p>

          <div className="not-prose my-6">
            <Tabs defaultValue="retrieve" className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="retrieve">Retrieving Data</TabsTrigger>
                <TabsTrigger value="create">Creating Records</TabsTrigger>
                <TabsTrigger value="update">Updating Records</TabsTrigger>
                <TabsTrigger value="delete">Deleting Records</TabsTrigger>
              </TabsList>

              <TabsContent value="retrieve" className="p-4 border rounded-md mt-2">
                <h4 className="text-lg font-medium mb-4">Retrieving Data</h4>

                <p className="mb-4">
                  Use GET requests to retrieve data from SchoolSync. You can filter, sort, and paginate results using
                  query parameters.
                </p>

                <CodeBlock
                  code={`// Example: Get a list of students in grade 10
fetch('https://api.schoolsync.example.com/v1/students?grade_level=10&sort=last_name&limit=50', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));

// Example: Get a specific student by ID
fetch('https://api.schoolsync.example.com/v1/students/12345', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}
                  language="javascript"
                  filename="get-examples.js"
                />

                <div className="bg-muted p-4 rounded-md my-4">
                  <h5 className="font-medium mb-2">Common Query Parameters</h5>
                  <ul className="space-y-1 text-sm">
                    <li>
                      <strong>filter</strong>: Filter records by field values
                    </li>
                    <li>
                      <strong>sort</strong>: Sort results by field (prefix with - for descending)
                    </li>
                    <li>
                      <strong>limit</strong>: Maximum number of records to return
                    </li>
                    <li>
                      <strong>offset</strong>: Number of records to skip (for pagination)
                    </li>
                    <li>
                      <strong>include</strong>: Include related records
                    </li>
                    <li>
                      <strong>fields</strong>: Specify which fields to include in the response
                    </li>
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="create" className="p-4 border rounded-md mt-2">
                <h4 className="text-lg font-medium mb-4">Creating Records</h4>

                <p className="mb-4">Use POST requests to create new records in SchoolSync.</p>

                <CodeBlock
                  code={`// Example: Create a new student
fetch('https://api.schoolsync.example.com/v1/students', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
  },
  body: JSON.stringify({
    first_name: 'John',
    last_name: 'Smith',
    email: 'john.smith@example.com',
    grade_level: '9',
    date_of_birth: '2008-05-15',
    gender: 'male',
    address: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345'
    },
    parent_contacts: [
      {
        name: 'Jane Smith',
        relationship: 'Mother',
        email: 'jane.smith@example.com',
        phone: '555-123-4567'
      }
    ]
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}
                  language="javascript"
                  filename="post-example.js"
                />

                <Callout icon="info" title="Response">
                  Successful creation requests return HTTP status 201 (Created) and include the newly created resource
                  in the response body, including its unique ID.
                </Callout>
              </TabsContent>

              <TabsContent value="update" className="p-4 border rounded-md mt-2">
                <h4 className="text-lg font-medium mb-4">Updating Records</h4>

                <p className="mb-4">Use PUT or PATCH requests to update existing records in SchoolSync.</p>

                <div className="space-y-4">
                  <div>
                    <h5 className="font-medium">PUT vs PATCH</h5>
                    <ul className="list-disc list-inside text-sm ml-4">
                      <li>
                        <strong>PUT</strong>: Replaces the entire resource with the provided data
                      </li>
                      <li>
                        <strong>PATCH</strong>: Updates only the specified fields, leaving others unchanged
                      </li>
                    </ul>
                  </div>
                </div>

                <CodeBlock
                  code={`// Example: Update specific fields of a student (PATCH)
fetch('https://api.schoolsync.example.com/v1/students/12345', {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
  },
  body: JSON.stringify({
    grade_level: '10',
    address: {
      street: '456 Oak Avenue',
      city: 'Newtown'
    }
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}
                  language="javascript"
                  filename="patch-example.js"
                />

                <Callout icon="info" title="Response">
                  Successful update requests return HTTP status 200 (OK) and include the updated resource in the
                  response body.
                </Callout>
              </TabsContent>

              <TabsContent value="delete" className="p-4 border rounded-md mt-2">
                <h4 className="text-lg font-medium mb-4">Deleting Records</h4>

                <p className="mb-4">Use DELETE requests to remove records from SchoolSync.</p>

                <CodeBlock
                  code={`// Example: Delete a student
fetch('https://api.schoolsync.example.com/v1/students/12345', {
  method: 'DELETE',
  headers: {
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
  }
})
.then(response => {
  if (response.status === 204) {
    console.log('Student deleted successfully');
  } else {
    return response.json().then(error => Promise.reject(error));
  }
})
.catch(error => console.error('Error:', error));`}
                  language="javascript"
                  filename="delete-example.js"
                />

                <Callout icon="warning" title="Important">
                  Deletion is permanent and cannot be undone. Consider using a status field to mark records as inactive
                  instead of deleting them when appropriate.
                </Callout>
              </TabsContent>
            </Tabs>
          </div>

          <h2 id="webhooks" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Webhooks
          </h2>
          <p>
            Webhooks allow external applications to receive real-time notifications when specific events occur in
            SchoolSync. Instead of polling the API for changes, your application can be notified immediately when
            relevant data is created, updated, or deleted.
          </p>

          <div className="not-prose my-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Webhook className="h-5 w-5 mr-2 text-primary" />
                    Setting Up Webhooks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Steps>
                    <Step number={1} title="Create an endpoint">
                      <p className="text-muted-foreground">
                        Create an HTTPS endpoint on your server that can receive POST requests
                      </p>
                    </Step>
                    <Step number={2} title="Register the webhook">
                      <p className="text-muted-foreground">
                        Go to <strong>Settings</strong> {"->"} <strong>API</strong> {"->"} <strong>Webhooks</strong> and
                        click "Add Webhook"
                      </p>
                    </Step>
                    <Step number={3} title="Configure events">
                      <p className="text-muted-foreground">Select which events should trigger the webhook</p>
                    </Step>
                    <Step number={4} title="Set secret key">
                      <p className="text-muted-foreground">Generate a secret key to verify webhook payloads</p>
                    </Step>
                  </Steps>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileJson className="h-5 w-5 mr-2 text-primary" />
                    Webhook Payload
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Each webhook delivery includes:</p>
                  <ul className="space-y-2">
                    <li className="flex">
                      <span className="text-primary mr-2">•</span>
                      <span>
                        Event type (e.g., <code>student.created</code>)
                      </span>
                    </li>
                    <li className="flex">
                      <span className="text-primary mr-2">•</span>
                      <span>Timestamp of the event</span>
                    </li>
                    <li className="flex">
                      <span className="text-primary mr-2">•</span>
                      <span>Unique event ID</span>
                    </li>
                    <li className="flex">
                      <span className="text-primary mr-2">•</span>
                      <span>The affected resource data</span>
                    </li>
                    <li className="flex">
                      <span className="text-primary mr-2">•</span>
                      <span>Signature for verification</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6">
              <CodeBlock
                code={`// Example webhook payload
{
  "event": "student.updated",
  "timestamp": "2023-05-05T14:30:00Z",
  "event_id": "evt_12345abcde",
  "data": {
    "id": "12345",
    "first_name": "John",
    "last_name": "Smith",
    "grade_level": "10",
    "updated_at": "2023-05-05T14:29:55Z",
    "updated_fields": ["grade_level"]
  },
  "signature": "sha256=..."
}`}
                language="json"
                filename="webhook-payload.json"
              />
            </div>

            <div className="mt-6">
              <CodeBlock
                code={`// Example: Verifying webhook signatures
const crypto = require('crypto');

function verifyWebhookSignature(payload, signature, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  const expectedSignature = 'sha256=' + hmac.update(JSON.stringify(payload)).digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

// In your webhook handler
app.post('/webhook', (req, res) => {
  const signature = req.headers['x-schoolsync-signature'];
  const payload = req.body;
  
  if (!verifyWebhookSignature(payload, signature, process.env.WEBHOOK_SECRET)) {
    return res.status(401).send('Invalid signature');
  }
  
  // Process the webhook
  console.log('Received event:', payload.event);
  
  // Handle different event types
  switch (payload.event) {
    case 'student.created':
      // Handle new student
      break;
    case 'student.updated':
      // Handle student update
      break;
    // ...
  }
  
  res.status(200).send('Webhook received');
});`}
                language="javascript"
                filename="webhook-verification.js"
              />
            </div>
          </div>

          <Callout icon="info" title="Webhook Best Practices">
            <ul className="list-disc list-inside">
              <li>Respond to webhook deliveries quickly (within 5 seconds) to avoid timeouts</li>
              <li>Implement retry logic in case your endpoint is temporarily unavailable</li>
              <li>Always verify webhook signatures to ensure authenticity</li>
              <li>Process webhooks asynchronously for time-consuming operations</li>
            </ul>
          </Callout>

          <h2 id="rate-limiting" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Rate Limiting
          </h2>
          <p>
            To ensure system stability and fair usage, SchoolSync implements rate limiting on API requests. Rate limits
            are applied per API key or OAuth token.
          </p>

          <div className="not-prose my-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Plan</TableHead>
                  <TableHead>Rate Limit</TableHead>
                  <TableHead>Burst Limit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Standard</div>
                  </TableCell>
                  <TableCell>60 requests per minute</TableCell>
                  <TableCell>100 requests</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Premium</div>
                  </TableCell>
                  <TableCell>300 requests per minute</TableCell>
                  <TableCell>500 requests</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Enterprise</div>
                  </TableCell>
                  <TableCell>1000 requests per minute</TableCell>
                  <TableCell>2000 requests</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <p>
            When you exceed your rate limit, the API will return a 429 Too Many Requests response. The response headers
            include information about your current rate limit status:
          </p>

          <div className="not-prose my-6">
            <CodeBlock
              code={`X-RateLimit-Limit: 60
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1620000000
Retry-After: 30`}
              language="http"
              filename="rate-limit-headers.txt"
              showLineNumbers={false}
            />
          </div>

          <Callout icon="tip" title="Handling Rate Limits">
            <p>Implement exponential backoff in your API clients to handle rate limiting gracefully:</p>
            <CodeBlock
              code={`function fetchWithRetry(url, options, maxRetries = 3) {
  return fetch(url, options)
    .then(response => {
      if (response.status === 429 && maxRetries > 0) {
        const retryAfter = response.headers.get('Retry-After') || 5;
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(fetchWithRetry(url, options, maxRetries - 1));
          }, retryAfter * 1000);
        });
      }
      return response;
    });
}`}
              language="javascript"
              filename="retry-logic.js"
              showLineNumbers={false}
            />
          </Callout>

          <h2 id="error-handling" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Error Handling
          </h2>
          <p>
            The SchoolSync API uses standard HTTP status codes and returns detailed error messages to help you
            troubleshoot issues.
          </p>

          <div className="not-prose my-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Status Code</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Common Causes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center">
                      <Badge className="mr-2 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">400</Badge>
                      <span className="font-medium">Bad Request</span>
                    </div>
                  </TableCell>
                  <TableCell>The request was malformed or invalid</TableCell>
                  <TableCell>Missing required fields, invalid data format</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center">
                      <Badge className="mr-2 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">401</Badge>
                      <span className="font-medium">Unauthorized</span>
                    </div>
                  </TableCell>
                  <TableCell>Authentication is required</TableCell>
                  <TableCell>Missing or invalid API key/token</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center">
                      <Badge className="mr-2 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">403</Badge>
                      <span className="font-medium">Forbidden</span>
                    </div>
                  </TableCell>
                  <TableCell>The request is not allowed</TableCell>
                  <TableCell>Insufficient permissions, IP restriction</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center">
                      <Badge className="mr-2 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">404</Badge>
                      <span className="font-medium">Not Found</span>
                    </div>
                  </TableCell>
                  <TableCell>The requested resource does not exist</TableCell>
                  <TableCell>Invalid ID, deleted resource</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center">
                      <Badge className="mr-2 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">429</Badge>
                      <span className="font-medium">Too Many Requests</span>
                    </div>
                  </TableCell>
                  <TableCell>Rate limit exceeded</TableCell>
                  <TableCell>Too many requests in a short period</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center">
                      <Badge className="mr-2 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">500</Badge>
                      <span className="font-medium">Server Error</span>
                    </div>
                  </TableCell>
                  <TableCell>An error occurred on the server</TableCell>
                  <TableCell>Internal system error, temporary outage</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <p>Error responses include a JSON body with details about the error:</p>

          <div className="not-prose my-6">
            <CodeBlock
              code={`{
  "error": {
    "code": "validation_error",
    "message": "The request was invalid",
    "details": [
      {
        "field": "email",
        "message": "Must be a valid email address"
      },
      {
        "field": "grade_level",
        "message": "Must be between 1 and 12"
      }
    ]
  }
}`}
              language="json"
              filename="error-response.json"
            />
          </div>

          <h2 id="code-examples" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Code Examples
          </h2>
          <p>Here are examples of how to integrate with the SchoolSync API in different programming languages:</p>

          <div className="not-prose my-6">
            <Tabs defaultValue="javascript" className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                <TabsTrigger value="python">Python</TabsTrigger>
                <TabsTrigger value="php">PHP</TabsTrigger>
                <TabsTrigger value="csharp">C#</TabsTrigger>
              </TabsList>

              <TabsContent value="javascript" className="p-4 border rounded-md mt-2">
                <h4 className="text-lg font-medium mb-4">JavaScript/Node.js Example</h4>

                <CodeBlock
                  code={`// Using Node.js with Axios
const axios = require('axios');

class SchoolSyncClient {
  constructor(apiKey, baseUrl = 'https://api.schoolsync.example.com/v1') {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  async getStudents(params = {}) {
    try {
      const response = await axios.get(\`\${this.baseUrl}/students\`, {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': this.apiKey
        },
        params
      });
      return response.data;
    } catch (error) {
      this._handleError(error);
    }
  }

  async getStudent(id) {
    try {
      const response = await axios.get(\`\${this.baseUrl}/students/\${id}\`, {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': this.apiKey
        }
      });
      return response.data;
    } catch (error) {
      this._handleError(error);
    }
  }

  async createStudent(data) {
    try {
      const response = await axios.post(\`\${this.baseUrl}/students\`, data, {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': this.apiKey
        }
      });
      return response.data;
    } catch (error) {
      this._handleError(error);
    }
  }

  _handleError(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Error:', error.response.data);
      throw new Error(\`API Error: \${error.response.data.error?.message || 'Unknown error'}\`);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
      throw new Error('No response received from API');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Request error:', error.message);
      throw error;
    }
  }
}

// Usage example
async function main() {
  const client = new SchoolSyncClient('your_api_key_here');
  
  try {
    // Get students in grade 10
    const students = await client.getStudents({ grade_level: 10 });
    console.log(\`Found \${students.length} students in grade 10\`);
    
    // Get a specific student
    const student = await client.getStudent('12345');
    console.log(\`Student details: \${student.first_name} \${student.last_name}\`);
    
    // Create a new student
    const newStudent = await client.createStudent({
      first_name: 'Jane',
      last_name: 'Doe',
      email: 'jane.doe@example.com',
      grade_level: '9'
    });
    console.log(\`Created new student with ID: \${newStudent.id}\`);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();`}
                  language="javascript"
                  filename="javascript-example.js"
                />
              </TabsContent>

              <TabsContent value="python" className="p-4 border rounded-md mt-2">
                <h4 className="text-lg font-medium mb-4">Python Example</h4>

                <CodeBlock
                  code={`# Using Python with requests
import requests

class SchoolSyncClient:
    def __init__(self, api_key, base_url='https://api.schoolsync.example.com/v1'):
        self.api_key = api_key
        self.base_url = base_url
        self.headers = {
            'Content-Type': 'application/json',
            'X-API-Key': api_key
        }
    
    def get_students(self, **params):
        response = requests.get(
            f"{self.base_url}/students",
            headers=self.headers,
            params=params
        )
        response.raise_for_status()
        return response.json()
    
    def get_student(self, student_id):
        response = requests.get(
            f"{self.base_url}/students/{student_id}",
            headers=self.headers
        )
        response.raise_for_status()
        return response.json()
    
    def create_student(self, data):
        response = requests.post(
            f"{self.base_url}/students",
            headers=self.headers,
            json=data
        )
        response.raise_for_status()
        return response.json()
    
    def update_student(self, student_id, data):
        response = requests.patch(
            f"{self.base_url}/students/{student_id}",
            headers=self.headers,
            json=data
        )
        response.raise_for_status()
        return response.json()
    
    def delete_student(self, student_id):
        response = requests.delete(
            f"{self.base_url}/students/{student_id}",
            headers=self.headers
        )
        response.raise_for_status()
        return response.status_code == 204

# Usage example
if __name__ == "__main__":
    client = SchoolSyncClient('your_api_key_here')
    
    try:
        # Get students in grade 10
        students = client.get_students(grade_level=10)
        print(f"Found {len(students)} students in grade 10")
        
        # Get a specific student
        student = client.get_student('12345')
        print(f"Student details: {student['first_name']} {student['last_name']}")
        
        # Create a new student
        new_student = client.create_student({
            'first_name': 'Jane',
            'last_name': 'Doe',
            'email': 'jane.doe@example.com',
            'grade_level': '9'
        })
        print(f"Created new student with ID: {new_student['id']}")
        
    except requests.exceptions.HTTPError as e:
        print(f"HTTP Error: {e}")
        if e.response is not None:
            print(f"Error details: {e.response.json()}")
    except Exception as e:
        print(f"Error: {e}")`}
                  language="python"
                  filename="python-example.py"
                />
              </TabsContent>

              <TabsContent value="php" className="p-4 border rounded-md mt-2">
                <h4 className="text-lg font-medium mb-4">PHP Example</h4>

                <CodeBlock
                  code={`<?php
// Using PHP with cURL
class SchoolSyncClient {
    private $apiKey;
    private $baseUrl;
    
    public function __construct($apiKey, $baseUrl = 'https://api.schoolsync.example.com/v1') {
        $this->apiKey = $apiKey;
        $this->baseUrl = $baseUrl;
    }
    
    public function getStudents($params = []) {
        $url = $this->baseUrl . '/students';
        if (!empty($params)) {
            $url .= '?' . http_build_query($params);
        }
        return $this->request('GET', $url);
    }
    
    public function getStudent($id) {
        return $this->request('GET', $this->baseUrl . '/students/' . $id);
    }
    
    public function createStudent($data) {
        return $this->request('POST', $this->baseUrl . '/students', $data);
    }
    
    public function updateStudent($id, $data) {
        return $this->request('PATCH', $this->baseUrl . '/students/' . $id, $data);
    }
    
    public function deleteStudent($id) {
        return $this->request('DELETE', $this->baseUrl . '/students/' . $id);
    }
    
    private function request($method, $url, $data = null) {
        $curl = curl_init();
        
        $options = [
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => $method,
            CURLOPT_HTTPHEADER => [
                'Content-Type: application/json',
                'X-API-Key: ' . $this->apiKey
            ],
        ];
        
        if ($data !== null) {
            $options[CURLOPT_POSTFIELDS] = json_encode($data);
        }
        
        curl_setopt_array($curl, $options);
        
        $response = curl_exec($curl);
        $err = curl_error($curl);
        $httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
        
        curl_close($curl);
        
        if ($err) {
            throw new Exception("cURL Error: " . $err);
        }
        
        $responseData = json_decode($response, true);
        
        if ($httpCode >= 400) {
            $errorMessage = isset($responseData['error']['message']) 
                ? $responseData['error']['message'] 
                : 'Unknown error';
            throw new Exception("API Error ({$httpCode}): {$errorMessage}");
        }
        
        return $responseData;
    }
}

// Usage example
try {
    $client = new SchoolSyncClient('your_api_key_here');
    
    // Get students in grade 10
    $students = $client->getStudents(['grade_level' => 10]);
    echo "Found " . count($students) . " students in grade 10\n";
    
    // Get a specific student
    $student = $client->getStudent('12345');
    echo "Student details: {$student['first_name']} {$student['last_name']}\n";
    
    // Create a new student
    $newStudent = $client->createStudent([
        'first_name' => 'Jane',
        'last_name' => 'Doe',
        'email' => 'jane.doe@example.com',
        'grade_level' => '9'
    ]);
    echo "Created new student with ID: {$newStudent['id']}\n";
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
?>`}
                  language="php"
                  filename="php-example.php"
                />
              </TabsContent>

              <TabsContent value="csharp" className="p-4 border rounded-md mt-2">
                <h4 className="text-lg font-medium mb-4">C# Example</h4>

                <CodeBlock
                  code={`// Using C# with HttpClient
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace SchoolSyncExample
{
    public class SchoolSyncClient
    {
        private readonly HttpClient _httpClient;
        private readonly string _baseUrl;
        
        public SchoolSyncClient(string apiKey, string baseUrl = "https://api.schoolsync.example.com/v1")
        {
            _baseUrl = baseUrl;
            _httpClient = new HttpClient();
            _httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            _httpClient.DefaultRequestHeaders.Add("X-API-Key", apiKey);
        }
        
        public async Task<List<Student>> GetStudentsAsync(Dictionary<string, string> parameters = null)
        {
            string url = $"{_baseUrl}/students";
            
            if (parameters != null && parameters.Count > 0)
            {
                var queryString = new StringBuilder("?");
                foreach (var param in parameters)
                {
                    queryString.Append($"{Uri.EscapeDataString(param.Key)}={Uri.EscapeDataString(param.Value)}&");
                }
                url += queryString.ToString().TrimEnd('&');
            }
            
            HttpResponseMessage response = await _httpClient.GetAsync(url);
            await EnsureSuccessStatusCodeAsync(response);
            
            string content = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<List<Student>>(content, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
        }
        
        public async Task<Student> GetStudentAsync(string id)
        {
            HttpResponseMessage response = await _httpClient.GetAsync($"{_baseUrl}/students/{id}");
            await EnsureSuccessStatusCodeAsync(response);
            
            string content = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<Student>(content, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
        }
        
        public async Task<Student> CreateStudentAsync(Student student)
        {
            string json = JsonSerializer.Serialize(student);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            
            HttpResponseMessage response = await _httpClient.PostAsync($"{_baseUrl}/students", content);
            await EnsureSuccessStatusCodeAsync(response);
            
            string responseContent = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<Student>(responseContent, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
        }
        
        private async Task EnsureSuccessStatusCodeAsync(HttpResponseMessage response)
        {
            if (!response.IsSuccessStatusCode)
            {
                string content = await response.Content.ReadAsStringAsync();
                var error = JsonSerializer.Deserialize<ErrorResponse>(content, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
                throw new ApiException(error?.Error?.Message ?? "Unknown API error", (int)response.StatusCode, error);
            }
        }
    }
    
    public class Student
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string GradeLevel { get; set; }
        // Add other properties as needed
    }
    
    public class ErrorResponse
    {
        public ErrorDetails Error { get; set; }
    }
    
    public class ErrorDetails
    {
        public string Code { get; set; }
        public string Message { get; set; }
        public List<ValidationError> Details { get; set; }
    }
    
    public class ValidationError
    {
        public string Field { get; set; }
        public string Message { get; set; }
    }
    
    public class ApiException : Exception
    {
        public int StatusCode { get; }
        public ErrorResponse Error { get; }
        
        public ApiException(string message, int statusCode, ErrorResponse error) : base(message)
        {
            StatusCode = statusCode;
            Error = error;
        }
    }
    
    class Program
    {
        static async Task Main(string[] args)
        {
            try
            {
                var client = new SchoolSyncClient("your_api_key_here");
                
                // Get students in grade 10
                var parameters = new Dictionary<string, string> { { "grade_level", "10" } };
                var students = await client.GetStudentsAsync(parameters);
                Console.WriteLine($"Found {students.Count} students in grade 10");
                
                // Get a specific student
                var student = await client.GetStudentAsync("12345");
                Console.WriteLine($"Student details: {student.FirstName} {student.LastName}");
                
                // Create a new student
                var newStudent = await client.CreateStudentAsync(new Student
                {
                    FirstName = "Jane",
                    LastName = "Doe",
                    Email = "jane.doe@example.com",
                    GradeLevel = "9"
                });
                Console.WriteLine($"Created new student with ID: {newStudent.Id}");
            }
            catch (ApiException ex)
            {
                Console.WriteLine($"API Error ({ex.StatusCode}): {ex.Message}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
            }
        }
    }
}`}
                  language="csharp"
                  filename="csharp-example.cs"
                />
              </TabsContent>
            </Tabs>
          </div>

          <h2 id="best-practices" className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">
            Best Practices
          </h2>
          <p>Follow these recommendations to build robust and efficient integrations with the SchoolSync API:</p>

          <div className="not-prose my-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />
                  Do This
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex">
                    <span className="text-green-500 mr-2">•</span>
                    <span>Use pagination for large data sets</span>
                  </li>
                  <li className="flex">
                    <span className="text-green-500 mr-2">•</span>
                    <span>Implement proper error handling</span>
                  </li>
                  <li className="flex">
                    <span className="text-green-500 mr-2">•</span>
                    <span>Cache responses when appropriate</span>
                  </li>
                  <li className="flex">
                    <span className="text-green-500 mr-2">•</span>
                    <span>Use webhooks for real-time updates</span>
                  </li>
                  <li className="flex">
                    <span className="text-green-500 mr-2">•</span>
                    <span>Implement retry logic with exponential backoff</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <XCircle className="h-5 w-5 mr-2 text-red-500" />
                  Avoid This
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex">
                    <span className="text-red-500 mr-2">•</span>
                    <span>Exposing API keys in client-side code</span>
                  </li>
                  <li className="flex">
                    <span className="text-red-500 mr-2">•</span>
                    <span>Polling the API at high frequencies</span>
                  </li>
                  <li className="flex">
                    <span className="text-red-500 mr-2">•</span>
                    <span>Making unnecessary API calls</span>
                  </li>
                  <li className="flex">
                    <span className="text-red-500 mr-2">•</span>
                    <span>Ignoring rate limits and error responses</span>
                  </li>
                  <li className="flex">
                    <span className="text-red-500 mr-2">•</span>
                    <span>Using outdated API versions</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Callout icon="tip" title="Performance Tip">
            When retrieving large datasets, use the <code>fields</code> parameter to request only the fields you need,
            and use pagination to limit the number of records returned in each request.
          </Callout>

          <div className="not-prose my-8 flex flex-col items-center rounded-lg bg-gradient-to-r from-slate-50 to-slate-100 p-8 dark:from-slate-800/50 dark:to-slate-800 md:flex-row md:justify-between">
            <div>
              <h3 className="text-xl font-bold">Need help with your integration?</h3>
              <p className="text-slate-700 dark:text-slate-400">
                Our support team is ready to assist with your API integration questions.
              </p>
            </div>
            <a
              href="/support-resources"
              className="mt-4 md:mt-0 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </DocsLayout>
  )
}

