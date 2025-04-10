"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { BookOpen, Command, Download, Keyboard, Layers, LayoutGrid, List, Moon, Search, Sun } from "lucide-react"


import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"
import { CommandPalette } from "./command-palette"
import { KeyboardComponent } from "./keyboard-component"
import { PracticeMode } from "./practice-mode"
import { ShortcutCheatSheet } from "./shortcut-cheatsheet"
import { ShortcutCategory } from "./shortcut-category"


// Sample data for keyboard shortcuts
const shortcutData = {
    general: [
        { name: "Save", keys: ["Ctrl", "S"], description: "Save current document" },
        { name: "Copy", keys: ["Ctrl", "C"], description: "Copy selected text" },
        { name: "Paste", keys: ["Ctrl", "V"], description: "Paste from clipboard" },
        { name: "Cut", keys: ["Ctrl", "X"], description: "Cut selected text" },
        { name: "Undo", keys: ["Ctrl", "Z"], description: "Undo last action" },
        { name: "Redo", keys: ["Ctrl", "Y"], description: "Redo last action" },
        { name: "Find", keys: ["Ctrl", "F"], description: "Find text" },
        { name: "Select All", keys: ["Ctrl", "A"], description: "Select all content" },
    ],
    navigation: [
        { name: "Go to Line", keys: ["Ctrl", "G"], description: "Navigate to specific line" },
        { name: "Go to File", keys: ["Ctrl", "P"], description: "Quick open file" },
        { name: "Switch Tab", keys: ["Ctrl", "Tab"], description: "Switch between open tabs" },
        { name: "Close Tab", keys: ["Ctrl", "W"], description: "Close current tab" },
        { name: "New Tab", keys: ["Ctrl", "T"], description: "Open new tab" },
        { name: "Home", keys: ["Home"], description: "Go to beginning of line" },
        { name: "End", keys: ["End"], description: "Go to end of line" },
    ],
    editing: [
        { name: "Indent", keys: ["Tab"], description: "Indent line or selection" },
        { name: "Outdent", keys: ["Shift", "Tab"], description: "Outdent line or selection" },
        { name: "Comment", keys: ["Ctrl", "/"], description: "Toggle comment" },
        { name: "Multi-Cursor", keys: ["Alt", "Click"], description: "Add additional cursor" },
        { name: "Delete Line", keys: ["Ctrl", "Shift", "K"], description: "Delete current line" },
        { name: "Duplicate Line", keys: ["Shift", "Alt", "Down"], description: "Duplicate line down" },
        { name: "Move Line Up", keys: ["Alt", "Up"], description: "Move line up" },
        { name: "Move Line Down", keys: ["Alt", "Down"], description: "Move line down" },
    ],
    view: [
        { name: "Zoom In", keys: ["Ctrl", "+"], description: "Increase font size" },
        { name: "Zoom Out", keys: ["Ctrl", "-"], description: "Decrease font size" },
        { name: "Reset Zoom", keys: ["Ctrl", "0"], description: "Reset font size" },
        { name: "Toggle Sidebar", keys: ["Ctrl", "B"], description: "Show/hide sidebar" },
        { name: "Toggle Terminal", keys: ["Ctrl", "`"], description: "Show/hide terminal" },
        { name: "Toggle Full Screen", keys: ["F11"], description: "Enter/exit full screen" },
        { name: "Split Editor", keys: ["Ctrl", "\\"], description: "Split editor" },
    ],
    advanced: [
        { name: "Command Palette", keys: ["Ctrl", "Shift", "P"], description: "Open command palette" },
        { name: "Quick Fix", keys: ["Ctrl", "."], description: "Show code actions" },
        { name: "Rename Symbol", keys: ["F2"], description: "Rename symbol" },
        { name: "Format Document", keys: ["Shift", "Alt", "F"], description: "Format document" },
        { name: "Go to Definition", keys: ["F12"], description: "Go to definition" },
        { name: "Find References", keys: ["Shift", "F12"], description: "Find all references" },
        { name: "Toggle Breakpoint", keys: ["F9"], description: "Toggle breakpoint" },
        { name: "Start Debugging", keys: ["F5"], description: "Start debugging" },
    ],
}

type ViewMode = "list" | "grid" | "practice" | "cheatsheet"

export function KeyboardShortcuts() {
    const { toast } = useToast()
    //   const isMobile = useMobile()
    const [searchQuery, setSearchQuery] = useState("")
    const [activeCategory, setActiveCategory] = useState("general")
    const [activeShortcut, setActiveShortcut] = useState<string[]>([])
    const [viewMode, setViewMode] = useState<ViewMode>("grid")
    const [theme, setTheme] = useState<"light" | "dark">("light")
    const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)
    const [favoriteShortcuts, setFavoriteShortcuts] = useState<Set<string>>(new Set())
    const [isKeyboardExpanded, setIsKeyboardExpanded] = useState(false)

    // Toggle theme
    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light"
        setTheme(newTheme)
        document.documentElement.classList.toggle("dark", newTheme === "dark")
    }

    // Toggle favorite shortcut
    const toggleFavorite = (shortcutName: string) => {
        const newFavorites = new Set(favoriteShortcuts)
        if (newFavorites.has(shortcutName)) {
            newFavorites.delete(shortcutName)
            toast({
                title: "Removed from favorites",
                description: `${shortcutName} has been removed from your favorites`,
                duration: 2000,
            })
        } else {
            newFavorites.add(shortcutName)
            toast({
                title: "Added to favorites",
                description: `${shortcutName} has been added to your favorites`,
                duration: 2000,
            })
        }
        setFavoriteShortcuts(newFavorites)
    }

    // Filter shortcuts based on search query
    const filteredShortcuts = Object.entries(shortcutData).reduce(
        (acc, [category, shortcuts]) => {
            const filtered = shortcuts.filter(
                (shortcut) =>
                    shortcut.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    shortcut.description.toLowerCase().includes(searchQuery.toLowerCase()),
            )
            if (filtered.length > 0) {
                acc[category] = filtered
            }
            return acc
        },
        {} as Record<string, typeof shortcutData.general>,
    )

    // Add favorites category if there are favorites
    if (favoriteShortcuts.size > 0) {
        const favorites = Object.values(shortcutData)
            .flat()
            .filter((shortcut) => favoriteShortcuts.has(shortcut.name))
        if (favorites.length > 0) {
            filteredShortcuts.favorites = favorites
        }
    }

    // Listen for keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Command palette shortcut (Ctrl+K or Cmd+K)
            if ((e.ctrlKey || e.metaKey) && e.key === "k") {
                e.preventDefault()
                setIsCommandPaletteOpen(true)
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [])

    // Export shortcuts as JSON
    const exportShortcuts = () => {
        // Create a temporary div to hold the content
        const tempDiv = document.createElement("div")
        tempDiv.style.position = "absolute"
        tempDiv.style.left = "-9999px"
        document.body.appendChild(tempDiv)

        // Add content to the div
        tempDiv.innerHTML = `
    <div style="font-family: system-ui, sans-serif; padding: 20px;">
      <h1 style="font-size: 24px; margin-bottom: 20px;">Keyboard Shortcuts</h1>
      ${Object.entries(shortcutData)
                .map(
                    ([category, shortcuts]) => `
        <div style="margin-bottom: 30px;">
          <h2 style="font-size: 18px; margin-bottom: 10px; text-transform: capitalize;">${category} Shortcuts</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr>
                <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2; text-align: left;">Action</th>
                <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2; text-align: left;">Shortcut</th>
                <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2; text-align: left;">Description</th>
              </tr>
            </thead>
            <tbody>
              ${shortcuts
                            .map(
                                (shortcut) => `
                <tr>
                  <td style="border: 1px solid #ddd; padding: 8px;">${shortcut.name}</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">
                    ${shortcut.keys
                                        .map(
                                            (key) =>
                                                `<span style="display: inline-block; padding: 2px 6px; background: #eee; border-radius: 4px; font-size: 12px; margin-right: 4px;">${key}</span>`,
                                        )
                                        .join("")}
                  </td>
                  <td style="border: 1px solid #ddd; padding: 8px;">${shortcut.description}</td>
                </tr>
              `,
                            )
                            .join("")}
            </tbody>
          </table>
        </div>
      `,
                )
                .join("")}
    </div>
  `

        // Store the current body content
        const originalContents = document.body.innerHTML

        // Replace body with our content for printing
        document.body.innerHTML = tempDiv.innerHTML

        // Print (save as PDF)
        window.print()

        // Restore original content
        document.body.innerHTML = originalContents

        toast({
            title: "PDF Export",
            description: "Save as PDF from the print dialog that opened",
            duration: 3000,
        })
    }

    return (
        <>
            <CommandPalette
                isOpen={isCommandPaletteOpen}
                onClose={() => setIsCommandPaletteOpen(false)}
                shortcuts={Object.values(shortcutData).flat()}
                onSelectShortcut={(shortcut) => {
                    setActiveShortcut(shortcut.keys)
                    setIsCommandPaletteOpen(false)
                }}
            />

            <div className="space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-2"
                >
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <h1 className="text-3xl font-bold tracking-tight">Keyboard Shortcuts</h1>
                            <p className="text-muted-foreground">Master your workflow with these powerful keyboard shortcuts.</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="outline" size="icon" onClick={toggleTheme}>
                                            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Toggle theme</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>

                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="outline" size="icon" onClick={() => setIsCommandPaletteOpen(true)}>
                                            <Command className="h-4 w-4" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Command palette (Ctrl+K)</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>

                            <Badge variant="outline" className="px-3 py-1 text-sm">
                                <Keyboard className="mr-1 h-3.5 w-3.5" />
                                <span>Shortcuts</span>
                            </Badge>
                        </div>
                    </div>

                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search shortcuts..."
                            className="pl-8"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </motion.div>

                {/* Sticky Keyboard at the top */}
                <div className="sticky top-0 z-10 -mx-4 px-4 pt-2 pb-3 bg-background/95 backdrop-blur-sm border-b">
                    <div className="rounded-lg border bg-card/95 p-3 shadow-md">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <Keyboard className="h-4 w-4" />
                                <h3 className="text-sm font-medium">Interactive Keyboard</h3>
                            </div>
                            <Badge variant="outline" className="px-2 py-1 text-xs">
                                {activeShortcut.length > 0 ? activeShortcut.join(" + ") : "Hover over a shortcut"}
                            </Badge>
                        </div>
                        <div className="mx-auto max-w-3xl">
                            <KeyboardComponent activeKeys={activeShortcut} />
                        </div>
                        <div className="mt-2 text-center text-xs text-muted-foreground">
                            Hover over shortcuts to see them highlighted on the keyboard
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                    <Tabs defaultValue={activeCategory} onValueChange={setActiveCategory} className="w-full">
                        <div className="flex items-center justify-between">
                            <TabsList className="w-auto overflow-auto">
                                {Object.keys(filteredShortcuts).map((category) => (
                                    <TabsTrigger key={category} value={category} className="capitalize">
                                        {category}
                                    </TabsTrigger>
                                ))}
                            </TabsList>

                            <div className="flex items-center gap-2">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant={viewMode === "grid" ? "default" : "outline"}
                                                size="icon"
                                                onClick={() => setViewMode("grid")}
                                            >
                                                <LayoutGrid className="h-4 w-4" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Grid view</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant={viewMode === "list" ? "default" : "outline"}
                                                size="icon"
                                                onClick={() => setViewMode("list")}
                                            >
                                                <List className="h-4 w-4" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>List view</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant={viewMode === "practice" ? "default" : "outline"}
                                                size="icon"
                                                onClick={() => setViewMode("practice")}
                                            >
                                                <Layers className="h-4 w-4" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Practice mode</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant={viewMode === "cheatsheet" ? "default" : "outline"}
                                                size="icon"
                                                onClick={() => setViewMode("cheatsheet")}
                                            >
                                                <BookOpen className="h-4 w-4" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Cheat sheet</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="outline" size="icon" onClick={exportShortcuts}>
                                                <Download className="h-4 w-4" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Export as PDF</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            {viewMode === "practice" ? (
                                <motion.div
                                    key="practice"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="mt-6"
                                >
                                    <PracticeMode shortcuts={Object.values(shortcutData).flat()} onActiveKeysChange={setActiveShortcut} />
                                </motion.div>
                            ) : viewMode === "cheatsheet" ? (
                                <motion.div
                                    key="cheatsheet"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="mt-6"
                                >
                                    <ShortcutCheatSheet shortcuts={shortcutData} />
                                </motion.div>
                            ) : Object.entries(filteredShortcuts).length > 0 ? (
                                Object.entries(filteredShortcuts).map(([category, shortcuts]) => (
                                    <TabsContent key={category} value={category}>
                                        <motion.div
                                            key={`${category}-${viewMode}`}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <ShortcutCategory
                                                category={category}
                                                shortcuts={shortcuts}
                                                onShortcutHover={setActiveShortcut}
                                                viewMode={viewMode}
                                                favoriteShortcuts={favoriteShortcuts}
                                                onToggleFavorite={toggleFavorite}
                                            />
                                        </motion.div>
                                    </TabsContent>
                                ))
                            ) : (
                                <motion.div
                                    key="no-results"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="mt-8 flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center"
                                >
                                    <Search className="h-8 w-8 text-muted-foreground" />
                                    <h3 className="mt-4 text-lg font-medium">No shortcuts found</h3>
                                    <p className="mt-2 text-sm text-muted-foreground">
                                        Try adjusting your search query to find what you&#39;re looking for.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Tabs>
                </div>
            </div>
        </>
    )
}
