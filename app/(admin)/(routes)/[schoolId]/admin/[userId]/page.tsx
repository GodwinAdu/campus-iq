import { currentUser } from '@/lib/helpers/current-user'
import React from 'react'

const page = async () => {
  const user = await currentUser()

  console.log(user,'current user')
  return (
    <div>admin dashboard</div>
  )
}

export default page