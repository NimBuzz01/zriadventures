import React from 'react'
import { IoSadOutline } from 'react-icons/io5'
import BlurImage from './common/blur-image'
import PreLoader from './common/pre-loader'

interface Props {
    text: string
    minHeight?: string
    loading?: boolean
}

const NotFoundLabel = ({
    text,
    minHeight = 'min-h-[400px]',
    loading,
}: Props) => {
    return (
        <div
            className={`flex h-full ${minHeight} w-full flex-col items-center justify-center gap-2`}
        >
            <div className="relative h-24 w-24 sm:h-32 sm:w-32">
                {loading ? (
                    <div className="flex w-full items-center justify-center">
                        <PreLoader />
                    </div>
                ) : (
                    <BlurImage
                        src="/icons/not-found.png"
                        alt="Content Not Found"
                        objectFit="contain"
                    />
                )}
            </div>
            <p className="text-center text-lg font-medium text-blue-950 sm:text-xl md:text-2xl">
                {text}
            </p>
        </div>
    )
}

export default NotFoundLabel
