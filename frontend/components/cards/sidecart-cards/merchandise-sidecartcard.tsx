'use client'
import { useState } from 'react'
import { BsFillInboxFill, BsTrashFill } from 'react-icons/bs'
import { Card } from '../../ui/card'
import BlurImage from '../../common/blur-image'
import { useLocal } from '@/contexts/local-context'
import { CartItem } from '@/lib/types/common-types'
import { MerchandiseCartItem } from '@/lib/types/merchandise-types'
import { calcOffer } from '@/lib/utils'

export interface Props {
    item: CartItem
    onDelete: (id: string) => void
}

const MerchandiseSideCartCard = ({ item, onDelete }: Props) => {
    const merchandiseItem = item.item as MerchandiseCartItem

    const [isDeleting, setIsDeleting] = useState(false)
    const { local } = useLocal()

    const handleDelete = () => {
        setIsDeleting(true)
        onDelete(merchandiseItem.id)
    }

    return (
        <Card
            className={`flex min-h-[7rem] w-full  flex-col bg-white sm:flex-row ${
                isDeleting ? 'animate-fadeOut' : ''
            }`}
        >
            <div className="relative h-10 w-full sm:h-[7rem] sm:w-24">
                <BlurImage
                    src={merchandiseItem.merchandise.images[0].src}
                    alt={merchandiseItem.merchandise.images[0].alt}
                    style="rounded-md"
                />
            </div>
            <div className="mx-2 my-2 flex flex-grow flex-col">
                <div className="flex justify-between">
                    <h3 className="text-sm font-medium text-gray-600 sm:text-base">
                        {merchandiseItem.merchandise.name}
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
                        {merchandiseItem.merchandise.options.type} :{' '}
                        {merchandiseItem.selectedOption.name}
                    </p>
                </div>
                <div className="mt-auto flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                        Quantity:{' '}
                        <span className="font-semibold">
                            {merchandiseItem.quantity}
                        </span>
                    </p>
                    <p className="font-medium text-blue-900">
                        {local ? (
                            <>
                                LKR{' '}
                                {merchandiseItem.merchandise.offer ? (
                                    <>
                                        {calcOffer(
                                            merchandiseItem.selectedOption.cost
                                                .LKR,
                                            merchandiseItem.merchandise.offer
                                        ).toFixed(2)}
                                    </>
                                ) : (
                                    <>
                                        {(
                                            merchandiseItem.quantity *
                                            merchandiseItem.selectedOption.cost
                                                .LKR
                                        ).toFixed(2)}
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                USD $
                                {merchandiseItem.merchandise.offer ? (
                                    <>
                                        {calcOffer(
                                            merchandiseItem.selectedOption.cost
                                                .USD,
                                            merchandiseItem.merchandise.offer
                                        ).toFixed(2)}
                                    </>
                                ) : (
                                    <>
                                        {(
                                            merchandiseItem.quantity *
                                            merchandiseItem.selectedOption.cost
                                                .USD
                                        ).toFixed(2)}
                                    </>
                                )}
                            </>
                        )}
                    </p>
                </div>
            </div>
        </Card>
    )
}

export default MerchandiseSideCartCard
