import { createAsyncThunk } from "@reduxjs/toolkit";
import { generateImageAction , storeGeneratedImageAction} from "@/app/actions/image-generation";
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
                url,
                ...values
            }
        })
        const storeImageResult = await storeGeneratedImageAction(dataObj);
        if(!storeImageResult.success){
            return thunkAPI.rejectWithValue(storeImageResult.error)
        }
        return dataObj
    }
)
