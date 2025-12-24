import React from 'react'
import InputDataForm from './InputDataForm'
import GeneratedImageSection from './GeneratedImageSection'

const ImageGenerationForm = () => {
    return (

        <div className='w-full p-20 grid grid-cols-2 gap-10 mt-4 items-center justify-center'>
            <div className='relative flex items-center justify-center'><InputDataForm/></div>
            <div className='relative h-full aspect-square'><GeneratedImageSection/></div>
        </div>

    )
}

export default ImageGenerationForm