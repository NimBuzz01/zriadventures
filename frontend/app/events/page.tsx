import PageShortDescription from '@/components/common/page-shortdescription'
import SubHero from '@/components/common/sub-hero'
import React from 'react'
import UpcomingEvent from './upcoming-event'
import AllEvents from './all-events'
import {
    EVENTS_SHORT_DESCRIPTION_TITLE,
    EVENTS_SHORT_DESCRIPTION_DESCRIPTION,
    EVENTS_HERO_IMAGE,
    EVENTS_HERO_MAIN_TITLE,
} from '@/constants/pages/EventsPageConstants'
import Head from 'next/head'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Events - ZRI Adventures',
    description: EVENTS_SHORT_DESCRIPTION_TITLE,
    icons: 'https://www.zriadventures.com/favicon.ico',
}

const Events = () => {
    return (
        <main>
            <Head>
                <title>Events - ZRI Adventures</title>
                <meta
                    name="Events - ZRI Adventures"
                    content={EVENTS_SHORT_DESCRIPTION_TITLE}
                />
            </Head>
            <SubHero
                title={EVENTS_HERO_MAIN_TITLE}
                image={EVENTS_HERO_IMAGE}
                fillColor="fill-gray-50"
            />
            <div className="w-full bg-gray-50">
                <PageShortDescription
                    title={EVENTS_SHORT_DESCRIPTION_TITLE}
                    description={EVENTS_SHORT_DESCRIPTION_DESCRIPTION}
                />
                <UpcomingEvent />
                <AllEvents />
            </div>
        </main>
    )
}

export default Events
