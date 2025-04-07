import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { DocsSidebar } from "@/components/docs-sidebar"
import { DocsToc } from "@/components/docs-toc"

export default function DocsPage() {
  return (
    <div className="flex min-h-screen flex-col mt-16">
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <DocsSidebar className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block" />
        <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
          <div className="mx-auto w-full min-w-0">
            <div className="space-y-2">
              <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">SchoolSync Documentation</h1>
              <p className="text-lg text-muted-foreground">
                Welcome to the comprehensive documentation for the SchoolSync school management system.
              </p>
            </div>
            <div className="pb-12 pt-8">
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <p>
                  SchoolSync is a comprehensive school management system designed to streamline administrative tasks,
                  enhance communication between teachers, students, and parents, and provide powerful analytics to
                  improve educational outcomes.
                </p>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
                  <Link href="/introduction" className="group">
                    <div className="rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                      <h3 className="font-medium">Introduction</h3>
                      <p className="text-sm text-muted-foreground">Learn about SchoolSync and its core principles</p>
                    </div>
                  </Link>

                  <Link href="/key-features" className="group">
                    <div className="rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                      <h3 className="font-medium">Key Features</h3>
                      <p className="text-sm text-muted-foreground">Explore the powerful features of SchoolSync</p>
                    </div>
                  </Link>

                  <Link href="/installation" className="group">
                    <div className="rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                      <h3 className="font-medium">Installation</h3>
                      <p className="text-sm text-muted-foreground">Get started with SchoolSync setup</p>
                    </div>
                  </Link>

                  <Link href="/quick-start-guide" className="group">
                    <div className="rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                      <h3 className="font-medium">Quick Start Guide</h3>
                      <p className="text-sm text-muted-foreground">Learn the basics to get up and running quickly</p>
                    </div>
                  </Link>

                  <Link href="/advanced-configuration" className="group">
                    <div className="rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                      <h3 className="font-medium">Advanced Configuration</h3>
                      <p className="text-sm text-muted-foreground">Customize SchoolSync to fit your needs</p>
                    </div>
                  </Link>

                  <Link href="/api-integration" className="group">
                    <div className="rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                      <h3 className="font-medium">API Integration</h3>
                      <p className="text-sm text-muted-foreground">Connect SchoolSync with other systems</p>
                    </div>
                  </Link>
                </div>

                <div className="not-prose my-8 flex flex-col items-center rounded-lg bg-slate-50 p-8 dark:bg-slate-800/50 md:flex-row md:justify-between">
                  <div>
                    <h3 className="text-xl font-bold">Ready to get started?</h3>
                    <p className="text-slate-700 dark:text-slate-400">
                      Explore our interactive tutorials to learn more about SchoolSync.
                    </p>
                  </div>
                  <Button className="mt-4 md:mt-0" asChild>
                    <Link href="/introduction">Get Started</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <DocsToc className="hidden text-sm xl:block" />
        </main>
      </div>
    </div>
  )
}

