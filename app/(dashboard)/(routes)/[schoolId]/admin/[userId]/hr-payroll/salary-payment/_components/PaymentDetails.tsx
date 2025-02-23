"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { CreditCard } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const formSchema = z.object({
    overtimeHours: z.coerce.number().min(0, { message: "Overtime hours cannot be negative." }).default(0),
    paymentMethod: z.string(),
    account: z.string(),
    totalAllowances: z.number(),
    totalDeductions: z.number(),
    overtimeAmount: z.number(),
    netSalary: z.number(),
});

type FormSchema = z.infer<typeof formSchema>;

type Allowance = {
    allowanceName: string;
    amount: number;
    _id: string;
};

type Deduction = {
    deductionName: string;
    amount: number;
    _id: string;
};

type Salary = {
    allowances: Allowance[];
    basicSalary: number;
    createdAt: string;
    deductions: Deduction[];
    overtimeRate: number;
    salaryName: string;
    schoolId: string;
    __v: number;
    _id: string;
};

const calculateTotal = (items: { amount: number }[]) => items.reduce((acc, item) => acc + item.amount, 0);

const calculateNetSalary = (
    basicSalary: number,
    totalAllowances: number,
    totalDeductions: number,
    overtimeRate: number,
    overtimeHours: number
) => {
    const overtimeAmount = overtimeRate * overtimeHours;
    return basicSalary + totalAllowances + overtimeAmount - totalDeductions;
};

const PaymentDetails = ({ salary }: { salary: Salary }) => {
    const [overtimeHours, setOvertimeHours] = useState(0);

    // Calculate totals
    const totalAllowances = calculateTotal(salary.allowances);
    const totalDeductions = calculateTotal(salary.deductions);
    const overtimeAmount = salary.overtimeRate * overtimeHours;
    const netSalary = calculateNetSalary(salary.basicSalary, totalAllowances, totalDeductions, salary.overtimeRate, overtimeHours);

    // Define your form.
    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            overtimeHours: 0,
            paymentMethod: "",
            account: "",
            totalAllowances,
            totalDeductions,
            overtimeAmount,
            netSalary,
        },
    });

    // Define a submit handler.
    function onSubmit(values: FormSchema) {
        const updatedValues = {
            ...values,
            totalAllowances,
            totalDeductions,
            overtimeAmount,
            netSalary,
        };
        console.log(updatedValues);
    }

    return (
        <Card>
            <CardContent>
                <h1 className='text-lg font-semibold flex gap-2 pt-3'><CreditCard />Payment Details</h1>
                <Separator />
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 py-4">
                        <FormField
                            control={form.control}
                            name="totalAllowances"
                            render={() => (
                                <FormItem>
                                    <FormLabel>Total Allowances</FormLabel>
                                    <FormControl>
                                        <Input type="number" disabled className="bg-gray-400" value={totalAllowances} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="totalDeductions"
                            render={() => (
                                <FormItem>
                                    <FormLabel>Total Deductions</FormLabel>
                                    <FormControl>
                                        <Input type="number" disabled className="bg-gray-400" value={totalDeductions} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="overtimeHours"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Overtime Total Hour</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} onChange={(e) => { setOvertimeHours(Number(e.target.value)); field.onChange(e); }} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="overtimeAmount"
                            render={() => (
                                <FormItem>
                                    <FormLabel>Overtime Amount</FormLabel>
                                    <FormControl>
                                        <Input type="number" disabled className="bg-gray-400" value={overtimeAmount} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="netSalary"
                            render={() => (
                                <FormItem>
                                    <FormLabel>Net Salary</FormLabel>
                                    <FormControl>
                                        <Input type="number" disabled className="bg-gray-400" value={netSalary} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="paymentMethod"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Pay Via</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select " />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Cash">Cash</SelectItem>
                                            <SelectItem value="Card">Card</SelectItem>
                                            <SelectItem value="Cheque">Cheque</SelectItem>
                                            <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                                            <SelectItem value="Other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="account"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Choose Account</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Account" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="m@example.com">m@example.com</SelectItem>
                                            <SelectItem value="m@google.com">m@google.com</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-end py-4">
                            <Button type="submit">Paid</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default PaymentDetails;
