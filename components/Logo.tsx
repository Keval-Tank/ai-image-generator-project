import React from 'react'
import { Sparkles } from 'lucide-react'
import Link from 'next/link'

const Logo = () => {
  return (
    <div>
        <Link href={'/'} className="flex items-center gap-2">
          <Sparkles className='size-8' strokeWidth={2}/>
          <span className="text-lg font-semi-bold">Pictoria AI</span>
        </Link>
    </div>
  )
}

export default Logo