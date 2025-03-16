"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Trash2, Plus, Loader2 } from 'lucide-react'

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"


const paymentMethodSchema = z.object({
    name: z.string(),
    enabled: z.boolean(),
    processingFee: z.coerce.number().min(0).max(100).optional(),
    minimumAmount: z.coerce.number().min(0).optional(),
}).optional()

const paymentProcessorSchema = z.object({
    name: z.string().optional(),
    apiKey: z.string().optional(),
    secretKey: z.string().optional(),
    enabled: z.boolean(),
}).optional()

const paymentSettingsSchema = z.object({
    paymentSettings: z.object({
        paymentMethods: z.array(paymentMethodSchema),
        paymentProcessors: z.array(paymentProcessorSchema),
        defaultCurrency: z.string(),
        acceptedCurrencies: z.array(z.string()),
        partialPayments: z.coerce.boolean(),
    }),
})

type PaymentSettingsValues = z.infer<typeof paymentSettingsSchema>


export default function PaymentSettings({ school }) {
    const router = useRouter();
    const schoolId = school?._id;

    const defaultValues: Partial<PaymentSettingsValues> = {
        paymentSettings: {
            paymentMethods: [],
            paymentProcessors: [
                { name: "Pay Stack", apiKey: "", secretKey: "", enabled: false },
            ],
            defaultCurrency: "GHS",
            acceptedCurrencies: ["GHS"],
            partialPayments: false,

        }
    }

    const form = useForm<PaymentSettingsValues>({
        resolver: zodResolver(paymentSettingsSchema),
        defaultValues,
    });

    const { isSubmitting } = form.formState;

    const { fields: paymentMethodFields, append: appendPaymentMethod, remove: removePaymentMethod } = useFieldArray({
        control: form.control,
        name: "paymentSettings.paymentMethods",
    })

    const { fields: paymentProcessorFields, append: appendPaymentProcessor, remove: removePaymentProcessor } = useFieldArray({
        control: form.control,
        name: "paymentSettings.paymentProcessors",
    })

    const selectedCurrencies = form.watch('paymentSettings.acceptedCurrencies')

    async function onSubmit(data: PaymentSettingsValues) {
        try {

            router.refresh();
            toast({
                title: "Payment settings updated successfully",
                description: "Your payment settings have been saved.",
                // variant: "success",
            })

        } catch {
            toast({
                title: "Error updating payment settings",
                description: "An error occurred while updating payment settings",
                variant: "destructive",
            })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* <FormField
          control={form.control}
          name="paymentSettings.overrideBranchSettings"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Override Branch Settings</FormLabel>
                <FormDescription>
                  Enable to override the branch-level payment settings for this store.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        /> */}

                <Tabs defaultValue="general" className="w-full">
                    <div className="max-w-[85vw] sm:max-w-[90vw] md:max-w-full relative overflow-x-auto scrollbar-hide"
                        style={{ WebkitOverflowScrolling: "touch" }}>
                        <TabsList>
                            <TabsTrigger value="general">General Settings</TabsTrigger>
                            <TabsTrigger value="methods">Payment Methods</TabsTrigger>
                            <TabsTrigger value="processors">Payment Processors</TabsTrigger>
                            <TabsTrigger value="advanced">Advanced Settings</TabsTrigger>
                        </TabsList>
                    </div>
                    <TabsContent value="general">
                        <Card>
                            <CardHeader>
                                <CardTitle>General Payment Settings</CardTitle>
                                <CardDescription>Configure general payment settings for your store</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="paymentSettings.defaultCurrency"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Default Currency</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select default currency" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {selectedCurrencies.map(currency => (
                                                        <SelectItem key={currency} value={currency}>{currency}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="paymentSettings.acceptedCurrencies"
                                    render={() => (
                                        <FormItem>
                                            <div className="mb-4">
                                                <FormLabel className="text-base">Accepted Currencies</FormLabel>
                                                <FormDescription>
                                                    Select the currencies you want to accept for payments.
                                                </FormDescription>
                                            </div>
                                            {["GHS", "USD", "EUR", "JPY", "CAD", "AUD"].map((currency) => (
                                                <FormField
                                                    key={currency}
                                                    control={form.control}
                                                    name="paymentSettings.acceptedCurrencies"
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem
                                                                key={currency}
                                                                className="flex flex-row items-start space-x-3 space-y-0"
                                                            >
                                                                <FormControl>
                                                                    <Checkbox
                                                                        checked={field.value?.includes(currency)}
                                                                        onCheckedChange={(checked) => {
                                                                            return checked
                                                                                ? field.onChange([...field.value, currency])
                                                                                : field.onChange(
                                                                                    field.value?.filter(
                                                                                        (value) => value !== currency
                                                                                    )
                                                                                )
                                                                        }}
                                                                    />
                                                                </FormControl>
                                                                <FormLabel className="font-normal">
                                                                    {currency}
                                                                </FormLabel>
                                                            </FormItem>
                                                        )
                                                    }}
                                                />
                                            ))}
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="methods">
                        <Card>
                            <CardHeader>
                                <CardTitle>Payment Methods</CardTitle>
                                <CardDescription>Configure accepted payment methods and their settings</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {paymentMethodFields.map((field, index) => (
                                    <div key={field.id} className="flex items-center space-x-2 mb-4">
                                        <FormField
                                            control={form.control}
                                            name={`paymentSettings.paymentMethods.${index}.name`}
                                            render={({ field }) => (
                                                <FormItem className="flex-1">
                                                    <FormControl>
                                                        <Input {...field} placeholder="Payment method name" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name={`paymentSettings.paymentMethods.${index}.processingFee`}
                                            render={({ field }) => (
                                                <FormItem className="flex-1">
                                                    <FormControl>
                                                        <Input {...field} type="number" step="0.1" placeholder="Processing fee (%)" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`paymentSettings.paymentMethods.${index}.minimumAmount`}
                                            render={({ field }) => (
                                                <FormItem className="flex-1">
                                                    <FormControl>
                                                        <Input {...field} type="number" step="0.01" placeholder="Minimum amount" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`paymentSettings.paymentMethods.${index}.enabled`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Switch
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button type="button" variant="destructive" size="icon" onClick={() => removePaymentMethod(index)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                                <Button type="button" variant="outline" size="sm" onClick={() => appendPaymentMethod({ name: '', enabled: true, processingFee: 0, minimumAmount: 0 })}>
                                    <Plus className="h-4 w-4 mr-2" /> Add Payment Method
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="processors">
                        <Card>
                            <CardHeader>
                                <CardTitle>Payment Processors</CardTitle>
                                <CardDescription>Manage payment processor integrations</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {paymentProcessorFields.map((field, index) => (
                                    <div key={field.id} className="flex items-center space-x-2 mb-4">
                                        <FormField
                                            control={form.control}
                                            name={`paymentSettings.paymentProcessors.${index}.name`}
                                            render={({ field }) => (
                                                <FormItem className="flex-1">
                                                    <FormControl>
                                                        <Input {...field} placeholder="Processor name" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`paymentSettings.paymentProcessors.${index}.apiKey`}
                                            render={({ field }) => (
                                                <FormItem className="flex-1">
                                                    <FormControl>
                                                        <Input {...field} type="password" placeholder="API Key" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`paymentSettings.paymentProcessors.${index}.secretKey`}
                                            render={({ field }) => (
                                                <FormItem className="flex-1">
                                                    <FormControl>
                                                        <Input {...field} type="password" placeholder="SECRET Key" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`paymentSettings.paymentProcessors.${index}.enabled`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Switch
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button type="button" variant="destructive" size="icon" onClick={() => removePaymentProcessor(index)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                                <Button type="button" variant="outline" size="sm" onClick={() => appendPaymentProcessor({ name: '', apiKey: '', secretKey: "", enabled: false })}>
                                    <Plus className="h-4 w-4 mr-2" /> Add Payment Processor
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="advanced">
                        <Card>
                            <CardHeader>
                                <CardTitle>Advanced Payment Settings</CardTitle>
                                <CardDescription>Configure advanced payment options for your store</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="paymentSettings.partialPayments"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                            <div className="space-y-0.5">
                                                <FormLabel className="text-base">Allow Partial Payments</FormLabel>
                                                <FormDescription>
                                                    Enable customers to make partial payments on their orders.
                                                </FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
                <Button disabled={isSubmitting} type="submit">
                    {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                    {isSubmitting ? 'Updating ...' : "Save payment"}
                </Button>
            </form>
        </Form>
    )
}

