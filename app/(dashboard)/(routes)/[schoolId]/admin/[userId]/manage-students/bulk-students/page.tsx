import Heading from '@/components/commons/Header'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import BulkStudentUpload from './_components/UploadBulk'
import { getAllClass } from '@/lib/actions/class.actions'

const page = async () => {

  const classes = await getAllClass() ?? [];
  return (
    <>
      <div className="flex justify-between items-center">
        <Heading title="Upload Bulk Students" description="Manage,create and edit school Stages" />

      </div>
      <Separator />

      <div className="py-4">
        <BulkStudentUpload classes={classes} />
      </div>
    </>
  )
}

export default page