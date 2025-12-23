"use client"
import React from 'react'
import { useState } from 'react'
import LoginForm from './LoginForm'
import { Button } from '../ui/button'
import SignupForm from './SignupForm'
import ResetPasswordForm from './ResetpasswordForm'

const AuthForm = () => {
    const [mode, setMode] = useState("login")
    return (
        <div className='space-y-4'>
            <div className='w-full flex flex-col items-center justify-center'>
                <h1 className='text-3xl font-bold'>
                    {
                        mode === "login" ? "Login" : mode === "reset" ? "Reset Password" : "Sign Up"
                    }
                </h1>
                <p className='text-muted-foreground text-sm'>
                    {
                        mode === "login" ? "Enter your email and password to login" : mode === "reset" ? "Enter your email address to reset your password" : "Enter the following details to create your account"
                    }
                </p>

            </div>
            {
                mode === "login" && (<>
                    <div className='w-[350px]'>
                        <LoginForm />
                    </div>
                    <div className='w-full flex  items-center justify-between'>
                        <Button variant={"link"} onClick={() => setMode("signup")}>Need an account?, Sign Up</Button>
                        <Button variant={"link"} onClick={() => setMode("reset")}>Forgot Password</Button>
                    </div>
                </>)
            }
            {
                mode === "signup" && (<>
                    <div className='w-[350px]'>
                        <SignupForm/>
                    </div>
                    <div className='w-full flex  items-center justify-center'>
                        <Button variant={"link"} onClick={() => setMode("login")}>Back to Login</Button>
                    </div>
                </>)
            }
            {
                mode === "reset" && (<>
                    <div className='w-[350px]'>
                        <ResetPasswordForm/>
                    </div>
                    <div className='w-full flex  items-center justify-center'>
                        <Button variant={"link"} onClick={() => setMode("login")}>Back to Login</Button>
                    </div>
                </>)
            }
        </div>
    )
}

export default AuthForm
