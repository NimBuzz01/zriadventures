'use client'
import { useState } from 'react'
import { BsCashStack, BsFillBoxFill, BsTrashFill } from 'react-icons/bs'
import { Card } from '../../ui/card'
import BlurImage from '../../common/BlurImage'
import { useLocal } from '@/contexts/SetLocalContext'
import { VoucherCart } from '@/types/voucherTypes'
import { getExperienceTotal } from '@/contexts/ExperienceContext'
import { FiPackage } from 'react-icons/fi'

export interface Props {
    item: VoucherCart
    onDelete: (id: string) => void
}

const VoucherSideCartCard = ({ item, onDelete }: Props) => {
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
                    src={item.item.voucher.voucherTemplate.src}
                    alt={item.item.voucher.voucherTemplate.alt}
                    objectFit="contain"
                    style="rounded-md"
                />
            </div>
            <div className="mx-2 my-2 flex flex-grow flex-col">
                <div className="flex justify-between">
                    <h3 className="text-sm font-medium text-gray-600 sm:text-base">
                        {item.item.voucher.voucherTemplate.name} Voucher
                    </h3>
                    <button
                        onClick={handleDelete}
                        className="text-base text-red-600 transition-all hover:text-red-800 focus:outline-none"
                    >
                        <BsTrashFill />
                    </button>
                </div>
                <div className="ml-0.5 flex items-center gap-1.5 text-sm font-medium text-gray-500">
                    <BsFillBoxFill />
                    <p className="text-[0.7rem]">
                        {item.item.voucher.voucherType}
                    </p>
                </div>
                {item.item.voucher.voucherType === 'Cash' ? (
                    <div className="ml-0.5 flex items-center gap-1.5 text-sm font-medium text-gray-500">
                        <BsCashStack />
                        <p className="text-[0.7rem]">
                            {item.item.voucher.voucherAmount?.currency}{' '}
                            {item.item.voucher.voucherAmount?.amount}
                        </p>
                    </div>
                ) : (
                    <div className="ml-0.5 flex items-center gap-1.5 text-sm font-medium text-gray-500">
                        <FiPackage />
                        <p className="text-[0.7rem]">
                            {
                                item.item.voucher.voucherExperience?.item
                                    .experience.name
                            }
                        </p>
                    </div>
                )}
                <div className="mt-auto flex items-center justify-end">
                    <p className="font-medium text-blue-900">
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
            </div>
        </Card>
    )
}

export default VoucherSideCartCard
