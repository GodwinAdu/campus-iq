"use client"

import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
    ArrowUpRight,
    CalendarIcon,
    CheckCircle,
    CreditCard,
    Download,
    History,
    Package,
    RefreshCw,
} from "lucide-react"
import { format, differenceInDays } from "date-fns"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import UpgradeDialog from "./UpgradeDialog"

const storeFormSchema = z.object({
    subscriptionPlan: z.object({
        period: z.object({
            frequency: z.string(),
            value: z.number(),
            price: z.number(),
        }),
        expiryDate: z.coerce.date(),
        renewDate: z.coerce.date(),
        plan: z.string(),
        currentStudent: z.number(),
    }),
})

type StoreFormValues = z.infer<typeof storeFormSchema>

interface ISchool {
    subscriptionPlan: {
        period: {
            frequency: string
            value: number
            price: number
        }
        expiryDate: Date
        renewDate: Date
        plan: string
        currentStudent: number
    }
}

// Mock data for payment history
const paymentHistory = [
    {
        id: "INV-001",
        date: new Date(2023, 11, 15),
        amount: 1200,
        status: "paid",
        method: "Credit Card",
    },
    {
        id: "INV-002",
        date: new Date(2023, 10, 15),
        amount: 1200,
        status: "paid",
        method: "Credit Card",
    },
    {
        id: "INV-003",
        date: new Date(2023, 9, 15),
        amount: 1200,
        status: "paid",
        method: "Bank Transfer",
    },
];

const calculatePricing = (numberOfStudent: number, plan: string) => {
    let price = 0;

    switch (plan) {
        case "basic":
            price = 5 * numberOfStudent;
            break;
        case "pro":
            price = 10 * numberOfStudent;
            break;
        case "custom":
            price = 30 * numberOfStudent;
            break;
        default:
            price = 0;
    }

    return price * numberOfStudent;

}





const SubscriptionForm = ({ school }: { school: ISchool }) => {
    const currentPlan = school.subscriptionPlan.plan.toLowerCase()
    // Mock data for plan comparison
    const planFeatures = {
        basic: {
            name: "Basic",
            price: calculatePricing(school.subscriptionPlan.currentStudent, currentPlan),
            period: "month",
            features: ["Student Management", "Basic Reporting", "Email Support"],
        },
        pro: {
            name: "Pro",
            price: calculatePricing(school.subscriptionPlan.currentStudent, currentPlan),
            period: "month",
            features: [
                "Student Management",
                "Advanced Reporting",
                "Email & Phone Support",
                "Staff Management",
                "Attendance Tracking",
            ],
        },
        custom: {
            name: "Custom",
            price: calculatePricing(school.subscriptionPlan.currentStudent, currentPlan),
            period: "month",
            features: [
                "Student Management",
                "Advanced Reporting",
                "Priority Support",
                "Staff Management",
                "Attendance Tracking",
                "Financial Management",
                "Custom Branding",
            ],
        },
    }
    const [showUpgradeDialog, setShowUpgradeDialog] = useState(false)
    const defaultValues: Partial<StoreFormValues> = {
        subscriptionPlan: school.subscriptionPlan,
    }

    const form = useForm<StoreFormValues>({
        resolver: zodResolver(storeFormSchema),
        defaultValues,
    })

    const daysRemaining = differenceInDays(school.subscriptionPlan.expiryDate, new Date())
    const subscriptionStatus = daysRemaining > 30 ? "active" : daysRemaining > 0 ? "expiring" : "expired"
    const percentageUsed = Math.min(
        Math.round(
            (school.subscriptionPlan.currentStudent /
                (school.subscriptionPlan.currentStudent)) *
            100,
        ),
        100,
    )

    const getStatusColor = (status: string) => {
        switch (status) {
            case "active":
                return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
            case "expiring":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
            case "expired":
                return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
        }
    }

    const getPaymentStatusColor = (status: string) => {
        switch (status) {
            case "paid":
                return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
            case "pending":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
            case "failed":
                return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
        }
    }

    return (
        <div className="container mx-auto px-4 py-6 max-w-7xl">
            <Form {...form}>
                <form className="space-y-8">
                    <Tabs defaultValue="overview" className="w-full">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                            <div>
                                <h1 className="text-3xl font-bold tracking-tight">Subscription Management</h1>
                                <p className="text-muted-foreground mt-1">
                                    View and manage your subscription details and billing information
                                </p>
                            </div>
                            <TabsList className="self-start">
                                <TabsTrigger value="overview" className="flex items-center gap-2">
                                    <Package className="h-4 w-4" />
                                    <span>Overview</span>
                                </TabsTrigger>
                                <TabsTrigger value="billing" className="flex items-center gap-2">
                                    <CreditCard className="h-4 w-4" />
                                    <span>Billing</span>
                                </TabsTrigger>
                                <TabsTrigger value="plans" className="flex items-center gap-2">
                                    <RefreshCw className="h-4 w-4" />
                                    <span>Plans</span>
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        <TabsContent value="overview">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <Card className="md:col-span-2 shadow-sm hover:shadow-md transition-shadow">
                                    <CardHeader className="pb-3 flex flex-row items-start justify-between">
                                        <div>
                                            <CardTitle className="text-xl">Subscription Details</CardTitle>
                                            <CardDescription>Current plan and subscription information</CardDescription>
                                        </div>
                                        <Badge className={getStatusColor(subscriptionStatus)}>
                                            {subscriptionStatus === "active" && "Active"}
                                            {subscriptionStatus === "expiring" && "Expiring Soon"}
                                            {subscriptionStatus === "expired" && "Expired"}
                                        </Badge>
                                    </CardHeader>
                                    <CardContent className="pt-4 pb-0">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2">
                                                    <Package className="h-5 w-5 text-primary" />
                                                    <h3 className="text-lg font-medium">
                                                        {planFeatures[currentPlan as keyof typeof planFeatures]?.name} Plan
                                                    </h3>
                                                </div>

                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-3xl font-bold">
                                                        ${planFeatures[currentPlan as keyof typeof planFeatures]?.price}
                                                    </span>
                                                    <span className="text-muted-foreground">
                                                        /{planFeatures[currentPlan as keyof typeof planFeatures]?.period}
                                                    </span>
                                                </div>

                                                <div className="space-y-1">
                                                    <div className="flex justify-between text-sm">
                                                        <span>Student Usage</span>
                                                        <span className="font-medium">
                                                            {school.subscriptionPlan.currentStudent}
                                                        </span>
                                                    </div>
                                                    <Progress value={percentageUsed} className="h-2" />
                                                    <p className="text-xs text-muted-foreground">
                                                        Unlimited of your student capacity remaining
                                                    </p>
                                                </div>

                                                <UpgradeDialog
                                                    school={school}
                                                    percentageUsed={percentageUsed}
                                                    planFeatures={planFeatures}
                                                    currentPlan={currentPlan}
                                                />
                                            </div>

                                            <div className="space-y-4">
                                                <FormField
                                                    control={form.control}
                                                    name="subscriptionPlan.expiryDate"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="flex items-center gap-2">
                                                                <CalendarIcon className="h-4 w-4" />
                                                                Subscription Expires
                                                            </FormLabel>
                                                            <div className="flex items-center gap-2">
                                                                <FormControl>
                                                                    <div className="border rounded-md px-3 py-2 bg-muted/50">
                                                                        {field.value ? format(field.value, "MMMM d, yyyy") : "N/A"}
                                                                    </div>
                                                                </FormControl>
                                                                {daysRemaining > 0 ? (
                                                                    <Badge variant="outline">{daysRemaining} days remaining</Badge>
                                                                ) : (
                                                                    <Badge variant="destructive">Expired</Badge>
                                                                )}
                                                            </div>
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="subscriptionPlan.renewDate"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="flex items-center gap-2">
                                                                <RefreshCw className="h-4 w-4" />
                                                                Last Renewed
                                                            </FormLabel>
                                                            <FormControl>
                                                                <div className="border rounded-md px-3 py-2 bg-muted/50">
                                                                    {field.value ? format(field.value, "MMMM d, yyyy") : "N/A"}
                                                                </div>
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="subscriptionPlan.period.frequency"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="flex items-center gap-2">
                                                                <History className="h-4 w-4" />
                                                                Billing Cycle
                                                            </FormLabel>
                                                            <FormControl>
                                                                <div className="border rounded-md px-3 py-2 bg-muted/50 capitalize">
                                                                    {field.value
                                                                        ? `${field.value} (${school.subscriptionPlan.period.value} ${school.subscriptionPlan.period.value === 1 ? "month" : "months"})`
                                                                        : "N/A"}
                                                                </div>
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex justify-between pt-6">
                                        <Button variant="outline" className="gap-2">
                                            <Download className="h-4 w-4" />
                                            Download Invoice
                                        </Button>
                                        <Button variant="default" className="gap-2">
                                            <RefreshCw className="h-4 w-4" />
                                            Renew Subscription
                                        </Button>
                                    </CardFooter>
                                </Card>

                                <Card className="shadow-sm hover:shadow-md transition-shadow">
                                    <CardHeader>
                                        <CardTitle className="text-xl">Plan Features</CardTitle>
                                        <CardDescription>What&apos;s included in your plan</CardDescription>
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                        <ul className="space-y-2">
                                            {planFeatures[currentPlan as keyof typeof planFeatures]?.features.map((feature, index) => (
                                                <li key={index} className="flex items-start gap-2">
                                                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                    <CardFooter>
                                        <Button variant="link" className="gap-1 px-0" onClick={() => setShowUpgradeDialog(true)}>
                                            Compare all plans
                                            <ArrowUpRight className="h-4 w-4" />
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </div>
                        </TabsContent>

                        <TabsContent value="billing">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <Card className="md:col-span-2 shadow-sm">
                                    <CardHeader>
                                        <CardTitle className="text-xl">Payment History</CardTitle>
                                        <CardDescription>Recent transactions and payment details</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Invoice</TableHead>
                                                    <TableHead>Date</TableHead>
                                                    <TableHead>Amount</TableHead>
                                                    <TableHead>Status</TableHead>
                                                    <TableHead className="text-right">Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {paymentHistory.map((payment) => (
                                                    <TableRow key={payment.id}>
                                                        <TableCell className="font-medium">{payment.id}</TableCell>
                                                        <TableCell>{format(payment.date, "MMM d, yyyy")}</TableCell>
                                                        <TableCell>${payment.amount.toLocaleString()}</TableCell>
                                                        <TableCell>
                                                            <Badge className={getPaymentStatusColor(payment.status)}>{payment.status}</Badge>
                                                        </TableCell>
                                                        <TableCell className="text-right">
                                                            <Button variant="ghost" size="sm" className="h-8 gap-1">
                                                                <Download className="h-4 w-4" />
                                                                <span className="sr-only md:not-sr-only md:inline-block">Download</span>
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </CardContent>
                                    <CardFooter className="flex justify-between">
                                        <Button variant="outline" size="sm">
                                            Previous
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            Next
                                        </Button>
                                    </CardFooter>
                                </Card>

                                <Card className="shadow-sm">
                                    <CardHeader>
                                        <CardTitle className="text-xl">Payment Method</CardTitle>
                                        <CardDescription>Manage your payment details</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex items-center gap-4 p-4 border rounded-lg">
                                            <div className="bg-primary/10 p-2 rounded-full">
                                                <CreditCard className="h-6 w-6 text-primary" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium">Visa ending in 4242</p>
                                                <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                                            </div>
                                            <Badge>Default</Badge>
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <Button variant="outline" className="w-full justify-start gap-2">
                                                <CreditCard className="h-4 w-4" />
                                                Add Payment Method
                                            </Button>
                                            <Button variant="link" className="w-full justify-start gap-2 px-0">
                                                Manage Payment Methods
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        <TabsContent value="plans">
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {Object.keys(planFeatures).map((plan) => {
                                        const planData = planFeatures[plan as keyof typeof planFeatures]
                                        const isCurrentPlan = plan === currentPlan

                                        return (
                                            <Card
                                                key={plan}
                                                className={cn(
                                                    "flex flex-col shadow-sm hover:shadow-md transition-shadow",
                                                    isCurrentPlan && "border-primary",
                                                )}
                                            >
                                                <CardHeader className={cn("pb-3", isCurrentPlan && "bg-primary/5")}>
                                                    {isCurrentPlan && <Badge className="self-start mb-2">Current Plan</Badge>}
                                                    <CardTitle className="text-xl">{planData.name}</CardTitle>
                                                    <div className="flex items-baseline gap-1">
                                                        <span className="text-3xl font-bold">${planData.price}</span>
                                                        <span className="text-muted-foreground">/{planData.period}</span>
                                                    </div>
                                                    <CardDescription>Up to {planData.maxStudents} students</CardDescription>
                                                </CardHeader>
                                                <CardContent className="flex-1 pt-4">
                                                    <ul className="space-y-2">
                                                        {planData.features.map((feature, index) => (
                                                            <li key={index} className="flex items-start gap-2">
                                                                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                                                <span>{feature}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </CardContent>
                                                <CardFooter className="pt-4">
                                                    {isCurrentPlan ? (
                                                        <Button className="w-full" disabled>
                                                            Current Plan
                                                        </Button>
                                                    ) : (
                                                        <Button className="w-full" variant={plan === "premium" ? "default" : "outline"}>
                                                            {plan === "basic" ? "Downgrade" : "Upgrade"} to {planData.name}
                                                        </Button>
                                                    )}
                                                </CardFooter>
                                            </Card>
                                        )
                                    })}
                                </div>

                                <Card className="shadow-sm">
                                    <CardHeader>
                                        <CardTitle className="text-xl">Need a Custom Plan?</CardTitle>
                                        <CardDescription>Contact our sales team for a tailored solution</CardDescription>
                                    </CardHeader>
                                    <CardContent className="pb-0">
                                        <p className="text-muted-foreground">
                                            If you need more than 2,000 students or have specific requirements, our team can create a custom
                                            plan for your school.
                                        </p>
                                    </CardContent>
                                    <CardFooter className="pt-6">
                                        <Button className="gap-2">
                                            Contact Sales
                                            <ArrowUpRight className="h-4 w-4" />
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </div>
                        </TabsContent>
                    </Tabs>
                </form>
            </Form>


        </div>
    )
}

export default SubscriptionForm

