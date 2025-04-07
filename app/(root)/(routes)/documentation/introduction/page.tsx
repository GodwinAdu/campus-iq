import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DocsSidebar } from "@/components/docs-sidebar"
import { DocsToc } from "@/components/docs-toc"
import { PageHeader } from "@/components/page-header"

export default function IntroductionPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <DocsSidebar className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block" />
        <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
          <div className="mx-auto w-full min-w-0">
            <PageHeader
              title="Introduction to SchoolSync"
              description="Learn about SchoolSync and its core principles"
              breadcrumbs={[{ title: "Introduction", href: "/introduction" }]}
            />
            <div className="flex items-center space-x-2 pt-4">
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <span>Last updated:</span>
                <time dateTime="2023-05-05">May 5, 2023</time>
              </div>
            </div>
            <div className="pb-12 pt-8">
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <h2 id="what-is-schoolsync">What is SchoolSync?</h2>
                <p>
                  SchoolSync is a comprehensive school management system designed to streamline administrative tasks,
                  enhance communication between teachers, students, and parents, and provide powerful analytics to
                  improve educational outcomes.
                </p>
                <p>
                  Our platform brings together all aspects of school management into a single, intuitive interface,
                  making it easier for administrators, teachers, students, and parents to collaborate effectively.
                </p>

                <h2 id="core-principles">Core Principles</h2>
                <p>SchoolSync was built with the following core principles in mind:</p>
                <ul>
                  <li>
                    <strong>Simplicity</strong> - Intuitive interfaces that require minimal training
                  </li>
                  <li>
                    <strong>Efficiency</strong> - Automation of routine tasks to save time
                  </li>
                  <li>
                    <strong>Connectivity</strong> - Seamless communication between all stakeholders
                  </li>
                  <li>
                    <strong>Insight</strong> - Data-driven analytics to improve educational outcomes
                  </li>
                  <li>
                    <strong>Security</strong> - Protection of sensitive student and school data
                  </li>
                </ul>

                <h2 id="who-is-it-for">Who is it for?</h2>
                <p>
                  SchoolSync is designed for educational institutions of all sizes, from small private schools to large
                  public school districts. Our platform serves:
                </p>
                <ul>
                  <li>
                    <strong>School Administrators</strong> - Manage school operations, staff, and resources
                  </li>
                  <li>
                    <strong>Teachers</strong> - Track student progress, manage assignments, and communicate with parents
                  </li>
                  <li>
                    <strong>Students</strong> - Access assignments, track grades, and participate in online learning
                  </li>
                  <li>
                    <strong>Parents</strong> - Monitor their child's progress, communicate with teachers, and stay
                    involved
                  </li>
                </ul>

                <h2 id="history">History and Development</h2>
                <p>
                  SchoolSync was developed in 2018 by a team of educators and software engineers who recognized the need
                  for a more integrated approach to school management. Since then, we've worked closely with schools
                  around the world to refine our platform and add features that address real-world educational
                  challenges.
                </p>
                <p>
                  Our development process is guided by continuous feedback from our users, ensuring that SchoolSync
                  evolves to meet the changing needs of educational institutions.
                </p>

                <div className="not-prose my-8 flex flex-col items-center rounded-lg bg-slate-50 p-8 dark:bg-slate-800/50 md:flex-row md:justify-between">
                  <div>
                    <h3 className="text-xl font-bold">Ready to explore the features?</h3>
                    <p className="text-slate-700 dark:text-slate-400">
                      Learn about the powerful tools SchoolSync offers.
                    </p>
                  </div>
                  <Button className="mt-4 md:mt-0" asChild>
                    <Link href="/key-features">Explore Features</Link>
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

