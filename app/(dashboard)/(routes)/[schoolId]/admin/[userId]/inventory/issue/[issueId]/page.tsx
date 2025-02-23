import Heading from '@/components/commons/Header'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { getAllClass } from '@/lib/actions/class.actions'
import { fetchCategories } from '@/lib/actions/inventory-category.actions'
import { getRolesName } from '@/lib/actions/role.actions'
import { cn } from '@/lib/utils'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import IssuesForm from '../_components/IssueForm'
import { fetchInventoryIssueById } from '@/lib/actions/inventory-issue.actions'


const page = async ({ params }: { params: { issueId: string } }) => {
    const roles = await getRolesName() || [];
    const classes = await getAllClass() || [];
    const categories = await fetchCategories() || [];

    const initialData = await fetchInventoryIssueById(params.issueId as string);

    return (
        <>
            <div className="flex justify-between items-center">
                <Heading
                    title="Update Issues Items"
                    description=" categories list "
                />

            </div>
            <Separator />
            <div className="py-4">
                <IssuesForm roles={roles} categories={categories} classes={classes} type="update" initialData={initialData} />
            </div>
        </>
    )
}

export default page