"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface TableOfContentsProps {
    items: {
        id: string
        title: string
    }[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
    const [isOpen, setIsOpen] = useState(true)

    return (
        <div className="bg-gray-50 rounded-lg p-4 mb-6 print:hidden">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Table of Contents</h2>
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen}>
                    <ChevronRight className={cn("h-4 w-4 transition-transform", isOpen && "rotate-90")} />
                    <span className="sr-only">{isOpen ? "Collapse" : "Expand"}</span>
                </Button>
            </div>

            {isOpen && (
                <nav className="mt-2">
                    <ul className="space-y-1">
                        {items.map((item) => (
                            <li key={item.id}>
                                <a href={`#${item.id}`} className="text-blue-600 hover:underline block py-1">
                                    {item.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </div>
    )
}

