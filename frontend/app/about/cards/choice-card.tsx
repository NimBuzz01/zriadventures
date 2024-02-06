import BlurImage from '@/components/common/blur-image'
import React from 'react'

interface Props {
    title: string
    image: string
    description: string
}

const ChoiceCard = ({ title, image, description }: Props) => {
    return (
        <div className="flex w-96 flex-col gap-6">
            <div className="flex flex-col items-center gap-4">
                <div className="relative h-16 w-16">
                    <BlurImage src={image} alt={title} objectFit="contain" />
                </div>
                <h1 className="text-xl font-medium text-blue-900 md:text-2xl">
                    {title}
                </h1>
            </div>
            <div className="text-center text-gray-500">{description}</div>
        </div>
    )
}

export default ChoiceCard
