import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DocsSidebar } from "@/components/docs-sidebar"
import { DocsToc } from "@/components/docs-toc"
import { PageHeader } from "@/components/page-header"

export default function SystemRequirementsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <DocsSidebar className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block" />
        <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
          <div className="mx-auto w-full min-w-0">
            <PageHeader
              title="System Requirements"
              description="Hardware and software requirements for SchoolSync"
              breadcrumbs={[{ title: "System Requirements", href: "/system-requirements" }]}
            />
            <div className="flex items-center space-x-2 pt-4">
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <span>Last updated:</span>
                <time dateTime="2023-05-05">May 5, 2023</time>
              </div>
            </div>
            <div className="pb-12 pt-8">
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <h2 id="overview">Overview</h2>
                <p>
                  SchoolSync is a cloud-based solution that can be accessed from any device with an internet connection
                  and a modern web browser. However, to ensure optimal performance, we recommend the following system
                  requirements.
                </p>

                <h2 id="web-browser-requirements">Web Browser Requirements</h2>
                <div className="not-prose my-6 overflow-hidden rounded-lg border">
                  <div className="bg-muted px-4 py-3 font-mono text-sm">Supported Browsers</div>
                  <div className="p-4">
                    <ul className="grid gap-2">
                      <li className="flex items-center gap-2">
                        <span className="font-medium">Google Chrome:</span> Version 90 or later
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="font-medium">Mozilla Firefox:</span> Version 88 or later
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="font-medium">Apple Safari:</span> Version 14 or later
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="font-medium">Microsoft Edge:</span> Version 90 or later (Chromium-based)
                      </li>
                    </ul>
                  </div>
                </div>
                <p>
                  For the best experience, we recommend keeping your browser updated to the latest version. Internet
                  Explorer is not supported.
                </p>

                <h2 id="hardware-requirements">Hardware Requirements</h2>
                <p>
                  SchoolSync is designed to work on a variety of devices, including desktop computers, laptops, tablets,
                  and smartphones. Here are the minimum hardware requirements:
                </p>
                <div className="not-prose my-6 overflow-hidden rounded-lg border">
                  <div className="bg-muted px-4 py-3 font-mono text-sm">Desktop/Laptop Requirements</div>
                  <div className="p-4">
                    <ul className="grid gap-2">
                      <li className="flex items-center gap-2">
                        <span className="font-medium">Processor:</span> 1.6 GHz dual-core processor or higher
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="font-medium">RAM:</span> 4 GB or higher
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="font-medium">Storage:</span> 5 GB of available disk space for caching and
                        downloads
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="font-medium">Display:</span> 1280 x 720 screen resolution or higher
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="not-prose my-6 overflow-hidden rounded-lg border">
                  <div className="bg-muted px-4 py-3 font-mono text-sm">Mobile Device Requirements</div>
                  <div className="p-4">
                    <ul className="grid gap-2">
                      <li className="flex items-center gap-2">
                        <span className="font-medium">iOS:</span> iOS 14 or later (iPhone 6s or newer, iPad 5th
                        generation or newer)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="font-medium">Android:</span> Android 10 or later
                      </li>
                    </ul>
                  </div>
                </div>

                <h2 id="internet-connection">Internet Connection</h2>
                <p>Since SchoolSync is a cloud-based solution, a reliable internet connection is required:</p>
                <ul>
                  <li>Minimum: 1 Mbps download / 0.5 Mbps upload</li>
                  <li>Recommended: 5 Mbps download / 1 Mbps upload or higher</li>
                  <li>For video conferencing features: 10 Mbps download / 3 Mbps upload or higher</li>
                </ul>

                <h2 id="server-requirements">Server Requirements (Self-Hosted Option)</h2>
                <p>
                  For schools that choose the self-hosted deployment option, the following server requirements apply:
                </p>
                <div className="not-prose my-6 overflow-hidden rounded-lg border">
                  <div className="bg-muted px-4 py-3 font-mono text-sm">Server Requirements</div>
                  <div className="p-4">
                    <ul className="grid gap-2">
                      <li className="flex items-center gap-2">
                        <span className="font-medium">Operating System:</span> Ubuntu 20.04 LTS, CentOS 8, or Windows
                        Server 2019
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="font-medium">CPU:</span> 4 cores or more (8 cores recommended for 500+ users)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="font-medium">RAM:</span> 8 GB minimum (16 GB recommended for 500+ users)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="font-medium">Storage:</span> 100 GB SSD minimum (more depending on file storage
                        needs)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="font-medium">Database:</span> PostgreSQL 12+ or MySQL 8.0+
                      </li>
                    </ul>
                  </div>
                </div>

                <h2 id="additional-requirements">Additional Requirements</h2>
                <p>Depending on how you plan to use SchoolSync, the following additional requirements may apply:</p>
                <ul>
                  <li>
                    <strong>Printing:</strong> A compatible printer is required for printing reports, transcripts, and
                    other documents
                  </li>
                  <li>
                    <strong>Document Scanning:</strong> A scanner or smartphone with a camera is required for document
                    uploads
                  </li>
                  <li>
                    <strong>Barcode Scanning:</strong> For inventory management and library features, a barcode scanner
                    is recommended
                  </li>
                  <li>
                    <strong>ID Card Printing:</strong> For student ID card generation, a compatible ID card printer is
                    required
                  </li>
                </ul>

                <div className="not-prose my-8 flex flex-col items-center rounded-lg bg-slate-50 p-8 dark:bg-slate-800/50 md:flex-row md:justify-between">
                  <div>
                    <h3 className="text-xl font-bold">Ready to install?</h3>
                    <p className="text-slate-700 dark:text-slate-400">
                      Follow our installation guide to get started with SchoolSync.
                    </p>
                  </div>
                  <Button className="mt-4 md:mt-0" asChild>
                    <Link href="/installation">Installation Guide</Link>
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

