import React from 'react'
import Head from 'next/head'
import { EVENTS_SHORT_DESCRIPTION_TITLE } from '@/constants/pages/EventsPageConstants'
import { Metadata } from 'next'
import EventContent from './EventContent'

export const metadata: Metadata = {
    title: 'Events - ZRI Adventures',
    description: EVENTS_SHORT_DESCRIPTION_TITLE,
    icons: 'https://www.zriadventures.com/favicon.ico',
}

type Props = {
    params: {
        eventId: string
    }
}

const Event = ({ params: { eventId } }: Props) => {
    return (
        <>
            <Head>
                <title>Events - ZRI Adventures</title>
                <meta
                    name="Events - ZRI Adventures"
                    content={EVENTS_SHORT_DESCRIPTION_TITLE}
                />
            </Head>
            <EventContent eventId={eventId} />
        </>
    )
}

export default Event
