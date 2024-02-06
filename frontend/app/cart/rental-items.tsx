import React from 'react'
import ItemHeader from './item-header'
import RentalCartCard from './cards/rental-cartcard'
import { CartItem } from '@/lib/types/common-types'

interface Props {
    items: CartItem[]
    onDelete: (itemId: string) => void
}

const RentalItems = ({ items, onDelete }: Props) => {
    return (
        <>
            {items.length > 0 && (
                <div>
                    <ItemHeader firstCol="Rentals" />
                    {items.map((item) => (
                        <RentalCartCard
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

export default RentalItems
