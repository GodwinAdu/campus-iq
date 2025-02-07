import AttendanceGrid from '@/components/attendance/AttendanceGrid'
import Heading from '@/components/commons/Header'
import { Separator } from '@/components/ui/separator'
import { getAllClass } from '@/lib/actions/class.actions'
import { getRolesName } from '@/lib/actions/role.actions'


const page = async () => {
  const roles = (await getRolesName()) || [];
  return (
    <>
      <div className="flex justify-between items-center">
        <Heading title="Teacher Attendance" description="All Users excluding teachers and student will be manage here." />
      </div>
      <Separator />
      <div className="">
        <AttendanceGrid type="admin" roles={roles} />
      </div>
    </>
  )
}

export default page
