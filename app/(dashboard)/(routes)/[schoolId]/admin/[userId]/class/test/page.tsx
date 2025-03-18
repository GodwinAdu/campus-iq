import { Suspense } from "react"
import type { Metadata } from "next"
import { Skeleton } from "@/components/ui/skeleton"
import ClassManagementDashboard from "./_components/class-management"

export const metadata: Metadata = {
    title: "Class Management | School Management System",
    description: "Comprehensive class management system with advanced features",
}

export default function ClassManagementPage() {
    return (
        <div className="container mx-auto py-6 space-y-8">
            <div className="flex flex-col space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Class Management</h1>
                <p className="text-muted-foreground">Manage classes, teachers, students, subjects and timetables</p>
            </div>
            <Suspense fallback={<ClassManagementSkeleton />}>
                <ClassManagementDashboard />
            </Suspense>
        </div>
    )
}

function ClassManagementSkeleton() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <Skeleton className="h-10 w-[250px]" />
                <Skeleton className="h-10 w-[200px]" />
            </div>
            <div className="grid gap-4 md:grid-cols-3">
                <Skeleton className="h-[200px] rounded-xl" />
                <Skeleton className="h-[200px] rounded-xl" />
                <Skeleton className="h-[200px] rounded-xl" />
            </div>
            <Skeleton className="h-[400px] rounded-xl" />
        </div>
    )
}

