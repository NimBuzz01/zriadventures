import {
    ABOUT_SUSTAINABILITY_DESCRIPTION,
    ABOUT_SUSTAINABILITY_TITLE,
} from '@/constants/pages/AboutPageConstants'
import React from 'react'

const Sustainability = () => {
    return (
        <div className="flex w-full items-center justify-center py-16">
            <div className="flex w-full max-w-[1200px] flex-col items-center justify-center gap-4 px-4 lg:flex-row lg:gap-10 ">
                <h1 className="px-10 text-center text-3xl font-bold uppercase text-blue-950 sm:border-r-4 sm:border-blue-950 md:text-4xl lg:py-16 lg:text-4xl">
                    {ABOUT_SUSTAINABILITY_TITLE}
                </h1>
                <div className="rounded-sm border-4 border-blue-950 px-6 py-10 text-center text-blue-950 shadow-xl sm:px-10 sm:py-16">
                    <p className="font-medium sm:text-lg">
                        {ABOUT_SUSTAINABILITY_DESCRIPTION}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Sustainability
