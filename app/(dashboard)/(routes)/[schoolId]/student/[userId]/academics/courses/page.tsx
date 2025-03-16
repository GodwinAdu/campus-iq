import Heading from '@/components/commons/Header'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import CoursesPage from './_components/Course'
import { fetchAllSubjectForStudent } from '@/lib/actions/subject.actions'

const page = async () => {
  const subjects = await fetchAllSubjectForStudent() ?? []
  return (
    <>
    <Heading title='My Courses' />
    <Separator />
    <div className="py-4">
      <CoursesPage subjects={subjects} />
    </div>
    </>
  )
}

export default page
