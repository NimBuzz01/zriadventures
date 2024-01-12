import SVGWave from '@/components/common/SVGWave'
import {
    ABOUT_MISSION_DESCRIPTION,
    ABOUT_MISSION_TITLE,
    ABOUT_VISION_DESCRIPTION,
    ABOUT_VISION_TITLE,
} from '@/constants/pages/AboutPageConstants'
import React from 'react'

const VissionMission = () => {
    return (
        <div className="relative flex w-full flex-col items-center justify-center gap-10 bg-gradient-to-r from-cyan-400 to-blue-200 px-2 py-20 pb-40 sm:px-10 lg:flex-row lg:pb-60">
            <div className="w-full max-w-[600px] rounded-sm bg-white px-5 py-10 shadow-lg sm:px-10 lg:h-80 lg:w-1/2">
                <p className="mb-2 text-xl font-bold uppercase text-blue-950 sm:text-2xl">
                    {ABOUT_VISION_TITLE}
                </p>
                <div className="mb-4 ml-2 block w-32 self-start border-t-4 border-blue-500 sm:w-64"></div>
                <p className="font-medium">{ABOUT_VISION_DESCRIPTION}</p>
            </div>
            <div className="w-full max-w-[600px] rounded-sm bg-white px-5 py-10 shadow-lg sm:px-10 lg:h-80 lg:w-1/2">
                {' '}
                <p className="mb-2 text-xl font-bold uppercase text-blue-950 sm:text-2xl">
                    {ABOUT_MISSION_TITLE}
                </p>
                <div className="mb-4 ml-2 block w-32 self-start border-t-4 border-blue-500 sm:w-64"></div>
                <p className="font-medium">{ABOUT_MISSION_DESCRIPTION}</p>
            </div>
            <SVGWave fillColor="fill-white" />
        </div>
    )
}

export default VissionMission
