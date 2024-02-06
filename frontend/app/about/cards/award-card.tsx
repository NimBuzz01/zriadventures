import BlurImage from '@/components/common/blur-image'
import React from 'react'

interface Props {
    image: string
    title: string
    description: string
}

const AwardCard = ({ image, title, description }: Props) => {
    return (
        <div className="flex w-64 flex-col items-center justify-center text-center">
            <div className="relative h-44 w-44">
                <BlurImage src={image} alt={title} objectFit="contain" />
            </div>
            <p className="text-xs font-medium uppercase">{title}</p>
            <p className="text-lg font-medium">{description}</p>
        </div>
    )
}

export default AwardCard
