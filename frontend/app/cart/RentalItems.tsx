import React from 'react'
import ItemHeader from './ItemHeader'
import { MerchandiseCart } from '@/types/merchandiseTypes'
import MerchandiseCartCard from './cards/MerchandiseCartCard'
import RentalCartCard from './cards/RentalCartCard'
import { RentalCart } from '@/types/rentalTypes'

interface Props {
    items: RentalCart[]
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
