"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
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
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useParams, usePathname, useRouter } from "next/navigation";
import { createPurchase, updatePurchase } from "@/lib/actions/inventory-purchase.actions";
import { useEffect, useState } from "react";
import { fetchStudentByRole } from "@/lib/actions/student.actions";
import { fetchParentByRole } from "@/lib/actions/parent.actions";
import { fetchEmployeeByRole } from "@/lib/actions/employee.actions";
import { fetchProductsByCategory } from "@/lib/actions/inventory-product.actions";
import { createIssue, updateInventoryIssue } from "@/lib/actions/inventory-issue.actions";

const formSchema = z.object({
    role: z.string().min(2, {
        message: "Role must be at least 2 characters.",
    }),
    saleToId: z.string().min(2, {
        message: "SaleToId must be at least 2 characters.",
    }),
    status: z.string().optional(),
    classId: z.string().optional(),
    issueDate: z.date(),
    returnDate: z.date().optional(),
    issueItems: z
        .array(
            z.object({
                categoryId: z.string().min(2, { message: "Please specify category type" }),
                productId: z.string().min(2, { message: "Please specify product type" }),
                quantity: z.coerce.number(),
            })
        ),
});

interface IssueProps {
    type: "create" | "update";
    initialData?: any;
    roles: IRole[];
    categories: any[];
    classes: any[];
}

const IssuesForm = ({ roles, categories, classes, type, initialData }: IssueProps) => {
    const [salesToData, setSalesToData] = useState<{ _id: string, fullName: string }[]>([]);
    const [products, setProducts] = useState<Record<string, any[]>>({});

    const router = useRouter();
    const path = usePathname();
    const params = useParams();

    const issueId = initialData?._id;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ?? {
            role: "",
            saleToId: "",
            status: "",
            issueDate: new Date(),
            issueItems: [{ categoryId: "", productId: "", quantity: 1, }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        name: "issueItems",
        control: form.control,
    });

    const watchIssueItems = useWatch({
        control: form.control,
        name: "issueItems",
    }) || [];

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

    useEffect(() => {
        const fetchProducts = async () => {
            const categoryIds = watchIssueItems.map(item => item.categoryId).filter(Boolean);
            if (categoryIds.length > 0) {
                const allProducts = await Promise.all(categoryIds.map(categoryId => fetchProductsByCategory(categoryId)));
                const productsMap: Record<string, any[]> = categoryIds.reduce((acc, categoryId, index) => {
                    acc[categoryId] = allProducts[index];
                    return acc;
                }, {});
                setProducts(productsMap);
            }
        };

        fetchProducts();
    }, [watchIssueItems]);

    console.log(products, 'products');



    console.log(salesToData, "salesToData")

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (type === "create") {
                await createIssue(values, path)
            }
            if (type === "update") {
                await updateInventoryIssue(issueId, values, path)
            }
       
            form.reset();
            router.push(`/admin/${params.admin}/inventory/issue`);
            toast({
                title: "Purchase updated",
                description: "Purchase was updated successfully...",
            });
        } catch (error) {
       
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
                        <Card className="w-[95%] max-w-2xl mt-4 mx-auto">
                            <CardContent className="space-y-6 py-4">
                                <FormField
                                    control={form.control}
                                    name="role"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Choose a Role</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a supplier" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {roles?.map(role => (
                                                        <SelectItem key={role._id} value={role.displayName}>{role.displayName}</SelectItem>
                                                    ))}
                                                    <SelectItem value="parent">Parent</SelectItem>
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
                                                            <SelectItem key={cls._id} value={cls._id}>{cls.name}</SelectItem>
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
                                    name="saleToId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Select Issue To</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Sale to" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {salesToData?.map(data => (
                                                        <SelectItem key={data?._id} value={data?._id}>{data?.fullName}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {type === "update" && (
                                    <FormField
                                        control={form.control}
                                        name="status"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Issue Status</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a status" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="Pending">Pending</SelectItem>
                                                        <SelectItem value="Ordered">Ordered</SelectItem>
                                                        <SelectItem value="Received">Received</SelectItem>
                                                        <SelectItem value="Rejected">Rejected</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}
                                <FormField
                                    control={form.control}
                                    name="issueDate"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Date of Purchase</FormLabel>
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
                                    name="returnDate"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Date of Return</FormLabel>
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
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="py-4">
                                {fields.map((field, index) => (
                                    <div key={field.id} className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
                                        <FormField
                                            control={form.control}
                                            name={`issueItems.${index}.categoryId`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className={cn(index !== 0 && "sr-only")}>Category</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select a product" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {categories.map((category) => (
                                                                <SelectItem key={category._id} value={category._id}>{category.name}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`issueItems.${index}.productId`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className={cn(index !== 0 && "sr-only")}>Product</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select a product" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {(products[watchIssueItems[index]?.categoryId] || []).map((product) => (
                                                                <SelectItem key={product._id} value={product._id}>{product.name}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <div className="flex  gap-5 items-center">
                                            <FormField
                                                control={form.control}
                                                name={`issueItems.${index}.quantity`}
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className={cn(index !== 0 && "sr-only")}>Quantity</FormLabel>
                                                        <FormControl>
                                                            <Input type="number" min={1} {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            {index !== 0 && (
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => remove(index)}
                                                >
                                                    <X className="w-4 h-4" />
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                <div className="">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        className="mt-2"
                                        onClick={() => append({ categoryId: "", productId: "", quantity: 1, })}
                                    >
                                        New Form
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default IssuesForm;
