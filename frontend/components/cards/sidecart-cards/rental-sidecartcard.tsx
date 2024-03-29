'use client'
import { useState } from 'react'
import { BsFillInboxFill, BsTrashFill } from 'react-icons/bs'
import { Card } from '../../ui/card'
import BlurImage from '../../common/blur-image'
import { useLocal } from '@/contexts/local-context'
import { SlCalender } from 'react-icons/sl'
import { CartItem } from '@/lib/types/common-types'
import { RentalCartItem } from '@/lib/types/rental-types'
import { formatDate } from '@/lib/utils'

export interface Props {
    item: CartItem
    onDelete: (id: string) => void
}

const RentalSideCartCard = ({ item, onDelete }: Props) => {
    const rentalItem = item.item as RentalCartItem
    const [isDeleting, setIsDeleting] = useState(false)
    const { local } = useLocal()

    const handleDelete = () => {
        setIsDeleting(true)
        onDelete(rentalItem.id)
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
        <Card
            className={`flex min-h-[7rem] w-full  flex-col bg-white sm:flex-row ${
                isDeleting ? 'animate-fadeOut' : ''
            }`}
        >
            <div className="relative h-10 w-full sm:h-[7rem] sm:w-24">
                <BlurImage
                    src={rentalItem.rental.item.images[0].src}
                    alt={rentalItem.rental.item.images[0].alt}
                    style="rounded-md"
                />
            </div>
            <div className="mx-2 my-2 flex flex-grow flex-col">
                <div className="flex justify-between">
                    <h3 className="text-sm font-medium text-gray-600 sm:text-base">
                        {rentalItem.rental.name}
                    </h3>
                    <button
                        onClick={handleDelete}
                        className="text-base text-red-600 transition-all hover:text-red-800 focus:outline-none"
                    >
                        <BsTrashFill />
                    </button>
                </div>
                <div className="ml-0.5 flex items-center gap-1.5 text-sm font-medium text-gray-500">
                    <BsFillInboxFill />
                    <p className="text-[0.7rem] capitalize">
                        Duration :{' '}
                        {getDurationLabel(rentalItem.selectedOption.duration)}
                    </p>
                </div>
                <div className="ml-0.5 flex items-center gap-1.5 text-sm font-medium text-gray-500">
                    <SlCalender />
                    <p className="text-[0.7rem] capitalize">
                        Start Date :{' '}
                        {formatDate(
                            rentalItem.startDate.toString().split('T')[0]
                        )}
                    </p>
                </div>
                <div className="ml-0.5 flex items-center gap-1.5 text-sm font-medium text-gray-500">
                    <SlCalender />
                    <p className="text-[0.7rem] capitalize">
                        End Date :{' '}
                        {formatDate(
                            rentalItem.endDate.toString().split('T')[0]
                        )}
                    </p>
                </div>
                <div className="mt-auto flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                        Quantity:{' '}
                        <span className="font-semibold">
                            {rentalItem.quantity}
                        </span>
                    </p>
                    <p className="font-medium text-blue-900">
                        {local ? (
                            <>
                                LKR{' '}
                                {(
                                    rentalItem.quantity *
                                    rentalItem.selectedOption.cost.LKR
                                ).toFixed(2)}
                            </>
                        ) : (
                            <>
                                USD $
                                {(
                                    rentalItem.quantity *
                                    rentalItem.selectedOption.cost.USD
                                ).toFixed(2)}
                            </>
                        )}
                    </p>
                </div>
            </div>
        </Card>
    )
}

export default RentalSideCartCard
