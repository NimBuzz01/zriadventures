import { Card } from '@/components/ui/card'
import React from 'react'
import {
    BsCashStack,
    BsFillBoxFill,
    BsFillCalendar2MinusFill,
} from 'react-icons/bs'
import BlurImage from '@/components/common/BlurImage'
import { useLocal } from '@/contexts/SetLocalContext'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { IoManSharp } from 'react-icons/io5'
import { formatDate } from '@/lib/utils/func'
import { VoucherCart } from '@/types/voucherTypes'
import { getExperienceTotal } from '@/contexts/ExperienceContext'
import { FaChild } from 'react-icons/fa'
import { FiPackage } from 'react-icons/fi'

interface Props {
    item: VoucherCart
    onDelete: (itemId: string) => void
}

const VoucherCartCard = ({ item, onDelete }: Props) => {
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
                        src={item.item.voucher.voucherTemplate.src}
                        alt={item.item.voucher.voucherTemplate.alt}
                        objectFit="contain"
                        style="rounded-md"
                    />
                </div>
            </div>

            <div className="flex flex-grow flex-col p-5">
                <div className="flex w-full flex-col justify-between lg:flex-row">
                    <h1 className="text-lg font-medium md:text-xl">
                        {item.item.voucher.voucherTemplate.name} Voucher
                    </h1>
                    <p className="text-lg font-medium md:text-xl">
                        {item.item.voucher.voucherType === 'Cash' ? (
                            `${
                                item.item.voucher.voucherAmount?.currency || ''
                            } ${item.item.voucher.voucherAmount?.amount || ''}`
                        ) : item.item.voucher.voucherType === 'Experience' &&
                          item.item.voucher.voucherExperience ? (
                            <>
                                {local
                                    ? `LKR ${getExperienceTotal(
                                          item.item.voucher.voucherExperience
                                              .item.experience,
                                          item.item.voucher.voucherExperience
                                              .item.duration,
                                          item.item.voucher.voucherExperience
                                              .item.adults,
                                          item.item.voucher.voucherExperience
                                              .item.children,
                                          item.item.voucher.voucherExperience
                                              .item.extras
                                      ).LKR.toFixed(2)}`
                                    : `USD $${getExperienceTotal(
                                          item.item.voucher.voucherExperience
                                              .item.experience,
                                          item.item.voucher.voucherExperience
                                              .item.duration,
                                          item.item.voucher.voucherExperience
                                              .item.adults,
                                          item.item.voucher.voucherExperience
                                              .item.children,
                                          item.item.voucher.voucherExperience
                                              .item.extras
                                      ).USD.toFixed(2)}`}
                            </>
                        ) : null}
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
                                Voucher Type
                            </p>
                            <span className="text- flex items-center gap-2">
                                <BsFillBoxFill />
                                {item.item.voucher.voucherType}
                            </span>
                        </div>
                        {item.item.voucher.voucherType === 'Cash' ? (
                            <div className="mb-2 flex flex-col">
                                <p className="text-xs uppercase text-gray-500">
                                    Cash Amount
                                </p>
                                <span className="text- flex items-center gap-2">
                                    <BsCashStack />
                                    {
                                        item.item.voucher.voucherAmount
                                            ?.currency
                                    }{' '}
                                    {item.item.voucher.voucherAmount?.amount}
                                </span>
                            </div>
                        ) : (
                            <div>
                                <div className="mb-2 flex flex-col">
                                    <p className="text-xs uppercase text-gray-500">
                                        Experience
                                    </p>
                                    <span className="text- flex items-center gap-2">
                                        <FiPackage />
                                        {
                                            item.item.voucher.voucherExperience
                                                ?.item.experience.name
                                        }
                                    </span>
                                </div>
                                <div className="flex w-full flex-col md:flex-row">
                                    <div className="w-full md:w-1/2">
                                        <div className="mb-2 flex flex-col">
                                            <p className="text-xs uppercase text-gray-500">
                                                Duration
                                            </p>
                                            <span className="text- flex items-center gap-2">
                                                <AiOutlineClockCircle />
                                                {
                                                    item.item.voucher
                                                        .voucherExperience?.item
                                                        .duration.amount
                                                }{' '}
                                                {
                                                    item.item.voucher
                                                        .voucherExperience?.item
                                                        .duration.type
                                                }
                                            </span>
                                        </div>
                                    </div>
                                    <div className="w-full md:w-1/2">
                                        <div className="mb-2 flex flex-col">
                                            <p className="text-xs uppercase text-gray-500">
                                                Adults
                                            </p>
                                            <span className="text- flex items-center gap-2">
                                                <IoManSharp />{' '}
                                                {
                                                    item.item.voucher
                                                        .voucherExperience?.item
                                                        .adults
                                                }{' '}
                                                Pax
                                            </span>
                                        </div>
                                        <div className="mb-2 flex flex-col">
                                            <p className="text-xs uppercase text-gray-500">
                                                Children
                                            </p>
                                            <span className="text- flex items-center gap-2">
                                                <FaChild />{' '}
                                                {
                                                    item.item.voucher
                                                        .voucherExperience?.item
                                                        .children
                                                }{' '}
                                                Pax
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {item.item.voucher.voucherExperience?.item
                                    .experience.bundle && (
                                    <div className="mt-4">
                                        <p className="text-xs uppercase text-gray-500">
                                            Bundle
                                        </p>
                                        <ul className="ml-6 list-disc">
                                            {item.item.voucher.voucherExperience?.item.experience.category
                                                .filter(
                                                    (category) =>
                                                        ![
                                                            'water-activities',
                                                            'land-activities',
                                                            'air-activities',
                                                        ].includes(category.id)
                                                )
                                                .map((category) => (
                                                    <li key={category.id}>
                                                        {category.name}
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>
                                )}
                                {item.item.voucher.voucherExperience?.item
                                    .extras.length &&
                                    item.item.voucher.voucherExperience?.item
                                        .extras.length > 0 && (
                                        <div className="mt-4">
                                            <p className="text-xs uppercase text-gray-500">
                                                Extras
                                            </p>
                                            {item.item.voucher.voucherExperience?.item.extras.map(
                                                (item, index) => (
                                                    <div
                                                        key={index}
                                                        className="w-full"
                                                    >
                                                        <span className="inline-flex w-32 ">
                                                            {item.name}
                                                        </span>{' '}
                                                        {item.quantity} Pax
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default VoucherCartCard
