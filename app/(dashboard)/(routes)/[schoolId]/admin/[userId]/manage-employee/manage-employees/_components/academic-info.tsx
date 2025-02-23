import { useFieldArray, useFormContext } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import MultiSelect from "@/components/commons/MultiSelect"
import MultiText from "@/components/commons/MultiText"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

interface AcademicInfoStepProps {
    type: string;
    classes: { _id: string, name: string }[];
    role: { _id: string; displayName: string }[];
    departments: IDepartment[]
}

const AcademicInfoStep: React.FC<AcademicInfoStepProps> = ({ type, classes, role, departments }) => {
    const { control } = useFormContext()
    const { fields: previousEmployment, append: appendPreviousEmployment, remove: removePreviousEmployment } = useFieldArray({
        control,
        name: "professionalDetails.previousEmployment",
    })
    const { fields: references, append: appendReference, remove: removeReference } = useFieldArray({
        control,
        name: "professionalDetails.references",
    })

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
                <FormField
                    control={control}
                    name="employment.jobTitle"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Job Title</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder=" eg. Accountant"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="employment.workSchedule"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Work Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Student Class" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {["Full-time", "Part-time"].map((value) => (
                                        <SelectItem key={value} value={value ?? ""}>
                                            {value}
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
                    name="role"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Assign Role</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {role?.map((cls) => (
                                        <SelectItem key={cls._id} value={cls.displayName ?? ""}>
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
                    name="employment.classIds"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Manage Classes</FormLabel>
                            <FormControl>
                                {classes && classes.length > 0 ? (
                                    <MultiSelect
                                        placeholder="Add Classes"
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
                    name="employment.departmentId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Select Department</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Department" />
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
                    name="employment.dateOfJoining"
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
                    name="professionalDetails.backgroundCheck.criminalCheck"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>
                                    Check if having criminal record!.
                                </FormLabel>

                            </div>
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="professionalDetails.backgroundCheck.details"
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
                    name="professionalDetails.certifications"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Add Certificates</FormLabel>
                            <FormControl>
                                <MultiText
                                    placeholder="Add certificates (Optional)"
                                    value={field.value ?? []}
                                    onChange={(tag) =>
                                        field.onChange([...field.value ?? [], tag])
                                    }
                                    onRemove={(tagToRemove) =>
                                        field.onChange([
                                            ...(field.value ?? []).filter(
                                                (tag: string) => tag !== tagToRemove
                                            ),
                                        ])
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="professionalDetails.specialization"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Add Special Course</FormLabel>
                            <FormControl>
                                <MultiText
                                    placeholder="Add certificates (Optional)"
                                    value={field.value ?? []}
                                    onChange={(tag) =>
                                        field.onChange([...field.value ?? [], tag])
                                    }
                                    onRemove={(tagToRemove) =>
                                        field.onChange([
                                            ...(field.value ?? []).filter(
                                                (tag: string) => tag !== tagToRemove
                                            ),
                                        ])
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="professionalDetails.experienceYears"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Total Experience/years (Optional)</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    min={0}
                                    placeholder=" eg. 1 year"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-bold">Education</CardTitle>
                    <CardDescription>Add highest education here please</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg shadow-sm">
                    <FormField
                        control={control}
                        name={`professionalDetails.highestDegree.degree`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-medium">Certificate</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Eg. JHS" className="focus:ring focus:ring-blue-500" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={control}
                        name={`professionalDetails.highestDegree.institution`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-medium">Institution</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="eg. 23333 333333" className="focus:ring focus:ring-blue-500" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex items-center gap-3 w-full">
                        <FormField
                            control={control}
                            name={`professionalDetails.highestDegree.year`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium">Years</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="eg. 3 years" className="focus:ring focus:ring-blue-500" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-bold">Previous Employment</CardTitle>
                    <CardDescription>Add one or more Employments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {previousEmployment.map((field, index) => (
                        <div key={field.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg shadow-sm">
                            <FormField
                                control={control}
                                name={`professionalDetails.previousEmployment.${index}.school`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">School Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="eg. Jenny Academy" className="focus:ring focus:ring-blue-500" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={control}
                                name={`professionalDetails.previousEmployment.${index}.position`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">Position</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="eg. Teacher" className="focus:ring focus:ring-blue-500" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex items-center gap-3 w-full">
                                <FormField
                                    control={control}
                                    name={`professionalDetails.previousEmployment.${index}.duration`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm font-medium">Duration</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="eg.2 years" className="focus:ring focus:ring-blue-500" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button type="button" variant="destructive" size="icon" className="mt-2" onClick={() => removePreviousEmployment(index)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                    <Button type="button" onClick={() => appendPreviousEmployment({ school: "", position: "", duration: "" })}>
                        Previous Employment
                    </Button>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-bold">References</CardTitle>
                    <CardDescription>Add one or more References</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {references.map((field, index) => (
                        <div key={field.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg shadow-sm">
                            <FormField
                                control={control}
                                name={`professionalDetails.references.${index}.name`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Enter name" className="focus:ring focus:ring-blue-500" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={control}
                                name={`professionalDetails.references.${index}.position`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">Contact</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="eg. 23333 333333" className="focus:ring focus:ring-blue-500" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex items-center gap-3 w-full">
                                <FormField
                                    control={control}
                                    name={`professionalDetails.references.${index}.relationship`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm font-medium">Relationship</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="Add relationship" className="focus:ring focus:ring-blue-500" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button type="button" variant="destructive" size="icon" className="mt-2" onClick={() => removeReference(index)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                    <Button type="button" onClick={() => appendReference({ name: "", contact: "", relationship: "" })}>
                        Add Reference
                    </Button>
                </CardContent>
            </Card>
        </>
    )
}

export default AcademicInfoStep

