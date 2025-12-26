import { createSlice} from "@reduxjs/toolkit";
import { generateImage } from "./generate-image-thunk";
import { z } from "zod"
import { generateImageFormSchema } from "@/components/image-generation/InputDataForm";

interface GeneratedImage {
    images : Array<{url : string} & z.infer<typeof generateImageFormSchema>>,
    error : string | null,
    loading : boolean
}


const generatedImageSlice = createSlice({
    name : "generated_images",
    initialState : {
        images : [],
        error : null,
        loading : false,
    } as GeneratedImage,
    reducers : {

    },
    extraReducers : (builder) => {
        builder
            .addCase(generateImage.pending, (state) => {
                state.loading = true
            })
            .addCase(generateImage.fulfilled, (state, action) => {
                action.payload.forEach((obj : {url : string} & z.infer<typeof generateImageFormSchema>) => {
                    state.images.push(obj)
                });
                state.loading = false
            })
            .addCase(generateImage.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            });
    }
})

export default generatedImageSlice.reducer