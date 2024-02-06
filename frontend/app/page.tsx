import About from '@/app/landing/landing-about'
import Testimonials from '@/app/landing/landing-testimonials'
import Merchandise from '@/app/landing/landing-merchandise'
import Experience from '@/app/landing/landing-experiences'
import Destinations from '@/app/landing/landing-destinations'
import Catalog from './landing/landing-banner'
import Hero from './landing/landing-hero'
import Head from 'next/head'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'ZRI Adventures - Diving, Snorkeling, Rafting and other activities',
    description:
        'ZRI Adventures crafts unique experiences, from thrilling escapades to serene strolls, each time revealing a new facet of yourself. Your ultimate adventure awaits!',
    icons: 'https://www.zriadventures.com/favicon.ico',
}

export default function Home() {
    return (
        <main>
            <Head>
                <title>Welcome to ZRI Adventures</title>
                <meta
                    name="ZRI Adventures - Diving, Snorkeling, Rafting and other activities"
                    content="ZRI Adventures crafts unique experiences, from thrilling escapades to serene strolls, each time revealing a new facet of yourself. Your ultimate adventure awaits!"
                />
            </Head>
            <Hero />
            <Catalog />
            <Experience />
            <Destinations />
            <About />
            <Merchandise />
            <Testimonials />
        </main>
    )
}
