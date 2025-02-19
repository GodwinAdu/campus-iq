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
import { toast } from '@/hooks/use-toast';
import { loginUser } from "@/lib/actions/login.action";
import { loginEmployee } from "@/lib/actions/employee-login.actions";

// Define a schema that allows either a username or an email
const formSchema = z.object({
    identifier: z.string().min(2, {
        message: "Enter a valid username or email.",
    }),
    password: z.string().min(5, {
        message: "Password must be at least 5 characters.",
    }),
    role: z.string().min(1, {
        message: "Please select a role.",
    }),
});

const LoginForm = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            identifier: "",
            password: "",
            role: "",
        },
    });

    const { isSubmitting } = form.formState;

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const user = await loginEmployee(values);

            if (!user) {
                throw new Error("Invalid credentials");
            }

            const rolePaths: Record<string, string> = {
                student: "/student/dashboard",
                teacher: "/teacher/dashboard",
                parent: "/parent/dashboard",
            };

            router.push(rolePaths[user.role] || `/${user.schoolId}/admin/${user._id}`);

            form.reset();

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
        }
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Username or Email Input */}
                <FormField
                    control={form.control}
                    name="identifier"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold">Username or Email</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Enter username or email"
                                    {...field}
                                    disabled={isSubmitting}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Password Input */}
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold">Password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Enter password"
                                    {...field}
                                    disabled={isSubmitting}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Role Selection */}
                <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold">Select Role</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                disabled={isSubmitting}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="employee">Employee</SelectItem>
                                    <SelectItem value="teacher">Teacher</SelectItem>
                                    <SelectItem value="student">Student</SelectItem>
                                    <SelectItem value="parent">Parent</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Submit Button */}
                <Button disabled={isSubmitting} className="w-full text-center" type="submit">
                    {isSubmitting ? "Signing in..." : "Log In"}
                </Button>
            </form>
        </Form>
    );
};

export default LoginForm;
