import BlurImage from '@/components/common/blur-image'
import { Card } from '@/components/ui/card'
import React from 'react'

interface Props {
    number: number
    src: string
    alt: string
    title: string
    description: string
}

const InfoCard = ({ number, src, alt, title, description }: Props) => {
    return (
        <Card className="relative flex w-80 flex-col items-center p-5 shadow-xl lg:h-[450px]">
            <p className="absolute left-6 top-6 flex h-12 w-12 items-center justify-center rounded-full border-2 border-blue-800 text-xl font-semibold text-blue-800">
                {number}
            </p>
            <div className="flex h-1/2 items-center justify-center">
                <div className="relative h-44 w-44 ">
                    <BlurImage src={src} alt={alt} objectFit="contain" />
                </div>
            </div>

            <div className="h-1/2 py-6">
                <h1 className="mb-2 text-center text-2xl font-semibold text-blue-900">
                    {title}
                </h1>
                <p>{description}</p>
            </div>
        </Card>
    )
}

export default InfoCard
