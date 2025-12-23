import React from 'react'
import { Button } from '../ui/button'
import { logOut } from '@/app/actions/auth-actions'

const LogoutButton = () => {
  return (
    <Button className='bg-destructive text-white cursor-pointer hover:bg-red-900 ' onClick={logOut}>Logout</Button>
  )
}

export default LogoutButton