"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { PlusCircle, Trash2, AlertCircle, CheckCircle2, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"


const recruitmentItemSchema = z.object({
    position: z.string().min(1, "Position is required"),
    category: z.enum(["essential", "recommended", "optional"]).default("recommended"),
    requiredCount: z.coerce.number().int().min(1, "At least 1 position is required").default(1),
    currentCount: z.coerce.number().int().min(0, "Current count cannot be negative").default(0),
    status: z.enum(["needed", "filled", "pending"]).default("needed"),
})

const formSchema = z.object({
    recruitment: z.array(recruitmentItemSchema).min(1, "At least one recruitment need is required"),
})

type RecruitmentFormValues = z.infer<typeof formSchema>

interface IOrganization {
    recruitment?: Array<{
        position?: string
        category?: "essential" | "recommended" | "optional"
        requiredCount?: number
        currentCount?: number
        status?: "needed" | "filled" | "pending"
    }>
}

export function RecruitmentForm({ school }: { school: ISchool }) {
    const form = useForm<RecruitmentFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            recruitment: school?.recruitment?.length
                ? school.recruitment.map((item) => ({
                    position: item.position || "",
                    category: item.category || "recommended",
                    requiredCount: item.requiredCount || 1,
                    currentCount: item.currentCount || 0,
                    status: item.status || "needed",
                }))
                : [
                    {
                        position: "",
                        category: "recommended",
                        requiredCount: 1,
                        currentCount: 0,
                        status: "needed",
                    },
                ],
        },
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "recruitment",
    })

    function onSubmit(data: RecruitmentFormValues) {
        toast({
            title: "Recruitment needs updated",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    function getCategoryBadge(category: string) {
        switch (category) {
            case "essential":
                return (
                    <Badge
                        variant="outline"
                        className="bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800"
                    >
                        Essential
                    </Badge>
                )
            case "recommended":
                return (
                    <Badge
                        variant="outline"
                        className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800"
                    >
                        Recommended
                    </Badge>
                )
            case "optional":
                return (
                    <Badge
                        variant="outline"
                        className="bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700"
                    >
                        Optional
                    </Badge>
                )
            default:
                return null
        }
    }

    function getStatusIcon(status: string) {
        switch (status) {
            case "needed":
                return <AlertCircle className="h-4 w-4 text-yellow-500" />
            case "filled":
                return <CheckCircle2 className="h-4 w-4 text-green-500" />
            case "pending":
                return <Clock className="h-4 w-4 text-purple-500" />
            default:
                return null
        }
    }

    function getStatusText(status: string) {
        switch (status) {
            case "needed":
                return "Actively Recruiting"
            case "filled":
                return "Fully Staffed"
            case "pending":
                return "In Progress"
            default:
                return ""
        }
    }

    function getProgressColor(currentCount: number, requiredCount: number) {
        const percentage = (currentCount / requiredCount) * 100
        if (percentage >= 100) return "bg-green-500"
        if (percentage >= 50) return "bg-yellow-500"
        return "bg-blue-500"
    }

    return (
        <div className="container mx-auto px-4 py-6 max-w-5xl">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <Card className="shadow-md border-0 bg-white dark:bg-gray-950">
                        <CardHeader className="pb-4 bg-gray-50 dark:bg-gray-900 rounded-t-lg border-b">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="self-start md:self-center flex items-center"
                                    onClick={() =>
                                        append({
                                            position: "",
                                            category: "recommended",
                                            requiredCount: 1,
                                            currentCount: 0,
                                            status: "needed",
                                        })
                                    }
                                >
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Add Position
                                </Button>
                            </div>
                        </CardHeader>

                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 gap-6">
                                {fields.map((field, index) => {
                                    const currentCount = form.watch(`recruitment.${index}.currentCount`) || 0
                                    const requiredCount = form.watch(`recruitment.${index}.requiredCount`) || 1
                                    const progressPercentage = Math.min((currentCount / requiredCount) * 100, 100)
                                    const category = form.watch(`recruitment.${index}.category`)
                                    const status = form.watch(`recruitment.${index}.status`)

                                    return (
                                        <Card
                                            key={field.id}
                                            className="overflow-hidden border border-gray-200 dark:border-gray-800 transition-all hover:shadow-md"
                                        >
                                            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 border-b">
                                                <div className="flex items-center gap-3">
                                                    <FormField
                                                        control={form.control}
                                                        name={`recruitment.${index}.position`}
                                                        render={({ field }) => (
                                                            <FormItem className="flex-1 mb-0">
                                                                <FormControl>
                                                                    <Input
                                                                        placeholder="Position Title"
                                                                        {...field}
                                                                        className="text-lg font-medium border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto"
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    {getCategoryBadge(category)}
                                                </div>

                                                {fields.length > 1 && (
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        type="button"
                                                        onClick={() => remove(index)}
                                                        className="h-8 w-8 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                        <span className="sr-only">Remove position</span>
                                                    </Button>
                                                )}
                                            </div>

                                            <CardContent className="p-5">
                                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                                    <div className="space-y-4">
                                                        <div className="flex items-center gap-2">
                                                            {getStatusIcon(status)}
                                                            <span className="font-medium">{getStatusText(status)}</span>
                                                        </div>

                                                        <div className="space-y-2">
                                                            <div className="flex justify-between text-sm">
                                                                <span>Staffing Progress</span>
                                                                <span className="font-medium">
                                                                    {currentCount}/{requiredCount} positions filled
                                                                </span>
                                                            </div>
                                                            <Progress
                                                                value={progressPercentage}
                                                                className={`h-2 ${getProgressColor(currentCount, requiredCount)}`}
                                                            />
                                                        </div>

                                                        <FormField
                                                            control={form.control}
                                                            name={`recruitment.${index}.category`}
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Priority Level</FormLabel>
                                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                        <FormControl>
                                                                            <SelectTrigger className="w-full">
                                                                                <SelectValue placeholder="Select priority" />
                                                                            </SelectTrigger>
                                                                        </FormControl>
                                                                        <SelectContent>
                                                                            <SelectItem value="essential">Essential</SelectItem>
                                                                            <SelectItem value="recommended">Recommended</SelectItem>
                                                                            <SelectItem value="optional">Optional</SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                    <FormDescription>Importance of this position to operations</FormDescription>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>

                                                    <div className="space-y-4">
                                                        <FormField
                                                            control={form.control}
                                                            name={`recruitment.${index}.status`}
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Recruitment Status</FormLabel>
                                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                        <FormControl>
                                                                            <SelectTrigger>
                                                                                <SelectValue placeholder="Select status" />
                                                                            </SelectTrigger>
                                                                        </FormControl>
                                                                        <SelectContent>
                                                                            <SelectItem value="needed">Needed</SelectItem>
                                                                            <SelectItem value="filled">Filled</SelectItem>
                                                                            <SelectItem value="pending">Pending</SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                    <FormDescription>Current hiring status for this position</FormDescription>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />

                                                        <div className="grid grid-cols-2 gap-4">
                                                            <FormField
                                                                control={form.control}
                                                                name={`recruitment.${index}.requiredCount`}
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Required</FormLabel>
                                                                        <FormControl>
                                                                            <Input type="number" min={1} {...field} />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />

                                                            <FormField
                                                                control={form.control}
                                                                name={`recruitment.${index}.currentCount`}
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Current</FormLabel>
                                                                        <FormControl>
                                                                            <Input type="number" min={0} {...field} />
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )
                                })}
                            </div>
                        </CardContent>

                        <CardFooter className="flex flex-col sm:flex-row justify-end gap-3 p-6 bg-gray-50 dark:bg-gray-900 border-t">
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                            <Button type="submit">Save Recruitment Plan</Button>
                        </CardFooter>
                    </Card>
                </form>
            </Form>
        </div>
    )
}

