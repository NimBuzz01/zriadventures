import { Card } from '@/components/ui/card'
import React from 'react'
import BlurImage from '@/components/common/BlurImage'
import { useLocal } from '@/contexts/SetLocalContext'
import { MerchandiseCart } from '@/types/merchandiseTypes'
import { BsBox2Fill, BsFillInboxFill } from 'react-icons/bs'
import { calcOffer } from '@/lib/utils/func'

interface Props {
    item: MerchandiseCart
    onDelete: (itemId: string) => void
}

const MerchandiseCartCard = ({ item, onDelete }: Props) => {
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
                        src={item.item.merchandise.images[0].src}
                        alt={item.item.merchandise.images[0].alt}
                        objectFit="cover"
                        style="rounded-md"
                    />
                </div>
            </div>

            <div className="flex flex-grow flex-col p-5">
                <div className="flex w-full flex-col justify-between lg:flex-row">
                    <h1 className="text-lg font-medium md:text-xl">
                        {item.item.merchandise.name}
                    </h1>
                    <p className="text-lg font-medium md:text-xl">
                        {Boolean(item.item.merchandise.offer) && (
                            <span className="mr-2 rounded-md bg-green-200 p-1 text-sm">
                                {item.item.merchandise.offer}% Off
                            </span>
                        )}
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
                                {item.item.merchandise.options.type}
                            </p>
                            <span className="text- flex items-center gap-2">
                                <BsBox2Fill />
                                {item.item.selectedOption.name}
                            </span>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2">
                        <div className="mb-2 flex flex-col">
                            <p className="text-xs uppercase text-gray-500">
                                Quantity
                            </p>
                            <span className="text- flex items-center gap-2">
                                <BsFillInboxFill /> {item.item.quantity} Items
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default MerchandiseCartCard
