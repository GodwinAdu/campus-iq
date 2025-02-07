"use client"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { getAllSalaryStructures } from "@/lib/actions/salary-structure.actions";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
    Form,
    FormControl,
    FormDescription,
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
import { updateEmployee } from "@/lib/actions/employee.actions";


const FormSchema = z.object({
    salaryId: z
        .string({
            required_error: "Please select an salary to display.",
        })
})


interface CellActionProps {
    data: IEmployee;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
    const [salary, setSalary] = useState<ISalaryStructure | []>([]);

    useEffect(() => {
        const fetchSalary = async () => {
            try {
                const response = await getAllSalaryStructures()

                setSalary(response);
            } catch (error) {
                console.log(error);
            }
        };
        fetchSalary();
    }, [])


    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    async function onSubmit(values: z.infer<typeof FormSchema>) {
        try {
            await updateEmployee(data._id, values);
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
                <DialogContent className="w-[96%] max-w-xl">
                    <DialogHeader>
                        <DialogTitle>Assign Employees Salary</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you&apos;re done.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="salaryId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Select Salary</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select salary" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {salary?.map((value) => (
                                                    <SelectItem key={value?._id} value={value?._id}>{value.salaryName}</SelectItem>
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
