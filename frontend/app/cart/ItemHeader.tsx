import React from 'react'

interface Props {
    firstCol: string
}

const ItemHeader = ({ firstCol }: Props) => {
    return (
        <>
            <div className="relative flex items-center py-4">
                <div className="flex-grow border-t border-gray-400"></div>
                <span className="mx-4 flex-shrink text-gray-400">
                    {firstCol}
                </span>
                <div className="flex-grow border-t border-gray-400"></div>
            </div>
        </>
    )
}

export default ItemHeader
