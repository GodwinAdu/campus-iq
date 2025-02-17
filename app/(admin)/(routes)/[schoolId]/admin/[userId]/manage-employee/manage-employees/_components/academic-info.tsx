import { useFormContext } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import MultiSelect from "@/components/commons/MultiSelect"

interface AcademicInfoStepProps {
    type: string;
    classes: {_id:string,name:string}[];
    role: { _id: string; displayName: string }[];
    departments:IDepartment[]
}

const AcademicInfoStep: React.FC<AcademicInfoStepProps> = ({ type, classes, role, departments }) => {
    const { control } = useFormContext()
    console.log(role)

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">

                <FormField
                    control={control}
                    name="role"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Select Role</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Student Class" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {role?.map((cls) => (
                                        <SelectItem key={cls._id} value={cls._id ?? ""}>
                                            {cls.displayName}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                                control={control}
                                name="classIds"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Manage Classes</FormLabel>
                                        <FormControl>
                                            {classes && classes.length > 0 ? (
                                                <MultiSelect
                                                    placeholder="Select Class"
                                                    data={classes}
                                                    value={field.value}
                                                    onChange={(_id) =>
                                                        field.onChange([...field.value, _id])
                                                    }
                                                    onRemove={(idToRemove) =>
                                                        field.onChange([
                                                            ...field.value.filter(
                                                                (id: string) => id !== idToRemove
                                                            ),
                                                        ])
                                                    }
                                                />
                                            ) : null}
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                <FormField
                    control={control}
                    name="departmentId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Select Department</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {departments?.map((department) => (
                                        <SelectItem key={department._id} value={department?._id ?? ""}>
                                            {department.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="joiningDate"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Joined Date</FormLabel>
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
                                            date > new Date() || date < new Date("1900-01-01")
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
                    control={control}
                    name="qualification"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Qualification (Optional)</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Tell us a little bit about yourself"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="experience"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Experience (Optional)</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Tell us a little bit about yourself"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="experience"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Total Experience/years (Optional)</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder=" eg. 1 year"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </>
    )
}

export default AcademicInfoStep

