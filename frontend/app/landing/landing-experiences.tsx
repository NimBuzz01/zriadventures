'use client'
import ExperienceCard from '../../components/cards/experience-card'
import Carousel from '@/components/carousels/card-carousel'
import {
    LANDING_TRENDING_BUTTON,
    LANDING_TRENDING_BUTTON_URL,
    LANDING_TRENDING_MAIN_TITLE,
    LANDING_TRENDING_SUB_TITLE,
} from '@/constants/pages/LandingPageConstants'
import MainHeader from '@/components/common/main-header'
import { useDataContext } from '@/contexts/data-context'
import NotFoundLabel from '@/components/notfound-label'
import MainButton from '../../components/common/main-button'
import { EXPERIENCES_NOT_FOUND } from '@/constants/NotFoundConstants'
import SVGWave from '@/components/common/svg-wave'
import { ExperienceTypes } from '@/lib/types/experience-types'
import { Suspense, useEffect, useState } from 'react'
import Loading from '@/components/loading'

const Experience = () => {
    const [trendingExperiences, setTrendingExperiences] = useState<
        ExperienceTypes[] | null
    >(null)

    const { experiences } = useDataContext()

    useEffect(() => {
        const trendingExperiences = experiences.filter(
            (experience: ExperienceTypes) => experience.trending
        )

        if (experiences.length > 0) {
            setTrendingExperiences(trendingExperiences)
        }
    }, [experiences])

    return (
        <div className="relative flex flex-col items-center justify-center gap-10 bg-gradient-to-r from-cyan-100 to-blue-50 px-4 py-16">
            <MainHeader
                subtitle={LANDING_TRENDING_SUB_TITLE}
                title={LANDING_TRENDING_MAIN_TITLE}
            />
            <div className="z-10 w-full sm:w-[90%]">
                <Suspense fallback={<Loading />}>
                    {trendingExperiences === null ? (
                        <Loading />
                    ) : trendingExperiences.length > 0 ? (
                        <Carousel
                            perView={1}
                            sm={1.55}
                            md={1.8}
                            lg={2.5}
                            xl={3.1}
                            xl2={3.8}
                            spacing={10}
                            arrows
                            dots
                        >
                            {trendingExperiences.map(
                                (experience: ExperienceTypes) => (
                                    <ExperienceCard
                                        key={experience.id}
                                        experience={experience}
                                    />
                                )
                            )}
                        </Carousel>
                    ) : (
                        <NotFoundLabel text={EXPERIENCES_NOT_FOUND} />
                    )}
                </Suspense>
            </div>
            <MainButton
                href={LANDING_TRENDING_BUTTON_URL}
                text={LANDING_TRENDING_BUTTON}
                style="z-10"
            />
            <div className="w-full sm:h-10 md:h-20 "></div>
            <SVGWave fillColor="fill-gray-50" />
        </div>
    )
}

export default Experience
