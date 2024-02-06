'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BsArrowRight } from 'react-icons/bs'
import BaseSkeleton from '../../../components/skeletons/base-skeleton'
import BlurImage from '../../../components/common/blur-image'

interface Props {
    name: string
    description: string
    href: string
    src: string
    alt: string
}

const DestinationCard = ({ name, description, href, src, alt }: Props) => {
    const [imageLoaded, setImageLoaded] = useState(false)

    useEffect(() => {
        const img = new Image()
        img.src = src
        img.onload = () => setImageLoaded(true)
    }, [src])

    return (
        <Link href={href}>
            {imageLoaded ? (
                <div className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-lg hover:shadow-black/30">
                    <div className="relative h-[600px] w-full md:w-96">
                        <BlurImage
                            src={src}
                            alt={alt}
                            objectFit="cover"
                            style="scale-125 transition-transform duration-500 group-hover:scale-125 sm:scale-100"
                        />
                    </div>
                    <div className="absolute inset-0 bg-black/40 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70 sm:bg-transparent"></div>
                    <div className="absolute inset-0 flex translate-y-[20%] flex-col items-center px-9 text-center text-white transition-all duration-500 sm:translate-y-[80%] group-hover:sm:translate-y-0 group-hover:sm:justify-center">
                        <h1 className="text-xl font-medium sm:text-3xl ">
                            {name}
                        </h1>
                        <p className="mt-3 text-sm transition-opacity duration-300 group-hover:opacity-100 sm:opacity-0 md:text-base">
                            {description}
                        </p>
                        <p className="mt-5 flex items-center gap-2">
                            View Destination <BsArrowRight />
                        </p>
                    </div>
                </div>
            ) : (
                <BaseSkeleton />
            )}
        </Link>
    )
}

export default DestinationCard
