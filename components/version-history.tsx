"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface VersionHistoryProps {
    versions: {
        date: string
        version: string
        changes: string[]
    }[]
}

export function VersionHistory({ versions }: VersionHistoryProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="bg-background rounded-lg p-4 mt-8 print:hidden">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Version History</h2>
                <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm">
                        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                        <span className="sr-only">{isOpen ? "Close" : "Open"}</span>
                    </Button>
                </CollapsibleTrigger>
            </div>

            <CollapsibleContent>
                <div className="mt-2 space-y-4">
                    {versions.map((version, index) => (
                        <div key={index} className="border-t pt-2">
                            <div className="flex justify-between">
                                <span className="font-medium">Version {version.version}</span>
                                <span className="text-sm text-gray-500">{version.date}</span>
                            </div>
                            <ul className="mt-1 text-sm list-disc list-inside">
                                {version.changes.map((change, idx) => (
                                    <li key={idx}>{change}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </CollapsibleContent>
        </Collapsible>
    )
}

