'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import BaseSkeleton from '../skeletons/base-skeleton'
import BlurImage from '../common/blur-image'
import { useLocal } from '@/contexts/local-context'
import { RentalTypes } from '@/lib/types/rental-types'

interface Props {
    rental: RentalTypes
    width?: string
}

const RentalsCard = ({ rental, width = 'w-full' }: Props) => {
    const [imageLoaded, setImageLoaded] = useState(false)
    const { local } = useLocal()

    useEffect(() => {
        const img = new Image()
        img.src = rental.item.images[0].src
        img.onload = () => setImageLoaded(true)
    }, [rental.item.images[0].src])

    return (
        <Link
            href={`/rentals/${encodeURIComponent(rental.id)}`}
            key={rental.id}
        >
            {imageLoaded ? (
                <div
                    className={`group relative flex ${width} h-[400px] flex-col items-center justify-center rounded-md border-[1px] bg-white transition-all`}
                >
                    <div className="relative flex h-72 w-full items-center justify-center overflow-hidden">
                        <BlurImage
                            src={rental.item.images[0].src}
                            alt={rental.item.images[0].alt}
                            objectFit="contain"
                            style="transition-all duration-500 group-hover:scale-110"
                        />
                    </div>
                    <div className="flex flex-1 flex-col items-center justify-center gap-1 py-6">
                        <p className="text-xs uppercase sm:text-sm">
                            {rental.item.category.name}
                        </p>
                        <p className="px-2 text-center text-lg font-medium sm:text-xl">
                            {rental.name}
                        </p>
                        <p className="mt-2 text-lg font-medium text-blue-900 sm:text-xl">
                            {local ? (
                                <>LKR {rental.options[0].cost.LKR}</>
                            ) : (
                                <>USD ${rental.options[0].cost.USD}</>
                            )}
                        </p>
                    </div>
                    <div className="absolute right-1/2 top-0 translate-x-1/2 rounded-b-xl bg-green-500 px-4 py-1.5 text-xs font-semibold text-white">
                        RENTAL
                    </div>
                </div>
            ) : (
                <BaseSkeleton />
            )}
        </Link>
    )
}

export default RentalsCard
