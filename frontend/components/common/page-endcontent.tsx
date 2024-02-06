import React from 'react'
import MainButton from './main-button'
import BlurImage from './blur-image'

const PageEndContent = () => {
    return (
        <div className="relative flex h-[600px] w-full items-center justify-center bg-blue-100">
            {/* <BlurImage
                src="/images/paint-bg1.png"
                alt="Page End Content Image"
                objectFit="contain"
            /> */}
            <div className="absolute flex flex-col items-center justify-center">
                <div className="relative mb-6 h-28 w-28">
                    <BlurImage src="/icons/missing.png" alt="Missing Icon" />
                </div>
                <h1 className="mb-2 text-center text-xl font-semibold uppercase text-blue-950 sm:mb-4 sm:text-2xl md:text-3xl lg:text-5xl">
                    Not what you&apos;re looking for?
                </h1>
                <p className="mb-6 text-blue-950 sm:mb-10 sm:text-lg md:text-xl lg:text-2xl">
                    Contact us to customize your tours
                </p>
                <MainButton href="/contact" text={'Contact Us'} />
            </div>
        </div>
    )
}

export default PageEndContent
