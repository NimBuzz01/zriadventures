'use client'
import { ExperienceCart } from '@/types/experienceTypes'
import { useState } from 'react'
import { BsTrashFill } from 'react-icons/bs'
import { SlCalender } from 'react-icons/sl'
import { Card } from '../../ui/card'
import BlurImage from '../../common/BlurImage'
import { BiTimeFive } from 'react-icons/bi'
import { getExperienceTotal } from '@/contexts/ExperienceContext'
import { useLocal } from '@/contexts/SetLocalContext'
import { formatDate } from '@/lib/utils/func'

export interface Props {
    item: ExperienceCart
    onDelete: (id: string) => void
}

const ExperienceSideCartCard = ({ item, onDelete }: Props) => {
    const [isDeleting, setIsDeleting] = useState(false)
    const { local } = useLocal()

    const handleDelete = () => {
        setIsDeleting(true)
        onDelete(item.item.id)
    }

    return (
        <Card
            className={`flex min-h-[7rem] w-full  flex-col bg-white sm:flex-row ${
                isDeleting ? 'animate-fadeOut' : ''
            }`}
        >
            <div className="relative h-10 w-full sm:h-[7rem] sm:w-24">
                <BlurImage
                    src={item.item.experience.images[0].src}
                    alt={item.item.experience.images[0].alt}
                    style="rounded-md"
                />
            </div>
            <div className="mx-2 my-2 flex flex-grow flex-col">
                <div className="flex justify-between">
                    <h3 className="text-sm font-medium text-gray-600 sm:text-base">
                        {item.item.experience.name}
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
                        {formatDate(item.item.date.toString().split('T')[0])}
                    </p>
                </div>
                <p className="flex items-center gap-1 text-[0.7rem] font-medium text-gray-500">
                    <BiTimeFive className="text-lg" />
                    {item.item.duration &&
                        item.item.duration.amount +
                            ' ' +
                            item.item.duration.type}
                </p>
                <div className="mt-auto flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                        Pax:{' '}
                        <span className="font-semibold">
                            {item.item.adults + item.item.children}
                        </span>
                    </p>
                    <p className="font-medium text-blue-900">
                        {local ? (
                            <>
                                LKR{' '}
                                {getExperienceTotal(
                                    item.item.experience,
                                    item.item.duration,
                                    item.item.adults,
                                    item.item.children,
                                    item.item.extras
                                ).LKR.toFixed(2)}
                            </>
                        ) : (
                            <>
                                USD $
                                {getExperienceTotal(
                                    item.item.experience,
                                    item.item.duration,
                                    item.item.adults,
                                    item.item.children,
                                    item.item.extras
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
