import Heading from '@/components/commons/Header'
import { Separator } from '@/components/ui/separator'
import React from 'react'

import { getAllClass } from '@/lib/actions/class.actions'
import ClassPaymentGrid from './_components/ClassPaymentGrid'

const page = async () => {
  const classes = await getAllClass() ?? [];
  return (
    <>
      <div className="flex justify-between items-center">
        <Heading title="Daily Classes Payment"  />

      </div>
      <Separator />
      <ClassPaymentGrid classes={classes} />
    </>
  )
}

export default page