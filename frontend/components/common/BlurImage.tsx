'use client'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'

interface Props {
    src: string
    alt: string
    objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
    style?: string
}

const BlurImage = ({ src, objectFit = 'cover', style, alt }: Props) => {
    const [isLoading, setLoading] = useState(true)
    const [currentSrc, setCurrentSrc] = useState(src)
    const [isTransitioning, setTransitioning] = useState(false)

    useEffect(() => {
        if (currentSrc !== src) {
            setTransitioning(true)
            setLoading(true)
            setTimeout(() => {
                setCurrentSrc(src)
            }, 150)
        }
    }, [src])

    const handleLoadingComplete = () => {
        setLoading(false)
        setTransitioning(false)
    }

    return (
        <div
            className={`transition-opacity duration-300 ${
                isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}
        >
            <Image
                alt={alt}
                src={currentSrc}
                fill
                loading="lazy"
                style={{ objectFit: objectFit }}
                className={`
                    duration-700 ease-in-out group-hover:opacity-75
                    ${isLoading ? 'blur-lg grayscale' : 'blur-0 grayscale-0'}
                    ${style}`}
                onLoadingComplete={handleLoadingComplete}
            />
        </div>
    )
}

export default BlurImage
