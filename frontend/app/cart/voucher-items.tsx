import React from 'react'
import ItemHeader from './item-header'
import VoucherCartCard from './cards/voucher-cartcard'
import { CartItem } from '@/lib/types/common-types'
import { VoucherCartItem } from '@/lib/types/voucher-types'

interface Props {
    items: CartItem[]
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
