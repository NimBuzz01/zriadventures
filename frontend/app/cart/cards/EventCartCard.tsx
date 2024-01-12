import { Card } from '@/components/ui/card'
import React from 'react'
import { BsFillCalendar2MinusFill } from 'react-icons/bs'
import BlurImage from '@/components/common/BlurImage'
import { useLocal } from '@/contexts/SetLocalContext'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { IoManSharp } from 'react-icons/io5'
import { formatDate } from '@/lib/utils/func'
import { EventCart } from '@/types/eventTypes'

interface Props {
    item: EventCart
    onDelete: (itemId: string) => void
}

const EventCartCard = ({ item, onDelete }: Props) => {
    const { local, setKey } = useLocal()
    const handleDeleteClick = () => {
        onDelete(item.item.id) // Call the onDelete callback with the item id
        setKey()
    }

    return (
        <Card className="relative flex flex-col w-full mb-4 md:flex-row">
            <div>
                <div className="relative w-full h-44 md:h-full md:w-44">
                    <BlurImage
                        src={item.item.event.images[0].src}
                        alt={item.item.event.images[0].alt}
                        objectFit="cover"
                        style="rounded-md"
                    />
                </div>
            </div>

            <div className="flex flex-col flex-grow p-5">
                <div className="flex flex-col justify-between w-full lg:flex-row">
                    <h1 className="text-lg font-medium md:text-xl">
                        {item.item.event.name}
                    </h1>
                    <p className="text-lg font-medium md:text-xl">
                        {local ? (
                            <>
                                LKR{' '}
                                {(
                                    item.item.info.pax *
                                    item.item.event.cost.LKR
                                ).toFixed(2)}
                            </>
                        ) : (
                            <>
                                USD $
                                {(
                                    item.item.info.pax *
                                    item.item.event.cost.USD
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
                <div className="flex flex-col w-full md:flex-row">
                    <div className="w-full md:w-1/2">
                        <div className="flex flex-col mb-2">
                            <p className="text-xs text-gray-500 uppercase">
                                Duration
                            </p>
                            <span className="flex items-center gap-2 text-">
                                <AiOutlineClockCircle />
                                {item.item.event.duration.amount}{' '}
                                {item.item.event.duration.type}
                            </span>
                        </div>
                        <div className="flex flex-col mb-2">
                            <p className="text-xs text-gray-500 uppercase">
                                Start Date
                            </p>
                            <span className="flex items-center gap-2 text-">
                                <BsFillCalendar2MinusFill />
                                {formatDate(
                                    item.item.event.startDate
                                        .toString()
                                        .split('T')[0]
                                )}
                            </span>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2">
                        <div className="flex flex-col mb-2">
                            <p className="text-xs text-gray-500 uppercase">
                                Pax
                            </p>
                            <span className="flex items-center gap-2 text-">
                                <IoManSharp /> {item.item.info.pax} Pax
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default EventCartCard