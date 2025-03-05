import React from 'react'
import { CalendarApp } from './_components/calendar'
import Heading from '@/components/commons/Header'
import { Separator } from '@/components/ui/separator'

const page = () => {
    return (
        <main className="min-h-screen  flex items-center justify-center">
            <div className="w-full max-w-7xl">
                <Heading title='Events' />
                <Separator />
                <CalendarApp />
            </div>
        </main>
    )
}

export default page