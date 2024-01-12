import About from '@/app/landing/About'
import Testimonials from '@/app/landing/Testimonials'
import Merchandise from '@/app/landing/Merchandise'
import Experience from '@/app/landing/Experiences'
import Destinations from '@/app/landing/Destinations'
import Catalog from './landing/Banner'
import Hero from './landing/Hero'
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
