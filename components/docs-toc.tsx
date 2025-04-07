"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface TocItem {
  id: string
  level: number
  text: string
}

interface DocsTocProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DocsToc({ className, ...props }: DocsTocProps) {
  const [headings, setHeadings] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll("h2[id], h3[id], h4[id]")).map((element) => ({
      id: element.id,
      level: Number(element.tagName.substring(1)),
      text: element.textContent || "",
    }))

    setHeadings(elements)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "0% 0% -80% 0%" },
    )

    elements.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      elements.forEach(({ id }) => {
        const element = document.getElementById(id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [])

  if (headings.length === 0) {
    return null
  }

  return (
    <div className={cn("space-y-2", className)} {...props}>
      <p className="font-medium">On This Page</p>
      <ul className="m-0 list-none p-0">
        {headings.map((heading) => {
          return (
            <li
              key={heading.id}
              className={cn(
                "line-clamp-1 text-muted-foreground",
                heading.level === 3 && "pl-4",
                heading.level === 4 && "pl-8",
              )}
            >
              <a
                href={`#${heading.id}`}
                className={cn(
                  "inline-block no-underline transition-colors hover:text-foreground",
                  activeId === heading.id ? "font-medium text-foreground" : "",
                )}
              >
                {heading.text}
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

