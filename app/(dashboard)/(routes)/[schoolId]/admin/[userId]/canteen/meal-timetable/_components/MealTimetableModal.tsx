"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import { Button, buttonVariants } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { CalendarIcon, Loader2, PlusCircle, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { createMealTimetable } from "@/lib/actions/meal-timetable.actions";

const formSchema = z.object({
    date: z.coerce.date(),
    mealScheduleId: z.string().min(1, {
        message: "meal  id must be provided."
    }),
    nutritionInfo: z.array(z.object({
        name: z.string(),
        quantity: z.string(),
    }))
});

interface MealPlan {
    _id: string;
    name: string;
}

interface ScheduleModalProps {
    mealSchedules: MealPlan[];
}

export function MealTimetableModal({ mealSchedules }: ScheduleModalProps) {
    const router = useRouter();
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            date: new Date(),
            mealScheduleId: "",
            nutritionInfo: [{ name: "", quantity: "" }],
        },
    });
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "nutritionInfo",
    })

    const { isSubmitting } = form.formState;

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await createMealTimetable(values)
            router.refresh();
            form.reset();
            toast({
                title: "New Meal timetable created",
                description: "New timetable was added successfully...",
            });
        } catch (error) {
            console.log("error happened while creating term", error)
            toast({
                title: "Something went wrong",
                description: "Please try again later...",
                variant: "destructive",
            });
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className={cn(buttonVariants())}>
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Add
                </Button>
            </DialogTrigger>
            <DialogContent className="w-[96%] max-w-xl h-[80%] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Meal Timetable</DialogTitle>
                    <DialogDescription >
                        Create new Meal Timetable for canteen.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Choose Date</FormLabel>
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
                                name="mealScheduleId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Select Meal</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a meal" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {mealSchedules?.map((mealSchedule: { _id: string, name: string }) => (
                                                    <SelectItem key={mealSchedule?._id} value={mealSchedule._id}>{mealSchedule?.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="space-y-4">
                                {fields.map((field, index) => (
                                    <div key={field.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg shadow-sm">
                                        <FormField
                                            control={form.control}
                                            name={`nutritionInfo.${index}.name`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-sm font-medium">Nutrition Name</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} placeholder="eg. protein" className="focus:ring focus:ring-blue-500" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <div className="flex items-center gap-3 w-full">
                                            <FormField
                                                control={form.control}
                                                name={`nutritionInfo.${index}.quantity`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-sm font-medium">Nutrition Quantity</FormLabel>
                                                        <FormControl>
                                                            <Input {...field} placeholder="eg. 5g" className="focus:ring focus:ring-blue-500" />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <Button type="button" variant="destructive" size="icon" className="mt-2" onClick={() => remove(index)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                                <Button type="button" onClick={() => append({ name: "", quantity: '' })}>
                                    Add Nutrient
                                </Button>
                            </div>
                            <Button disabled={isSubmitting} type="submit">
                                {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                                {isSubmitting ? "Creating..." : "Create"}
                            </Button>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
