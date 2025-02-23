"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { createTimetable, updateTimetable } from "@/lib/actions/timetable.actions"
import { useParams, usePathname, useRouter } from "next/navigation"

const daySchema = z.object({
    subject: z.string(),
    type: z.enum(["lecture", "lab", "practical", "tutorial"]),
    location: z.string(),
})

const timetableSchema = z.array(
    z.object({
        time: z.string(),
        monday: daySchema,
        tuesday: daySchema,
        wednesday: daySchema,
        thursday: daySchema,
        friday: daySchema,
    }),
)

const formSchema = z.object({
    classId: z.string().min(2, {
        message: "Class ID must be at least 2 characters.",
    }),
    timetable: timetableSchema,
})

interface IClass {
    _id: string
    name: string
}

type Props ={
    classes: IClass[],
    initialData?: z.infer<typeof formSchema>,
    type: "create"|"update"
}

const TimeTableForm = ({ classes,type,initialData }: Props) => {
    const router = useRouter();
    const path = usePathname();
    const params = useParams();

    const id = initialData?._id;

    const { schoolId, userId } = params;
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:initialData ?? {
            classId: "",
            timetable: [
                {
                    time: "",
                    monday: { subject: "", type: "lecture", location: "" },
                    tuesday: { subject: "", type: "lecture", location: "" },
                    wednesday: { subject: "", type: "lecture", location: "" },
                    thursday: { subject: "", type: "lecture", location: "" },
                    friday: { subject: "", type: "lecture", location: "" },
                },
            ],
        },
    });

    const { isSubmitting } = form.formState;

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "timetable",
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if(type === "create"){
                await createTimetable(values,path)
            }

            if (type === "update") {
                await updateTimetable(id, values, path)
            }

            router.push(`/${schoolId}/admin/${userId}/class/timetable`)
            toast({
                title: "Create Successfully",
                description: "Timetable created successfully...",
            })

        } catch (error) {
            console.log(error)
            toast({
                title: "Something went wrong",
                description: "Please try again later",
                variant: "destructive",
            })
        }
    }

    const days = ["monday", "tuesday", "wednesday", "thursday", "friday",]

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="classId"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Select Stage</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className={cn("w-[200px] justify-between", !field.value && "text-muted-foreground")}
                                        >
                                            {field.value ? classes.find((cls) => cls._id === field.value)?.name : "Select class"}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput placeholder="Search class..." className="h-9" />
                                        <CommandList>
                                            <CommandEmpty>No class found.</CommandEmpty>
                                            <CommandGroup>
                                                {classes.map((cls) => (
                                                    <CommandItem
                                                        value={cls.name}
                                                        key={cls._id}
                                                        onSelect={() => {
                                                            form.setValue("classId", cls._id)
                                                        }}
                                                    >
                                                        {cls.name}
                                                        <Check
                                                            className={cn("ml-auto h-4 w-4", cls._id === field.value ? "opacity-100" : "opacity-0")}
                                                        />
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Card>
                    <CardContent className="pt-6">
                        {fields.map((field, index) => (
                            <div key={field.id} className="mb-6 ">
                                <div className="max-w-xs">
                                    <FormField
                                        control={form.control}
                                        name={`timetable.${index}.time`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Time Slot</FormLabel>
                                                <FormControl>
                                                    <Input {...field} placeholder="e.g. 09:00 - 10:00 or 13:00 - 13:30" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid grid-cols-5 gap-4 mt-4">
                                    {days.map((day) => (
                                        <div key={day} className="space-y-2">
                                            <FormField
                                                control={form.control}
                                                name={`timetable.${index}.${day as 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday'}.subject` as const}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="capitalize">{day}</FormLabel>
                                                        <FormControl>
                                                            <Input {...field} value={field.value as string} placeholder="Subject" />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name={`timetable.${index}.${day as 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday'}.type` as const}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value as string}>
                                                            <FormControl>
                                                                <SelectTrigger>
                                                                    <SelectValue placeholder="Select type" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="lecture">Lecture</SelectItem>
                                                                <SelectItem value="lab">Lab</SelectItem>
                                                                <SelectItem value="practical">Practical</SelectItem>
                                                                <SelectItem value="tutorial">Tutorial</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name={`timetable.${index}.${day as 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday'}.location`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <Input {...field} value={field.value as string} placeholder="Location" />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    ))}
                                </div>
                                {index > 0 && (
                                    <Button disabled={isSubmitting} type="button" variant="destructive" size="sm" className="mt-2" onClick={() => remove(index)}>
                                        Remove Time Slot
                                    </Button>
                                )}
                            </div>
                        ))}
                        <Button
                            disabled={isSubmitting}
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() =>
                                append({
                                    time: "",
                                    monday: { subject: "", type: "lecture", location: "" },
                                    tuesday: { subject: "", type: "lecture", location: "" },
                                    wednesday: { subject: "", type: "lecture", location: "" },
                                    thursday: { subject: "", type: "lecture", location: "" },
                                    friday: { subject: "", type: "lecture", location: "" },
                                })
                            }
                        >
                            Add Time Slot
                        </Button>
                    </CardContent>
                </Card>
                <Button disabled={isSubmitting} type="submit">
                    {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                    {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
            </form>
        </Form>
    )
}

export default TimeTableForm

