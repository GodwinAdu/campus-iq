
"use client"

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { resetBookFine } from "@/lib/actions/book-transaction.actions";
import { TimerReset } from "lucide-react";
import { useRouter } from "next/navigation";

interface ResetProps {
    data: IBookFine;
}

const ResetComponent = ({ data }: ResetProps) => {
    const router = useRouter()

    const handlePaymentReset = async (id: string) => {
        try {
            await resetBookFine(id)
            toast({
                title: "Payment Reset to default",
                description: "Payment was reset successfully...",

            });
            router.refresh();
        } catch (error) {
            toast({
                title: "Something Went Wrong",
                description: "Please try again later",
                variant: "destructive",
            });
        }
    };

    return (
        <>
            <Button onClick={() => handlePaymentReset(data?._id)} variant="destructive" size="icon"><TimerReset className="w-4 h-4" /></Button>
        </>
    )
}

export default ResetComponent
