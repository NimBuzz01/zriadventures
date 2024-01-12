'use client'
import DestinationCard from './cards/DestinationCard'
import MainButton from '../../components/common/MainButton'
import Carousel from '@/components/carousels/Carousel'
import {
    LANDING_DESTINATIONS_BUTTON,
    LANDING_DESTINATIONS_BUTTON_URL,
    LANDING_DESTINATIONS_MAIN_TITLE,
    LANDING_DESTINATIONS_SUB_TITLE,
} from '@/constants/pages/LandingPageConstants'
import MainHeader from '@/components/common/MainHeader'
import { ExperienceLocation } from '@/types/experienceTypes'
import NotFoundLabel from '@/components/NotFoundLabel'
import { DESTINATIONS_NOT_FOUND } from '@/constants/NotFoundConstants'
import { useEffect, useState } from 'react'
import { getExperienceLocationData } from '@/lib/data/ExperienceData'

const Destinations = () => {
    const [locations, setLocations] = useState<ExperienceLocation[]>([])

    useEffect(() => {
        async function fetchData() {
            try {
                const mappedLocations = await getExperienceLocationData()
                const trendingDestinations = mappedLocations.filter(
                    (location: ExperienceLocation) => location.trending
                )
                setLocations(trendingDestinations)
            } catch (error) {
                console.error('Error fetching and mapping data:', error)
            }
        }

        fetchData()
    }, [])

    return (
        <div className="flex flex-col items-center justify-center gap-10 px-6 py-16 bg-gray-50">
            <MainHeader
                subtitle={LANDING_DESTINATIONS_SUB_TITLE}
                title={LANDING_DESTINATIONS_MAIN_TITLE}
            />
            <div className="w-full sm:w-[90%]">
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
                        {locations.map(
                            (location, index: number) => (
                                <DestinationCard
                                    key={index}
                                    name={location.name}
                                    description={
                                        location.description
                                    }
                                    href={
                                        '/experiences?destination=' +
                                        location.id +
                                        '#experience-store-items'
                                    }
                                    src={location.image.src}
                                    alt={location.image.alt}
                                />
                            )
                        )}
                    </Carousel>
                ) : (
                    <NotFoundLabel text={DESTINATIONS_NOT_FOUND} />
                )}
            </div>

            <MainButton
                href={LANDING_DESTINATIONS_BUTTON_URL}
                text={LANDING_DESTINATIONS_BUTTON}
            />
        </div>
    )
}

export default Destinations
