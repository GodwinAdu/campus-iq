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
import { useState } from "react";
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
import { toast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { createClassPayment } from "@/lib/actions/class-payment.actions";


const FormSchema = z.object({
    amount: z
        .coerce.number({
            required_error: "Please add payment amount.",
        }),
    paymentMethod: z.string()
})


interface CellActionProps {
    data: StudentCanteen;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
    const [amount, setAmount] = useState(0)
    const studentId = data?._id as string;

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    const { isSubmitting } = form.formState


    async function onSubmit(values: z.infer<typeof FormSchema>) {
        try {
            await createClassPayment(values, studentId)
            toast({
                title: "Payment Successfully",
                description: "Payment was successfully...",
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



    return (
        <>
            {data.payed ? (
                <>
                    <Badge className="cursor-pointer bg-green-500 hover:bg-green-700">Completed</Badge>
                </>
            ) : (
                <Dialog>
                    <DialogTrigger asChild>
                        <Badge className="cursor-pointer">Pay Now</Badge>
                    </DialogTrigger>
                    <DialogContent className="w-[96%] max-w-lg">
                        <DialogHeader>
                            <DialogTitle>Class fees Payment</DialogTitle>
                            <DialogDescription>
                                Add payment receive from student or deduct from student balance
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-6">
                            <h6 className="font-bold text-sm">Student Account Balance</h6>
                            <div className="flex items-center gap-8">
                                <p className="text-sm text-primary">Balance: Gh₵ <span className="font-bold text-black">{data.account.balance.toFixed(2)}</span></p>
                                <div className="flex items-center gap-2">
                                    <Input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
                                    <Button type="button" variant='destructive'>Deduct</Button>
                                </div>
                            </div>

                        </div>
                        <Separator />

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="amount"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Enter Amount (Gh₵)</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="Enter the amount" {...field} />
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
                                            <FormLabel>Payment Method</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select payment method" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {["Cash", "Mobile Money", "Card", "Bank Transfer"].map((value) => (
                                                        <SelectItem key={value} value={value}>{value}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button disabled={isSubmitting} type="submit">
                                    {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                                    {isSubmitting ? "Submitting..." : "Add Payment"}
                                </Button>
                            </form>
                        </Form>

                    </DialogContent>
                </Dialog>
            )}

        </>
    );
};
