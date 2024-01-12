import SubHero from '@/components/common/SubHero'
import WhoAreWe from './WhoAreWe'
import VissionMission from './VissionMission'
import Awards from './Awards'
import ZRIProcess from './ZRIProcess'
import Memberships from './Memberships'
import Sustainability from './Sustainability'
import {
    ABOUT_CUSTOMERS_NUMBER,
    ABOUT_CUSTOMERS_TEXT,
    ABOUT_HERO_BG_IMAGE,
    ABOUT_HERO_MAIN_TITLE,
    ABOUT_LOCATIONS_NUMBER,
    ABOUT_LOCATIONS_TEXT,
    ABOUT_MILES_NUMBER,
    ABOUT_MILES_TEXT,
} from '@/constants/pages/AboutPageConstants'
import WhyChoose from './WhyChoose'
import Head from 'next/head'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'About - ZRI Adventures',
    description:
        'ZRI Adventures crafts unique experiences, from thrilling escapades to serene strolls, each time revealing a new facet of yourself. Your ultimate adventure awaits!',
    icons: 'https://www.zriadventures.com/favicon.ico',
}

const About = () => {
    return (
        <main>
            <Head>
                <title>About - ZRI Adventures</title>
                <meta
                    name="About - ZRI Adventures"
                    content="ZRI Adventures crafts unique experiences, from thrilling escapades to serene strolls, each time revealing a new facet of yourself. Your ultimate adventure awaits!"
                />
            </Head>
            <SubHero
                title={ABOUT_HERO_MAIN_TITLE}
                image={ABOUT_HERO_BG_IMAGE}
            />
            <div className="flex flex-col items-center justify-center">
                <WhoAreWe />
                <div className="relative flex w-full max-w-[1000px] flex-wrap items-center justify-between gap-10 px-10 pb-4 sm:w-[90%] sm:py-16 sm:pb-16">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl font-bold uppercase text-blue-950 sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                            {ABOUT_LOCATIONS_NUMBER}
                        </h1>
                        <p className="text-md font-medium uppercase text-blue-950 sm:text-xl">
                            {ABOUT_LOCATIONS_TEXT}
                        </p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl font-bold uppercase text-blue-950 sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                            {ABOUT_MILES_NUMBER}
                        </h1>
                        <p className="text-md font-medium uppercase text-blue-950 sm:text-xl">
                            {ABOUT_MILES_TEXT}
                        </p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl font-bold uppercase text-blue-950 sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                            {ABOUT_CUSTOMERS_NUMBER}
                        </h1>
                        <p className="text-md font-medium uppercase text-blue-950 sm:text-xl">
                            {ABOUT_CUSTOMERS_TEXT}
                        </p>
                    </div>
                </div>
                <Sustainability />
                <VissionMission />
                <WhyChoose />
                <Awards />
                <ZRIProcess />
                <Memberships />
            </div>
        </main>
    )
}

export default About
