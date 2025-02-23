"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "@/hooks/use-toast"
import { Card, CardContent } from "@/components/ui/card"
import { useParams, usePathname, useRouter } from "next/navigation"
import { CalendarIcon, X } from "lucide-react"
import { createFeeStructure } from "@/lib/actions/fee-structure.actions"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"

const profileFormSchema = z.object({
    classId: z.string(),
    termId: z.string(),
    sessionId: z.string(),
    dueDate: z.date(),
    fees: z
        .array(
            z.object({
                category: z.string().min(2, { message: "Please specify fees type" }),
                amount: z.coerce.number(),
            })
        ),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
    fees: [
        { category: "", amount: 0, }
    ],
}

export function FeesGeneratorForm({ classes, terms, sessions }: { sessions: ISession[], classes: IClass[], terms: ITerm[] }) {
    const router = useRouter();
    const path = usePathname();
    const params = useParams();

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues,
        mode: "onChange",
    })
    const { isSubmitting } = form.formState;

    const { fields, append, remove } = useFieldArray({
        name: "fees",
        control: form.control,
    })

    async function onSubmit(data: ProfileFormValues) {
        try {
            await createFeeStructure(data, path)
            form.reset();
            router.push(`/admin/${params.adminId}/account/fees-structures`)
            toast({
                title: `New Fees Create`,
                description: "New Fees was added successfully...",
                // variant: "success",
            });


        } catch (error) {
            console.error("something went wrong", error);
            toast({
                title: "something went wrong",
                description: "Please try again later",
                variant: "destructive",
            });

        }

    }

    return (
        <Card>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-5">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 items-center">
                            <FormField
                                control={form.control}
                                name="classId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Select Class</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a class" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {classes.map((cls) => (
                                                    <SelectItem key={cls._id} value={cls._id ?? ""}>
                                                        {cls.name}
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
                                name="termId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Select Term</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a term" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {terms?.map((term) => (
                                                    <SelectItem key={term._id} value={term._id}>
                                                        {term.name}
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
                                name="sessionId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Select Session</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a term" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {sessions?.map((session) => (
                                                    <SelectItem key={session._id} value={session._id ?? ""}>
                                                        {session.period}
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
                                name="dueDate"
                                render={({ field }) => (
                                    <FormItem >
                                        <FormLabel>Due Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[240px] pl-3 text-left font-normal",
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
                                                        date < new Date() 
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="space-y-4" >
                            {fields.map((field, index) => (
                                <div key={field.id} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center">
                                    <FormField
                                        control={form.control}
                                        name={`fees.${index}.category`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className={cn(index !== 0 && "sr-only")}>
                                                    Fees Type
                                                </FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter Fees Type" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`fees.${index}.amount`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className={cn(index !== 0 && "sr-only")}>
                                                    Amount
                                                </FormLabel>
                                                <FormControl>
                                                    <Input type="number" min={1} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    {index !== 0 && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="icon"
                                            onClick={() => remove(index)}
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    )}

                                </div>
                            ))}
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="mt-2"
                                onClick={() => append({ category: "", amount: 0 })}
                            >
                                Add New Form
                            </Button>
                        </div>
                        <Button disabled={isSubmitting} type="submit">Submit</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}