'use client'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { BiTimeFive } from 'react-icons/bi'
import { BsArrowRight, BsFillCalendarWeekFill } from 'react-icons/bs'
import { MdLocationOn } from 'react-icons/md'
import BaseSkeleton from '../skeletons/base-skeleton'
import BlurImage from '../common/blur-image'
import { useLocal } from '@/contexts/local-context'
import { EventTypes } from '@/lib/types/event-types'
import { formatDate } from '@/lib/utils'

interface Props {
    event: EventTypes
    width?: string
}

const EventCard = ({ event, width = 'w-full' }: Props) => {
    const [imageLoaded, setImageLoaded] = useState(false)
    const { local } = useLocal()

    useEffect(() => {
        const img = new Image()
        img.src = event.images[0].src
        img.onload = () => setImageLoaded(true)
    }, [event.images[0].src])

    return (
        <Link href={`/events/${encodeURIComponent(event.id)}`} key={event.id}>
            {imageLoaded ? (
                <div className="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-md hover:shadow-black/30 ">
                    <div className={`relative h-96 ${width}`}>
                        <BlurImage
                            src={event.images[0].src}
                            alt={event.images[0].alt}
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
                                    {event.location.name}
                                </p>
                            </div>
                            <div className="flex items-center gap-1">
                                <BiTimeFive />{' '}
                                <p className="text-xs font-light sm:text-sm">
                                    {event.duration.amount}{' '}
                                    {event.duration.type}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-xs font-light">FROM</p>
                            <p className="font-semibold md:text-lg">
                                {local ? (
                                    <>
                                        LKR {event.cost.LKR}{' '}
                                        <span className="text-xs font-light">
                                            PP
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        USD ${event.cost.USD}{' '}
                                        <span className="text-xs font-light">
                                            PP
                                        </span>
                                    </>
                                )}
                            </p>
                        </div>
                    </div>
                    <div className="absolute right-1/2 top-0 translate-x-1/2 rounded-b-xl bg-green-500 px-4 py-1.5 text-xs font-semibold text-white">
                        EVENT
                    </div>
                    <div className="absolute inset-0 flex translate-y-[42%] flex-col items-start justify-center px-3 transition-all duration-500 group-hover:translate-y-[37%]">
                        <p className="flex items-center gap-2 text-xs uppercase text-white">
                            {new Date(event.startDate) < new Date() ? (
                                'Event Ended'
                            ) : (
                                <>
                                    <BsFillCalendarWeekFill />{' '}
                                    {formatDate(event.startDate)}
                                </>
                            )}
                        </p>
                        <h1 className="font-medium text-white md:text-lg">
                            {event.name}
                        </h1>
                        <p className="flex items-center gap-2 text-sm font-light italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            View Event <BsArrowRight />
                        </p>
                    </div>
                </div>
            ) : (
                <BaseSkeleton />
            )}
        </Link>
    )
}

export default EventCard
