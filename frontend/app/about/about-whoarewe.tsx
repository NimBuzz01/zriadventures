import BlurImage from '@/components/common/blur-image'
import {
    ABOUT_BOTTOM_IMAGE,
    ABOUT_DESCRIPTION,
    ABOUT_MAIN_TITLE,
    ABOUT_SUB_TITLE,
    ABOUT_TOP_IMAGE,
} from '@/constants/pages/AboutPageConstants'
import { Pacifico } from 'next/font/google'
import React from 'react'

const pacifico = Pacifico({ weight: '400', subsets: ['latin'] })

const WhoAreWe = () => {
    return (
        <div className=" flex w-full max-w-[1400px] flex-col items-center justify-center gap-10 py-10 pb-0 sm:w-[90%] sm:py-16 lg:flex-row lg:gap-0">
            <div className="relative flex w-full flex-col items-center justify-center gap-2 px-2 sm:px-10 lg:w-1/2 lg:gap-0">
                <div className="relative h-96 w-full lg:absolute lg:w-2/3 lg:-translate-x-20 lg:-translate-y-20">
                    <BlurImage
                        src={ABOUT_TOP_IMAGE}
                        objectFit="cover"
                        alt="About Top Image"
                    />
                </div>
                <div className="relative h-96 w-full lg:absolute lg:w-2/3 lg:translate-x-20 lg:translate-y-20">
                    <BlurImage
                        src={ABOUT_BOTTOM_IMAGE}
                        objectFit="cover"
                        style="border-white lg:border-l-[10px] lg:border-t-[10px]"
                        alt="About Bottom Image"
                    />
                </div>
            </div>
            <div className="w-full px-10 py-16 lg:w-1/2">
                <p
                    className={`${pacifico.className} mb-2 text-xl text-blue-500`}
                >
                    {ABOUT_SUB_TITLE}
                </p>
                <h1 className="mb-10 text-3xl font-bold uppercase text-blue-950 sm:text-4xl md:text-5xl">
                    {ABOUT_MAIN_TITLE}
                </h1>
                <p>{ABOUT_DESCRIPTION}</p>
            </div>
        </div>
    )
}

export default WhoAreWe
