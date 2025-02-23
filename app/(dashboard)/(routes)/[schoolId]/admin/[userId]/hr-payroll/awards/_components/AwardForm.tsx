"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
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
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "@/hooks/use-toast";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchStudentByRole } from "@/lib/actions/student.actions";
import { fetchParentByRole } from "@/lib/actions/parent.actions";
import { fetchEmployeeByRole } from "@/lib/actions/employee.actions";
import { Textarea } from "@/components/ui/textarea";
import { createAward } from "@/lib/actions/award.actions";

const formSchema = z.object({
    role: z.string().min(2, {
        message: "Role must be at least 2 characters.",
    }),
    awardToId: z.string().min(2, {
        message: "SaleToId must be at least 2 characters.",
    }),
    classId: z.string().optional(),
    awardName: z.string(),
    giftItem: z.string(),
    awardReason: z.string(),
    cashPrice: z.coerce.number(),
    givenDate: z.coerce.date(),
});

interface IssueProps {
    type: "create" | "update";
    initialData?: any;
    roles: IRole[];
    classes: IClass[];
}

const AwardForm = ({ roles, classes, type, initialData }: IssueProps) => {
    const [salesToData, setSalesToData] = useState<{ _id: string, fullName: string }[]>([]);

    const router = useRouter();
    const path = usePathname();
    const params = useParams();

    const issueId = initialData?._id;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ?? {
            role: "",
            awardToId: "",
            awardName: "",
            giftItem: "",
            awardReason: "",
            cashPrice: 0,
            givenDate: new Date(),
        },
    });

    const watchRole = useWatch({
        control: form.control,
        name: "role"
    });
    console.log(watchRole, "watch role");

    const watchClass = useWatch({
        control: form.control,
        name: "classId"
    });



    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!watchRole) return;
                console.log('Fetching data for role:', watchRole);

                let data = [];

                if (watchRole === "student" && watchClass) {
                    data = await fetchStudentByRole(watchRole, watchClass);
                    console.log('Fetched students data:', data);
                } else if (watchRole === "parent") {
                    data = await fetchParentByRole(watchRole);
                    console.log('Fetched parents data:', data);
                } else {
                    data = await fetchEmployeeByRole(watchRole);
                    console.log('Fetched employees data:', data);
                }

                setSalesToData(data || []);
                console.log('Updated salesToData:', data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [watchClass, watchRole]);




    console.log(salesToData, "salesToData")

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {

            if (type === "create") {
                await createAward(values, path)
            }
            if (type === "update") {

            }

            form.reset();
            router.push(`/admin/${params.admin}/hr-payroll/awards`);
            toast({
                title: "Purchase updated",
                description: "Purchase was updated successfully...",
            });
        } catch (error) {
            console.error("Error submitting purchase form schema", error);

            toast({
                title: "Error",
                description: "An error occurred while submitting your form. Please try again later.",
                variant: "destructive",
            });
        }
    }

    return (
        <Card>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-3  gap-4 py-6">
                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Choose a Role</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a role" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {roles?.map(role => (
                                                    <SelectItem key={role._id} value={role.displayName}>{role.displayName}</SelectItem>
                                                ))}
                                                <SelectItem value="student">Student</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {watchRole === 'student' && (
                                <FormField
                                    control={form.control}
                                    name="classId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Choose Class</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a class" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {classes?.map(cls => (
                                                        <SelectItem key={cls._id} value={cls._id ?? ""}>{cls.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}
                            <FormField
                                control={form.control}
                                name="awardToId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Select Award To</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Award to" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {salesToData?.map(data => (
                                                    <SelectItem key={data?._id} value={data?._id}>{data?.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="awardName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Enter Award Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Award Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="giftItem"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Enter Gift Item</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Gift Item" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="givenDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col pt-2">
                                        <FormLabel>Given Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-full pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(field.value, "PPP")
                                                        ) : (
                                                            <span>Pick a date</span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date < new Date()
                                                    }
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="cashPrice"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Cash Price</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="Cash Price" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="awardReason"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Award Reason</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="A little description about the award...." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                        </div>

                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default AwardForm;
