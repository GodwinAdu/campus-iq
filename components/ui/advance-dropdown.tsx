"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useModal } from "@/hooks/use-modal"

interface AdvancedDropdownProps {
    trigger?: React.ReactNode
    label?: string
    className?: string
    align?: "start" | "center" | "end"
    items?: DropdownItemProps[]
}

interface DropdownItemProps {
    label: string
    icon?: React.ReactNode
    onClick?: () => void
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
    modalType?: "settings" | "invite" | "help" | "notifications" | "documents" | "mood" | "activity" | "behavior"
    data: IStudent
}

export function AdvancedDropdown({
    trigger,
    label = "Options",
    className,
    align = "end",
    items = [],

}: AdvancedDropdownProps) {
    const { openModal } = useModal()

    const handleItemClick = React.useCallback(
        (item: DropdownItemProps) => {
            if (item.modalType) {
                openModal(item.modalType, item.data)
            }

            if (item.onClick) {
                item.onClick()
            }
        },
        [openModal],
    )

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {trigger || (
                    <Button variant="outline" className={cn("flex items-center gap-1 px-3 py-2 transition-all", className)}>
                        <span>{label}</span>
                        <ChevronDown className="h-4 w-4 opacity-70" />
                    </Button>
                )}
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align={align}
                className="w-56 rounded-xl p-1 shadow-lg border border-border/40 bg-background/95 backdrop-blur-sm"
                sideOffset={8}
            >
                {label && (
                    <>
                        <DropdownMenuLabel className="px-3 py-2 text-sm font-medium">{label}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                    </>
                )}
                <DropdownMenuGroup>
                    {items.map((item, index) => (
                        <DropdownMenuItem
                            key={index}
                            className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent focus:bg-accent"
                            onClick={() => handleItemClick(item)}
                        >
                            {item.icon && <span className="text-muted-foreground">{item.icon}</span>}
                            <span>{item.label}</span>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

