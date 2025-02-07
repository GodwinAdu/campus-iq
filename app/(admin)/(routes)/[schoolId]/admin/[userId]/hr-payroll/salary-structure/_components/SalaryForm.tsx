"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm, useWatch } from "react-hook-form"
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
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Edit3, PlusCircle, X } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "@/hooks/use-toast"
import { createSalaryStructure, updateSalaryStructure } from "@/lib/actions/salary-structure.actions"
import { useParams, usePathname, useRouter } from "next/navigation"

const formSchema = z.object({
    salaryName: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    basicSalary: z.coerce.number(),
    overtimeRate: z.coerce.number(),
    allowances: z.array(z.object({
        allowanceName: z.string().min(2, {
            message: "Username must be at least 2 characters.",
        }),
        amount: z.coerce.number(),
    })).optional(),
    deductions: z.array(z.object({
        deductionName: z.string().min(2, {
            message: "Username must be at least 2 characters.",
        }),
        amount: z.coerce.number(),
    })).optional(),
});

interface Props {
    type: "create" | "update";
    initialData?: any;
}

const SalaryForm = ({ type, initialData }: Props) => {
    const path = usePathname();
    const router = useRouter();
    const params = useParams();

    const { schoolId, userId } = params;
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ?? {
            salaryName: "",
            basicSalary: 0,
            overtimeRate: 0,
            allowances: [],
            deductions: [],
        },
    });

    const { isSubmitting } = form.formState;

    const { fields: allowanceFields, append: appendAllowance, remove: removeAllowance } = useFieldArray({
        control: form.control,
        name: "allowances",
    });

    const { fields: deductionFields, append: appendDeduction, remove: removeDeduction } = useFieldArray({
        control: form.control,
        name: "deductions",
    });

    const watchedValues = useWatch({
        control: form.control,
        name: ["allowances", "deductions", "basicSalary", "overtimeRate"]
    });

    const [allowances, deductions, basicSalary, overtimeRate] = watchedValues;

    const calculateTotalAllowances = () => {
        return (allowances?.reduce((acc, curr) => acc + Number(curr.amount), 0) || 0);
    };

    const calculateTotalDeductions = () => {
        return (deductions?.reduce((acc, curr) => acc + Number(curr.amount), 0) || 0);
    };

    const calculateNetSalary = () => {
        calculateTotalAllowances();
        calculateTotalDeductions();
        const basicSalaryValue = Number(basicSalary);
        const overtimeRateValue = Number(overtimeRate);
        return (basicSalaryValue + overtimeRateValue);
    };

    const [totals, setTotals] = useState({
        totalAllowances: 0,
        totalDeductions: 0,
        netSalary: 0,
    });

    useEffect(() => {
        setTotals({
            totalAllowances: calculateTotalAllowances(),
            totalDeductions: calculateTotalDeductions(),
            netSalary: calculateNetSalary(),
        });
    }, [allowances, deductions, basicSalary, overtimeRate]);

    const submit = initialData ? "Update" : "Submit";
    const submitting = initialData ? "Updating..." : "Submitting...";
    const salaryStructureId = params.salaryStructureId as string;


    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (type === "create") {
                await createSalaryStructure(values, path);
            }

            if (type === "update") {
                await updateSalaryStructure(salaryStructureId, values, path);
            };
            form.reset();

            router.push(`/${schoolId}/admin/${userId}/hr-payroll/salary-structure`);
            toast({
                title: `${type === "create" ? "New" : "Updated"} Salary Structure`,
                description: `${type === "create" ? "Add new" : "Updated"} salary structure successfully...`,
            });

        } catch (error) {
            console.log("something went wrong");

            toast({
                title: "Something went wrong",
                description: "Please try again later",
                variant: "destructive",
            });

        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <Card>
                    <CardContent className="py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <FormField
                                control={form.control}
                                name="salaryName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Salary Grade</FormLabel>
                                        <FormControl>
                                            <Input placeholder="shadcn" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="basicSalary"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Basic Salary</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="shadcn" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="overtimeRate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Overtime Rate (per hour)</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="shadcn" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                </Card>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Card>
                        <CardContent className="py-4">
                            <h2 className="font-bold pb-1">Allowances</h2>
                            <Separator className="mb-3" />
                            {allowanceFields.map((item, index) => (
                                <div key={item.id} className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-4">
                                    <FormField
                                        control={form.control}
                                        name={`allowances.${index}.allowanceName`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input placeholder="Allowance Name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="flex gap-2 items-center">
                                        <FormField
                                            control={form.control}
                                            name={`allowances.${index}.amount`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input type="number" placeholder="0" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        {index !== 0 && (
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="icon"
                                                onClick={() => removeAllowance(index)}
                                            >
                                                <X className="w-4 h-4" />
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ))}
                            <Button type="button" size="sm" variant="outline" onClick={() => appendAllowance({ allowanceName: "", amount: 0 })}>Add row</Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="py-4">
                            <h2 className="font-bold pb-1">Deductions</h2>
                            <Separator className="mb-3" />
                            {deductionFields.map((item, index) => (
                                <div key={item.id} className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-4">
                                    <FormField
                                        control={form.control}
                                        name={`deductions.${index}.deductionName`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input placeholder="Deduction Name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="flex gap-2 items-center">
                                        <FormField
                                            control={form.control}
                                            name={`deductions.${index}.amount`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input type="number" placeholder="0" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        {index !== 0 && (
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="icon"
                                                onClick={() => removeDeduction(index)}
                                            >
                                                <X className="w-4 h-4" />
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ))}
                            <Button type="button" size="sm" variant="outline" onClick={() => appendDeduction({ deductionName: "", amount: 0 })}>Add row</Button>
                        </CardContent>
                    </Card>

                </div>
                <div className="flex justify-end ">
                    <Card className="w-[95%] max-w-xl">
                        <CardContent className="space-y-2 py-4">
                            <h2 className="font-bold text-xl">Salary Details</h2>
                            <Separator className="mb-4" />
                            <div className="grid grid-cols-3 items-center">
                                <Label>Basic Salary</Label>
                                <Input value={Number(basicSalary)} disabled className="col-span-2 bg-gray-400" />
                            </div>
                            <Separator />
                            <div className="grid grid-cols-3 items-center">
                                <Label>Total Allowances</Label>
                                <Input value={totals.totalAllowances} disabled className="col-span-2 bg-gray-400" />
                            </div>
                            <Separator />
                            <div className="grid grid-cols-3 items-center">
                                <Label>Total Deductions</Label>
                                <Input value={totals.totalDeductions} disabled className="col-span-2 bg-gray-400" />
                            </div>
                            <Separator />
                            <div className="grid grid-cols-3 items-center">
                                <Label className="text-lg font-semibold">Net Salary</Label>
                                <Input value={totals.netSalary} disabled className="col-span-2 bg-gray-400" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="flex justify-end">
                    <Button disabled={isSubmitting} type="submit">
                        {initialData ? <Edit3 className="w-4 h-4 mr-2" /> : <PlusCircle className="w-4 h-4 mr-2" />}
                        {isSubmitting ? submitting : submit}
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default SalaryForm
