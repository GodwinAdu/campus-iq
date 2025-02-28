"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { loginEmployee } from "@/lib/actions/employee-login.actions";
import { loginStudent } from "@/lib/actions/student/login.actions";

// Define a schema that ensures identifier and password validation
const formSchema = z.object({
    identifier: z.string().min(2, "Enter a valid username or email."),
    password: z.string().min(5, "Password must be at least 5 characters."),
    role: z.enum(["employee", "student", "parent"], { message: "Please select a valid role." }),
});

const LoginForm = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            identifier: "",
            password: "",
            role: undefined,
        },
    });

    const { isSubmitting } = form.formState;

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            let user;
            if (values.role === "student") {
                user = await loginStudent(values);
                router.push(`/${user.schoolId}`);
            } else if (values.role === "employee") {
                user = await loginEmployee(values);
                router.push(`/${user.schoolId}`);
            } else if (values.role === "parent") {
                // Placeholder for parent login logic
                toast({ title: "Parent login not yet implemented." });
                return;
            }

            toast({
                title: "Welcome Back!",
                description: "You are now logged in.",
            });
        } catch (error) {
            console.error("Error submitting form:", error);
            toast({
                title: "Login Failed",
                description: error instanceof Error ? error.message : "Please try again later.",
                variant: "destructive",
            });
        } finally {
            form.reset();
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="identifier"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold">Username or Email</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Enter username or email" {...field} disabled={isSubmitting} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold">Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Enter password" {...field} disabled={isSubmitting} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold">Select Role</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isSubmitting}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="employee">Administration</SelectItem>
                                    <SelectItem value="student">Student</SelectItem>
                                    <SelectItem value="parent">Parent</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button disabled={isSubmitting} className="w-full text-center" type="submit">
                    {isSubmitting ? "Signing in..." : "Log In"}
                </Button>
            </form>
        </Form>
    );
};

export default LoginForm;
