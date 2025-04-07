"use client"

import { CalendarClock, Printer, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface PageHeaderProps {
  title: string
  lastUpdated: string
  onSearch?: (term: string) => void
}

export function PageHeader({ title, lastUpdated, onSearch }: PageHeaderProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const handlePrint = () => {
    window.print()
  }

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm)
    }
  }

  return (
    <div className="bg-white shadow print:shadow-none">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            <div className="flex items-center mt-2 text-sm text-gray-500">
              <CalendarClock className="h-4 w-4 mr-1" />
              <span>Last updated: {lastUpdated}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search..."
                className="pr-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-full" onClick={handleSearch}>
                <Search className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="outline" size="icon" onClick={handlePrint} className="print:hidden">
              <Printer className="h-4 w-4" />
              <span className="sr-only">Print</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}


