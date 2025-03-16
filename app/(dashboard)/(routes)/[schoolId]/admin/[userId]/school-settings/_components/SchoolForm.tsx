"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import BasicInfoForm from "./BasicForm"
import DangerZone from "./DangerZone"
import { NotificationForm } from "./NotificationForm"
import PaymentSettings from "./PaymentForm"
import SubscriptionForm from "./SubcriptionForm"
import ReportingSettings from "./ReportForm"
import { RecruitmentForm } from "./RecruitmentForm"
import School from '../../../../../../../../lib/models/school.models';

interface ISchool {
    id: string
    name: string
    // Add other properties as needed
}

export default function SchoolForm({ school }: { school: ISchool }) {
    return (
        <Tabs defaultValue="basic-info" className="w-full">
            <div className="border-b">
                <div
                    className="max-w-[85vw] sm:max-w-[90vw] md:max-w-full relative overflow-x-auto scrollbar-hide"
                    style={{ WebkitOverflowScrolling: "touch" }}
                >
                    <TabsList className="w-max flex-nowrap">
                        <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
                        <TabsTrigger value="payment">Payment</TabsTrigger>
                        <TabsTrigger value="permissions">Permissions</TabsTrigger>
                        <TabsTrigger value="notifications">Notifications</TabsTrigger>
                        <TabsTrigger value="ai-integration">AI Settings</TabsTrigger>
                        <TabsTrigger value="report">Report Settings</TabsTrigger>
                        <TabsTrigger value="subscription">Subscription</TabsTrigger>
                        <TabsTrigger value="recruit">Recruit</TabsTrigger>
                        <TabsTrigger value="advance">Advance</TabsTrigger>
                        <TabsTrigger className="bg-red-500 text-white" value="danger">
                            Danger Zone
                        </TabsTrigger>
                    </TabsList>
                </div>
            </div>
            <TabsContent value="basic-info">
                <Card>
                    <CardHeader>
                        <CardTitle>Basic Information</CardTitle>
                        <CardDescription>Manage your store&apos;s basic information.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <BasicInfoForm school={school} />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="payment">
                <Card>
                    <CardHeader>
                        <CardTitle>Payment Settings</CardTitle>
                        <CardDescription>Configure your payment settings.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <PaymentSettings school={school} />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="permissions">
                <Card>
                    <CardHeader>
                        <CardTitle>Permissions</CardTitle>
                        <CardDescription>Manage user permissions.</CardDescription>
                    </CardHeader>
                    <CardContent>{/* <PermissionsForm school={school} /> */}</CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="notifications">
                <Card>
                    <CardHeader>
                        <CardTitle>Notifications Preferences</CardTitle>
                        <CardDescription>Configure your notification preferences.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <NotificationForm school={school} />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="subscription">
                <Card>
                    <CardHeader>
                        <CardTitle>Subscription</CardTitle>
                        <CardDescription>Manage your subscription plan.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <SubscriptionForm school={school} />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="ai-integration">
                <Card>
                    <CardHeader>
                        <CardTitle>AI Integration</CardTitle>
                        <CardDescription>Manage your AI Settings.</CardDescription>
                    </CardHeader>
                    <CardContent>{/* <AiIntegrationForm store={store} /> */}</CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="report">
                <Card>
                    <CardHeader>
                        <CardTitle>Report Settings</CardTitle>
                        <CardDescription>Configure your report settings.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ReportingSettings school={school} />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="recruit">
                <Card>
                    <CardHeader>
                        <CardTitle>📌 Recruitment Needs</CardTitle>
                        <CardDescription> Manage your organization&apos;s staffing requirements and track hiring progress</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <RecruitmentForm school={school} />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="advance">
                <Card>
                    <CardHeader>
                        <CardTitle>Advanced Settings</CardTitle>
                        <CardDescription>Configure advanced options.</CardDescription>
                    </CardHeader>
                    <CardContent>{/* <AdvanceSettingsForm school={school} /> */}</CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="danger">
                <DangerZone school={school} />
            </TabsContent>
        </Tabs>
    )
}

