import Head from 'next/head'
import { Metadata } from 'next'
import RentalContent from './rental-content'
import { RENTALS_SHORT_DESCRIPTION_TITLE } from '@/constants/pages/RentalPageConstants'

export const metadata: Metadata = {
    title: 'Rentals - ZRI Adventures',
    description: RENTALS_SHORT_DESCRIPTION_TITLE,
    icons: 'https://www.zriadventures.com/favicon.ico',
}

type Props = {
    params: {
        rentalId: string
    }
}

const Merchandise = ({ params: { rentalId } }: Props) => {
    return (
        <>
            <Head>
                <title>Rentals - ZRI Adventures</title>
                <meta
                    name="Rentals - ZRI Adventures"
                    content={RENTALS_SHORT_DESCRIPTION_TITLE}
                />
            </Head>
            <RentalContent rentalId={rentalId} />
        </>
    )
}

export default Merchandise
