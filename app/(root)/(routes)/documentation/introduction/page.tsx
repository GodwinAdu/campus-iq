import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DocsLayout } from "@/components/docs-layout"

export default function IntroductionPage() {
  return (
    <DocsLayout>
      <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_100px]">
        <div className="mx-auto w-full min-w-0">
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Introduction</h1>
          <div className="flex items-center space-x-2 pt-4">
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <span>Last updated:</span>
              <time dateTime="2023-05-05">April 8, 2025</time>
            </div>
          </div>
          <div className="pb-12 pt-8">
            <div className="prose prose-slate dark:prose-invert max-w-none space-y-4">
              <h2 className="font-bold text-2xl" id="what-is-schoolsync">What is CampusIQ?</h2>
              <p>
                CampusIQ is a comprehensive school management system designed to streamline administrative tasks,
                enhance communication between teachers, students, and parents, and provide powerful analytics to
                improve educational outcomes.
              </p>
              <p>
                Our platform brings together all aspects of school management into a single, intuitive interface,
                making it easier for administrators, teachers, students, and parents to collaborate effectively.
              </p>

              <h2 className="font-bold text-2xl" id="core-principles">Core Principles</h2>
              <p>CampusIQ was built with the following core principles in mind:</p>
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

              <h2 className="font-bold text-2xl" id="who-is-it-for">Who is it for?</h2>
              <p>
                CampusIQ is designed for educational institutions of all sizes, from small private schools to large
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

              <h2 className="font-bold text-2xl" id="history">History and Development</h2>
              <p>
                CampusIQ was developed in 2025 by a team of educators and software engineers <Link className="text-blue-300" href="https://jutechhub.com">(JuTech Dev)</Link> who recognized the need
                for a more integrated approach to school management. Since then, we've worked closely with schools
                around the world to refine our platform and add features that address real-world educational
                challenges.
              </p>
              <p>
                Our development process is guided by continuous feedback from our users, ensuring that CampusIQ
                evolves to meet the changing needs of educational institutions.
              </p>

              <div className="not-prose my-8 flex flex-col items-center rounded-lg bg-slate-50 p-8 dark:bg-slate-800/50 md:flex-row md:justify-between">
                <div>
                  <h3 className="text-xl font-bold">Ready to explore the features?</h3>
                  <p className="text-slate-700 dark:text-slate-400">
                    Learn about the powerful tools CampusIQ offers.
                  </p>
                </div>
                <Button className="mt-4 md:mt-0" asChild>
                  <Link href="/key-features">Explore Features</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </DocsLayout>
  )
}

