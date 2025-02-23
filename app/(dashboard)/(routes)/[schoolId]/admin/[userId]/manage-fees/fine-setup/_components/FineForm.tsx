"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react"
import { fetchFeeStructureClassId } from "@/lib/actions/fee-structure.actions"
import { toast } from "@/hooks/use-toast"
import { createFineFees } from "@/lib/actions/fees-fine.actions"
import { useParams, usePathname, useRouter } from "next/navigation"

const formSchema = z.object({
    stage: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    feesType: z.string(),
    fineType: z.string(),
    fineAmount: z.coerce.number(),
    frequency: z.string(),
});

interface FeesTypes {
    category: string;
    amount: number;
    _id: string;
}


const FineForm = ({ stages }: { stages: IClass[] }) => {
    const [feesTypes, setFeesTypes] = useState<FeesTypes[] | []>([])

    const path = usePathname();
    const router = useRouter();
    const params = useParams();

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            stage: "",
        },
    });

    const classId = form.watch("stage");

    useEffect(() => {
        if (classId) {
            const fetchStage = async () => {
                try {
                    const data = await fetchFeeStructureClassId(classId);
                    setFeesTypes(data.fees)

                } catch (error) {
                    toast({
                        title: "Something went wrong",
                        description: "Please try again later...",
                        variant: "destructive",
                    })
                }
            }

            fetchStage()
        }
    }, [classId])

    console.log(feesTypes)



    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await createFineFees(values, path)
            form.reset()
            router.push(`/admin/${params.adminId}/account/fine-setup`)
            toast({
                title: "New Fees Fine",
                description: "New Fees Fine was added successfully...",
            })

        } catch (error) {
            toast({
                title: "Something went wrong",
                description: `Please try again later`,
                variant: "destructive",
            })

        }
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>New Fees Fine</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
                            <FormField
                                control={form.control}
                                name="stage"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Class/Stage</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select stage/class" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {stages?.map((stage) => (
                                                    <SelectItem key={stage._id} value={stage._id}>{stage.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="feesType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Fees Type</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Fees type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {feesTypes?.map((fees) => (
                                                    <SelectItem key={fees._id} value={fees.category}>{fees.category}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="fineType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Fine Type</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Fine Type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Fixed">Fixed</SelectItem>
                                                <SelectItem value="Percentage">Percentage</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="fineAmount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Fine Amount</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="Enter Amount here" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="frequency"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Late Fees Frequency</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select frequency" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Fixed">Fixed</SelectItem>
                                                <SelectItem value="Daily">Daily</SelectItem>
                                                <SelectItem value="Weekly">Weekly</SelectItem>
                                                <SelectItem value="Monthly">Monthly</SelectItem>
                                                <SelectItem value="Annually">Annually</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex justify-end ">
                            <Button type="submit">Submit</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="flex justify-center items-center">
                <p className="text-sm text-gray-400">By Jutech Devs</p>
            </CardFooter>
        </Card>
    )
}

export default FineForm
