import Heading from '@/components/commons/Header'
import { Separator } from '@/components/ui/separator'
import { fetchSchoolById } from '@/lib/actions/school.actions';
import React from 'react'
import SchoolForm from './_components/SchoolForm';

const page = async ({params}:{params:Promise<{schoolId:string}>}) => {
  const { schoolId } = await params;
  const school = await fetchSchoolById(schoolId)
  return (
    <>
      <div className="flex justify-between items-center">
        <Heading
          title="School Settings"
        />
      </div>
      <Separator />
      <div className="py-4">
        <SchoolForm school={school} />
      </div>
    </>
  )
}

export default page