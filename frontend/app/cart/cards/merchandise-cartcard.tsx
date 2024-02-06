import { Card } from '@/components/ui/card'
import React from 'react'
import BlurImage from '@/components/common/blur-image'
import { useLocal } from '@/contexts/local-context'
import { BsBox2Fill, BsFillInboxFill } from 'react-icons/bs'
import { CartItem } from '@/lib/types/common-types'
import { MerchandiseCartItem } from '@/lib/types/merchandise-types'
import { calcOffer } from '@/lib/utils'

interface Props {
    item: CartItem
    onDelete: (itemId: string) => void
}

const MerchandiseCartCard = ({ item, onDelete }: Props) => {
    const merchandiseItem = item.item as MerchandiseCartItem
    const { local, setKey } = useLocal()
    const handleDeleteClick = () => {
        onDelete(merchandiseItem.id)
        setKey()
    }

    return (
        <Card className="relative mb-4 flex w-full flex-col md:flex-row">
            <div>
                <div className="relative h-44 w-full md:h-full md:w-44">
                    <BlurImage
                        src={merchandiseItem.merchandise.images[0].src}
                        alt={merchandiseItem.merchandise.images[0].alt}
                        objectFit="cover"
                        style="rounded-md"
                    />
                </div>
            </div>

            <div className="flex flex-grow flex-col p-5">
                <div className="flex w-full flex-col justify-between lg:flex-row">
                    <h1 className="text-lg font-medium md:text-xl">
                        {merchandiseItem.merchandise.name}
                    </h1>
                    <p className="text-lg font-medium md:text-xl">
                        {Boolean(merchandiseItem.merchandise.offer) && (
                            <span className="mr-2 rounded-md bg-green-200 p-1 text-sm">
                                {merchandiseItem.merchandise.offer}% Off
                            </span>
                        )}
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
                                {merchandiseItem.merchandise.options.type}
                            </p>
                            <span className="text- flex items-center gap-2">
                                <BsBox2Fill />
                                {merchandiseItem.selectedOption.name}
                            </span>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2">
                        <div className="mb-2 flex flex-col">
                            <p className="text-xs uppercase text-gray-500">
                                Quantity
                            </p>
                            <span className="text- flex items-center gap-2">
                                <BsFillInboxFill /> {merchandiseItem.quantity}{' '}
                                Items
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default MerchandiseCartCard
