import React from 'react'
import ExperienceCartCard from './cards/experience-cartcard'
import ItemHeader from './item-header'
import { CartItem } from '@/lib/types/common-types'

interface Props {
    items: CartItem[]
    onDelete: (itemId: string) => void
}

const ExperienceItems = ({ items, onDelete }: Props) => {
    return (
        <>
            {items.length > 0 && (
                <div>
                    <ItemHeader firstCol="Experiences" />
                    {items.map((item) => (
                        <ExperienceCartCard
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

export default ExperienceItems
