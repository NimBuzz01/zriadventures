'use client'
import { useState } from 'react'
import { BsFillInboxFill, BsTrashFill } from 'react-icons/bs'
import { Card } from '../../ui/card'
import BlurImage from '../../common/BlurImage'
import { useLocal } from '@/contexts/SetLocalContext'
import { MerchandiseCart } from '@/types/merchandiseTypes'
import { calcOffer } from '@/lib/utils/func'

export interface Props {
    item: MerchandiseCart
    onDelete: (id: string) => void
}

const MerchandiseSideCartCard = ({ item, onDelete }: Props) => {
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
                    src={item.item.merchandise.images[0].src}
                    alt={item.item.merchandise.images[0].alt}
                    style="rounded-md"
                />
            </div>
            <div className="mx-2 my-2 flex flex-grow flex-col">
                <div className="flex justify-between">
                    <h3 className="text-sm font-medium text-gray-600 sm:text-base">
                        {item.item.merchandise.name}
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
                        {item.item.merchandise.options.type} :{' '}
                        {item.item.selectedOption.name}
                    </p>
                </div>
                <div className="mt-auto flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                        Quantity:{' '}
                        <span className="font-semibold">
                            {item.item.quantity}
                        </span>
                    </p>
                    <p className="font-medium text-blue-900">
                        {local ? (
                            <>
                                LKR{' '}
                                {item.item.merchandise.offer ? (
                                    <>
                                        {calcOffer(
                                            item.item.selectedOption.cost.LKR,
                                            item.item.merchandise.offer
                                        ).toFixed(2)}
                                    </>
                                ) : (
                                    <>
                                        {(
                                            item.item.quantity *
                                            item.item.selectedOption.cost.LKR
                                        ).toFixed(2)}
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                USD $
                                {item.item.merchandise.offer ? (
                                    <>
                                        {calcOffer(
                                            item.item.selectedOption.cost.USD,
                                            item.item.merchandise.offer
                                        ).toFixed(2)}
                                    </>
                                ) : (
                                    <>
                                        {(
                                            item.item.quantity *
                                            item.item.selectedOption.cost.USD
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
