import Heading from '@/components/commons/Header'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import { RoomModal } from './_components/RoomModal'
import { getAllRooms } from '@/lib/actions/room.actions'
import RoomCard from './_components/RoomCard'

const page = async () => {
  const rooms = await getAllRooms()
  return (
    <>
      <div className="flex justify-between items-center">
        <Heading title="Manage Hostel Rooms" description="Manage,create and edit school house" />
        <RoomModal />
      </div>
      <Separator />
      <div className="py-4">
        <RoomCard rooms={rooms} />
      </div>
    </>
  )
}

export default page
