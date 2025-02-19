"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Loader2, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import MultiText from "@/components/commons/MultiText";
import { createMealSchedule } from "@/lib/actions/meal-schedule.actions";

const formSchema = z.object({
    name: z.string().min(2, {
        message: "name must be at least 2 characters.",
    }),
    description: z.string().min(5, {
        message: "description must be at least 5 characters.",
    }),
    mealPlanId: z.string().min(1, {
        message: "meal plan id must be provided."
    }),
    allergens: z.array(z.string()),
    mealType: z.enum(["breakfast", "lunch", "dinner"])
});

interface MealPlan {
    _id: string;
    name: string;
}

interface ScheduleModalProps {
    mealPlans: MealPlan[];
}

export function ScheduleModal({ mealPlans }: ScheduleModalProps) {
    const router = useRouter();
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            allergens: [],
            mealType: undefined,
            mealPlanId: ""
        },
    });

    const { isSubmitting } = form.formState;

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await createMealSchedule(values)
            router.refresh();
            form.reset();
            toast({
                title: "New Meal Schedule created",
                description: "New schedule was added successfully...",
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
            <DialogContent className="w-[96%] max-w-xl overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Meal Schedule</DialogTitle>
                    <DialogDescription >
                        Create new Meal schedule for canteen.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Food Name</FormLabel>
                                        <FormControl>
                                            <Input disabled={isSubmitting} placeholder="Eg. Rice and stew" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea disabled={isSubmitting} placeholder="Eg. Description the meal plan" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="allergens"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Add Allergens</FormLabel>
                                        <FormControl>
                                            <MultiText
                                                placeholder="Add some Allergens"
                                                value={field.value ?? []}
                                                onChange={(tag) =>
                                                    field.onChange([...field.value ?? [], tag])
                                                }
                                                onRemove={(tagToRemove) =>
                                                    field.onChange([
                                                        ...(field.value ?? []).filter(
                                                            (tag: string) => tag !== tagToRemove
                                                        ),
                                                    ])
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="mealPlanId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Select Meal Plan</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a meal plan" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {mealPlans?.map((mealPlans: { _id: string, name: string }) => (
                                                    <SelectItem key={mealPlans?._id} value={mealPlans._id}>{mealPlans?.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="mealType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Select Meal Type</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a meal type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {["breakfast", "lunch", "dinner"].map(value => (
                                                    <SelectItem key={value} value={value} >{value}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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
