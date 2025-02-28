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
import { Textarea } from "@/components/ui/textarea"
import { TimeInput } from "@/components/ui/time-input"
import { useParams, usePathname, useRouter } from "next/navigation"
import { createCallLog, updateCallLog } from "@/lib/actions/call-log.actions"
import { toast } from "@/hooks/use-toast"

// 2. Define your Zod schema.
const formSchema = z.object({
    callType: z.string().min(2, {
        message: "Please enter  your call type"
    }),
    callPurpose: z.string().min(2, {
        message: "Please enter your call purpose"
    }),
    callerName: z.string().min(2, {
        message: "Please enter your caller name"
    }),
    phone: z.string().min(2, {
        message: "Please enter your phone number"
    }),
    email: z.string().email({
        message: "Please enter a valid email address",
    }),
    message: z.string().min(2, {
        message: "Please enter your message"
    }),
    date: z.coerce.date(),
    startTime: z.string().min(2, {
        message: "Please enter your start time",
    }),
    endTime: z.string().min(2, {
        message: "Please enter your end time",
    }),
    followDate: z.date().optional(),
});

interface CallProps {
    type: "create" | "update";
    initialData?: z.infer<typeof formSchema>;
}

const CallForm = ({ type, initialData }: CallProps) => {
    const router = useRouter();
    const path = usePathname();
    const params = useParams();

    const { schoolId, userId } = params;

    const callId = initialData?._id
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ?? {
            callType: "",
            callPurpose: "",
            callerName: "",
            phone: "",
            email: "",
            message: "",
            date: new Date(),
            startTime: "",
            endTime: "",
            followDate: undefined,
        },
    });

    const { isSubmitting } = form.formState;

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (type === "create") {
                await createCallLog(values, path)
            }
            if (type === "update") {
                await updateCallLog(values, callId, path)
            }
            form.reset();
            router.push(`/${schoolId}/admin/${userId}/front-desk/call-logs`);
            toast({
                title: "Success",
                description: "Call log has been saved successfully.",
            })

        } catch (error) {
            console.error(error)
            toast({
                title: "Something went wrong",
                description: "An error occurred while submitting the form.",
                variant: "destructive"
            })
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <Card>
                    <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
                        <FormField
                            control={form.control}
                            name="callType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Call Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="incoming">Incoming</SelectItem>
                                            <SelectItem value="outgoing">Outgoing</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="callPurpose"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Call Purpose</FormLabel>
                                    <FormControl>
                                        <Input placeholder="eg. Enter purpose..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="callerName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Enter Caller Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="eg. David Doe..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="eg. 233 8383 3838..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="eg. johndoe@email.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        " pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date > new Date() || date < new Date("1900-01-01")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="followDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Follow up Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        " pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) =>
                                                    date > new Date() || date < new Date("1900-01-01")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="startTime"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Start Time</FormLabel>
                                    <FormControl>
                                        <TimeInput {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="endTime"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Start Time</FormLabel>
                                    <FormControl>
                                        <TimeInput {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="message"
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

export default CallForm