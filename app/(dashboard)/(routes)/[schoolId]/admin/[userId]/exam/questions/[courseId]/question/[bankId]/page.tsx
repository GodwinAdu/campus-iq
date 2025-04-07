import Heading from '@/components/commons/Header'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import Questions from '../../../_components/Questions';
import { fetchQuestionsByQuestionBankId } from '@/lib/actions/questions.actions';
import BackButton from '../../../_components/BackButton';
import CreateQuestionDialog from '../../../_components/CreateQuestionDialog';
import { fetchQuestionBankById } from '@/lib/actions/questions-bank.actions';

const page = async ({ params }: { params: Promise<{ courseId: string, bankId: string }> }) => {
    const { courseId, bankId } = await params;
    const splitIds = courseId.split('-');
    const classId = splitIds[0];
    const subjectId = splitIds[1];
    console.log(subjectId,"subject id");

    const questions = await fetchQuestionsByQuestionBankId(bankId) ?? [];
    const bank = await fetchQuestionBankById(bankId)

    return (
        <>
            <div className="flex justify-between items-center">
                <Heading
                    title="Manage Questions"
                    description='Create, manage, and organize questions for your courses and exams'
                />
                <div className="flex gap-4">
                    <BackButton />
                    <CreateQuestionDialog classId={classId} subjectId={subjectId} bankId={bankId} selectedBankName={bank?.name} />
                </div>

            </div>
            <Separator />

            <div className="py-4">
                <Questions questions={questions} classId={classId} subjectId={subjectId} bankId={bankId} selectedBankName={bank?.name} />
            </div>
        </>
    )
}

export default page
