import { createAsyncThunk } from "@reduxjs/toolkit";
import { generateImageAction } from "@/app/actions/image-generation";
import z from "zod";
import { generateImageFormSchema } from "@/components/image-generation/InputDataForm";


export const generateImage = createAsyncThunk("generateImageThunk/generate",
    async(values : (z.infer<typeof generateImageFormSchema>), thunkAPI) => {
        const {success, error, data} = await generateImageAction(values)
        if(!success){
            return thunkAPI.rejectWithValue(error)
        }
        const dataObj = data.map((url : string) => {
            return {
                url
            }
        })
        return dataObj
    }
)