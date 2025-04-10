"use client"

import { useEffect, useState } from "react"
import { Command as CommandPrimitive } from "cmdk"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X } from "lucide-react"
import { CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface CommandPaletteProps {
    isOpen: boolean
    onClose: () => void
    shortcuts: Array<{
        name: string
        keys: string[]
        description: string
    }>
    onSelectShortcut: (shortcut: { name: string; keys: string[]; description: string }) => void
}

export function CommandPalette({ isOpen, onClose, shortcuts, onSelectShortcut }: CommandPaletteProps) {
    const [search, setSearch] = useState("")

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                if (isOpen) {
                    onClose()
                }
            }

            if (e.key === "Escape" && isOpen) {
                onClose()
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [isOpen, onClose])

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="p-0 shadow-lg">
                <CommandPrimitive className="rounded-lg border-none" shouldFilter={false}>
                    <div className="flex items-center border-b px-3">
                        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                        <CommandInput
                            placeholder="Search shortcuts..."
                            className="border-0 outline-none focus:ring-0"
                            value={search}
                            onValueChange={setSearch}
                        />
                        <div className="flex items-center gap-1">
                            <kbd className="hidden rounded border bg-muted px-1.5 text-xs sm:inline-block">ESC</kbd>
                            <X className="h-4 w-4 cursor-pointer opacity-50 hover:opacity-100" onClick={onClose} />
                        </div>
                    </div>
                    <CommandList className="max-h-[300px]">
                        <CommandEmpty>No shortcuts found.</CommandEmpty>
                        <CommandGroup heading="Shortcuts">
                            <AnimatePresence>
                                {shortcuts
                                    .filter(
                                        (shortcut) =>
                                            shortcut.name.toLowerCase().includes(search.toLowerCase()) ||
                                            shortcut.description.toLowerCase().includes(search.toLowerCase()),
                                    )
                                    .map((shortcut) => (
                                        <motion.div
                                            key={shortcut.name}
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -5 }}
                                            transition={{ duration: 0.15 }}
                                        >
                                            <CommandItem
                                                key={shortcut.name}
                                                onSelect={() => {
                                                    onSelectShortcut(shortcut)
                                                    onClose()
                                                }}
                                                className="flex items-center justify-between"
                                            >
                                                <div className="flex flex-col">
                                                    <span>{shortcut.name}</span>
                                                    <span className="text-xs text-muted-foreground">{shortcut.description}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    {shortcut.keys.map((key, index) => (
                                                        <kbd
                                                            key={index}
                                                            className="rounded border bg-muted px-1.5 py-0.5 text-xs font-semibold shadow-sm"
                                                        >
                                                            {key}
                                                        </kbd>
                                                    ))}
                                                </div>
                                            </CommandItem>
                                        </motion.div>
                                    ))}
                            </AnimatePresence>
                        </CommandGroup>
                    </CommandList>
                </CommandPrimitive>
            </DialogContent>
        </Dialog>
    )
}
