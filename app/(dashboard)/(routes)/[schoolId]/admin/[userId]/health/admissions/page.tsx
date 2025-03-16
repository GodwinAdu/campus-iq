import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import Heading from "@/components/commons/Header"
import { AdmissionStats } from "./_components/admission-stats"
import { AdmissionsList } from "./_components/admission-list"

export default function ClinicAdmissionsPage() {
    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <Heading title="Clinic Admissions" description="Manage student and staff clinic admissions and treatments" />
                <Link href="admissions/create">
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" /> New Admission
                    </Button>
                </Link>
            </div>

            <Suspense fallback={<div>Loading admission statistics...</div>}>
                <AdmissionStats />
            </Suspense>

            <Tabs defaultValue="all" className="mt-6">
                <TabsList className="grid w-full grid-cols-4 mb-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="admitted">Admitted</TabsTrigger>
                    <TabsTrigger value="discharged">Discharged</TabsTrigger>
                    <TabsTrigger value="referred">Referred</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-0">
                    <Suspense fallback={<div>Loading admissions...</div>}>
                        <AdmissionsList filter="all" />
                    </Suspense>
                </TabsContent>

                <TabsContent value="admitted" className="mt-0">
                    <Suspense fallback={<div>Loading admissions...</div>}>
                        <AdmissionsList filter="ADMITTED" />
                    </Suspense>
                </TabsContent>

                <TabsContent value="discharged" className="mt-0">
                    <Suspense fallback={<div>Loading admissions...</div>}>
                        <AdmissionsList filter="DISCHARGED" />
                    </Suspense>
                </TabsContent>

                <TabsContent value="referred" className="mt-0">
                    <Suspense fallback={<div>Loading admissions...</div>}>
                        <AdmissionsList filter="REFERRED" />
                    </Suspense>
                </TabsContent>
            </Tabs>
        </div>
    )
}

