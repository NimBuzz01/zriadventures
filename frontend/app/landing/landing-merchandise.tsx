'use client'
import MerchandiseCard from '../../components/cards/merchandise-card'
import MainButton from '../../components/common/main-button'
import Carousel from '@/components/carousels/card-carousel'
import {
    LANDING_MERCHANDISE_BUTTON,
    LANDING_MERCHANDISE_BUTTON_URL,
    LANDING_MERCHANDISE_MAIN_TITLE,
    LANDING_MERCHANDISE_SUB_TITLE,
} from '@/constants/pages/LandingPageConstants'
import MainHeader from '@/components/common/main-header'
import { useDataContext } from '@/contexts/data-context'
import NotFoundLabel from '@/components/notfound-label'
import { MERCHANDISE_NOT_FOUND } from '@/constants/NotFoundConstants'
import SVGWave from '@/components/common/svg-wave'
import { MerchandiseTypes } from '@/lib/types/merchandise-types'
import Loading from '@/components/loading'
import { Suspense, useEffect, useState } from 'react'

const Merchandise = () => {
    const [trendingMerchandise, setTrendingMerchandise] = useState<
        MerchandiseTypes[] | null
    >(null)

    const { merchandise } = useDataContext()

    useEffect(() => {
        const trendingMerchandise = merchandise.filter(
            (merchandise: MerchandiseTypes) => merchandise.trending
        )
        if (merchandise.length > 0) {
            setTrendingMerchandise(trendingMerchandise)
        }
    }, [merchandise])

    return (
        <div className="relative flex flex-col items-center justify-center gap-10 bg-gradient-to-r from-cyan-100 to-blue-50 px-6 py-16">
            <MainHeader
                subtitle={LANDING_MERCHANDISE_SUB_TITLE}
                title={LANDING_MERCHANDISE_MAIN_TITLE}
            />
            <div className="z-10 flex w-full flex-col items-center justify-center sm:w-[90%]">
                <Suspense fallback={<Loading />}>
                    {trendingMerchandise === null ? (
                        <Loading />
                    ) : trendingMerchandise.length > 0 ? (
                        <Carousel
                            perView={1.1}
                            sm={1.9}
                            md={2.3}
                            lg={3.1}
                            xl={4}
                            xl2={5.1}
                            spacing={10}
                            arrows
                            dots
                        >
                            {trendingMerchandise.map((merchandise) => (
                                <MerchandiseCard
                                    key={merchandise.id}
                                    merchandise={merchandise}
                                />
                            ))}
                        </Carousel>
                    ) : (
                        <NotFoundLabel text={MERCHANDISE_NOT_FOUND} />
                    )}
                </Suspense>
            </div>
            <MainButton
                href={LANDING_MERCHANDISE_BUTTON_URL}
                text={LANDING_MERCHANDISE_BUTTON}
                style="z-10"
            />
            <div className="w-full sm:h-10 md:h-20 "></div>
            <SVGWave fillColor="fill-gray-50" />
        </div>
    )
}

export default Merchandise
