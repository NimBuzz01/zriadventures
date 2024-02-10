import { Metadata } from 'next'
import Head from 'next/head'
import React from 'react'
import ReservationContent from './reservation-content'

export const metadata: Metadata = {
    title: 'Reservation - ZRI Adventures',
    description: 'Reservation - ZRI Adventures',
    icons: 'https://www.zriadventures.com/favicon.ico',
}

const page = () => {
    return (
        <main>
            <Head>
                <title>Reservation - ZRI Adventures</title>
                <meta
                    name="Reservation - ZRI Adventures"
                    content="Reservation - ZRI Adventures"
                />
            </Head>
            <ReservationContent />
        </main>
    )
}

export default page
