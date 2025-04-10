"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Copy, Heart, MoreHorizontal, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"

interface ShortcutCategoryProps {
    category: string
    shortcuts: Array<{
        name: string
        keys: string[]
        description: string
    }>
    onShortcutHover: (keys: string[]) => void
    viewMode: "grid" | "list"
    favoriteShortcuts: Set<string>
    onToggleFavorite: (shortcutName: string) => void
}

export function ShortcutCategory({
    category,
    shortcuts,
    onShortcutHover,
    viewMode,
    favoriteShortcuts,
    onToggleFavorite,
}: ShortcutCategoryProps) {
    const { toast } = useToast()
    const [hoveredShortcut, setHoveredShortcut] = useState<string | null>(null)

    const handleCopyShortcut = (shortcut: { name: string; keys: string[] }) => {
        const shortcutText = `${shortcut.name}: ${shortcut.keys.join(" + ")}`
        navigator.clipboard.writeText(shortcutText)
        toast({
            title: "Copied to clipboard",
            description: shortcutText,
            duration: 2000,
        })
    }

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
            },
        },
    }

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    }

    if (viewMode === "list") {
        return (
            <div className="space-y-4">
                <h2 className="text-xl font-semibold capitalize">{category} Shortcuts</h2>
                <Card>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Shortcut</TableHead>
                                <TableHead>Keys</TableHead>
                                <TableHead className="hidden md:table-cell">Description</TableHead>
                                <TableHead className="w-[100px] text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {shortcuts.map((shortcut) => (
                                <TableRow
                                    key={shortcut.name}
                                    className={hoveredShortcut === shortcut.name ? "bg-muted/50" : ""}
                                    onMouseEnter={() => {
                                        setHoveredShortcut(shortcut.name)
                                        onShortcutHover(shortcut.keys)
                                    }}
                                    onMouseLeave={() => {
                                        setHoveredShortcut(null)
                                        onShortcutHover([])
                                    }}
                                >
                                    <TableCell className="font-medium">{shortcut.name}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-wrap gap-1">
                                            {shortcut.keys.map((key, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-flex items-center rounded bg-secondary px-2 py-1 text-xs font-medium"
                                                >
                                                    {key}
                                                </span>
                                            ))}
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">{shortcut.description}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-1">
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8"
                                                            onClick={() => onToggleFavorite(shortcut.name)}
                                                        >
                                                            <Heart
                                                                className={`h-4 w-4 ${favoriteShortcuts.has(shortcut.name) ? "fill-rose-500 text-rose-500" : ""
                                                                    }`}
                                                            />
                                                            <span className="sr-only">
                                                                {favoriteShortcuts.has(shortcut.name) ? "Remove from favorites" : "Add to favorites"}
                                                            </span>
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>{favoriteShortcuts.has(shortcut.name) ? "Remove from favorites" : "Add to favorites"}</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>

                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8"
                                                            onClick={() => handleCopyShortcut(shortcut)}
                                                        >
                                                            <Copy className="h-4 w-4" />
                                                            <span className="sr-only">Copy shortcut</span>
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Copy shortcut</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>

                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">More options</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Options</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem onClick={() => handleCopyShortcut(shortcut)}>
                                                        Copy shortcut
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => onToggleFavorite(shortcut.name)}>
                                                        {favoriteShortcuts.has(shortcut.name) ? "Remove from favorites" : "Add to favorites"}
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold capitalize">{category} Shortcuts</h2>
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
                {shortcuts.map((shortcut) => (
                    <motion.div key={shortcut.name} variants={item}>
                        <Card
                            className={`group h-full transition-all duration-200 hover:shadow-md ${hoveredShortcut === shortcut.name ? "ring-2 ring-primary/50" : ""
                                }`}
                            onMouseEnter={() => {
                                setHoveredShortcut(shortcut.name)
                                onShortcutHover(shortcut.keys)
                            }}
                            onMouseLeave={() => {
                                setHoveredShortcut(null)
                                onShortcutHover([])
                            }}
                        >
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-medium">{shortcut.name}</h3>
                                        {favoriteShortcuts.has(shortcut.name) && (
                                            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                                        )}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                                                        onClick={() => onToggleFavorite(shortcut.name)}
                                                    >
                                                        <Heart
                                                            className={`h-4 w-4 ${favoriteShortcuts.has(shortcut.name) ? "fill-rose-500 text-rose-500" : ""
                                                                }`}
                                                        />
                                                        <span className="sr-only">
                                                            {favoriteShortcuts.has(shortcut.name) ? "Remove from favorites" : "Add to favorites"}
                                                        </span>
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>{favoriteShortcuts.has(shortcut.name) ? "Remove from favorites" : "Add to favorites"}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>

                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                                                        onClick={() => handleCopyShortcut(shortcut)}
                                                    >
                                                        <Copy className="h-4 w-4" />
                                                        <span className="sr-only">Copy shortcut</span>
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Copy shortcut</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                </div>
                                <p className="mt-1 text-sm text-muted-foreground">{shortcut.description}</p>
                                <div className="mt-3 flex flex-wrap gap-1">
                                    {shortcut.keys.map((key, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center rounded bg-secondary px-2 py-1 text-xs font-medium shadow-sm transition-all group-hover:bg-secondary/80"
                                        >
                                            {key}
                                        </span>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    )
}
