import React from 'react'
import loginImage from '@/public/login-image.jpeg'
import Image from 'next/image'
import Logo from '@/components/Logo'
import AuthForm from '@/components/authentication/AuthForm'

const AuthenticationPage = () => {
  return (
    <main className='h-screen grid grid-cols-2 realtive'>
        <div className='relative w-full flex flex-col bg-muted p-10 text-primary-foreground'>
            <div className="w-full h-[30%] bg-gradient-to-t from-transparent to-black/50 absolute top-0 left-0 z-10"/>
            <div className="w-full h-[30%] bg-gradient-to-b from-transparent to-black/50 absolute bottom-0 left-0 z-10"/>
            <Image src={loginImage} alt="login image" fill className="w-full h-full object-cover"/>
            <div className="relative z-20 flex items-center text-white">
                <Logo/>
            </div>
            <div className="relative z-20 mt-auto">
                <blockquote className="space-y-2">
                    <p className="text-sm">
                        &ldquo;Pictoria AI is a game changer for me. I have been able to generate high quality professional headshots within minutes. It has saved me countless hours of work and cost as well.&rdquo;
                    </p>
                    <footer>David S.</footer>
                </blockquote>
            </div>
        </div>
        <div className="relative flex flex-col items-center justify-center p-8 h-full w-full">
           <div className='max-w-xl w-[350px] mx-auto'><AuthForm/></div>
        </div>

    </main>
  )
}

export default AuthenticationPage