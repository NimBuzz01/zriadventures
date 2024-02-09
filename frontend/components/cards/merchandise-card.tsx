'use client'
import Link from 'next/link'
import React, { Suspense, useEffect, useState } from 'react'
import BaseSkeleton from '../skeletons/base-skeleton'
import BlurImage from '../common/blur-image'
import { useLocal } from '@/contexts/local-context'
import { MerchandiseTypes } from '@/lib/types/merchandise-types'
import { calcOffer } from '@/lib/utils'

interface Props {
    merchandise: MerchandiseTypes
    width?: string
}

const MerchandiseCard = ({ merchandise, width = 'w-full' }: Props) => {
    const [imageLoaded, setImageLoaded] = useState(false)
    const { local } = useLocal()

    const [lowestUSDRate, setLowestUSDRate] = useState(0)
    const [lowestLKRRate, setLowestLKRRate] = useState(0)

    useEffect(() => {
        const img = new Image()
        img.src = merchandise.images[0].src
        img.onload = () => setImageLoaded(true)
    }, [merchandise.images[0].src])

    useEffect(() => {
        const options = merchandise.options

        if (options && options.option.length > 0) {
            const allUSDRates = options.option.map(
                (option: any) => option.cost.USD
            )
            const allLKRRates = options.option.flatMap(
                (option: any) => option.cost.LKR
            )

            setLowestUSDRate(Math.min(...allUSDRates))
            setLowestLKRRate(Math.min(...allLKRRates))
        }
    }, [merchandise.options])

    return (
        <Suspense fallback={<BaseSkeleton />}>
        <Link
            href={`/merchandise/${encodeURIComponent(merchandise.id)}`}
            key={merchandise.id}
        >
            {imageLoaded ? (
                <div
                    className={`group relative flex ${width} h-[400px] flex-col items-center justify-center rounded-md border-[1px] bg-white transition-all`}
                >
                    <div className="relative flex h-72 w-full items-center justify-center overflow-hidden">
                        <BlurImage
                            src={merchandise.images[0].src}
                            alt={merchandise.images[0].alt}
                            objectFit="contain"
                            style="transition-all duration-500 group-hover:scale-110"
                        />
                    </div>
                    <div className="flex flex-1 flex-col items-center justify-center gap-1 py-6">
                        <p className="text-xs uppercase">
                            {merchandise.category.name}
                        </p>
                        <p className="px-2 text-center text-lg font-medium sm:text-xl">
                            {merchandise.name}
                        </p>
                        {merchandise.offer ? (
                            <div className="mt-2 flex items-center gap-2">
                                {local ? (
                                    <>
                                        <div className="relative inline-block">
                                            <div className="relative top-4 h-0 w-full rotate-[-14deg] border-t-2 border-red-600"></div>
                                            <p className="text-sm font-medium text-gray-500 sm:text-base">
                                                LKR {lowestLKRRate}
                                            </p>
                                        </div>
                                        <p className="text-lg font-medium text-blue-900 sm:text-xl">
                                            LKR{' '}
                                            {calcOffer(
                                                lowestLKRRate,
                                                merchandise.offer
                                            )}
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <div className="relative inline-block">
                                            <div className="relative top-4 h-0 w-full rotate-[-14deg] border-t-2 border-red-600"></div>
                                            <p className="text-sm font-medium text-gray-500 sm:text-base">
                                                USD ${lowestUSDRate}
                                            </p>
                                        </div>
                                        <p className="text-lg font-medium text-blue-900 sm:text-xl">
                                            USD $
                                            {calcOffer(
                                                lowestUSDRate,
                                                merchandise.offer
                                            )}
                                        </p>
                                    </>
                                )}
                            </div>
                        ) : (
                            <p className="mt-2 text-lg font-medium text-blue-900 sm:text-xl">
                                {local ? (
                                    <>LKR {lowestLKRRate}</>
                                ) : (
                                    <>USD ${lowestUSDRate}</>
                                )}
                            </p>
                        )}
                    </div>
                    {merchandise.offer && (
                        <div className="absolute right-1/2 top-0 translate-x-1/2 rounded-b-xl bg-green-500 px-4 py-1.5 text-xs font-semibold text-white">
                            {`${merchandise.offer}% OFF`}
                        </div>
                    )}
                </div>
            ) : (
                <BaseSkeleton />
            )}
        </Link></Suspense>
    )
}

export default MerchandiseCard
