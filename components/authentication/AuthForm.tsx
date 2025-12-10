"use client"
import React from 'react'
import { useState } from 'react'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import ResetPasswordForm from './ResetPassword'
import { Button } from '../ui/button'


const AuthForm = () => {
    const [mode, setMode] = useState('login')
  return (
    <div className="space-y-6">
        <div className='flex flex-col space-y-2 text-center'>
            <h1 className="text-2xl font-semibold tracking-tight">
                {
                    mode === "reset" ? "Reset Your Password" : mode === "login" ? "Login" : "Sign Up"
                }
            </h1>
            <p className="text-sm text-muted-forground">
                {
                    mode === "reset" ? "Enter your email below to reset your password" : mode === "login" ? "Enter your email below to login to your account" : "Enter your information below to create an account"
                }
            </p>
        </div>
        {
            mode === "login" && <>
             <LoginForm/>
             <div className="text-center flex justify-between">
                <Button variant={"link"} onClick={() => setMode("signup")}>Need an account? sign up</Button>
                <Button variant={"link"} onClick={() => setMode("reset")}>Forget Password</Button>
             </div>
            </>
        }
        {
            mode === "signup" && <>
             <SignupForm/>
             <div className="text-center flex justify-center">
                <Button variant={"link"} onClick={() => setMode("login")}>Already have an account? Login</Button>
             </div>
            </>
        }
        {
            mode === "reset" && <>
                <ResetPasswordForm/>
                <div className="text-center flex justify-center">
                  <Button variant={"link"} onClick={() => setMode("login")}>Back to login</Button>
                </div>
            </>
        }
    </div>
  )
}

export default AuthForm