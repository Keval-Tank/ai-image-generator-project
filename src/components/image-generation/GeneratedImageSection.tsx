import React from 'react'
import { Card, CardContent } from '../ui/card'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image'




const images = [
    {
        src: "/hero-images/Charismatic Young Man with a Warm Smile and Stylish Tousled Hair.jpeg",
        alt: "alternative text"
    },
    {
        src: "/hero-images/Confident Businesswoman on Turquoise Backdrop.jpeg",
        alt: "alternative text"
    },
    {
        src: "/hero-images/Confident Woman in Urban Setting.jpeg",
        alt: "alternative text"
    },
    {
        src: "/hero-images/Professional Woman in Navy Blue Suit.jpeg",
        alt: "alternative text"
    }
]

const GeneratedImageSection = () => {
    if (images.length === 0) {
        return (
            <Card className='bg-muted rounded-none aspect-square'>
                <CardContent>
                    <div className='flex items-center justify-center py-70 aspect-square'>
                        <p className='text-muted-backgorund font-light'>No Images are generated</p>
                    </div>
                </CardContent>
            </Card>)
    }
    return (
        <div>
            <Carousel className="h-full w-full max-w-2xl z-10">
                <CarouselContent>
                    {images.map((image, index) => (
                        <CarouselItem key={index}>
                            <div className='relative w-full aspect-square rounded-lg'>
                                <Image src={image.src} alt={image.alt} fill className='h-fit object-cover rounded-lg' />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default GeneratedImageSection