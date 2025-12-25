import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { generateImage } from "./generate-image-thunk";

interface GeneratedImage {
    images : Array<{url : string}>,
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
                action.payload.forEach((obj : {url:string}) => {
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