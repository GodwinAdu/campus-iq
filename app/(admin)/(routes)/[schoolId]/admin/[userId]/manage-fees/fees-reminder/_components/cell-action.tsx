"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { sendReminderMessage } from "@/lib/actions/fee-reminder.actions";

const formSchema = z.object({
    message: z.string().min(2, {
        message: "Message must be at least 2 characters.",
    }),
});

interface MessageSendingProps {
    selectedStudents?: any[];
    data?: any
}

const CellAction: React.FC<MessageSendingProps> = ({ selectedStudents, data }) => {
    if (selectedStudents) {
        console.log(selectedStudents, "selected students")
    }
    console.log(data, "selected students")
    const defaultMessage = `Dear Parent/Guardian,

        We would like to inform you that some or all of the fees for your child are still unpaid. Please make the necessary payments at your earliest convenience.

        Thank you,`;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            message: defaultMessage,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await sendReminderMessage({ selectedStudents, data, values })

            toast({
                title: "Emails Sent",
                description: "Your messages have been sent successfully.",
            });
        } catch (error) {
            console.log(error);

            toast({
                title: "Something went wrong",
                description: "Please try again later",
                variant: "destructive",
            });

        }

    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Badge className="cursor-pointer p-1" variant="outline"><Send className="w-4 h-4 mr-2" />Send Email</Badge>
            </DialogTrigger>
            <DialogContent className="w-[95%] max-w-lg">
                <DialogHeader>
                    <DialogTitle>Send Message</DialogTitle>
                    <DialogDescription>
                        Please enter your message to send to notify students.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email Message</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Enter your message here"
                                            className=""
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-end">
                            <Button size="sm" variant="outline" type="submit"><Send className="w-4 h-4 mr-2" /> Send</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default CellAction;
