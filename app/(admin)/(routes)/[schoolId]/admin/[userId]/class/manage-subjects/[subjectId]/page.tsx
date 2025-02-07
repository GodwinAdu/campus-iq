import Heading from '@/components/commons/Header'
import { Separator } from '@/components/ui/separator'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import CreateSubjectForm from '../_component/CreateSubject'
import { redirect } from 'next/navigation'
import { getAllClass } from '@/lib/actions/class.actions'
import { fetchSubjectById } from '@/lib/actions/subject.actions'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { currentUser } from '@/lib/helpers/current-user'

type Props = Promise<{ subjectId: string }>
const page = async ({ params }: { params: Props }) => {
    const { subjectId } = await params;
    const user = await currentUser();

    if (!user) redirect("/");

    const classes = await getAllClass() || [];
    const initialData = await fetchSubjectById(subjectId)


    return (
        <>
            <div className="flex justify-between items-center">
                <Heading title="Update Subject" description="Update the subjects here " />
                <Link href={`manage-admin/create`} className={cn(buttonVariants())} >
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Add
                </Link>
            </div>
            <Separator />
            <CreateSubjectForm type="update" initialData={initialData} classes={classes} />

        </>
    )
}

export default page
