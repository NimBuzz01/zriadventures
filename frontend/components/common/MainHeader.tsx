import { Pacifico } from 'next/font/google'
import React from 'react'

const pacifico = Pacifico({ weight: '400', subsets: ['latin'] })

interface Props {
    subtitle: string
    title: string
}

const MainHeader = ({ subtitle, title }: Props) => {
    return (
        <div className="mb-10 flex flex-col text-center lg:gap-3">
            <p
                className={`${pacifico.className} text-xl text-blue-500 sm:text-2xl`}
            >
                {subtitle}
            </p>
            <h1 className="mt-2 text-center text-3xl font-semibold tracking-wide text-blue-950 md:text-4xl lg:mt-0 lg:text-5xl">
                {title}
            </h1>
        </div>
    )
}

export default MainHeader
