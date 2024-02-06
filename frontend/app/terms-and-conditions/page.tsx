import SubHero from '@/components/common/sub-hero'
import React from 'react'
import MainContent from './main-content'
import Head from 'next/head'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Terms and Conditions - ZRI Adventures',
    description:
        'ZRI Adventures crafts unique experiences, from thrilling escapades to serene strolls, each time revealing a new facet of yourself. Your ultimate adventure awaits!',
    icons: 'https://www.zriadventures.com/favicon.ico',
}

const TermsAndConditions = () => {
    return (
        <main>
            <Head>
                <title>Terms and Conditions - ZRI Adventures</title>
                <meta
                    name="Terms and Conditions - ZRI Adventures"
                    content="ZRI Adventures crafts unique experiences, from thrilling escapades to serene strolls, each time revealing a new facet of yourself. Your ultimate adventure awaits!"
                />
            </Head>
            <SubHero
                title="Terms and Conditions"
                image={['/images/hot-air-baloon-ride.jpg']}
                fillColor="fill-gray-50"
            />
            <MainContent />
        </main>
    )
}

export default TermsAndConditions
