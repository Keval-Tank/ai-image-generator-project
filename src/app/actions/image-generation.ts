"use server"
import Replicate from "replicate"
import { z } from "zod"
import { type generateImageFormSchema } from "@/components/image-generation/InputDataForm"
import { Database } from "@database.types"
import { createClient } from "@/lib/supabase/server"
import {imageMeta} from "image-meta"
import { randomUUID } from "crypto"

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_KEY!,
    useFileOutput : false
})

interface ImageRepsonse {
    success: boolean,
    error: string | null,
    data: any | null
}

export async function generateImageAction(input: (z.infer<typeof generateImageFormSchema>)): Promise<ImageRepsonse> {
    const modelInput = {
        prompt: input.prompt,
        go_fast: true,
        guidance: input.guidance,
        megapixels: "1",
        num_outputs: input.num_outputs,
        aspect_ratio: input.aspect_ratio,
        output_format: input.output_format,
        output_quality: input.output_quality,
        prompt_strength: 0.8,
        num_inference_steps: input.num_inference_steps
    }

    try{
        const output = await replicate.run(input.model as `${string}/${string}`, {input : modelInput})

        return {
            success : true,
            data : output,
            error : null
        }
    }catch(error : any){
        return {
            success : false,
            data : null,
            error : error.message || "Failed to generate Image!"
        }
    }
}

type storeImageInput = {url: string} & Database["public"]["Tables"]["generated_images"]["Insert"]
export async function urlToBlob(url : string){
    const result = await fetch(url)
    const blob = (await result).blob()
    return (await blob).arrayBuffer()
}


export async function storeGeneratedImageAction(inputImageData : storeImageInput[]){
    const supabase = await createClient()

    const {data : {user}} = await supabase.auth.getUser();

    if(!user){
        return {
            success : false,
            error : "Unauthorized",
            data : null
        }
    }

    const uploadResults = []

    for(const img of inputImageData){
        const arrayBuffer = await urlToBlob(img.url);
        const {width, height, type} =  imageMeta(new Uint8Array(arrayBuffer))

        const fileName = `image_${randomUUID()}.${type}`
        const filePath = `${user.id}/${fileName}`

        const {error : storageError} = await supabase.storage.from("generated_images").upload(filePath, arrayBuffer, {
            contentType : `image/${type}`,
            cacheControl : '3600',
            upsert : false
        })

        if(storageError){
            uploadResults.push( {
                fileName,
                error : storageError.message,
                success : false,
                data : null
            })
        }
        
        const {error : dbError} = await supabase.from("generated_images").insert([{
            user_id : user.id,
            model : img.model,
            image_name : fileName,
            prompt : img.prompt,
            guidance : img.guidance,
            num_inference_steps : img.num_inference_steps,
            output_format : img.output_format,
            width,
            height,
            aspect_ratio : img.aspect_ratio
        }])

        if(dbError){
            uploadResults.push({
                fileName,
                error : dbError.message,
                success : false,
                data : null
            })
        }
    }

    return {
        error : null,
        success : true,
        data : uploadResults
    }
}