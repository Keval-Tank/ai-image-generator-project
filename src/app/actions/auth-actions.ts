"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

interface AuthResponse {
    error : string | null,
    success : boolean,
    data : unknown | null
}

// for signing up user
export async function signUp(formData : FormData):Promise<AuthResponse>{

    const supabase = await createClient()

    const reqData = {
        email : formData.get("email") as string,
        password : formData.get("password") as string,
        options : {
           data : {
            full_name : formData.get("full_name") as string
           }
        }
    }

    const {data : signupData, error} = await supabase.auth.signUp(reqData)

    return {
        error : error?.message || "There was an error signing in",
        success : !error,
        data : signupData || null
    }
}

// for logging in user
export async function logIn(formData : FormData): Promise<AuthResponse> {
    const supabase = await createClient()

    const reqData = {
        email : formData.get("email") as string,
        password : formData.get("password") as string
    }

    const {data : logInData, error} = await supabase.auth.signInWithPassword(reqData)

    return {
        error : error?.message || "There was an error logging in",
        success : !error,
        data : logInData || null
    }
}

// for log out
export async function logOut() : Promise<void> {
    const supabase = await createClient()

    await supabase.auth.signOut()
    redirect("/login")
}