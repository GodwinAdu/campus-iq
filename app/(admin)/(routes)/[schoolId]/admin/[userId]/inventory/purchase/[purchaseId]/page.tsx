import Heading from '@/components/commons/Header'
import { Separator } from '@/components/ui/separator'
import PurchaseForm from '../_components/PurchaseForm'
import { fetchAllStores } from '@/lib/actions/inventory-store.actions'
import { fetchAllProducts } from '@/lib/actions/inventory-product.actions'
import { fetchAllSuppliers } from '@/lib/actions/inventory-supplier.actions'
import { fetchPurchaseById } from '@/lib/actions/inventory-purchase.actions'
const page = async ({ params }: { params: { purchaseId: string } }) => {

    const stores = await fetchAllStores() || []
    const products = await fetchAllProducts() || []
    const suppliers = await fetchAllSuppliers() || []

    const initialData = await fetchPurchaseById(params.purchaseId as string)


    return (
        <>
            <div className="flex justify-between items-center">
                <Heading
                    title="Update Purchase"
                    description=" categories list "
                />

            </div>
            <Separator />
            <div className="py-4">
                {/* ProductForm */}
                <PurchaseForm type="update" initialData={initialData} stores={stores} suppliers={suppliers} products={products} />
            </div>
        </>
    )
}

export default page
