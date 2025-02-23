import { Separator } from '@/components/ui/separator'
import React from 'react'
import StudentsReport from './_components/StudentReport'
import Heading from '@/components/commons/Header'
import { getAllClass } from '@/lib/actions/class.actions'

const page = async() => {
  const classes = await getAllClass() ?? []
  return (
    <>
      <div className="flex justify-between items-center">
        <Heading
          title="Students Report"
          description=" categories list "
        />

      </div>
      <Separator />
      <div className="">
        <StudentsReport classes={classes} />
      </div>
    </>
  )
}

export default page