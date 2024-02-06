import { Card } from '@/components/ui/card'
import React from 'react'
import { BsFillCalendar2MinusFill } from 'react-icons/bs'
import BlurImage from '@/components/common/blur-image'
import { useLocal } from '@/contexts/local-context'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { FaChild } from 'react-icons/fa'
import { IoManSharp } from 'react-icons/io5'
import { CartItem } from '@/lib/types/common-types'
import { ExperienceCartItem } from '@/lib/types/experience-types'
import { formatDate, getExperienceTotal } from '@/lib/utils'

interface Props {
    item: CartItem
    onDelete: (itemId: string) => void
}

const ExperienceCartCard = ({ item, onDelete }: Props) => {
    const { local, setKey } = useLocal()
    const handleDeleteClick = () => {
        onDelete(item.item.id) // Call the onDelete callback with the item id
        setKey()
    }

    const experienceItem = item.item as ExperienceCartItem

    return (
        <Card className="relative mb-4 flex w-full flex-col md:flex-row">
            <div>
                <div className="relative h-44 w-full md:h-full md:w-44">
                    <BlurImage
                        src={experienceItem.experience.images[0].src}
                        alt={experienceItem.experience.images[0].alt}
                        objectFit="cover"
                        style="rounded-md"
                    />
                </div>
            </div>

            <div className="flex flex-grow flex-col p-5">
                <div className="flex w-full flex-col justify-between lg:flex-row">
                    <h1 className="text-lg font-medium md:text-xl">
                        {experienceItem.experience.name}
                    </h1>
                    <p className="text-lg font-medium md:text-xl">
                        {Boolean(experienceItem.experience.offer) && (
                            <span className="mr-2 rounded-md bg-green-200 p-1 text-sm">
                                {experienceItem.experience.offer}% Off
                            </span>
                        )}
                        {local ? (
                            <>
                                LKR{' '}
                                {getExperienceTotal(
                                    experienceItem.experience,
                                    experienceItem.duration,
                                    experienceItem.adults,
                                    experienceItem.children,
                                    experienceItem.extras
                                ).LKR.toFixed(2)}
                            </>
                        ) : (
                            <>
                                USD $
                                {getExperienceTotal(
                                    experienceItem.experience,
                                    experienceItem.duration,
                                    experienceItem.adults,
                                    experienceItem.children,
                                    experienceItem.extras
                                ).USD.toFixed(2)}
                            </>
                        )}
                    </p>
                </div>
                <button
                    onClick={handleDeleteClick}
                    className="self-end text-sm text-red-600 transition-all hover:text-red-800 focus:outline-none"
                >
                    Remove
                </button>
                <div className="my-2 border-t border-gray-200" />
                <div className="flex w-full flex-col md:flex-row">
                    <div className="w-full md:w-1/2">
                        <div className="mb-2 flex flex-col">
                            <p className="text-xs uppercase text-gray-500">
                                Duration
                            </p>
                            <span className="text- flex items-center gap-2">
                                <AiOutlineClockCircle />
                                {experienceItem.duration.amount}{' '}
                                {experienceItem.duration.type}
                            </span>
                        </div>
                        <div className="mb-2 flex flex-col">
                            <p className="text-xs uppercase text-gray-500">
                                Date
                            </p>
                            <span className="text- flex items-center gap-2">
                                <BsFillCalendar2MinusFill />
                                {formatDate(
                                    experienceItem.date.toString().split('T')[0]
                                )}{' '}
                                - {experienceItem.checkInTime}
                            </span>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2">
                        <div className="mb-2 flex flex-col">
                            <p className="text-xs uppercase text-gray-500">
                                Adults
                            </p>
                            <span className="text- flex items-center gap-2">
                                <IoManSharp /> {experienceItem.adults} Pax
                            </span>
                        </div>
                        <div className="mb-2 flex flex-col">
                            <p className="text-xs uppercase text-gray-500">
                                Children
                            </p>
                            <span className="text- flex items-center gap-2">
                                <FaChild /> {experienceItem.children} Pax
                            </span>
                        </div>
                    </div>
                </div>
                {experienceItem.experience.bundle && (
                    <div className="mt-4">
                        <p className="text-xs uppercase text-gray-500">
                            Bundle
                        </p>
                        <ul className="ml-6 list-disc">
                            {experienceItem.experience.category
                                .filter(
                                    (category) =>
                                        ![
                                            'water-activities',
                                            'land-activities',
                                            'air-activities',
                                        ].includes(category.id)
                                )
                                .map((category) => (
                                    <li key={category.id}>{category.name}</li>
                                ))}
                        </ul>
                    </div>
                )}
                {experienceItem.extras.length > 0 && (
                    <div className="mt-4">
                        <p className="text-xs uppercase text-gray-500">
                            Extras
                        </p>
                        {experienceItem.extras.map((item, index) => (
                            <div key={index} className="w-full">
                                <span className="inline-flex w-32 ">
                                    {item.name}
                                </span>{' '}
                                {item.quantity} Pax
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Card>
    )
}

export default ExperienceCartCard
