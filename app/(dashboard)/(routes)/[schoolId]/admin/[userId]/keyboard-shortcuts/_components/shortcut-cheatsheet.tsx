"use client"

import { useRef } from "react"
import { Download, Printer } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"

interface ShortcutCheatSheetProps {
    shortcuts: Record<
        string,
        Array<{
            name: string
            keys: string[]
            description: string
        }>
    >
}

export function ShortcutCheatSheet({ shortcuts }: ShortcutCheatSheetProps) {
    const { toast } = useToast()
    const printRef = useRef<HTMLDivElement>(null)

    const handlePrint = () => {
        if (printRef.current) {
            const printContents = printRef.current.innerHTML
            const originalContents = document.body.innerHTML

            document.body.innerHTML = `
        <html>
          <head>
            <title>Keyboard Shortcuts Cheat Sheet</title>
            <style>
              body { font-family: system-ui, sans-serif; margin: 0; padding: 20px; }
              h1 { font-size: 24px; margin-bottom: 10px; }
              h2 { font-size: 18px; margin-top: 20px; margin-bottom: 10px; text-transform: capitalize; }
              table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #f2f2f2; }
              .key { display: inline-block; padding: 2px 6px; background: #eee; border-radius: 4px; font-size: 12px; margin-right: 4px; }
              @media print {
                button { display: none !important; }
              }
            </style>
          </head>
          <body>
            <div id="printable">
              <h1>Keyboard Shortcuts Cheat Sheet</h1>
              ${printRef.current.innerHTML}
            </div>
          </body>
        </html>
      `
            window.print()
            document.body.innerHTML = originalContents

            toast({
                title: "Print dialog opened",
                description: "Print or save as PDF from your browser's print dialog",
                duration: 3000,
            })
        }
    }

    const handleExport = () => {
        if (printRef.current) {
            const printContents = printRef.current.innerHTML
            const originalContents = document.body.innerHTML

            // Set up the document for PDF printing
            document.body.innerHTML = `
      <html>
        <head>
          <title>Keyboard Shortcuts Cheat Sheet</title>
          <style>
            body { font-family: system-ui, sans-serif; margin: 0; padding: 20px; }
            h1 { font-size: 24px; margin-bottom: 10px; }
            h2 { font-size: 18px; margin-top: 20px; margin-bottom: 10px; text-transform: capitalize; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .key { display: inline-block; padding: 2px 6px; background: #eee; border-radius: 4px; font-size: 12px; margin-right: 4px; }
            @media print {
              button { display: none !important; }
            }
          </style>
        </head>
        <body>
          <div id="printable">
            <h1>Keyboard Shortcuts Cheat Sheet</h1>
            ${printRef.current.innerHTML}
          </div>
        </body>
      </html>
    `

            // Use the browser's print functionality to save as PDF
            window.print()

            // Restore the original content
            document.body.innerHTML = originalContents

            toast({
                title: "PDF Export",
                description: "Save as PDF from the print dialog that opened",
                duration: 3000,
            })
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Keyboard Shortcuts Cheat Sheet</h2>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handlePrint}>
                        <Printer className="mr-2 h-4 w-4" />
                        Print
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleExport}>
                        <Download className="mr-2 h-4 w-4" />
                        Export PDF
                    </Button>
                </div>
            </div>

            <div ref={printRef} className="space-y-6">
                {Object.entries(shortcuts).map(([category, categoryShortcuts]) => (
                    <Card key={category} className="overflow-hidden">
                        <CardHeader className="bg-muted/50">
                            <CardTitle className="capitalize">{category}</CardTitle>
                            <CardDescription>
                                {category === "general"
                                    ? "Common shortcuts used across applications"
                                    : category === "navigation"
                                        ? "Shortcuts for navigating within applications"
                                        : category === "editing"
                                            ? "Shortcuts for editing text and code"
                                            : category === "view"
                                                ? "Shortcuts for changing the view"
                                                : category === "advanced"
                                                    ? "Advanced shortcuts for power users"
                                                    : `${category} shortcuts`}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[200px]">Action</TableHead>
                                        <TableHead>Shortcut</TableHead>
                                        <TableHead className="hidden md:table-cell">Description</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {categoryShortcuts.map((shortcut) => (
                                        <TableRow key={shortcut.name}>
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
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
