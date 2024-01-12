import React from 'react'
import ExperienceCartCard from './cards/ExperienceCartCard'
import ItemHeader from './ItemHeader'
import { EventCart } from '@/types/eventTypes'
import EventCartCard from './cards/EventCartCard'

interface Props {
    items: EventCart[]
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
