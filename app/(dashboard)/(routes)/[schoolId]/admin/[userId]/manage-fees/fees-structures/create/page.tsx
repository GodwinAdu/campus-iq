import Heading from '@/components/commons/Header'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import { FeesGeneratorForm } from '../_components/FeesGeneratorForm'
import { getAllClass } from '@/lib/actions/class.actions'
import { getCurrentTerms } from '@/lib/actions/term.actions'
import { getCurrentSessions } from '@/lib/actions/session.actions'

const page = async () => {
    const classes = (await getAllClass()) || [];
    const terms = (await getCurrentTerms()) || [];
    const sessions = await getCurrentSessions() || [];
    console.log(sessions,"sessions");
    return (
        <>
            <div className="flex justify-between items-center">
                <Heading
                    title="Add New Fees"
                    description="Tips,and information's for the usage of the application."
                />
            </div>
            <Separator />
            <div className="py-4 md:px-6 px-2   mx-auto">
                <FeesGeneratorForm sessions={sessions} classes={classes} terms={terms}  />
            </div>
        </>
    )
}

export default page
