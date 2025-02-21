import Heading from '@/components/commons/Header'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import PaymentGrid from './_components/PaymentGrid'
import { getAllClass } from '@/lib/actions/class.actions'

const page = async () => {
  const classes = await getAllClass() ?? [];
  return (
    <>
      <div className="flex justify-between items-center">
        <Heading title="Daily Canteen Payment"  />

      </div>
      <Separator />
      <PaymentGrid classes={classes} />
    </>
  )
}

export default page