import MainHeader from '@/components/common/MainHeader'
import React from 'react'
import InfoCard from './InfoCard'
import {
    RENTAL_INFO_CARD,
    RENTAL_MAIN_TITLE,
    RENTAL_SUB_TITLE,
    RENTAL_THINGS_TO_CONSIDER,
} from '@/constants/pages/RentalPageConstants'
import BlurImage from '@/components/common/BlurImage'
import Link from 'next/link'

const MainInfo = () => {
    return (
        <div className="py-16">
            <MainHeader subtitle={RENTAL_MAIN_TITLE} title={RENTAL_SUB_TITLE} />
            <div className="flex flex-wrap items-center justify-center gap-10 px-4 sm:px-10">
                {RENTAL_INFO_CARD.map((rental, index) => (
                    <InfoCard
                        key={index}
                        number={rental.number}
                        src={rental.image}
                        alt={rental.title}
                        title={rental.title}
                        description={rental.description}
                    />
                ))}
            </div>
            <div className="flex w-full flex-col items-center justify-center px-4 py-20 text-center sm:px-10">
                <MainHeader
                    subtitle="Know your info"
                    title="Important Things to Consider"
                />
                <p className="text-gray-500 sm:text-xl">
                    We would be needing the following documents before we rent
                    out to you.
                </p>
                <div className="flex w-full max-w-[1200px] flex-col justify-center gap-10 py-10 lg:flex-row">
                    {RENTAL_THINGS_TO_CONSIDER.map((data, index) => (
                        <div
                            key={index}
                            className="flex w-full flex-col items-center gap-2 lg:w-1/3"
                        >
                            <div className="relative h-16 w-16">
                                <BlurImage
                                    src={data.image}
                                    alt={data.title}
                                    objectFit="contain"
                                />
                            </div>
                            <p className="text-gray-500">{data.title}</p>
                        </div>
                    ))}
                </div>
                <p className="text-gray-500 sm:text-lg">
                    We will not be able to process your order if you do not have
                    a valid proof of address or ID. Please read the rest of the
                    terms and conditions{' '}
                    <Link
                        href={'/terms-and-conditions#tnc-rentals'}
                        className="text-blue-600 transition-all hover:text-blue-800"
                    >
                        here
                    </Link>
                    .
                </p>
            </div>
        </div>
    )
}

export default MainInfo
