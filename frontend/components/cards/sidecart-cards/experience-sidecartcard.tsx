'use client'
import { useState } from 'react'
import { BsTrashFill } from 'react-icons/bs'
import { SlCalender } from 'react-icons/sl'
import { Card } from '../../ui/card'
import BlurImage from '../../common/blur-image'
import { BiTimeFive } from 'react-icons/bi'
import { useLocal } from '@/contexts/local-context'
import { CartItem } from '@/lib/types/common-types'
import { ExperienceCartItem } from '@/lib/types/experience-types'
import { calculateExperienceTotal, formatDate } from '@/lib/utils'

export interface Props {
    item: CartItem
    onDelete: (id: string) => void
}

const ExperienceSideCartCard = ({ item, onDelete }: Props) => {
    const experienceItem = item.item as ExperienceCartItem
    const [isDeleting, setIsDeleting] = useState(false)
    const { local } = useLocal()

    const handleDelete = () => {
        setIsDeleting(true)
        onDelete(experienceItem.id)
    }

    return (
        <Card
            className={`flex min-h-[7rem] w-full  flex-col bg-white sm:flex-row ${
                isDeleting ? 'animate-fadeOut' : ''
            }`}
        >
            <div className="relative h-10 w-full sm:h-[7rem] sm:w-24">
                <BlurImage
                    src={experienceItem.experience.images[0].src}
                    alt={experienceItem.experience.images[0].alt}
                    style="rounded-md"
                />
            </div>
            <div className="mx-2 my-2 flex flex-grow flex-col">
                <div className="flex justify-between">
                    <h3 className="text-sm font-medium text-gray-600 sm:text-base">
                        {experienceItem.experience.name}
                    </h3>
                    <button
                        onClick={handleDelete}
                        className="text-base text-red-600 transition-all hover:text-red-800 focus:outline-none"
                    >
                        <BsTrashFill />
                    </button>
                </div>
                <div className="ml-0.5 flex items-center gap-1.5 text-sm font-medium text-gray-500">
                    <SlCalender />
                    <p className="text-[0.7rem]">
                        {formatDate(
                            experienceItem.date.toString().split('T')[0]
                        )}
                    </p>
                </div>
                <p className="flex items-center gap-1 text-[0.7rem] font-medium text-gray-500">
                    <BiTimeFive className="text-lg" />
                    {experienceItem.duration &&
                        experienceItem.duration.amount +
                            ' ' +
                            experienceItem.duration.type}
                </p>
                <div className="mt-auto flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                        Pax:{' '}
                        <span className="font-semibold">
                            {experienceItem.adults + experienceItem.children}
                        </span>
                    </p>
                    <p className="font-medium text-blue-900">
                        {local ? (
                            <>
                                LKR{' '}
                                {calculateExperienceTotal(
                                    experienceItem
                                ).LKR.toFixed(2)}
                            </>
                        ) : (
                            <>
                                USD $
                                {calculateExperienceTotal(
                                    experienceItem
                                ).USD.toFixed(2)}
                            </>
                        )}
                    </p>
                </div>
            </div>
        </Card>
    )
}

export default ExperienceSideCartCard
