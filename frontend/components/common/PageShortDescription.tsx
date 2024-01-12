import React from 'react'

interface Props {
    title: string
    description: string
}

const PageShortDescription = ({ title, description }: Props) => {
    return (
        <div className="flex w-full items-center justify-center py-16">
            <div className="flex w-full max-w-[1300px] flex-col items-center justify-center gap-4 px-4 lg:flex-row lg:gap-10 ">
                <h1 className="px-4 text-2xl font-bold uppercase text-blue-950 sm:border-r-4 sm:border-blue-950 sm:px-10 md:text-3xl lg:py-16">
                    {title}
                </h1>
                <div className="rounded-sm border-4 border-blue-950 px-6 py-10 text-blue-950 shadow-xl sm:px-10 sm:py-16">
                    <p className="font-medium sm:text-lg">{description}</p>
                </div>
            </div>
        </div>
    )
}

export default PageShortDescription
