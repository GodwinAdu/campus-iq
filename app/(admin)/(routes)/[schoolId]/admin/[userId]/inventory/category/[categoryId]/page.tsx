import Heading from '@/components/commons/Header'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { fetchCategories, fetchCategoryById } from '@/lib/actions/inventory-category.actions'
import { EditCategory } from '../_component/EditCategory'
import { fetchAllStores } from '@/lib/actions/inventory-store.actions'

const page = async ({ params }: { params: { categoryId: string } }) => {

    const data = await fetchCategoryById(params.categoryId);
    const stores = await fetchAllStores() || []

    return (
        <>
            <div className="flex justify-between items-center">
                <Heading
                    title="Update Category"
                    description=" categories list "
                />

            </div>
            <Separator />
            <div className="py-4">
                <EditCategory stores={stores} initialData={data} />
            </div>
        </>
    )
}

export default page
