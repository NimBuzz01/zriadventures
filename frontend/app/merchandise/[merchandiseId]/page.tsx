import Head from 'next/head'
import { Metadata } from 'next'
import MerchandiseContent from './merchandise-content'
import { MERCHANDISE_SHORT_DESCRIPTION_TITLE } from '@/constants/pages/MerchandisePageConstants'

export const metadata: Metadata = {
    title: 'Merchandise - ZRI Adventures',
    description: MERCHANDISE_SHORT_DESCRIPTION_TITLE,
    icons: 'https://www.zriadventures.com/favicon.ico',
}

type Props = {
    params: {
        merchandiseId: string
    }
}

const Merchandise = ({ params: { merchandiseId } }: Props) => {
    return (
        <>
            <Head>
                <title>Merchandise - ZRI Adventures</title>
                <meta
                    name="Merchandise - ZRI Adventures"
                    content={MERCHANDISE_SHORT_DESCRIPTION_TITLE}
                />
            </Head>
            <MerchandiseContent merchandiseId={merchandiseId} />
        </>
    )
}

export default Merchandise
