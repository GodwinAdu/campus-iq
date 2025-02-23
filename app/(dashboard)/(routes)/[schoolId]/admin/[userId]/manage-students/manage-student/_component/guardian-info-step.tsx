import { useFormContext } from "react-hook-form"
import { Checkbox } from "@/components/ui/checkbox"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Check, ChevronsUpDown } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface GuardianInfoStepProps {
    guardian: boolean;
    setGuardian: (value: boolean) => void;
    parents: { _id: string; fullName: string }[];
}

const GuardianInfoStep = ({ guardian, setGuardian, parents }: GuardianInfoStepProps) => {
    const { control } = useFormContext()
    const [open, setOpen] = useState(false)
    // const [value, setValue] = useState("")

    return (
        <>
            <div className="items-top flex space-x-2 py-4 px-6">
                <Checkbox checked={guardian} onCheckedChange={(checked) => setGuardian(checked === true)} />
                <div className="grid gap-1.5 leading-none">
                    <label
                        htmlFor="terms1"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Guardian Already Exists
                    </label>
                    <p className="text-sm text-muted-foreground">
                        If the guardian already exists, please select the checkbox to continue.
                    </p>
                </div>
            </div>

            {guardian ? (
                <FormField
                    control={control}
                    name="parentId"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Select Parent</FormLabel>
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={open}
                                            className="w-[300px] justify-between"
                                        >
                                            {field.value
                                                ? parents.find((parent: { _id: string; fullName: string }) => parent._id === field.value)?.fullName
                                                : "Select parent..."}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[300px] p-0">
                                    <Command>
                                        <CommandInput placeholder="Search parent..." />
                                        <CommandList>
                                            <CommandEmpty>No parent found.</CommandEmpty>
                                            <CommandGroup>
                                                {parents.map((parent: { _id: string; fullName: string }) => (
                                                    <CommandItem
                                                        value={parent._id}
                                                        key={parent._id}
                                                        onSelect={() => {
                                                            field.onChange(parent._id)
                                                            setOpen(false)
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn("mr-2 h-4 w-4", parent._id === field.value ? "opacity-100" : "opacity-0")}
                                                        />
                                                        {parent.fullName}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
                    <FormField
                        control={control}
                        name="guardianName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Guardian Full Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter guardian's full name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="guardianPhone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Guardian Phone Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter guardian's phone number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="guardianEmail"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Guardian Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="Enter guardian's email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="guardianRelationship"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Relationship to Guardian</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter relationship to guardian" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="guardianAddress"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Guardian Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter guardian's address" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="guardianOccupation"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Guardian Occupation</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter guardian's occupation" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            )}
        </>
    )
}

export default GuardianInfoStep

