import React from 'react'
import ProcessCard from './cards/ProcessCard'
import MainHeader from '@/components/common/MainHeader'
import { ABOUT_PROCESS_CONTENT } from '@/constants/pages/AboutPageConstants'

const ZRIProcess = () => {
    return (
        <div
            className="flex w-full flex-col items-center justify-center bg-gradient-to-r from-cyan-400 to-blue-200 py-16"
            id="how-we-work"
        >
            <MainHeader subtitle="How we work" title="Booking PROCESS" />
            <div className="flex w-full max-w-[800px] flex-col items-center justify-center px-2 py-4 sm:px-10 sm:py-10">
                {ABOUT_PROCESS_CONTENT.map((process, index: number) => (
                    <>
                        <ProcessCard
                            key={index}
                            title={process.title}
                            description={process.description}
                        />
                        {index !== ABOUT_PROCESS_CONTENT.length - 1 && (
                            <div className="mx-4 h-16 w-px border-2 border-dashed border-blue-500 bg-transparent sm:h-24"></div>
                        )}
                    </>
                ))}
            </div>
        </div>
    )
}

export default ZRIProcess
