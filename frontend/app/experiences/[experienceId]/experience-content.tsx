'use client'
import React, { Suspense, lazy, useEffect, useState } from 'react'
import { useDataContext } from '@/contexts/data-context'
import NotFoundLabel from '@/components/notfound-label'
import {
    EXPERIENCE_NEARBY_EXPERIENCE_SUB_TITLE,
    EXPERIENCE_NEARBY_EXPERIENCE_MAIN_TITLE,
} from '@/constants/pages/ExperiencesPageConstants'
import { ExperienceTypes } from '@/lib/types/experience-types'
import Loading from '@/components/loading'

const SubHero = lazy(() => import('@/components/common/sub-hero'))
const ExperienceCard = lazy(() => import('@/components/cards/experience-card'))
const Carousel = lazy(() => import('@/components/carousels/card-carousel'))
const MainHeader = lazy(() => import('@/components/common/main-header'))
const PageContent = lazy(() => import('./page-content'))

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
            <div className="flex h-screen w-full items-center justify-center">
                <Loading />
            </div>
        )
    }

    return (
        <Suspense
            fallback={
                <div className="flex h-screen w-full items-center justify-center">
                    <Loading />
                </div>
            }
        >
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
                                title={EXPERIENCE_NEARBY_EXPERIENCE_MAIN_TITLE}
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
        </Suspense>
    )
}

export default ExperienceContent
