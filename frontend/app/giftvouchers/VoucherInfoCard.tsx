import BlurImage from '@/components/common/BlurImage'
import { Card } from '@/components/ui/card'
import React from 'react'

interface Props {
    number: number
    src: string
    alt: string
    title: string
    description: string
}

const VoucherInfoCard = ({ number, src, alt, title, description }: Props) => {
    return (
        <Card className="relative flex w-full max-w-[800px] flex-col items-center gap-10 p-5 shadow-xl lg:flex-row">
            <p className="absolute left-6 top-6 flex h-12 w-12 items-center justify-center rounded-full border-2 border-blue-800 text-xl font-semibold text-blue-800 lg:hidden">
                {number}
            </p>
            <div className="flex items-center justify-center">
                <div className="relative h-32 w-32 ">
                    <BlurImage src={src} alt={alt} objectFit="contain" />
                </div>
            </div>

            <div className="py-6">
                <h1 className="mb-2 text-2xl font-semibold text-blue-900">
                    <span className="hidden lg:inline-block">{number} .</span>{' '}
                    {title}
                </h1>
                <p>{description}</p>
            </div>
        </Card>
    )
}

export default VoucherInfoCard
