import Heading from '@/components/commons/Header'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <>
      <div className="flex justify-between items-center">
        <Heading title="All Complaints" />
        <Link
          href={`complaints/create`}
          className={cn(buttonVariants())}
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Create
        </Link>
      </div>
      <Separator />
    </>
  )
}

export default page