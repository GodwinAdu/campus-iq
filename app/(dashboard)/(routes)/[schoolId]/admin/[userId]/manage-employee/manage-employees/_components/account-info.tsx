import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useFormContext } from "react-hook-form"
const AccountInfoStep = () => {

    const { control } = useFormContext()
    // idCardType: "",
    // idCard: "",
    // accountType: "",
    // accountName: "",
    // accountNumber: "",

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                    control={control}
                    name="identification.socialSecurityNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>SSN (social security number)</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter SSN" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="identification.taxIdentificationNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>TIN (tax identification number)</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter TIN" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="identification.idCardType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Select ID Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select ID Type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {['Passport', 'Voters ID', 'Ghana Card', 'Driving License'].map((value) => (
                                        <SelectItem key={value} value={value.toLowerCase()}>{value}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="identification.idCard"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>ID Card Number</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="Enter ID Number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="identification.bankDetails.bankName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Select Account Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Account Type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {['Bank', 'Momo'].map((value) => (
                                        <SelectItem key={value} value={value.toLowerCase()}>{value}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="identification.bankDetails.accountName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Account Name</FormLabel>
                            <FormControl>
                                <Input autoComplete="state" placeholder="Enter Account Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="identification.bankDetails.accountNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Account Number</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter Account Number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="identification.workPermit"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                                <FormLabel>Work Permit</FormLabel>
                                <FormDescription>
                                    Switch to true if given employment letter to Employee.
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

            </div>

        </>
    )
}

export default AccountInfoStep

