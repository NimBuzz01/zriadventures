import React from 'react'
import ExperienceCartCard from './cards/ExperienceCartCard'
import ItemHeader from './ItemHeader'
import { ExperienceCart } from '@/types/experienceTypes'

interface Props {
    items: ExperienceCart[]
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
