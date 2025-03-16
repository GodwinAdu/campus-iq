"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/hooks/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const FormSchema = z.object({
    notifications: z.object({
        overdueSubscriptionAlert: z.boolean().default(false),
        subscriptionRenewalReminder: z.boolean().default(false),
        paymentConfirmation: z.boolean().default(false),
        invoiceGenerated: z.boolean().default(false),

        attendanceAlerts: z.boolean().default(false),
        reportCardRelease: z.boolean().default(false),
        examSchedule: z.boolean().default(false),
        parentMeetingReminder: z.boolean().default(false),

        salaryPayment: z.boolean().default(false),
        staffMeeting: z.boolean().default(false),

        unauthorizedLoginAttempt: z.boolean().default(false),
        accountSuspension: z.boolean().default(false),

        emailNotifications: z.boolean().default(false),
        pushNotifications: z.boolean().default(false),
    }),
})

interface ISchool {
    notifications?: {
        overdueSubscriptionAlert?: boolean
        subscriptionRenewalReminder?: boolean
        paymentConfirmation?: boolean
        invoiceGenerated?: boolean
        attendanceAlerts?: boolean
        reportCardRelease?: boolean
        examSchedule?: boolean
        parentMeetingReminder?: boolean
        salaryPayment?: boolean
        staffMeeting?: boolean
        unauthorizedLoginAttempt?: boolean
        accountSuspension?: boolean
        emailNotifications?: boolean
        pushNotifications?: boolean
    }
}

export function NotificationForm({ school }: { school: ISchool }) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: school ?? {
            notifications: {
                overdueSubscriptionAlert: false,
                subscriptionRenewalReminder: false,
                paymentConfirmation: false,
                invoiceGenerated: false,

                attendanceAlerts: false,
                reportCardRelease: false,
                examSchedule: false,
                parentMeetingReminder: false,

                salaryPayment: false,
                staffMeeting: false,

                unauthorizedLoginAttempt: false,
                accountSuspension: false,

                emailNotifications: false,
                pushNotifications: false,
            },
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                <Card>
                    <CardContent className="space-y-6">
                        {/* Billing & Subscription Notifications */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Billing & Subscription</h3>
                            <Separator />
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="notifications.overdueSubscriptionAlert"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                            <div className="space-y-0.5">
                                                <FormLabel>Overdue Subscription Alert</FormLabel>
                                                <FormDescription>Send a notification when a subscription is overdue.</FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="notifications.subscriptionRenewalReminder"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                            <div className="space-y-0.5">
                                                <FormLabel>Subscription Renewal Reminder</FormLabel>
                                                <FormDescription>Receive reminders before your subscription renews.</FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="notifications.paymentConfirmation"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                            <div className="space-y-0.5">
                                                <FormLabel>Payment Confirmation</FormLabel>
                                                <FormDescription>Receive notifications when payments are processed.</FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="notifications.invoiceGenerated"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                            <div className="space-y-0.5">
                                                <FormLabel>Invoice Generated</FormLabel>
                                                <FormDescription>Get notified when new invoices are generated.</FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Academic Notifications */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Academic Updates</h3>
                            <Separator />
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="notifications.attendanceAlerts"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                            <div className="space-y-0.5">
                                                <FormLabel>Attendance Alerts</FormLabel>
                                                <FormDescription>Receive alerts about student attendance.</FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="notifications.reportCardRelease"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                            <div className="space-y-0.5">
                                                <FormLabel>Report Card Release</FormLabel>
                                                <FormDescription>Get notified when report cards are available.</FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="notifications.examSchedule"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                            <div className="space-y-0.5">
                                                <FormLabel>Exam Schedule</FormLabel>
                                                <FormDescription>Receive updates about upcoming exams.</FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="notifications.parentMeetingReminder"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                            <div className="space-y-0.5">
                                                <FormLabel>Parent Meeting Reminder</FormLabel>
                                                <FormDescription>Get reminders about scheduled parent-teacher meetings.</FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Staff Notifications */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Staff Updates</h3>
                            <Separator />
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="notifications.salaryPayment"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                            <div className="space-y-0.5">
                                                <FormLabel>Salary Payment</FormLabel>
                                                <FormDescription>Receive notifications when salaries are processed.</FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="notifications.staffMeeting"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                            <div className="space-y-0.5">
                                                <FormLabel>Staff Meeting</FormLabel>
                                                <FormDescription>Get reminders about upcoming staff meetings.</FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Security Notifications */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Security Alerts</h3>
                            <Separator />
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="notifications.unauthorizedLoginAttempt"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                            <div className="space-y-0.5">
                                                <FormLabel>Unauthorized Login Attempt</FormLabel>
                                                <FormDescription>Get alerted about suspicious login attempts.</FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="notifications.accountSuspension"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                            <div className="space-y-0.5">
                                                <FormLabel>Account Suspension</FormLabel>
                                                <FormDescription>Receive notifications about account status changes.</FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Notification Delivery Methods */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Delivery Methods</h3>
                            <Separator />
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="notifications.emailNotifications"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                            <div className="space-y-0.5">
                                                <FormLabel>Email Notifications</FormLabel>
                                                <FormDescription>Receive notifications via email.</FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="notifications.pushNotifications"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                            <div className="space-y-0.5">
                                                <FormLabel>Push Notifications</FormLabel>
                                                <FormDescription>Receive notifications on your devices.</FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Button type="submit" className="w-full md:w-auto">
                    Save Preferences
                </Button>
            </form>
        </Form>
    )
}

