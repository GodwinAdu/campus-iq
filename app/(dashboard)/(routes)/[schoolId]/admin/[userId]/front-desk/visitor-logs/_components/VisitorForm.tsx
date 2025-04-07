"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { CalendarIcon, Loader2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
const formSchema = z.object({
    visitorName: z.string().min(3, {
        message: "Name must be atleast 3 characters"
    }),
    visitorMobile: z.string().min(10, {
        message: "Mobile number must be atleast 10 characters"
    }),
    visitorEmail: z.string().email().optional(),
    visitorAddress: z.string().optional(),
    visitorType: z.string().optional(),
    visitorPurpose: z.string().min(3, {
        message: "Purpose must be atleast 3 characters"
    }),
    visitorInTime: z.string(),
    visitorOutTime: z.string().optional(),
    visitorDetails: z.string().optional(),
    numberOfVisitors: z.number().min(1, {
        message: "Number of visitors must be atleast 1",
    }),
    idCard: z.string().optional(),
    attachmentFile: z.string().optional(),
    confidential: z.boolean().optional(),
})
const VisitorForm = () => {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            visitorName: "",
            visitorMobile: "",
            visitorEmail: "",
            visitorAddress: "",
            visitorType: "",
            visitorPurpose: "",
            visitorInTime: "",
            visitorOutTime: "",
            visitorDetails: "",
            numberOfVisitors: 1,
            idCard: "",
            attachmentFile: "",
            confidential: false,
        },
    });

    const { isSubmitting } = form.formState;

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            // Do something with the form values.
            // ✅ This will be type-safe and validated.
            console.log(values)

        } catch (error) {
            console.error(error)

        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <Card>
                    <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
                        <FormField
                            control={form.control}
                            name="visitorType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Visitor Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {['parent', 'teacher', 'student', 'staff', 'visitor'].map((type) => (
                                                <SelectItem key={type} value={type}>
                                                    {type}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="visitorName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Visitor Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="eg. John Doe..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="visitorMobile"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Visitor Number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="eg. 02345..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="visitorEmail"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Visitor Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="eg. johndoe@gmail.com..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="visitorAddress"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Visitor Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder="eg. Kathmandu..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                        <FormField
                            control={form.control}
                            name="visitorPurpose"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Visitor Purpose</FormLabel>
                                    <FormControl>
                                        <Input placeholder="eg. Meeting..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="visitorInTime"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Visitor In Time</FormLabel>
                                    <FormControl>
                                        <Popover>
                                            <PopoverTrigger>
                                                <Input
                                                    placeholder="eg. 12:00 PM..."
                                                    {...field}
                                                    readOnly
                                                />
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <Calendar
                                                    onSelect={(date) => {
                                                        form.setValue("visitorInTime", format(date, "hh:mm a"))
                                                    }}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="visitorOutTime"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Visitor Out Time</FormLabel>
                                    <FormControl>
                                        <Popover>
                                            <PopoverTrigger>
                                                <Input
                                                    placeholder="eg. 12:00 PM..."
                                                    {...field}
                                                    readOnly
                                                />
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <Calendar
                                                    onSelect={(date) => {
                                                        form.setValue("visitorOutTime", format(date, "hh:mm a"))
                                                    }}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="numberOfVisitors"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Number of Visitors</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="idCard"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ID Card</FormLabel>
                                    <FormControl>
                                        <Input placeholder="eg. xxxxxxx..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="confidential"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                            Confidential Information
                                        </FormLabel>
                                    </div>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="visitorDetails"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Details</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Tell us a little bit about the postal..."
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </Card>
                <div className="flex justify-end">
                    <Button disabled={isSubmitting} type="submit">
                        {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default VisitorForm