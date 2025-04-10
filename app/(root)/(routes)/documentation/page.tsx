import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DocsSidebar } from "@/components/docs-sidebar"
import { DocsToc } from "@/components/docs-toc"
import { DocsLayout } from "@/components/docs-layout"

export default function DocsPage() {
  return (
    <DocsLayout>
      <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_50px]">
        <div className="mx-auto w-full min-w-0">
          <div className="space-y-2">
            <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Documentation</h1>
            <p className="text-lg text-muted-foreground">
              Welcome to the comprehensive documentation for the CampusIQ school management system.
            </p>
          </div>
          <div className="pb-12 pt-8">
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p>
                CampusIQ is a comprehensive school management system designed to streamline administrative tasks,
                enhance communication between teachers, students, and parents, and provide powerful analytics to
                improve educational outcomes.
              </p>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
                <Link href="/documentation/introduction" className="group">
                  <div className="rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                    <h3 className="font-medium">Introduction</h3>
                    <p className="text-sm text-muted-foreground">Learn about CampusIQ and its core principles</p>
                  </div>
                </Link>

                <Link href="/documentation/key-features" className="group">
                  <div className="rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                    <h3 className="font-medium">Key Features</h3>
                    <p className="text-sm text-muted-foreground">Explore the powerful features of CampusIQ</p>
                  </div>
                </Link>

                <Link href="/documentation/installation" className="group">
                  <div className="rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                    <h3 className="font-medium">Installation</h3>
                    <p className="text-sm text-muted-foreground">Get started with CampusIQ setup</p>
                  </div>
                </Link>

                <Link href="/documentation/quick-start-guide" className="group">
                  <div className="rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                    <h3 className="font-medium">Quick Start Guide</h3>
                    <p className="text-sm text-muted-foreground">Learn the basics to get up and running quickly</p>
                  </div>
                </Link>

                <Link href="/documentation/advanced-configuration" className="group">
                  <div className="rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                    <h3 className="font-medium">Advanced Configuration</h3>
                    <p className="text-sm text-muted-foreground">Customize CampusIQ to fit your needs</p>
                  </div>
                </Link>

                <Link href="/documentation/api-integration" className="group">
                  <div className="rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                    <h3 className="font-medium">API Integration</h3>
                    <p className="text-sm text-muted-foreground">Connect CampusIQ with other systems</p>
                  </div>
                </Link>
              </div>

              <div className="not-prose my-8 flex flex-col items-center rounded-lg bg-slate-50 p-8 dark:bg-slate-800/50 md:flex-row md:justify-between">
                <div>
                  <h3 className="text-xl font-bold">Ready to get started?</h3>
                  <p className="text-slate-700 dark:text-slate-400">
                    Explore our interactive tutorials to learn more about CampusIQ.
                  </p>
                </div>
                <Button className="mt-4 md:mt-0" asChild>
                  <Link href="/documentation/introduction">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </DocsLayout>
  )
}

