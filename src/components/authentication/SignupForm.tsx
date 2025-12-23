"use client"
import React from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useId } from 'react'
import { signUp } from '@/app/actions/auth-actions'
 
const formSchema = z.object({
  full_name : z.string().min(3, {
    message : "Name must be atleast 3 characters long"
  }),
  email : z.string().trim().toLowerCase().email("Please Enter a valid email address"),
  password : z.string().min(8, {
    message : "Password must be atleast 8 characters long"
  }),
  confirmPassword : z.string().min(1, {
    message : "Confirm password is required"
  })
}).refine(data => data.password === data.confirmPassword, {
    message : "Passwords do not match",
    path : ["confirmPassword"]
})



const SignupForm = ({className} : {className? : string}) => {
    
    const [loading, setLoading] = useState(false)
    const toastId = useId()

    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name : "",
      email: "",
      password : "",
      confirmPassword : ""
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    toast.loading("Signing up...", {id : toastId})
    setLoading(true)

    const formData = new FormData()
    formData.append("full_name", values.full_name)
    formData.append("email", values.email)
    formData.append("password", values.password)

    const {success, error} = await signUp(formData)

    if(!success){
        setLoading(false)
        toast.error(String(error), {id : toastId})
    }

    toast.success("Signed up successfully!", {id : toastId})
    setLoading(false)
    console.log(values)
  }

  return (
    <div className={cn("grid gap-6", className)}>
         <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="abc@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input placeholder="Confirm your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className='w-full' disabled={loading}>{loading && <Loader2 className=' h-4 w-4 animate-spin'/>}{loading ? "Signing in..." : "Sign up"}</Button>
      </form>
    </Form>
    </div>
  )
}

export default SignupForm