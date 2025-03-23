import React from 'react'
import QuestionBanksPage from './_components/QuestionComponent'
import Heading from '@/components/commons/Header'
import { getAllClass } from '@/lib/actions/class.actions'
import { Separator } from '@/components/ui/separator'

const page = async () => {
    const classes = await getAllClass() ?? [];
    return (
        <>
            <div className="flex justify-between items-center">
                <Heading
                    title="Question Banks"
                    description='Create, manage, and organize questions for your courses and exams'
                />

            </div>
            <Separator />

            <div className="py-4">
                <QuestionBanksPage classes={classes} />
            </div>
        </>
    )
}

export default page
