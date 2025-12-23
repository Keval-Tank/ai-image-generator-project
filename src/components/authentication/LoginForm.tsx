"use client"
import React from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import { logIn } from '@/app/actions/auth-actions'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { redirect } from 'next/navigation'
 
const formSchema = z.object({
  email : z.string().trim().toLowerCase().email("Please Enter a valid email address"),
  password : z.string().min(8, {
    message : "Password must be atleast 8 characters long"
  })
})

const LoginForm = ({className} : {className? : string}) => {
    const [loading, setLoading] = React.useState(false)
    const toastId = React.useId()
    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password : ""
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    toast.loading("Logging in....", {id : toastId})
    setLoading(true)
    const formData = new FormData()
    formData.append("email", values.email)
    formData.append("password", values.password)

    const {success, error} = await logIn(formData)

    if(!success){
        setLoading(false)
        toast.error(String(error), {id : toastId})
    }

    setLoading(false)
    toast.success("Logged in successfully!", {id : toastId})
    redirect("/dashboard")

    console.log(values)
  }

  return (
    <div className={cn("grid gap-6", className)}>
         <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
        <Button type="submit" className='w-full' disabled={loading}>{loading && <Loader2 className='h-4 w-4 animate-spin'/>}{loading ? "Logging in...." : "Login"}</Button>
      </form>
    </Form>
    </div>
  )
}

export default LoginForm