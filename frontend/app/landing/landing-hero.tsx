'use client'
import BlurImage from '@/components/common/blur-image'
import {
    LANDING_HERO_BG_IMAGE,
    LANDING_HERO_DESCRIPTION,
    LANDING_HERO_MAIN_TITLE,
    LANDING_HERO_SUB_TITLE,
} from '@/constants/pages/LandingPageConstants'
import { Pacifico } from 'next/font/google'
import React, { useEffect, useState } from 'react'
import { BsMouse } from 'react-icons/bs'

const pacifico = Pacifico({ weight: '400', subsets: ['latin'] })

const Hero = () => {
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
            const nextImageIndex =
                (currentImageIndex + 1) % LANDING_HERO_BG_IMAGE.length
            setCurrentImageIndex(nextImageIndex)
        }, 500)
    }

    const currentImage = LANDING_HERO_BG_IMAGE[currentImageIndex]

    return (
        <div className="relative flex h-screen items-center justify-center overflow-hidden bg-black/50 bg-cover bg-center backdrop-blur">
            <div className="relative h-full w-full animate-zoom-in-out">
                <BlurImage
                    src={currentImage}
                    alt="Hero Image"
                    objectFit="cover"
                />
            </div>
            <div className="absolute inset-0 bg-black/40 bg-gradient-to-b from-black/20 via-black/60 to-black/20 sm:bg-transparent"></div>
            <div className="absolute z-10 flex w-full flex-col items-center justify-center px-3 pt-10 text-center text-white sm:px-10 lg:w-[1200px]">
                <p
                    className={`${
                        pacifico.className
                    } mb-3 transform text-lg text-white md:text-xl lg:text-2xl ${
                        isMounted
                            ? 'translate-y-0 opacity-100'
                            : 'translate-y-10 opacity-0'
                    } transition-all duration-500 ease-in-out`}
                >
                    {LANDING_HERO_SUB_TITLE}
                </p>
                <h1
                    className={`mb-6 transform text-4xl font-medium uppercase sm:text-5xl md:text-6xl lg:text-7xl ${
                        isMounted
                            ? 'translate-y-0 opacity-100'
                            : 'translate-y-10 opacity-0'
                    } transition-all delay-100 duration-500 ease-in-out`}
                >
                    {LANDING_HERO_MAIN_TITLE}
                </h1>
                <p
                    className={`mb-4 transform px-4 sm:text-xl ${
                        isMounted
                            ? 'translate-y-0 opacity-100'
                            : 'translate-y-10 opacity-0'
                    } transition-all delay-200 duration-500 ease-in-out`}
                >
                    {LANDING_HERO_DESCRIPTION}
                </p>
            </div>
            <div
                className={`absolute bottom-10 left-1/2 z-[999] flex -translate-x-1/2 flex-col items-center justify-center gap-2 text-white transition-opacity md:bottom-28 `}
            >
                <BsMouse className="animate-bounce text-4xl" />
                <p className="text-xs font-medium uppercase">Scroll Down</p>
            </div>
        </div>
    )
}

export default Hero
