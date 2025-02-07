"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import { updateFullyPayment } from "@/lib/actions/fees-payment.actions"
import { useRouter } from "next/navigation"
import { Checkbox } from "@/components/ui/checkbox"

const formSchema = z.object({
    messageGuardian: z.boolean().optional(),
    amount: z.coerce.number().nonnegative({ message: "Amount must be a positive number" }),
    fine: z.coerce.number().nonnegative().optional(),
    paymentMethod: z.string().optional(),
    account: z.string().optional(),
})

const CollectFullFeesForm = ({ initialData }: { initialData: IFeesPayment }) => {
    const router = useRouter();
    const totalAmount = initialData.fees.map((fees) => fees.amount).reduce((acc, fee) => {
        return acc += fee
    }, 0)
    const totalFined = initialData.fees.map((fees) => fees.fine).reduce((acc, fee) => {
        return acc += fee
    }, 0)
    const totalPaid = initialData.fees.map((fees) => fees.paid).reduce((acc, fee) => {
        return acc += fee
    }, 0)
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            messageGuardian: false,
            amount: (totalAmount - totalPaid),
            fine: totalFined,
            paymentMethod: "",
            account: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await updateFullyPayment(initialData?._id, values);

            toast({
                title: "Success",
                description: "Fees payment updated successfully",
                // variant: "success",
            })
            window.location.reload();

        } catch (error: any) {
            console.log(" submission error: " + error);
            toast({
                title: "Something went wrong",
                description: error.message,
                variant: "destructive",
            })
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Amount</FormLabel>
                                <FormControl>
                                    <Input disabled type="number"  {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="fine"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Fine</FormLabel>
                                <FormControl>
                                    <Input disabled type="number"  {...field} />
                                </FormControl>
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
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}

export default CollectFullFeesForm
