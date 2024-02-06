import BlurImage from '@/components/common/blur-image'
import { Card } from '@/components/ui/card'
import { useDataContext } from '@/contexts/data-context'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import Link from 'next/link'
import React from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { BiTimeFive } from 'react-icons/bi'
import { MdLocationOn } from 'react-icons/md'
import { ExperienceCategory } from '@/lib/types/experience-types'

interface Props {
    name: string
    image: string
    categories: ExperienceCategory[]
}

const CatalogCard = ({ categories, name, image }: Props) => {
    const { experiences } = useDataContext()
    const filterExperiencesByCategory = (category: ExperienceCategory) => {
        return experiences.filter((experience) =>
            experience.category.some(
                (expCategory) => expCategory.id === category.id
            )
        )
    }

    const excludedCategoryIds = [
        'water-activities',
        'land-activities',
        'air-activities',
    ]

    return (
        <Card className="z-[10] flex flex-col shadow-md">
            <div className="relative h-full w-full">
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="categories">
                        <AccordionTrigger className="relative h-56 w-[500px] p-4 text-sm font-semibold uppercase text-blue-950">
                            <BlurImage
                                src={image}
                                alt={name}
                                objectFit="cover"
                                style="rounded-md"
                            />
                            <div className="absolute inset-0 bg-black/40"></div>
                            <h1 className="absolute right-1/2 top-1/2 w-full -translate-y-1/2 translate-x-1/2 rounded-tl-md p-2 px-4 text-xl font-semibold uppercase text-white sm:text-2xl md:text-3xl">
                                {name}
                            </h1>
                        </AccordionTrigger>
                        <AccordionContent>
                            <Accordion
                                type="single"
                                collapsible
                                className="w-full px-4"
                            >
                                {categories
                                    .filter(
                                        (category) =>
                                            !excludedCategoryIds.includes(
                                                category.id
                                            )
                                    )
                                    .map((category) => (
                                        <AccordionItem
                                            value={category.id}
                                            key={category.id}
                                            className="px-4"
                                        >
                                            <AccordionTrigger className="text-sm">
                                                {category.name}
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <div className="">
                                                    {filterExperiencesByCategory(
                                                        category
                                                    ).map((experience) => (
                                                        <Link
                                                            href={`experiences/${experience.id}`}
                                                            key={experience.id}
                                                        >
                                                            <TooltipProvider>
                                                                <Tooltip>
                                                                    <TooltipTrigger className="w-full">
                                                                        <p className="w-full rounded-md p-2 text-start transition-all hover:bg-gray-100">
                                                                            {
                                                                                experience.name
                                                                            }
                                                                        </p>
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>
                                                                        <div className="h-44 w-96">
                                                                            <div className="relative h-28 w-96">
                                                                                <BlurImage
                                                                                    src={
                                                                                        experience
                                                                                            .images[0]
                                                                                            .src
                                                                                    }
                                                                                    alt={
                                                                                        experience
                                                                                            .images[0]
                                                                                            .alt
                                                                                    }
                                                                                    style="rounded-md"
                                                                                />
                                                                            </div>
                                                                            <p className="my-1 border-b border-gray-200 py-1 font-medium tracking-wide">
                                                                                {
                                                                                    experience.name
                                                                                }
                                                                            </p>
                                                                            <div>
                                                                                <div className="flex justify-between text-blue-950">
                                                                                    <div className="flex items-center gap-1">
                                                                                        <MdLocationOn />{' '}
                                                                                        <p className="text-xs sm:text-sm">
                                                                                            {
                                                                                                experience
                                                                                                    .location
                                                                                                    .name
                                                                                            }
                                                                                        </p>
                                                                                    </div>
                                                                                    <div className="flex items-center gap-1">
                                                                                        <BiTimeFive />{' '}
                                                                                        <p className="text-xs sm:text-sm">
                                                                                            {
                                                                                                experience
                                                                                                    .options[0]
                                                                                                    .duration
                                                                                                    .amount
                                                                                            }{' '}
                                                                                            {
                                                                                                experience
                                                                                                    .options[0]
                                                                                                    .duration
                                                                                                    .type
                                                                                            }{' '}
                                                                                            +
                                                                                        </p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            </TooltipProvider>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                            </Accordion>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </Card>
    )
}

export default CatalogCard
