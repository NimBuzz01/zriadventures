'use client'
import { ExperienceTypes } from '@/types/experienceTypes'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { BiTimeFive } from 'react-icons/bi'
import { BsArrowRight } from 'react-icons/bs'
import { MdLocationOn } from 'react-icons/md'
import { calcOffer } from '@/lib/utils/func'
import BaseSkeleton from '../skeletons/BaseSkeleton'
import BlurImage from '../common/BlurImage'
import { useLocal } from '@/contexts/SetLocalContext'

interface Props {
    experience: ExperienceTypes
    width?: string
}

const ExperienceCard = ({ experience, width = 'w-full' }: Props) => {
    const [imageLoaded, setImageLoaded] = useState(false)
    const { local } = useLocal()

    const [lowestUSDRate, setLowestUSDRate] = useState(0)
    const [lowestLKRRate, setLowestLKRRate] = useState(0)

    useEffect(() => {
        const img = new Image()
        img.src = experience.images[0].src
        if (experience.images[0].src) {
            img.onload = () => setImageLoaded(true)
        } else {
            setImageLoaded(true)
        }
    }, [experience.images[0].src])

    useEffect(() => {
        const options = experience.options

        if (options && options.length > 0) {
            const allUSDRates = options.flatMap((option: any) =>
                option.paxRates.map((rate: any) => rate.rates.USD)
            )
            const allLKRRates = options.flatMap((option: any) =>
                option.paxRates.map((rate: any) => rate.rates.LKR)
            )

            setLowestUSDRate(Math.min(...allUSDRates))
            setLowestLKRRate(Math.min(...allLKRRates))
        }
    }, [experience.options])

    return (
        <Link
            href={`/experiences/${encodeURIComponent(experience.id)}`}
            key={experience.id}
        >
            {imageLoaded ? (
                <div className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-md hover:shadow-black/30 ">
                    <div className={`relative h-96 ${width}`}>
                        <BlurImage
                            src={experience.images[0].src}
                            alt={experience.images[0].alt}
                            objectFit="cover"
                            style="transition-transform duration-500 group-hover:scale-125"
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70 sm:bg-transparent"></div>
                    <div className="absolute inset-0 flex justify-between p-3 text-white">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-1">
                                <MdLocationOn />{' '}
                                <p className="text-xs font-light sm:text-sm">
                                    {experience.location.name}
                                </p>
                            </div>
                            <div className="flex items-center gap-1">
                                <BiTimeFive />{' '}
                                <p className="text-xs font-light sm:text-sm">
                                    {experience.options[0].duration.amount}{' '}
                                    {experience.options[0].duration.type} +
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-xs font-light">FROM</p>
                            <p className="font-semibold md:text-lg">
                                {local ? (
                                    <>
                                        LKR{' '}
                                        {experience.offer
                                            ? calcOffer(
                                                  lowestLKRRate,
                                                  experience.offer
                                              )
                                            : lowestLKRRate}{' '}
                                        <span className="text-xs font-light">
                                            PP
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        USD $
                                        {experience.offer
                                            ? calcOffer(
                                                  lowestUSDRate,
                                                  experience.offer
                                              )
                                            : lowestUSDRate}{' '}
                                        <span className="text-xs font-light">
                                            PP
                                        </span>
                                    </>
                                )}
                            </p>
                        </div>
                        {Boolean(experience.offer) && (
                            <div className="absolute right-1/2 top-0 translate-x-1/2 rounded-b-xl bg-green-500 px-4 py-1.5 text-xs font-semibold text-white">
                                {`${experience.offer}% OFF`}
                            </div>
                        )}
                    </div>
                    <div className="absolute inset-0 flex translate-y-[42%] flex-col items-start justify-center px-3 transition-all duration-500 group-hover:translate-y-[37%]">
                        <p className="text-xs font-medium uppercase text-white">
                            {experience.bundle ? (
                                <>BUNDLE</>
                            ) : (
                                experience.category[0].name
                            )}
                        </p>
                        <h1 className="font-medium text-white md:text-lg">
                            {experience.name}
                        </h1>
                        <p className="flex items-center gap-2 text-sm font-light italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            View{' '}
                            {experience.bundle ? <>Bundle</> : <>Experience</>}{' '}
                            <BsArrowRight />
                        </p>
                    </div>
                </div>
            ) : (
                <BaseSkeleton />
            )}
        </Link>
    )
}

export default ExperienceCard
