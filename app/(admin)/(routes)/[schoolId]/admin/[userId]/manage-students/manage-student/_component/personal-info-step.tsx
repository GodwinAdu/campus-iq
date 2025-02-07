import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useFieldArray, useFormContext } from "react-hook-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarIcon, Trash2 } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format, setYear } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"

const PersonalInfoStep = () => {
    const [selectedYear, setSelectedYear] = useState<number | null>(null)

    const currentYear = new Date().getFullYear()
    const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i)

    const { control } = useFormContext()
    const { fields, append, remove } = useFieldArray({
        control,
        name: "emergencyContacts",
    })


    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                    control={control}
                    name="fullName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter full name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="Enter email address" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter phone number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="gender"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Gender</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select gender" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="not defined">Not defined</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                    <SelectItem value="male">Male</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="addresses.state"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                                <Input autoComplete="state" placeholder="Enter state" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="addresses.city"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter city" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="addresses.street"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Street</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter street" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="addresses.country"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter country" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="addresses.zipCode"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Zip Code</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter zipcode (00233)" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="currentAddress"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Current Address</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter current address" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="permanentAddress"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Permanent Address</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter permanent address (Optional)" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="dob"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Date of birth</FormLabel>
                            <div className="flex space-x-2">
                                <Select onValueChange={(value) => setSelectedYear(Number.parseInt(value, 10))}>
                                    <SelectTrigger className="w-[140px]">
                                        <SelectValue placeholder="Select year" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {years.map((year) => (
                                            <SelectItem key={year} value={year.toString()}>
                                                {year}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                                                disabled={!selectedYear}
                                            >
                                                {field.value ? format(field.value, "MMMM d, yyyy") : <span>Pick a date</span>}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={(date) => {
                                                if (date && selectedYear) {
                                                    const dateWithSelectedYear = setYear(date, selectedYear)
                                                    field.onChange(dateWithSelectedYear)
                                                }
                                            }}
                                            defaultMonth={selectedYear ? new Date(selectedYear, 0) : undefined}
                                            disabled={(date) =>
                                                !selectedYear ||
                                                date > new Date() ||
                                                date < new Date(selectedYear, 0, 1) ||
                                                date > new Date(selectedYear, 11, 31)
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-bold">Emergency Contacts</CardTitle>
                    <CardDescription>Add one or more emergency contacts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {fields.map((field, index) => (
                        <div key={field.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg shadow-sm">
                            <FormField
                                control={control}
                                name={`emergencyContacts.${index}.name`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Enter contact name" className="focus:ring focus:ring-blue-500" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={control}
                                name={`emergencyContacts.${index}.relationship`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">Relationship</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Enter relationship" className="focus:ring focus:ring-blue-500" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex items-center gap-3 w-full">
                                <FormField
                                    control={control}
                                    name={`emergencyContacts.${index}.phone`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm font-medium">Phone Number</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Enter phone number" className="focus:ring focus:ring-blue-500" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button type="button" variant="outline" size="icon" className="mt-2" onClick={() => remove(index)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                    <Button type="button" variant="outline" onClick={() => append({ name: "", relationship: "", phone: "" })}>
                        Add Emergency Contact
                    </Button>
                </CardContent>
            </Card>
        </>
    )
}

export default PersonalInfoStep

