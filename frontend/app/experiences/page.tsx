import SubHero from '@/components/common/SubHero'
import Catalog from './Catalog'
import ExperienceStore from './ExperienceStore'
import PageShortDescription from '@/components/common/PageShortDescription'
import {
    EXPERIENCE_HERO_MAIN_TITLE,
    EXPERIENCE_HERO_IMAGE,
    EXPERIENCE_SHORT_DESCRIPTION_DESCRIPTION,
    EXPERIENCE_SHORT_DESCRIPTION_TITLE,
} from '@/constants/pages/ExperiencesPageConstants'
import ExperienceMap from './ExperienceMap'
import Activities from './Activities'
import PageEndContent from '@/components/common/PageEndContent'
import Head from 'next/head'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Experiences - ZRI Adventures',
    description: EXPERIENCE_SHORT_DESCRIPTION_TITLE,
    icons: 'https://www.zriadventures.com/favicon.ico',
}

export default function Experiences() {
    return (
        <main>
            <Head>
                <title>Experiences - ZRI Adventures</title>
                <meta
                    name="Experiences - ZRI Adventures"
                    content={EXPERIENCE_SHORT_DESCRIPTION_TITLE}
                />
            </Head>
            <SubHero
                title={EXPERIENCE_HERO_MAIN_TITLE}
                image={EXPERIENCE_HERO_IMAGE}
                fillColor="fill-gray-50"
            />
            <div className="w-full bg-gray-50">
                <PageShortDescription
                    title={EXPERIENCE_SHORT_DESCRIPTION_TITLE}
                    description={EXPERIENCE_SHORT_DESCRIPTION_DESCRIPTION}
                />
                {/* <Catalog /> */}
                {/* <Bundles /> */}
                <Activities />
                <ExperienceMap />
                <ExperienceStore />
                <PageEndContent />
            </div>
        </main>
    )
}
