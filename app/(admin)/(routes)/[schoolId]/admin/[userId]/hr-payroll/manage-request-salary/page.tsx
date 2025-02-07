import Heading from '@/components/commons/Header'
import { Separator } from '@/components/ui/separator'

const page = () => {
  return (
    <>
       <div className="flex justify-between items-center">
        <Heading title="Manage Request Salary" description="Manage,create and edit school house" />
        {/* {role?.addHouse && <HouseModal />} */}
      </div>
      <Separator />
    </>
  )
}

export default page
