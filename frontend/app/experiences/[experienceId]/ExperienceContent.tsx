'use client'
import React, { Suspense, lazy, useEffect, useState } from 'react'
import { ExperienceTypes } from '@/types/experienceTypes'
import { useDataContext } from '@/contexts/DataContext'
import { ExperienceProvider } from '@/contexts/ExperienceContext'
import NotFoundLabel from '@/components/NotFoundLabel'
import { EXPERIENCES_NOT_FOUND } from '@/constants/NotFoundConstants'
import {
    EXPERIENCE_NEARBY_EXPERIENCE_SUB_TITLE,
    EXPERIENCE_NEARBY_EXPERIENCE_MAIN_TITLE,
} from '@/constants/pages/ExperiencesPageConstants'

const SubHero = lazy(() => import('@/components/common/SubHero'))
const ExperienceCard = lazy(() => import('@/components/cards/ExperienceCard'))
const Carousel = lazy(() => import('@/components/carousels/Carousel'))
const MainHeader = lazy(() => import('@/components/common/MainHeader'))
const PageContent = lazy(() => import('./PageContent'))

const ExperienceContent = ({ experienceId }: { experienceId: string }) => {
    let { experiences } = useDataContext()
    const [loading, setLoading] = useState(true)
    const [nearbyExperiences, setNearbyExperiences] = useState<
        ExperienceTypes[]
    >([])

    const experience =
        experiences &&
        experiences.find((exp: ExperienceTypes) => exp.id === experienceId)

    useEffect(() => {
        if (experience) {
            const nearbyExps = experiences.filter(
                (exp: ExperienceTypes) =>
                    exp.location.id === experience.location.id
            )
            setNearbyExperiences(nearbyExps)
            setLoading(false)
        }
    }, [experience])

    if (loading) {
        return (
            <div className="h-screen w-full">
                <NotFoundLabel text="Loading..." loading />
            </div>
        )
    }

    return (
        <Suspense
            fallback={
                <div className="h-screen w-full">
                    <NotFoundLabel text="Loading..." loading />
                </div>
            }
        >
            <ExperienceProvider>
                {experience ? (
                    <>
                        <SubHero
                            title={experience.name}
                            image={experience.images.map((image) => image.src)}
                            fillColor="fill-gray-50"
                        />
                        <PageContent experience={experience} />
                        {nearbyExperiences.length > 0 && (
                            <div className="relative flex flex-col items-center justify-center gap-10 bg-gradient-to-r from-cyan-100 to-blue-50 px-2 py-16">
                                <MainHeader
                                    subtitle={
                                        EXPERIENCE_NEARBY_EXPERIENCE_SUB_TITLE
                                    }
                                    title={
                                        EXPERIENCE_NEARBY_EXPERIENCE_MAIN_TITLE
                                    }
                                />
                                <div className="z-10 w-full sm:w-[90%]">
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
                                        {nearbyExperiences.map(
                                            (experience: ExperienceTypes) => (
                                                <ExperienceCard
                                                    key={experience.id}
                                                    experience={experience}
                                                />
                                            )
                                        )}
                                    </Carousel>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="h-screen w-full">
                        <NotFoundLabel
                            text={'Sorry! The experience does not exist.'}
                        />
                    </div>
                )}
            </ExperienceProvider>
        </Suspense>
    )
}

export default ExperienceContent
