import React from 'react'
import { BiSolidPackage } from 'react-icons/bi'

interface Props {
    title: string
    description: string
}

const ProcessCard = ({ title, description }: Props) => {
    return (
        <div className="flex w-full items-center justify-center gap-4 sm:gap-10">
            <div className="w-full rounded-md bg-white p-6 shadow-lg">
                <p className="mb-2 flex items-center gap-3 text-xl font-semibold uppercase text-blue-950 sm:text-2xl">
                    <BiSolidPackage /> {title}
                </p>
                <div className="mb-5 ml-2 block w-32 self-start border-t-4 border-blue-500"></div>
                <p className="text-sm font-medium sm:text-base">
                    {description}
                </p>
            </div>
        </div>
    )
}

export default ProcessCard
