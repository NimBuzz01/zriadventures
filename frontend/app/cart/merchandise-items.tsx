import React from 'react'
import ItemHeader from './item-header'
import MerchandiseCartCard from './cards/merchandise-cartcard'
import { CartItem } from '@/lib/types/common-types'

interface Props {
    items: CartItem[]
    onDelete: (itemId: string) => void
}

const MerchandiseItems = ({ items, onDelete }: Props) => {
    return (
        <>
            {items.length > 0 && (
                <div>
                    <ItemHeader firstCol="Merchandise" />
                    {items.map((item) => (
                        <MerchandiseCartCard
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

export default MerchandiseItems
