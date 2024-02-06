'use client'
import React, { useState } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

const CartCounter = () => {
    const [quantity, setQuantity] = useState(1)
    return (
        <div className="flex items-center gap-1">
            <button
                disabled={quantity < 1}
                onClick={() => {
                    setQuantity(quantity - 1)
                }}
                className="flex h-4 w-4 items-center justify-center rounded-full transition-all hover:bg-gray-200"
            >
                <AiOutlineMinus className="text-sm" />
            </button>
            <input
                type="number"
                id="quantity"
                disabled={quantity < 1}
                value={quantity}
                onChange={(e) => {
                    setQuantity(parseInt(e.target.value))
                }}
                className="block h-8 w-12 rounded-md border border-gray-300  px-2.5 text-center text-sm text-gray-900 [appearance:textfield] focus:border-blue-500 focus:ring-blue-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none "
            />
            <button
                onClick={() => {
                    setQuantity(quantity + 1)
                }}
                className="flex h-5 w-5 items-center justify-center rounded-full transition-all  hover:bg-gray-200"
            >
                <AiOutlinePlus className="text-sm" />
            </button>
        </div>
    )
}

export default CartCounter
