import Heading from '@/components/commons/Header'
import { Separator } from '@/components/ui/separator'
import React from 'react'

import { getAllClass } from '@/lib/actions/class.actions'
import AssignGrid from './_components/AssignGrid'

const page = async () => {
  const classes = await getAllClass() ?? [];
  return (
    <>
      <div className="flex justify-between items-center">
        <Heading title="Assign Meals"  />

      </div>
      <Separator />
      <AssignGrid classes={classes} />
    </>
  )
}

export default page