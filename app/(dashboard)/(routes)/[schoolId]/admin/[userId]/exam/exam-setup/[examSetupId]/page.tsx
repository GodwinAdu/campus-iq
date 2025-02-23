import Heading from '@/components/commons/Header'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import ExamSetupForm from '../_components/ExamSetupForm'
import { fetchAllDistributions } from '@/lib/actions/distribution.actions'
import { getAllTerms } from '@/lib/actions/term.actions'
import { getAllSessions } from '@/lib/actions/session.actions'
import { fetchExamSetupById } from '@/lib/actions/exam-setup.actions'

const page = async ({ params }: { params: { examSetupId: string } }) => {
    const distributions = await fetchAllDistributions() || [];
    const terms = await getAllTerms() || [];
    const sessions = await getAllSessions() || [];
    const initialData = await fetchExamSetupById(params.examSetupId as string)
    return (
        <>
            <div className="flex justify-between items-center">
                <Heading
                    title="Setting Up Exams"
                    description=" categories list "
                />

            </div>
            <Separator />
            <div className="py-4">
                <ExamSetupForm type="update" initialData={initialData} sessions={sessions} terms={terms} distributions={distributions} />
            </div>
        </>
    )
}

export default page
