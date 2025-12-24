import React from 'react'
import { Button } from '../ui/button'
import { logOut } from '@/app/actions/auth-actions'

const LogoutButton = () => {
  return (
    <Button variant={"link"} className='text-destructive no-underline px-1' onClick={logOut}>Log out</Button>
  )
}

export default LogoutButton