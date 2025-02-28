import AIWellbeingAssistant from '@/components/ai/AiWellbeing'
import Heading from '@/components/commons/Header'
import { Separator } from '@/components/ui/separator'
import React from 'react'

const page = () => {
    return (
        <>
            <div className="flex justify-between items-center">
                <Heading title="AI Assistant" />
            </div>
            <Separator />
            <Separator />
            <div className="py-4">
                <AIWellbeingAssistant />
            </div>
        </>
    )
}

export default page