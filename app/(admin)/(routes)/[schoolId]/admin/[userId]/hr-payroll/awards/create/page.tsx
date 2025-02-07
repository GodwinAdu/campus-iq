import Heading from '@/components/commons/Header'
import { Separator } from '@/components/ui/separator'
import { getAllClass } from '@/lib/actions/class.actions'
import { getRolesName } from '@/lib/actions/role.actions'
import AwardForm from '../_components/AwardForm'


const page = async () => {
  const roles = await getRolesName() || [];
  const classes = await getAllClass() || [];

  return (
    <>
      <div className="flex justify-between items-center">
        <Heading
          title="Create Awards"
          description=" categories list "
        />

      </div>
      <Separator />
      <div className="py-4">
        <AwardForm roles={roles} classes={classes} type="create" />
      </div>
    </>
  )
}

export default page
