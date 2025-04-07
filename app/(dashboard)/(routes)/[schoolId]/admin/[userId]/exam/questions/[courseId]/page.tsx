import Heading from '@/components/commons/Header'
import { Separator } from '@/components/ui/separator'
import { fetchQuestionBankBySubjectIdAndClassId } from '@/lib/actions/questions-bank.actions';
import QuestionBankComponent from '../_components/QuestionBankComponent';
import { BankQuestionForm } from '../_components/BankQuestionForm';
import BackButton from '../_components/BackButton';

const page = async ({ params }: { params: Promise<{ courseId: string }> }) => {
    const { courseId } = await params;
    const splitIds = courseId.split('-');
    const classId = splitIds[0];
    const subjectId = splitIds[1];

    const questionBanks = await fetchQuestionBankBySubjectIdAndClassId(subjectId, classId) ?? [];

    return (
        <>
            <div className="flex justify-between items-center">
                <Heading
                    title="Manage Question Banks"
                    description='Create, manage, and organize questions for your courses and exams'
                />
                <div className="flex gap-4">
                    <BackButton />
                    <BankQuestionForm classId={classId as string} subjectId={subjectId} />
                </div>

            </div>
            <Separator />

            <div className="py-4">
                <QuestionBankComponent classId={classId} subjectId={subjectId} banks={questionBanks} />
            </div>
        </>
    )
}

export default page
