"use server"
import Replicate from "replicate"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { type generateImageFormSchema } from "@/components/image-generation/InputDataForm"

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