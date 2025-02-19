import { useFieldArray, useFormContext } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, PlusCircle, Trash } from "lucide-react"
import MultiText from "@/components/commons/MultiText"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"

const MedicalHistoryStep = () => {
    const { control } = useFormContext()
    const {
        fields: immunizationFields,
        append: appendImmunization,
        remove: removeImmunization,
    } = useFieldArray({
        control,
        name: "history.medicalHistory.immunizations",
    })

    return (
        <div className="space-y-6">
            <div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                        control={control}
                        name="medicalHistory.allergies"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Add Allergies</FormLabel>
                                <FormControl>
                                    <MultiText
                                        placeholder="Add some allergies (Optional)"
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
                        name="medicalHistory.medicalConditions."
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Add Medical Conditions</FormLabel>
                                <FormControl>
                                    <MultiText
                                        placeholder="Add some condition (Optional)"
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
                        name="medicalHistory.medications"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Add Medication</FormLabel>
                                <FormControl>
                                    <MultiText
                                        placeholder="Add some medication (Optional)"
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
                </div>
                <h3 className="text-lg font-medium pt-4">Immunizations</h3>
                {immunizationFields.map((field, index) => (
                    <div key={field.id} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField
                            control={control}
                            name={`medicalHistory.immunizations.${index}.vaccineName`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Vaccine Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name={`medicalHistory.immunizations.${index}.dateAdministered`}
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Date</FormLabel>
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
                        <div className="flex items-center gap-5">
                            <FormField
                                control={control}
                                name={`medicalHistory.immunizations.${index}.administeredBy`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Administered By</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button type="button" variant="ghost" size="sm" onClick={() => removeImmunization(index)}>
                                <Trash className="h-4 w-4 mr-2" />
                            </Button>
                        </div>
                    </div>
                ))}
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => appendImmunization({ vaccineName: "", dateAdministered: new Date(), administeredBy: "" })}
                    className="mt-2"
                >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Immunization
                </Button>
            </div>

            <FormField
                control={control}
                name="history.medicalHistory.medicalNotes"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Medical Notes</FormLabel>
                        <FormControl>
                            <Textarea placeholder="Enter any additional medical notes here" className="min-h-[100px]" {...field} />
                        </FormControl>
                    </FormItem>
                )}
            />
        </div>
    )
}

export default MedicalHistoryStep

