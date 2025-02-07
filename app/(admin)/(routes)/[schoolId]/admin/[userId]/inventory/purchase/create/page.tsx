import Heading from '@/components/commons/Header'
import { Separator } from '@/components/ui/separator'
import PurchaseForm from '../_components/PurchaseForm'
import { fetchAllStores } from '@/lib/actions/inventory-store.actions'
import { fetchAllProducts } from '@/lib/actions/inventory-product.actions'
import { fetchAllSuppliers } from '@/lib/actions/inventory-supplier.actions'
const page = async () => {

    const stores = await fetchAllStores() || []
    const products = await fetchAllProducts() || []
    const suppliers = await fetchAllSuppliers() || []

    
    return (
        <>
            <div className="flex justify-between items-center">
                <Heading
                    title="Purchase Products"
                    description=" categories list "
                />

            </div>
            <Separator />
            <div className="py-4">
                {/* ProductForm */}
                <PurchaseForm type="create" stores={stores} suppliers={suppliers} products={products}  />
            </div>
        </>
    )
}

export default page
