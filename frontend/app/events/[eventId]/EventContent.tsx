'use client'
import NotFoundLabel from '@/components/NotFoundLabel'
import { useDataContext } from '@/contexts/DataContext'
import { EventTypes } from '@/types/eventTypes'
import { Suspense, lazy, useEffect, useState } from 'react'

const SubHero = lazy(() => import('@/components/common/SubHero'))
const PageContent = lazy(() => import('./PageContent'))

const EventContent = ({ eventId }: { eventId: string }) => {
    let { events } = useDataContext()
    const [loading, setLoading] = useState(true)

    const event =
        events && events.find((event: EventTypes) => event.id === eventId)

    useEffect(() => {
        if (event) {
            setLoading(false)
        }
    }, [event])

    if (loading) {
        return (
            <div className="h-screen w-full">
                <NotFoundLabel text="Loading..." loading />
            </div>
        )
    }

    return (
        <Suspense
            fallback={
                <div className="h-screen w-full">
                    <NotFoundLabel text="Loading..." loading />
                </div>
            }
        >
            {event ? (
                <>
                    <SubHero
                        title={event.name}
                        image={event.images.map((image) => image.src)}
                        fillColor="fill-gray-50"
                    />
                    <PageContent event={event} />
                </>
            ) : (
                <div className="h-screen w-full">
                    <NotFoundLabel text={'Sorry! The event does not exist.'} />
                </div>
            )}
        </Suspense>
    )
}

export default EventContent
