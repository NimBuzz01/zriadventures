import SubHero from '@/components/common/sub-hero'
import React from 'react'
import MainInfo from './main-info'
import PageShortDescription from '@/components/common/page-shortdescription'
import RentalStore from './rental-store'
import {
    RENTALS_HERO_IMAGE,
    RENTALS_SHORT_DESCRIPTION_DESCRIPTION,
    RENTALS_SHORT_DESCRIPTION_TITLE,
} from '@/constants/pages/RentalPageConstants'
import Head from 'next/head'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Rentals - ZRI Adventures',
    description: RENTALS_SHORT_DESCRIPTION_TITLE,
    icons: 'https://www.zriadventures.com/favicon.ico',
}

const Rentals = () => {
    return (
        <main>
            <Head>
                <title>Rentals - ZRI Adventures</title>
                <meta
                    name="Rentals - ZRI Adventures"
                    content={RENTALS_SHORT_DESCRIPTION_TITLE}
                />
            </Head>
            <SubHero
                title="Rentals"
                image={RENTALS_HERO_IMAGE}
                fillColor="fill-gray-50"
            />
            <div className="w-full bg-gray-50">
                <PageShortDescription
                    title={RENTALS_SHORT_DESCRIPTION_TITLE}
                    description={RENTALS_SHORT_DESCRIPTION_DESCRIPTION}
                />
                <MainInfo />
                <RentalStore />
            </div>
        </main>
    )
}

export default Rentals
