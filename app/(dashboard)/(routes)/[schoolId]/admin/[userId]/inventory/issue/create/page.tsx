import Heading from '@/components/commons/Header'
import { Separator } from '@/components/ui/separator'
import { getAllClass } from '@/lib/actions/class.actions'
import { fetchCategories } from '@/lib/actions/inventory-category.actions'
import { getRolesName } from '@/lib/actions/role.actions'
import IssuesForm from '../_components/IssueForm'


const page = async () => {
  const roles = await getRolesName() || [];
  const classes = await getAllClass() || [];
  const categories = await fetchCategories() || [];

  return (
    <>
      <div className="flex justify-between items-center">
        <Heading
          title="Issue Items"
          description=" categories list "
        />
      </div>
      <Separator />
      <div className="py-4">
        <IssuesForm roles={roles} categories={categories} classes={classes} type="create" />
      </div>
    </>
  )
}

export default page
