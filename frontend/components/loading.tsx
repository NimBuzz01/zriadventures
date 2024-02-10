import React from 'react'
import Lottie from 'react-lottie'
import * as animationData from '@/public/loading-lottie.json'

const Loading = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    }

    return (
        <div className="flex h-[400px] w-full items-center justify-center ">
            <Lottie options={defaultOptions} height={100} width={100} />
        </div>
    )
}

export default Loading
