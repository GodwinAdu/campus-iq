import { useForm } from 'react-hook-form'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'


// addresses: {
//     schoolAddress: { type: String, default: "" },
//     schoolCity: { type: String, default: "" },
//     schoolState: { type: String, default: "" },
//     schoolZipcode: { type: String, default: "" },
//     schoolCountry: { type: String, default: "" },
// },

const storeFormSchema = z.object({
    schoolName: z.string().min(2, {
        message: "School name must be at least 2 characters.",
    }),
    schoolLogo: z.string().url().nullable(),
    schoolEmail: z.string().email({
        message: "Please enter a valid email address.",
    }),
    schoolPhone: z.string().nullable(),
    motto: z.string(),
    establishYear: z.number(),
    affiliation: z.string().optional(),
    website: z.string().optional(),
    addresses: z.object({
        schoolCity: z.string(),
        schoolState: z.string(),
        schoolZipcode: z.string(),
        schoolCountry: z.string(),
    }),
    autoDeleteTrash: z.boolean(),
})

type StoreFormValues = z.infer<typeof storeFormSchema>

export default function BasicInfoForm({ school }: { school: ISchool }) {

    const router = useRouter()
    const storeId = school._id
    const defaultValues: Partial<StoreFormValues> = school ?? {
        schoolName: "",
        shoolLogo: "",
        schoolEmail: "",
        schoolPhone: "",
        motto: "",
        establishYear: null,
        affiliation: "",
        website: "",
        addresses: {
            schoolAddress: "",
            schoolCity: "",
            schoolState: "",
            schoolZipcode: "",
            schoolCountry: "",
        },
    }

    const form = useForm<StoreFormValues>({
        resolver: zodResolver(storeFormSchema),
        defaultValues,
    });

    const { isSubmitting } = form.formState;

    async function onSubmit(data: StoreFormValues) {
        try {

            router.refresh()
            toast({
                title: "Settings updated successfully",
                description: "Your school settings have been saved.",
                // variant: "success",
            })
        } catch {
            toast({
                title: "Error",
                description: "An error occurred while saving your settings.",
                variant: "destructive",
            })
        }
    }

    return (

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                        <FormField
                            control={form.control}
                            name="shoolLogo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>School Logo</FormLabel>
                                    <FormControl>
                                        <div className="flex items-center space-x-4 flex-col md:flex-row gap-3">
                                            <Avatar className="h-20 w-20">
                                                <AvatarImage src={field.value || undefined} alt="school logo" />
                                                <AvatarFallback>{school.schoolName.toUpperCase().slice(0, 2)}</AvatarFallback>
                                            </Avatar>
                                            <Input placeholder="Enter Logo Url" {...field} value={field.value ?? ''} />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <FormField
                            control={form.control}
                            name="schoolName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>School Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Eg. Jenny's Academy" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="schoolEmail"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>School Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="Enter school email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="schoolPhone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>School Phone</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter school phone" {...field} value={field.value ?? ''} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="establishYear"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Establish Year</FormLabel>
                                    <FormControl>
                                        <Input type='number' placeholder="Eg. 2005" {...field} value={field.value ?? ''} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="affiliation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Affiliation (Optional)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter school address" {...field} value={field.value ?? ''} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="motto"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Enter Motto</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter school address" {...field} value={field.value ?? ''} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="addresses.schoolCity"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Enter City</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter school city" {...field} value={field.value ?? ''} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="addresses.schoolState"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Enter State</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter school state" {...field} value={field.value ?? ''} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="addresses.schoolCountry"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Enter Country</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter school country" {...field} value={field.value ?? ''} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="addresses.zipCode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Enter Zipcode</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Eg. 00233" {...field} value={field.value ?? ''} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="accessStudentDashboard"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                        Student dashboard applicable
                                        </FormLabel>
                                        <FormDescription>
                                        If disabled, the Student Dashboard will be inaccessible, and the pricing will be adjusted accordingly.
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="accessParentDashboard"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                        Parent dashboard applicable
                                        </FormLabel>
                                        <FormDescription>
                                        If disabled, the Parent Dashboard will be inaccessible, and the pricing will be adjusted accordingly.
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex justify-end">
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isSubmitting ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    )
}

