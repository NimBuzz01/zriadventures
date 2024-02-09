'use client'
import DestinationCard from './cards/destination-card'
import MainButton from '../../components/common/main-button'
import Carousel from '@/components/carousels/card-carousel'
import {
    LANDING_DESTINATIONS_BUTTON,
    LANDING_DESTINATIONS_BUTTON_URL,
    LANDING_DESTINATIONS_MAIN_TITLE,
    LANDING_DESTINATIONS_SUB_TITLE,
} from '@/constants/pages/LandingPageConstants'
import MainHeader from '@/components/common/main-header'
import NotFoundLabel from '@/components/notfound-label'
import { DESTINATIONS_NOT_FOUND } from '@/constants/NotFoundConstants'
import { Suspense, useEffect, useState } from 'react'
import { getExperienceLocationData } from '@/lib/data/experience-data'
import { Location } from '@/lib/types/common-types'
import Loading from '@/components/loading'

const Destinations = () => {
    const [locations, setLocations] = useState<Location[]>([])

    useEffect(() => {
        async function fetchData() {
            try {
                const mappedLocations = await getExperienceLocationData()
                const trendingDestinations = mappedLocations.filter(
                    (location: Location) => location.trending
                )
                setLocations(trendingDestinations)
            } catch (error) {
                console.error('Error fetching and mapping data:', error)
            }
        }

        fetchData()
    }, [])

    return (
        <div className="flex flex-col items-center justify-center gap-10 bg-gray-50 px-6 py-16">
            <MainHeader
                subtitle={LANDING_DESTINATIONS_SUB_TITLE}
                title={LANDING_DESTINATIONS_MAIN_TITLE}
            />
            <div className="w-full sm:w-[90%]">
                <Suspense fallback={<Loading />}>
                    {locations.length > 0 ? (
                        <Carousel
                            perView={1}
                            sm={1.5}
                            md={2.2}
                            lg={2.8}
                            xl={3.4}
                            xl2={4.3}
                            spacing={10}
                            dots
                            arrows
                        >
                            {locations.map((location, index: number) => (
                                <DestinationCard
                                    key={index}
                                    name={location.name}
                                    description={location.description}
                                    href={
                                        '/experiences?destination=' +
                                        location.id +
                                        '#experience-store-items'
                                    }
                                    src={location.image.src}
                                    alt={location.image.alt}
                                />
                            ))}
                        </Carousel>
                    ) : (
                        <NotFoundLabel text={DESTINATIONS_NOT_FOUND} />
                    )}
                </Suspense>
            </div>

            <MainButton
                href={LANDING_DESTINATIONS_BUTTON_URL}
                text={LANDING_DESTINATIONS_BUTTON}
            />
        </div>
    )
}

export default Destinations
