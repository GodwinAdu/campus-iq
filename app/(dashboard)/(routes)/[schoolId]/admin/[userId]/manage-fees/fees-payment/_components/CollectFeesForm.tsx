"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
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
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/hooks/use-toast"
import { updateFeePayment } from "@/lib/actions/fees-payment.actions"
import { useRouter } from "next/navigation"
import { cn, fibonacci } from "@/lib/utils"

interface Fee {
    category: string;
    amount: number;
    status: boolean;
    fine: number;
    discount: number;
    paid: number;
    _id: string;
}

interface StudentFee {
    _id: string;
    studentId: string;
    fullName: string;
    studentNo: string;
    sessionId: string;
    dueDate: string;
    termId: string;
    classId: string;
    status: string;
    fees: Fee[];
}

const feeSchema = z.object({
    _id: z.string(),
    category: z.string().min(2, {
        message: "Category must be at least 2 characters.",
    }),
    amount: z.coerce.number().nonnegative({ message: "Amount must be a positive number" }),
    status: z.boolean(),
    discount: z.coerce.number().nonnegative().optional(),
    fine: z.coerce.number().nonnegative().optional(),
    accountId:z.string().optional(),
    payVia:z.string().optional(),
    paid: z.coerce.number().nonnegative({ message: "Paid amount must be a positive number" }),
}).superRefine((data, ctx) => {
    if (data.paid > data.amount) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["paid"],
            message: "Paid amount cannot exceed the total amount",
        });
    }
});

// Define the schema for the entire form
const formSchema = z.object({
    messageGuardian: z.boolean().optional(),
    fees: z.array(feeSchema),
});

const CollectFeesForm = ({ initialData, accounts }: { initialData: StudentFee, accounts: any[] }) => {
    const router = useRouter()

    // Initialize the form with initial data
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            messageGuardian: false,
            fees: initialData?.fees,
        },
    });

    const { fields, } = useFieldArray({
        control: form.control,
        name: "fees",
    });


    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values,"submit")
        try {
            await updateFeePayment(initialData._id, values);
            router.refresh();
            // window.location.reload();
            toast({
                title: "Success",
                description: "Fees payment updated successfully",
                // variant: "success",
            })

        } catch (error) {
            console.log("something went wrong", error);
            toast({
                title: "Something went wrong",
                description: "Please try again later",
                variant: "destructive",
            })
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-1 shadow-lg p-4 rounded-lg">
                    <FormField
                        control={form.control}
                        name="accountId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Payment Method</FormLabel>
                                <Select onValueChange={(value) => field.onChange(value)} defaultValue={String(field.value)}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select an Account" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {accounts.map((account) => (
                                            <SelectItem key={account._id} value={account._id}>{account?.accountName}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="payVia"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Payment Method</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={String(field.value)}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select an Account" />
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
                        name="messageGuardian"
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
                                        Guardian Confirmation Sms
                                    </FormLabel>
                                </div>
                            </FormItem>
                        )}
                    />
                </div>
                {fields.map((field, index) => (
                    <>
                        <div key={field.id} className="grid grid-cols-1 md:grid-cols-8 gap-2">
                            <FormField

                                control={form.control}
                                name={`fees.${index}.category`}
                                render={({ field }) => (
                                    <FormItem className="col-span-2">
                                        <FormLabel className={cn(index !== 0 && "sr-only")}>Category</FormLabel>
                                        <FormControl>
                                            <Input  {...field} />
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
                                        <FormLabel className={cn(index !== 0 && "sr-only")}>Amount</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`fees.${index}.status`}
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel className={cn(index !== 0 && "sr-only")}>
                                                Status
                                            </FormLabel>
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`fees.${index}.discount`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className={cn(index !== 0 && "sr-only")}>Discount</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`fees.${index}.fine`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className={cn(index !== 0 && "sr-only")}>Fine</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`fees.${index}.paid`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className={cn(index !== 0 && "sr-only")}>Paid</FormLabel>
                                        <FormControl>
                                            <Input max={`fees.${index}.amount`} type="number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Separator />
                    </>
                ))}
                <Button type="submit">Collect Fees</Button>
            </form>
        </Form>
    )
}

export default CollectFeesForm
