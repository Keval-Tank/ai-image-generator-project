"use client"
import React from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Textarea } from '../ui/textarea'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Info } from 'lucide-react'
import { useEffect } from 'react'
import { generateImage } from '@/app/actions/image-generation'

// required input data
//  model
//  prompt: "black forest gateau cake spelling out the words \"FLUX DEV\", tasty, food photography, dynamic shot",
//   go_fast: true,
//   guidance: 3.5,
//   megapixels: "1",
//   num_outputs: 1,
//   aspect_ratio: "1:1",
//   output_format: "webp",
//   output_quality: 80,
//   prompt_strength: 0.8,
//   num_inference_steps: 28

export const generateImageFormSchema = z.object({
    model: z.string(),
    prompt: z.string(),
    guidance: z.number().min(1).max(10, { message: "guidance must be less then 10." }),
    num_outputs: z.number().min(1, { message: "Number of outputs must be atleast 1." }).max(4, { message: "Number of outputs must be less than or equal to 4" }),
    aspect_ratio: z.string(),
    output_format: z.string(),
    output_quality: z.number().min(0, { message: "Output Quality must be atleast 0." }).max(100, { message: "Output Quality must be less than or equal to 100." }),
    num_inference_steps: z.number().min(1, { message: "Number of inference steps must be atleast 1." }).max(50, { message: "Number of inference steps must be less than or equal to 50." })
})

const InputDataForm = () => {
    const form = useForm<z.infer<typeof generateImageFormSchema>>({
        resolver: zodResolver(generateImageFormSchema),
        defaultValues: {
            model: "",
            prompt: "",
            guidance: 3.5,
            num_outputs: 1,
            aspect_ratio: "1:1",
            output_format: "WebP",
            output_quality: 80,
            num_inference_steps: 28
        }
    })

    useEffect(() => {
        const subscription = form.watch((value, { name }) => {
            if (name === "model") {
                let newSteps;
                if (value.model === "black-forest-labs/flux-schnell") {
                    newSteps = 4;
                } else {
                    newSteps = 28
                }
                if(newSteps !== undefined){
                    form.setValue('num_inference_steps', newSteps)
                }
           }
        })
        return () => subscription.unsubscribe()
    }, [form])

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof generateImageFormSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log("values", values)
        // const {success, error, data} = await generateImage(values)
        // console.log({success, error, data})
    }
    return (
        <fieldset className='max-w-fit bg-background p-4 border rounded-lg'>
            <legend className='text-sm font-semibold my-4'>Settings</legend>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="model"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Model
                                    <Tooltip >
                                        <TooltipTrigger asChild>
                                            <Info className='h-4 w-4' />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Select a model for generating image</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </FormLabel>
                                <FormControl>
                                    <Select defaultValue='black-forest-labs/flux-dev'>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Select a Model" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>All Models</SelectLabel>
                                                <SelectItem value="black-forest-labs/flux-dev" >Flux Dev</SelectItem>
                                                <SelectItem value="black-forest-labs/flux-schnell">Flux Schnell</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='grid grid-cols-2 gap-4'>
                        <FormField
                            control={form.control}
                            name="aspect_ratio"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Aspect Ratio
                                        <Tooltip >
                                            <TooltipTrigger asChild>
                                                <Info className='h-4 w-4' />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Select an aspect ratio for image</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </FormLabel>
                                    <FormControl>
                                        <Select defaultValue='1:1'>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select a Model" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Aspect ratios</SelectLabel>
                                                    <SelectItem value="1:1">1:1</SelectItem>
                                                    <SelectItem value="16:9">16:9</SelectItem>
                                                    <SelectItem value="21:9">21:9</SelectItem>
                                                    <SelectItem value="3:2">3:2</SelectItem>
                                                    <SelectItem value="2:3">2:3</SelectItem>
                                                    <SelectItem value="4:5">4:5</SelectItem>
                                                    <SelectItem value="5:4">5:4</SelectItem>
                                                    <SelectItem value="3:4">3:4</SelectItem>
                                                    <SelectItem value="4:3">4:3</SelectItem>
                                                    <SelectItem value="9:21">9:21</SelectItem>
                                                    <SelectItem value="9:16">9:16</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /><FormField
                            control={form.control}
                            name="num_outputs"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Number of Outputs
                                        <Tooltip >
                                            <TooltipTrigger asChild>
                                                <Info className='h-4 w-4' />
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Number of outputs you want to generate</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </FormLabel>
                                    <FormControl>
                                        <Select defaultValue='1'>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Number of outputs" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Number of Outputs</SelectLabel>
                                                    <SelectItem value="1">1</SelectItem>
                                                    <SelectItem value="2">2</SelectItem>
                                                    <SelectItem value="3">3</SelectItem>
                                                    <SelectItem value="4">4</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="guidance"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='w-full'>
                                    <div className='w-[80%] flex items-center justify-between'>
                                        <div className='flex items-center justify-center gap-2'>Guidance
                                            <Tooltip >
                                                <TooltipTrigger asChild>
                                                    <Info className='h-4 w-4' />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Enter guidance for prompt</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </div>
                                        <div>{field.value}</div>
                                    </div>
                                </FormLabel>
                                <FormControl>
                                    <Slider
                                        defaultValue={[field.value]}
                                        max={10}
                                        step={0.5}
                                        className='w-[80%]'
                                        onValueChange={(value) => field.onChange(value[0])}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="num_inference_steps"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='w-full'>
                                    <div className='w-[80%] flex items-center justify-between'>
                                        <div className='flex items-center justify-center gap-2'>Number of Inference Steps
                                            <Tooltip >
                                                <TooltipTrigger asChild>
                                                    <Info className='h-4 w-4' />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Number of inference steps you 28-50 would be recomended for Flux dev and 1-4 for Flux schnell.</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </div>
                                        <div>{field.value}</div>
                                    </div>
                                </FormLabel>
                                <FormControl>
                                    <Slider
                                        defaultValue={[field.value]}
                                        max={
                                            form.getValues("model") === "black-forest-labs/flux-schnell" ? 4 : 50
                                        }
                                        step={1}
                                        className='w-[80%]'
                                        onValueChange={(value) => field.onChange(value[0])}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    /><FormField
                        control={form.control}
                        name="output_quality"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='w-full'>
                                    <div className='w-[80%] flex items-center justify-between'>
                                        <div className='flex items-center jsutify-center gap-2'>Output Quality
                                            <Tooltip >
                                                <TooltipTrigger asChild>
                                                    <Info className='h-4 w-4' />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Select quality of output between 0-100, consider 100 the best image quality.</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </div>
                                        <div>{field.value}</div>
                                    </div>
                                </FormLabel>
                                <FormControl>
                                    <Slider
                                        defaultValue={[field.value]}
                                        max={100}
                                        step={1}
                                        className='w-[80%]'
                                        onValueChange={(value) => field.onChange(value[0])}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="output_format"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Output Format
                                    <Tooltip >
                                        <TooltipTrigger asChild>
                                            <Info className='h-4 w-4' />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Choose the format to download generated image.</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </FormLabel>
                                <FormControl>
                                    <Select defaultValue='webp'>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Output Quality" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Output formats</SelectLabel>
                                                <SelectItem value="webp">WebP</SelectItem>
                                                <SelectItem value="jpg">JPG</SelectItem>
                                                <SelectItem value="png">PNG</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="prompt"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Prompt
                                    <Tooltip >
                                        <TooltipTrigger asChild>
                                            <Info className='h-4 w-4' />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Enter the prompt to generate an image.</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </FormLabel>
                                <FormControl>
                                    <Textarea {...field} rows={6} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className='w-full'>Generate</Button>
                </form>
            </Form>
        </fieldset>

    )
}

export default InputDataForm