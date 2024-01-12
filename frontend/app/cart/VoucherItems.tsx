import React from 'react'
import ItemHeader from './ItemHeader'
import VoucherCartCard from './cards/VoucherCartCard'
import { VoucherCart } from '@/types/voucherTypes'

interface Props {
    items: VoucherCart[]
    onDelete: (itemId: string) => void
}

const VoucherItems = ({ items, onDelete }: Props) => {
    return (
        <>
            {items.length > 0 && (
                <div>
                    <ItemHeader firstCol="Vouchers" />
                    {items.map((item) => (
                        <VoucherCartCard
                            key={item.item.id}
                            item={item}
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            )}
        </>
    )
}

export default VoucherItems
