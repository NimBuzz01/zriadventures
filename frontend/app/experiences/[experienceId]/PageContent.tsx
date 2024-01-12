import NotFoundLabel from '@/components/NotFoundLabel'
import ThumbnailCarousel from '@/components/carousels/ThumbnailCarousel'
import Breadcrumbs from '@/components/common/Breadcrumbs'
import CustomAccordion from '@/components/common/CustomAccordion'
import BaseSkeleton from '@/components/skeletons/BaseSkeleton'
import { ExperienceTypes } from '@/types/experienceTypes'
import React, { useEffect, useState } from 'react'
import Reservation from './Reservation'
import PricingOptions from './PricingOptions'
import { InfoIcon } from 'lucide-react'
import MainButton from '@/components/common/MainButton'
import Markdown from 'react-markdown'

interface Props {
    experience: ExperienceTypes
}

const PageContent = ({ experience }: Props) => {
    const [imageLoaded, setImageLoaded] = useState(false)
    const [reservation, setReservation] = useState<'cart' | 'buy' | ''>('')

    useEffect(() => {
        if (experience) {
            const img = new Image()
            img.src = experience.images[0].src
            img.onload = () => setImageLoaded(true)
        }
    }, [experience])

    return (
        <>
            {reservation ? (
                <div className="bg-gray-50 py-16">
                    <Reservation
                        experience={experience}
                        addType={reservation}
                    />
                </div>
            ) : (
                <div className="flex w-full flex-col justify-center gap-16 bg-gray-50 px-4 py-20 sm:px-10 lg:flex-row">
                    <div className="w-full lg:w-1/2 ">
                        <div className="mb-5">
                            <Breadcrumbs
                                first="Experiences"
                                firstHref="/experiences"
                                last={experience.name}
                            />
                        </div>
                        <h1 className="mb-10 text-xl font-medium sm:text-2xl">
                            {experience.about.shortDescription}
                        </h1>
                        <div className="mb-10 flex items-center justify-center gap-12 sm:gap-24">
                            <div>
                                <p className="text-sm font-medium uppercase text-gray-500">
                                    Location
                                </p>
                                <p className="text-lg font-medium text-blue-950 sm:text-xl md:text-2xl">
                                    {experience.location.name}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-medium uppercase text-gray-500">
                                    Duration
                                </p>
                                <p className="text-lg font-medium text-blue-950 sm:text-xl md:text-2xl">
                                    {experience.options.map((option, index) => (
                                        <span key={index}>
                                            {option.duration.amount +
                                                ' ' +
                                                option.duration.type}
                                            {index <
                                                experience.options.length - 1 &&
                                                ', '}
                                        </span>
                                    ))}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-medium uppercase text-gray-500">
                                    Difficulty
                                </p>
                                <p className="text-lg font-medium text-blue-950 sm:text-xl md:text-2xl">
                                    {experience.difficulty}
                                </p>
                            </div>
                        </div>
                        <Markdown>{experience.about.longDescription}</Markdown>
                        {experience.bundle && (
                            <>
                                <h1 className="mb-4 mt-10 text-2xl font-medium">
                                    Whats included in this bundle
                                </h1>
                                <ul className="ml-6 list-disc">
                                    {experience.category
                                        .filter(
                                            (category) =>
                                                ![
                                                    'water-activities',
                                                    'land-activities',
                                                    'air-activities',
                                                ].includes(category.id)
                                        )
                                        .map((category) => (
                                            <li key={category.id}>
                                                {category.name}
                                            </li>
                                        ))}
                                </ul>
                            </>
                        )}

                        <div className="my-6">
                            <p className="mb-2 text-xl font-semibold">
                                Image Gallery
                            </p>
                            {experience.images &&
                            experience.images.length > 0 ? (
                                <ThumbnailCarousel>
                                    {experience.images.map((image, index) => (
                                        <div
                                            key={index}
                                            className="h-full w-full object-cover"
                                        >
                                            {imageLoaded ? (
                                                <img
                                                    src={image.src}
                                                    className="h-full max-h-[600px] w-full object-cover"
                                                    alt={image.alt}
                                                />
                                            ) : (
                                                <BaseSkeleton />
                                            )}
                                        </div>
                                    ))}
                                </ThumbnailCarousel>
                            ) : (
                                <NotFoundLabel text="No images available for this experience." />
                            )}
                        </div>
                        <CustomAccordion title="What's Included">
                            <ul className="list-disc">
                                {experience.included.map(
                                    (exp, index: number) => (
                                        <li
                                            key={index}
                                            className="my-4 text-sm font-medium sm:text-base"
                                        >
                                            <Markdown>{exp}</Markdown>
                                        </li>
                                    )
                                )}
                            </ul>
                        </CustomAccordion>
                        <CustomAccordion title="Additional Information">
                            {experience.requirements.map(
                                (req, index: number) => (
                                    <div key={index} className="my-6">
                                        <h1 className="mb-1 text-sm font-medium sm:text-base">
                                            {req.name}
                                        </h1>
                                        <p className="text-sm sm:text-base">
                                            {req.description}
                                        </p>
                                    </div>
                                )
                            )}
                        </CustomAccordion>
                        <CustomAccordion title="Frequently asked questions">
                            {experience.faq.map((f, index) => (
                                <div key={index} className="my-6">
                                    <h1 className="mb-4 text-sm font-medium sm:text-base">
                                        {f.question}
                                    </h1>
                                    <p className="text-sm sm:text-base">
                                        {f.answer}
                                    </p>
                                </div>
                            ))}
                        </CustomAccordion>
                        <CustomAccordion title="Terms and Conditions">
                            <ul className="list-disc">
                                {experience.terms.map((exp, index: number) => (
                                    <li
                                        key={index}
                                        className="my-4 text-sm sm:text-base"
                                    >
                                        <Markdown>{exp}</Markdown>
                                    </li>
                                ))}
                            </ul>
                        </CustomAccordion>
                    </div>
                    <div className="flex w-full flex-col lg:w-80">
                        {Boolean(experience.offer) && (
                            <p className="mb-4 flex items-center gap-2 bg-blue-100 p-3 text-sm font-medium">
                                <InfoIcon className="text-blue-500" />
                                Offer prices will be calculated during checkout
                            </p>
                        )}
                        <PricingOptions options={experience.options} />
                        <div className="mt-2 flex flex-col gap-3">
                            <MainButton
                                text={'Book Now'}
                                onClick={() => {
                                    setReservation('buy')
                                    window.scrollTo(0, 0)
                                }}
                            />
                            <MainButton
                                text={'Add to Cart'}
                                onClick={() => {
                                    setReservation('cart')
                                    window.scrollTo(0, 0)
                                }}
                                bgColor="bg-gray-600 group-hover:bg-gray-800"
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default PageContent
