"use client"

import { FileQuestion } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function NotFound() {
    const router = useRouter()
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-blue-100">
            <div className="text-center max-w-md bg-background p-8 rounded-lg shadow-lg">
                <FileQuestion className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
                <p className="text-muted-foreground mb-6">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
                <Button onClick={() => router.back()}>
                    Return to Back
                </Button>
            </div>
        </div>
    )
}

