import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
                    name="idCardType"
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
                    name="idCard"
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
                    name="accountType"
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
                    name="accountName"
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
                    name="accountNumber"
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

            </div>

        </>
    )
}

export default AccountInfoStep

