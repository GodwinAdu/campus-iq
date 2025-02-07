import Heading from '@/components/commons/Header'
import { Separator } from '@/components/ui/separator'
import { fetchCategories } from '@/lib/actions/inventory-category.actions'
import React from 'react'
import ProductForm from '../_components/ProductForm'

const page = async () => {

    const categories = await fetchCategories() || [];
    return (
        <>
            <div className="flex justify-between items-center">
                <Heading
                    title="Create Products"
                    description=" categories list "
                />

            </div>
            <Separator />
            <div className="py-4">
                {/* ProductForm */}
                <ProductForm type='create' categories={categories} />
            </div>
        </>
    )
}

export default page
