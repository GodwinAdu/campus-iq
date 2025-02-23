import Heading from '@/components/commons/Header'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import { StudentTypeModal } from './_components/StudentTypeModal'
import { columns } from './_components/column'

import { getAllStudentCategories } from '@/lib/actions/student-category.actions'
import { DataTable } from '@/components/table/data-table'

const page = async () => {
    const data = (await getAllStudentCategories()) || [];
    return (
        <>
            <div className="flex justify-between items-center">
                <Heading title="Student Type" description="Manage,create and edit school Stages" />
                <StudentTypeModal />
            </div>
            <Separator />
            <DataTable searchKey="name" columns={columns} data={data} />

        </>
    )
}

export default page
