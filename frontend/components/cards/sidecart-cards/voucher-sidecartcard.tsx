'use client'
import { useState } from 'react'
import { BsCashStack, BsFillBoxFill, BsTrashFill } from 'react-icons/bs'
import { Card } from '../../ui/card'
import BlurImage from '../../common/blur-image'
import { useLocal } from '@/contexts/local-context'
import { FiPackage } from 'react-icons/fi'
import { CartItem } from '@/lib/types/common-types'
import { VoucherCartItem } from '@/lib/types/voucher-types'
import { calculateExperienceTotal } from '@/lib/utils'
import { ExperienceCartItem } from '@/lib/types/experience-types'

export interface Props {
    item: CartItem
    onDelete: (id: string) => void
}

const VoucherSideCartCard = ({ item, onDelete }: Props) => {
    const voucherItem = item.item as VoucherCartItem
    const [isDeleting, setIsDeleting] = useState(false)
    const { local } = useLocal()

    const handleDelete = () => {
        setIsDeleting(true)
        onDelete(voucherItem.id)
    }

    return (
        <Card
            className={`flex min-h-[7rem] w-full  flex-col bg-white sm:flex-row ${
                isDeleting ? 'animate-fadeOut' : ''
            }`}
        >
            <div className="relative h-10 w-full sm:h-[7rem] sm:w-24">
                <BlurImage
                    src={voucherItem.voucher.voucherTemplate.src}
                    alt={voucherItem.voucher.voucherTemplate.alt}
                    objectFit="contain"
                    style="rounded-md"
                />
            </div>
            <div className="mx-2 my-2 flex flex-grow flex-col">
                <div className="flex justify-between">
                    <h3 className="text-sm font-medium text-gray-600 sm:text-base">
                        {voucherItem.voucher.voucherTemplate.name} Voucher
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
                        {voucherItem.voucher.voucherType}
                    </p>
                </div>
                {voucherItem.voucher.voucherType === 'CASH' ? (
                    <div className="ml-0.5 flex items-center gap-1.5 text-sm font-medium text-gray-500">
                        <BsCashStack />
                        <p className="text-[0.7rem]">
                            {voucherItem.voucher.voucherAmount?.currency}{' '}
                            {voucherItem.voucher.voucherAmount?.amount}
                        </p>
                    </div>
                ) : (
                    <div className="ml-0.5 flex items-center gap-1.5 text-sm font-medium text-gray-500">
                        <FiPackage />
                        <p className="text-[0.7rem]">
                            {
                                (
                                    voucherItem?.voucher
                                        .voucherExperience as ExperienceCartItem
                                )?.experience.name
                            }
                        </p>
                    </div>
                )}
                <div className="mt-auto flex items-center justify-end">
                    <p className="font-medium text-blue-900">
                        {voucherItem.voucher.voucherType === 'CASH' ? (
                            `${voucherItem.voucher.voucherAmount?.currency || ''} ${
                                voucherItem.voucher.voucherAmount?.amount || ''
                            }`
                        ) : voucherItem.voucher.voucherType === 'EXPERIENCE' &&
                          voucherItem.voucher.voucherExperience ? (
                            <>
                                {local
                                    ? `LKR ${calculateExperienceTotal(
                                          voucherItem.voucher.voucherExperience
                                      ).LKR.toFixed(2)}`
                                    : `USD $${calculateExperienceTotal(
                                          voucherItem.voucher.voucherExperience
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
