'use client'
import { useState } from 'react'
import { BsTrashFill } from 'react-icons/bs'
import { SlCalender } from 'react-icons/sl'
import { Card } from '../../ui/card'
import BlurImage from '../../common/blur-image'
import { BiTimeFive } from 'react-icons/bi'
import { useLocal } from '@/contexts/local-context'
import { formatDate } from '@/lib/utils'
import { CartItem } from '@/lib/types/common-types'
import { EventCartItem } from '@/lib/types/event-types'

export interface Props {
    item: CartItem
    onDelete: (id: string) => void
}

const EventSideCartCard = ({ item, onDelete }: Props) => {
    const eventItem = item.item as EventCartItem
    const [isDeleting, setIsDeleting] = useState(false)
    const { local } = useLocal()

    const handleDelete = () => {
        setIsDeleting(true)
        onDelete(eventItem.id)
    }

    return (
        <Card
            className={`flex min-h-[7rem] w-full  flex-col bg-white sm:flex-row ${
                isDeleting ? 'animate-fadeOut' : ''
            }`}
        >
            <div className="relative h-10 w-full sm:h-[7rem] sm:w-24">
                <BlurImage
                    src={eventItem.event.images[0].src}
                    alt={eventItem.event.images[0].alt}
                    style="rounded-md"
                />
            </div>
            <div className="mx-2 my-2 flex flex-grow flex-col">
                <div className="flex justify-between">
                    <h3 className="text-sm font-medium text-gray-600 sm:text-base">
                        {eventItem.event.name}
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
                        {formatDate(eventItem.event.startDate)}
                    </p>
                </div>
                <p className="flex items-center gap-1 text-[0.7rem] font-medium text-gray-500">
                    <BiTimeFive className="text-lg" />
                    {eventItem.event.duration &&
                        eventItem.event.duration.amount +
                            ' ' +
                            eventItem.event.duration.type}
                </p>
                <div className="mt-auto flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                        Pax:{' '}
                        <span className="font-semibold">
                            {eventItem.info.pax}
                        </span>
                    </p>
                    <p className="font-medium text-blue-900">
                        {local ? (
                            <>
                                LKR{' '}
                                {(
                                    eventItem.info.pax *
                                    eventItem.event.cost.LKR
                                ).toFixed(2)}
                            </>
                        ) : (
                            <>
                                USD $
                                {(
                                    eventItem.info.pax *
                                    eventItem.event.cost.USD
                                ).toFixed(2)}
                            </>
                        )}
                    </p>
                </div>
            </div>
        </Card>
    )
}

export default EventSideCartCard
