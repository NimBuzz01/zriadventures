import SubHero from '@/components/common/sub-hero'
import VoucherStore from './voucher-store'
import VoucherProvider from '@/contexts/voucher-context'
import PageShortDescription from '@/components/common/page-shortdescription'
import { ExperienceProvider } from '@/contexts/experience-context'
import {
    VOUCHER_HERO_IMAGE,
    VOUCHER_SHORT_DESCRIPTION_DESCRIPTION,
    VOUCHER_SHORT_DESCRIPTION_TITLE,
} from '@/constants/pages/VoucherPageConstants'
import MainInfo from './main-info'
import Head from 'next/head'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Gift Vouchers - ZRI Adventures',
    description: VOUCHER_SHORT_DESCRIPTION_TITLE,
    icons: 'https://www.zriadventures.com/favicon.ico',
}

export default function GiftVouchers() {
    return (
        <main>
            <Head>
                <title>Gift Vouchers - ZRI Adventures</title>
                <meta
                    name="Gift Vouchers - ZRI Adventures"
                    content={VOUCHER_SHORT_DESCRIPTION_TITLE}
                />
            </Head>
            <SubHero
                title="Gift Vouchers"
                image={VOUCHER_HERO_IMAGE}
                fillColor="fill-gray-50"
            />
            <div className="w-full bg-gray-50 py-16">
                <PageShortDescription
                    title={VOUCHER_SHORT_DESCRIPTION_TITLE}
                    description={VOUCHER_SHORT_DESCRIPTION_DESCRIPTION}
                />
            </div>
            <MainInfo />
            <div className="w-full bg-gray-50 py-16">
                <ExperienceProvider>
                    <VoucherProvider>
                        <VoucherStore />
                    </VoucherProvider>
                </ExperienceProvider>
            </div>
        </main>
    )
}
