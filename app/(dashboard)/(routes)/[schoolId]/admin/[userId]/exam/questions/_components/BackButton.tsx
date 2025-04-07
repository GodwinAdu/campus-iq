"use client"
import { Button } from '@/components/ui/button'
import { ArrowLeftCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const BackButton = () => {
    const router = useRouter()
    return (
        <Button variant="outline" onClick={() => router.back()}><ArrowLeftCircle /> Back</Button>
    )
}

export default BackButton
