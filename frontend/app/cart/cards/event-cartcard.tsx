import { Card } from '@/components/ui/card'
import React from 'react'
import { BsFillCalendar2MinusFill } from 'react-icons/bs'
import BlurImage from '@/components/common/blur-image'
import { useLocal } from '@/contexts/local-context'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { IoManSharp } from 'react-icons/io5'
import { CartItem } from '@/lib/types/common-types'
import { formatDate } from '@/lib/utils'
import { EventCartItem } from '@/lib/types/event-types'

interface Props {
    item: CartItem
    onDelete: (itemId: string) => void
}

const EventCartCard = ({ item, onDelete }: Props) => {
    const eventItem = item.item as EventCartItem

    const { local, setKey } = useLocal()
    const handleDeleteClick = () => {
        onDelete(item.item.id) // Call the onDelete callback with the item id
        setKey()
    }

    return (
        <Card className="relative mb-4 flex w-full flex-col md:flex-row">
            <div>
                <div className="relative h-44 w-full md:h-full md:w-44">
                    <BlurImage
                        src={eventItem.event.images[0].src}
                        alt={eventItem.event.images[0].alt}
                        objectFit="cover"
                        style="rounded-md"
                    />
                </div>
            </div>

            <div className="flex flex-grow flex-col p-5">
                <div className="flex w-full flex-col justify-between lg:flex-row">
                    <h1 className="text-lg font-medium md:text-xl">
                        {eventItem.event.name}
                    </h1>
                    <p className="text-lg font-medium md:text-xl">
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
                                {eventItem.event.duration.amount}{' '}
                                {eventItem.event.duration.type}
                            </span>
                        </div>
                        <div className="mb-2 flex flex-col">
                            <p className="text-xs uppercase text-gray-500">
                                Start Date
                            </p>
                            <span className="text- flex items-center gap-2">
                                <BsFillCalendar2MinusFill />
                                {formatDate(
                                    eventItem.event.startDate
                                        .toString()
                                        .split('T')[0]
                                )}
                            </span>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2">
                        <div className="mb-2 flex flex-col">
                            <p className="text-xs uppercase text-gray-500">
                                Pax
                            </p>
                            <span className="text- flex items-center gap-2">
                                <IoManSharp /> {eventItem.info.pax} Pax
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default EventCartCard
