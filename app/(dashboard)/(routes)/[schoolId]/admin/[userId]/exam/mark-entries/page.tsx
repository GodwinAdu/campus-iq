import Heading from "@/components/commons/Header"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import MarkEntriesGrid from "./_components/MarkEntriesGrid"
import { getAllClass } from "@/lib/actions/class.actions"

const page = async () => {
  const classes = await getAllClass() || []
  return (
    <>
      <div className="flex justify-between items-center">
        <Heading
          title="Mark Entries"
          description=" categories list "
        />
        <Link href={`mark-entries/create`} className={cn(buttonVariants())}>
          <PlusCircle className="w-4 h-4 mr-2" />
          Add
        </Link>
      </div>
      <Separator />
      <div className="py-4">
        <MarkEntriesGrid classes={classes} />
      </div>
    </>
  )
}

export default page
