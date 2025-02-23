"use client"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { fetchAllPlans } from "@/lib/actions/meal-plan.actions";
import { updateStudent } from "@/lib/actions/student.actions";


const FormSchema = z.object({
    canteen: z.object({
        planId: z.string(),
    })
})


interface CellActionProps {
    data: IEmployee;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
    const [mealPlans, setMealPlans] = useState<any[] | []>([]);

    useEffect(() => {
        const fetchMealPlan = async () => {
            try {
                const response = await fetchAllPlans() ?? [];

                setMealPlans(response);
            } catch (error) {
                console.log(error);
            }
        };
        fetchMealPlan();
    }, [])


    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    async function onSubmit(values: z.infer<typeof FormSchema>) {
        try {
            await updateStudent(data._id as string, values);
            toast({
                title: "Salary Assigned Successfully",
                description: "Salary was assigned successfully...",
                // variant: "success",
            })
            window.location.reload();

        } catch (error) {
            console.log(error);
            toast({
                title: "Something Went Wrong",
                description: "Please try again later",
                variant: "destructive",
            })

        }
    }

    console.log()


    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Badge className="cursor-pointer">Assign Salary</Badge>
                </DialogTrigger>
                <DialogContent className="w-[96%] max-w-md">
                    <DialogHeader>
                        <DialogTitle>Add Meal Plan</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you&apos;re done.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="canteen.planId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Select Add Meal Plan</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select salary" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {mealPlans?.map((value) => (
                                                    <SelectItem key={value?._id} value={value?._id}>{value.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>

                </DialogContent>
            </Dialog>
        </>
    );
};
