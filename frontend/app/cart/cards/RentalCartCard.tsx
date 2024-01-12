import { Card } from '@/components/ui/card'
import React from 'react'
import BlurImage from '@/components/common/BlurImage'
import { useLocal } from '@/contexts/SetLocalContext'
import { BsBox2Fill, BsFillInboxFill } from 'react-icons/bs'
import { formatDate } from '@/lib/utils/func'
import { RentalCart } from '@/types/rentalTypes'
import { SlCalender } from 'react-icons/sl'

interface Props {
    item: RentalCart
    onDelete: (itemId: string) => void
}

const RentalCartCard = ({ item, onDelete }: Props) => {
    const { local, setKey } = useLocal()
    const handleDeleteClick = () => {
        onDelete(item.item.id) // Call the onDelete callback with the item id
        setKey()
    }

    const getDurationLabel = (duration: string) => {
        switch (duration) {
            case 'days-1':
                return '1 Day'
            case 'days-3':
                return '3 Days'
            case 'days-7':
                return '1 Week'
            default:
                return duration // Return the original value if it doesn't match any of the cases
        }
    }

    return (
        <Card className="relative mb-4 flex w-full flex-col md:flex-row">
            <div>
                <div className="relative h-44 w-full md:h-full md:w-44">
                    <BlurImage
                        src={item.item.rental.item.images[0].src}
                        alt={item.item.rental.item.images[0].alt}
                        objectFit="cover"
                        style="rounded-md"
                    />
                </div>
            </div>

            <div className="flex flex-grow flex-col p-5">
                <div className="flex w-full flex-col justify-between lg:flex-row">
                    <h1 className="text-lg font-medium md:text-xl">
                        {item.item.rental.name}
                    </h1>
                    <p className="text-lg font-medium md:text-xl">
                        {local ? (
                            <>
                                LKR{' '}
                                {(
                                    item.item.quantity *
                                    item.item.selectedOption.cost.LKR
                                ).toFixed(2)}
                            </>
                        ) : (
                            <>
                                USD $
                                {(
                                    item.item.quantity *
                                    item.item.selectedOption.cost.USD
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
                            <span className="flex items-center gap-2">
                                <BsBox2Fill />
                                {getDurationLabel(
                                    item.item.selectedOption.duration
                                )}
                            </span>
                        </div>
                        <div className="mb-2 flex flex-col">
                            <p className="text-xs uppercase text-gray-500">
                                Start Date
                            </p>
                            <span className="flex items-center gap-2">
                                <SlCalender />
                                {formatDate(
                                    item.item.endDate.toString().split('T')[0]
                                )}
                            </span>
                        </div>
                        <div className="mb-2 flex flex-col">
                            <p className="text-xs uppercase text-gray-500">
                                End Date
                            </p>
                            <span className="flex items-center gap-2">
                                <SlCalender />
                                {formatDate(
                                    item.item.endDate.toString().split('T')[0]
                                )}
                            </span>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2">
                        <div className="mb-2 flex flex-col">
                            <p className="text-xs uppercase text-gray-500">
                                Quantity
                            </p>
                            <span className="flex items-center gap-2">
                                <BsFillInboxFill /> {item.item.quantity} Items
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default RentalCartCard
