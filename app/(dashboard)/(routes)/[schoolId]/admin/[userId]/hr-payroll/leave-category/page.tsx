import Heading from '@/components/commons/Header'
import { Separator } from '@/components/ui/separator'
import { LeaveCategoryModal } from './_components/LeaveCategoryModal'
import { DataTable } from '@/components/table/data-table'
import { getAllLeaves } from '@/lib/actions/leave-category.actions'
import { columns } from './_components/column'

const page = async () => {
  const leaves = await getAllLeaves() || [];

  return (
    <>
      <div className="flex justify-between items-center">
        <Heading title="Leave Category" description="Manage,create and edit school house" />
        <LeaveCategoryModal />
      </div>
      <Separator />
      <DataTable searchKey='name' columns={columns} data={leaves} />
    </>
  )
}

export default page
