"use client";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/lib/helpers/logout";

// Dynamically import PaystackButton (client-side only)
const PaystackButton = dynamic(() => import("react-paystack").then(mod => mod.PaystackButton), {
    ssr: false
});

const publicRoutes = ["/", "/sign-in", "/sign-up", "/banned-school"];

const formSchema = z.object({
    period: z.object({
        frequency: z.string(),
        value: z.coerce.number().min(1),
    }),
    totalStudents: z.coerce.number().min(1),
});

// Calculate price per student based on plan
const calculatePrice = (plan: "basic" | "pro" | "custom", students: number) => {
    const rates = { basic: 5, pro: 10, custom: 15 };
    return students * rates[plan];
};

// Calculate the total price with discounts
const calculateTotalPrice = (plan: "basic" | "pro" | "custom", students: number, period: number) => {
    const basePrice = calculatePrice(plan, students) * period;

    if (period === 4) {
        return basePrice * 0.95; // 5% discount for 4 months
    }
    if (period === 12) {
        return basePrice * 0.90; // 10% discount for 12 months
    }
    return basePrice;
};

const periods = [
    { frequency: "monthly", value: 1 },
    { frequency: "term", value: 4 },
    { frequency: "yearly", value: 12 },
];

export function PaymentDialog({ school, open, onOpenChange }: { school: ISchool, open: boolean; onOpenChange: (open: boolean) => void }) {
    const [setupPrice, setSetupPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const router = useRouter();
    const path = usePathname();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            period: { frequency: "monthly", value: 1 },
            totalStudents: school.subscriptionPlan.currentStudent,
        },
    });

    const students = form.watch("totalStudents");
    const period = form.watch("period");

    useEffect(() => {
        setSetupPrice(calculatePrice(school.subscriptionPlan.plan, students));
        setTotalPrice(calculateTotalPrice(school.subscriptionPlan.plan, students, period.value));
    }, [students, period, school.subscriptionPlan.plan]);

    const handlePaymentSuccess = () => {
        form.handleSubmit(onSubmit)();
    };

    const subscriptionClose = async () => {
        await logout();
        router.replace("/");
    };

    const componentProps = {
        email: "gyamfiadu01@gmail.com",
        amount: totalPrice * 100,
        currency: process.env.NEXT_PUBLIC_PAYSTACK_CURRENCY!,
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
        text: "Pay Now",
        onSuccess: handlePaymentSuccess,
        onClose: subscriptionClose,
    };

    // const show = publicRoutes.some((route) => path === route || path.startsWith(`${route}/`));

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log("Form submitted:", values);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="bg-indigo-600 text-white p-1 w-full rounded-md hover:bg-indigo-700 transition-colors duration-300">
                    Proceed Payment
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Proceed Payment</DialogTitle>
                    <DialogDescription>
                        Select a subscription period, confirm your school details, and proceed to payment.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="period"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Subscription Period</FormLabel>
                                    <Select
                                        onValueChange={(value) => {
                                            const selectedPeriod = periods.find(
                                                (p) => String(p.value) === value
                                            );
                                            field.onChange(selectedPeriod!);
                                        }}
                                        defaultValue={String(field.value.value)}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select period" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {periods.map((p) => (
                                                <SelectItem key={p.value} value={String(p.value)}>
                                                    {p.frequency}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="totalStudents"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Number of Students</FormLabel>
                                    <Input {...field} type="number" min={1} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <p className="text-gray-600">
                            Setup Price:{" "}
                            <span className="font-bold text-green-700">GH₵{setupPrice}</span> Monthly
                        </p>
                        <p className="text-gray-600">
                            Total Price:{" "}
                            <span className="font-bold text-blue-700">GH₵{totalPrice}</span>
                        </p>
                        {form.watch("period.value") === 4 && (
                            <p className="text-sm text-green-600">
                                A 5% discount has been applied for a 4-month subscription.
                            </p>
                        )}
                        {form.watch("period.value") === 12 && (
                            <p className="text-sm text-green-600">
                                A 10% discount has been applied for a yearly subscription.
                            </p>
                        )}

                        <DialogClose asChild>
                            <PaystackButton {...componentProps} className="inline-block w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-300" />
                        </DialogClose>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
