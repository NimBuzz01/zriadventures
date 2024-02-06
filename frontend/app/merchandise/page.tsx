import SubHero from '@/components/common/sub-hero'
import MerchandiseStore from './merchandise-store'
import PageShortDescription from '@/components/common/page-shortdescription'
import {
    MERCHANDISE_SHORT_DESCRIPTION_TITLE,
    MERCHANDISE_SHORT_DESCRIPTION_DESCRIPTION,
    MERCHANDISE_HERO_IMAGE,
} from '@/constants/pages/MerchandisePageConstants'
import Head from 'next/head'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Merchandise - ZRI Adventures',
    description: MERCHANDISE_SHORT_DESCRIPTION_TITLE,
    icons: 'https://www.zriadventures.com/favicon.ico',
}

export default function Merchandise() {
    return (
        <main>
            <Head>
                <title>Merchandise - ZRI Adventures</title>
                <meta
                    name="Merchandise - ZRI Adventures"
                    content={MERCHANDISE_SHORT_DESCRIPTION_TITLE}
                />
            </Head>
            <SubHero
                title="Merchandise"
                image={MERCHANDISE_HERO_IMAGE}
                fillColor="fill-gray-50"
            />
            <div className="w-full bg-gray-50">
                <PageShortDescription
                    title={MERCHANDISE_SHORT_DESCRIPTION_TITLE}
                    description={MERCHANDISE_SHORT_DESCRIPTION_DESCRIPTION}
                />
                <MerchandiseStore />
            </div>
        </main>
    )
}
