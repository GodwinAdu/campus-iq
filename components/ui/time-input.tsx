"use client"

import * as React from "react"
import { Clock } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface TimeInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
    label?: string
    description?: string
    error?: string
    onChange?: (value: string) => void
    value?: string
}

export function TimeInput({ className, label, description, error, onChange, value, ...props }: TimeInputProps) {
    const [open, setOpen] = React.useState(false)

    // Use internal state only if not controlled
    const [internalValue, setInternalValue] = React.useState(value || (props.defaultValue as string) || "")

    // Determine if component is controlled
    const isControlled = value !== undefined
    const timeValue = isControlled ? value : internalValue

    // Update internal state when controlled value changes
    React.useEffect(() => {
        if (isControlled && value !== internalValue) {
            setInternalValue(value)
        }
    }, [isControlled, value, internalValue])

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value

        if (!isControlled) {
            setInternalValue(newValue)
        }

        if (onChange) {
            onChange(newValue)
        }
    }

    const handleTimeSelect = (hour: number, minute: number) => {
        const formattedHour = hour.toString().padStart(2, "0")
        const formattedMinute = minute.toString().padStart(2, "0")
        const newValue = `${formattedHour}:${formattedMinute}`

        if (!isControlled) {
            setInternalValue(newValue)
        }

        if (onChange) {
            onChange(newValue)
        }

        setOpen(false)
    }

    return (
        <div className="grid gap-1.5">
            {label && <Label htmlFor={props.id}>{label}</Label>}
            <div className="relative flex items-center">
                <Input
                    type="time"
                    className={cn("pr-10", className)}
                    value={timeValue}
                    onChange={handleTimeChange}
                    {...props}
                />
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon" type="button" className="absolute right-0 h-full rounded-l-none">
                            <Clock className="h-4 w-4" />
                            <span className="sr-only">Open time picker</span>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                        <div className="p-3">
                            <div className="grid grid-cols-4 gap-2">
                                {[0, 3, 6, 9, 12, 15, 18, 21].map((hour) => (
                                    <div key={hour} className="grid gap-2">
                                        {[0, 15, 30, 45].map((minute) => (
                                            <Button
                                                key={`${hour}:${minute}`}
                                                variant="outline"
                                                size="sm"
                                                className="text-xs"
                                                onClick={() => handleTimeSelect(hour, minute)}
                                            >
                                                {hour.toString().padStart(2, "0")}:{minute.toString().padStart(2, "0")}
                                            </Button>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
            {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
    )
}

