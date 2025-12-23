import React from 'react'
import Link from 'next/link'
import { Sparkles } from 'lucide-react'

const Logo = () => {
    return (
        <Link href="/">
            <div className='z-20 flex items-center gap-2'>
                <Sparkles/>
                <span className='font-semibold text-xl'>Pictoria AI</span>
            </div>
        </Link>
    )
}

export default Logo