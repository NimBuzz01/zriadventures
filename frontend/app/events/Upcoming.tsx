'use client'
import NotFoundLabel from '@/components/NotFoundLabel'
import BlurImage from '@/components/common/BlurImage'
import MainButton from '@/components/common/MainButton'
import MainHeader from '@/components/common/MainHeader'
import { useDataContext } from '@/contexts/DataContext'
import { formatDate } from '@/lib/utils/func'
import React from 'react'
import { AiFillClockCircle } from 'react-icons/ai'
import { BsClockHistory, BsFillCalendarWeekFill } from 'react-icons/bs'
import { FaUserFriends } from 'react-icons/fa'
import { IoLocationSharp } from 'react-icons/io5'

const Upcoming = () => {
    const { events } = useDataContext()

    // Get the current date
    const currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0) // Set time to midnight

    const upcomingEvents = events.filter((event) => {
        const eventStartDate = new Date(event.startDate)
        return eventStartDate > currentDate // Filter events that are after the current date
    })

    upcomingEvents.sort((a, b) => {
        const dateA = new Date(a.startDate)
        const dateB = new Date(b.startDate)
        return dateA.getTime() - dateB.getTime() // Sort events based on their start dates
    })

    // Determine which event to show
    let eventToShow = upcomingEvents.length > 0 ? upcomingEvents[0] : null

    if (!eventToShow) {
        const recentEvents = events.filter((event) => {
            const eventEndDate = new Date(event.endDate)
            return eventEndDate < currentDate // Filter events that are before the current date
        })

        recentEvents.sort((a, b) => {
            const dateA = new Date(a.endDate)
            const dateB = new Date(b.endDate)
            return dateB.getTime() - dateA.getTime() // Sort events based on their end dates
        })

        eventToShow = recentEvents.length > 0 ? recentEvents[0] : null
    }

    let timeInfo = ''
    if (eventToShow) {
        const startDate = new Date(eventToShow.startDate)
        startDate.setHours(0, 0, 0, 0) // Set time to midnight

        const timeDiff = startDate.getTime() - currentDate.getTime() // Get the time difference in milliseconds

        const dayDiff = Math.floor(timeDiff / (24 * 60 * 60 * 1000)) // Calculate the difference in days

        if (dayDiff === 0) {
            timeInfo = 'Today'
        } else if (dayDiff === 1) {
            timeInfo = 'Tomorrow'
        } else if (dayDiff === -1) {
            timeInfo = 'Yesterday'
        } else if (dayDiff > 0) {
            timeInfo = `${dayDiff} days to go`
        } else {
            timeInfo = `${Math.abs(dayDiff)} days ago`
        }
    }

    return (
        <div className="flex min-h-screen w-full flex-col items-center bg-blue-50 py-16">
            <MainHeader subtitle="Whats new" title="Upcoming Event" />
            {eventToShow ? (
                <div
                    className="flex min-h-[700px] w-full max-w-[1300px] flex-col lg:w-[90%] lg:flex-row"
                    key={eventToShow.id}
                >
                    <div className="flex w-full flex-col justify-center bg-white p-10 lg:w-1/2">
                        <h1 className="mb-2 text-3xl font-semibold uppercase text-blue-900 md:text-4xl xl:text-5xl">
                            {eventToShow.name}
                        </h1>
                        <div className="mb-10 flex items-center gap-4 text-xl text-gray-500 md:text-2xl">
                            <BsClockHistory /> {timeInfo}
                        </div>
                        <p className="mb-4">
                            {eventToShow.about.shortDescription}
                        </p>
                        <div className="mb-10 flex grid-cols-2 grid-rows-2 flex-col gap-4 text-sm text-blue-950 sm:text-base md:grid">
                            <div className="flex items-center gap-2 font-medium">
                                <IoLocationSharp className="text-xl" />{' '}
                                {eventToShow.location.name}
                            </div>
                            <div className="flex items-center gap-2 font-medium">
                                <BsFillCalendarWeekFill className="text-xl" />{' '}
                                {formatDate(eventToShow.startDate)}
                            </div>
                            <div className="flex items-center gap-2 font-medium">
                                <FaUserFriends className="text-xl" />
                                {eventToShow.groupSize} People
                            </div>
                            <div className="flex items-center gap-2 font-medium">
                                <AiFillClockCircle className="text-xl" />
                                {eventToShow.duration.amount}{' '}
                                {eventToShow.duration.type}
                            </div>
                        </div>
                        <div className="flex w-full">
                            <MainButton
                                href={`/events/${eventToShow.id}`}
                                text="Explore Event"
                            />
                        </div>
                    </div>
                    <div className="relative min-h-[400px] w-full lg:w-1/2">
                        <BlurImage
                            src={eventToShow.images[0].src}
                            alt={eventToShow.images[0].alt}
                            objectFit="cover"
                        />
                    </div>
                </div>
            ) : (
                <>
                    <NotFoundLabel text="No Upcoming Events Found!" />
                </>
            )}
        </div>
    )
}

export default Upcoming
