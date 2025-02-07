
import Heading from '@/components/commons/Header'
import { Separator } from '@/components/ui/separator'
import { getAllClass } from '@/lib/actions/class.actions'
import StudentAttendanceGrid from './_components/StudentAttendanceGrid';


const page = async () => {
  const classes = (await getAllClass()) || [];
  return (
    <>
      <div className="flex justify-between items-center">
        <Heading title="Student Attendance" description="All Users excluding teachers and student will be manage here." />
      </div>
      <Separator />
      <div className="">
       <StudentAttendanceGrid classes={classes} />
      </div>
    </>
  )
}

export default page
