'use client'
import React, { useEffect, useState } from 'react'
import BlurImage from './blur-image'
import SVGWave from './svg-wave'

interface Props {
    title: string
    description?: string
    image: string[]
    fillColor?: string
}

const SubHero = ({
    title,
    description,
    image,
    fillColor = 'fill-white',
}: Props) => {
    const [isMounted, setIsMounted] = useState(false)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        const interval = setInterval(handleImageTransition, 5000)
        return () => clearInterval(interval)
    }, [currentImageIndex])

    const handleImageTransition = () => {
        setTimeout(() => {
            const nextImageIndex = (currentImageIndex + 1) % image.length
            setCurrentImageIndex(nextImageIndex)
        }, 500)
    }

    const currentImage = image[currentImageIndex]

    return (
        <div className="relative flex h-[50vh] items-center justify-center overflow-hidden bg-black/50 bg-cover bg-center backdrop-blur sm:h-[55vh] md:h-[60vh]">
            <div className="relative h-full w-full animate-zoom-in-out transition-all">
                <BlurImage src={currentImage} alt="" objectFit="cover" />
            </div>
            <div className="absolute inset-0 bg-black/40 bg-gradient-to-b from-black/30 via-black/70 to-black/30 sm:bg-transparent"></div>
            <div className="absolute z-10 mt-16 flex w-full flex-col items-center justify-center px-10 text-center text-white lg:w-[1200px]">
                <h1
                    className={`mb-8 transform text-3xl font-semibold uppercase sm:text-4xl md:text-5xl lg:text-6xl ${
                        isMounted
                            ? 'translate-y-0 opacity-100'
                            : 'translate-y-10 opacity-0'
                    } transition-all duration-500 ease-in-out`}
                >
                    {title}
                </h1>
                <p
                    className={`transform text-xl md:text-2xl ${
                        isMounted
                            ? 'translate-y-0 opacity-100'
                            : 'translate-y-10 opacity-0'
                    } transition-all delay-100 duration-500 ease-in-out`}
                >
                    {description}
                </p>
            </div>
            {/* <SVGWave fillColor={fillColor} /> */}
        </div>
    )
}

export default SubHero
