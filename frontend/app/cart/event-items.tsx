import React from 'react'
import ItemHeader from './item-header'
import EventCartCard from './cards/event-cartcard'
import { CartItem } from '@/lib/types/common-types'

interface Props {
    items: CartItem[]
    onDelete: (itemId: string) => void
}

const EventItems = ({ items, onDelete }: Props) => {
    return (
        <>
            {items.length > 0 && (
                <div>
                    <ItemHeader firstCol="Events" />
                    {items.map((item) => (
                        <EventCartCard
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

export default EventItems
