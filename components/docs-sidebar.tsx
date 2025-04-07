"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface DocsSidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DocsSidebar({ className, ...props }: DocsSidebarProps) {
  const pathname = usePathname()

  const routes = [
    {
      title: "Getting Started",
      links: [
        { title: "Introduction", href: "/documentation/introduction" },
        { title: "Key Features", href: "/documentation/key-features" },
        { title: "System Requirements", href: "/documentation/system-requirements" },
        { title: "Installation", href: "/documentation/installation" },
      ],
    },
    {
      title: "User Guide",
      links: [
        { title: "Quick Start Guide", href: "/documentation/quick-start-guide" },
        { title: "Dashboard Overview", href: "/documentation/dashboard-overview" },
        { title: "User Management", href: "/documentation/user-management" },
      ],
    },
    {
      title: "Advanced",
      links: [
        { title: "Advanced Configuration", href: "/documentation/advanced-configuration" },
        { title: "Custom Fields", href: "/documentation/custom-fields" },
        { title: "Workflow Automation", href: "/documentation/workflow-automation" },
        { title: "API Integration", href: "/documentation/api-integration" },
      ],
    },
    {
      title: "Help & Support",
      links: [
        { title: "Troubleshooting", href: "/documentation/troubleshooting" },
        { title: "Support Resources", href: "/documentation/support-resources" },
      ],
    },
  ]

  return (
    <div className={cn("pb-12", className)} {...props}>
      <div className="space-y-4 py-4">
        {routes.map((route) => (
          <div key={route.title} className="px-3 py-2">
            <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-medium">{route.title}</h4>
            {route.links && (
              <div className="grid grid-flow-row auto-rows-max text-sm">
                {route.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline",
                      pathname === link.href ? "font-medium text-foreground bg-muted" : "text-muted-foreground",
                    )}
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

