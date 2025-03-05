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
import { toast } from "@/hooks/use-toast"
import { createPostal } from "@/lib/actions/postal.actions"
import { useParams, usePathname, useRouter } from "next/navigation"
const formSchema = z.object({
    sender: z.string({
        required_error: "Please enter sender and is required.",
    }),
    receiver: z.string().min(2, {
        message: "receiver name must be at least 2 characters.",
    }),
    postalType: z.string(),
    referenceNo: z.string().min(2, {
        message: "reference number must be at least 2 characters.",
    }),
    address: z.string().min(2, {
        message: "address must be at least 2 characters.",
    }),
    postalDate: z.coerce.date(),
    postalDetails: z.string(),
    attachmentFile: z.string().optional(),
    confidential: z.boolean()
});

interface PostalFormProps {
    type: "create" | "update";
    initialData?: z.infer<typeof formSchema>;
}
const PostalForm = ({ type, initialData }: PostalFormProps) => {
    const router = useRouter();
    const path = usePathname();
    const params = useParams();

    const { schoolId, userId } = params;
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ?? {
            sender: "",
            receiver: "",
            postalType: "",
            referenceNo: "",
            address: "",
            postalDate: new Date(), // TODO get current date
            postalDetails: "",
            attachmentFile: "",
            confidential: false,
        },
    });

    const { isSubmitting } = form.formState;

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (type === "create") {
                await createPostal(values, path)
            }

            if (type === "update") {
                // TODO update 
            }
            form.reset();
            router.push(`/${schoolId}/admin/${userId}/front-desk/postal-records`)
            toast({
                title: "Form submitted successfully",
                description: type === "create" ? "New postal created successfully" : "Postal updated successfully",
                // status: "success",
            })

        } catch (error) {
            console.error(error)
            toast({
                title: "Error submitting form",
                description: "Please try again later",
                variant: "destructive",
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
                            name="postalType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Postal Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="dispatch">Dispatch</SelectItem>
                                            <SelectItem value="receive">Receive</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="sender"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Enter Sender</FormLabel>
                                    <FormControl>
                                        <Input placeholder="eg. John Doe..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="receiver"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Enter Receiver</FormLabel>
                                    <FormControl>
                                        <Input placeholder="eg. David Doe..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="referenceNo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Reference Number (Optional)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="eg. xxxxxxxxxxx..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="postalDate"
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
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Addres</FormLabel>
                                    <FormControl>
                                        <Input placeholder="eg. xxxxxxxxxxx..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="postalDetails"
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

export default PostalForm