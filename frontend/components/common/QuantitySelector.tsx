'use client'
import React from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

interface Props {
    value: number
    setValue: any
}

const QuantitySelector = ({ value, setValue }: Props) => {
    return (
        <div className="flex  items-center gap-1">
            <button
                disabled={value < 1}
                onClick={() => {
                    setValue(value - 1)
                }}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm border border-gray-300 bg-white transition-all hover:bg-gray-200"
            >
                <AiOutlineMinus />
            </button>
            <input
                type="number"
                id="quantity"
                value={value}
                disabled={value < 1}
                onChange={(e) => {
                    setValue(parseInt(e.target.value))
                }}
                className="block w-16 rounded-sm border border-gray-300 bg-white px-2.5 py-[0.38rem] text-center text-sm text-gray-900 [appearance:textfield] focus:border-blue-500 focus:ring-blue-500 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none "
            />
            <button
                onClick={() => {
                    setValue(value + 1)
                }}
                className="flex  h-8 w-8 items-center justify-center rounded-sm border border-gray-300 bg-white transition-all hover:bg-gray-200"
            >
                <AiOutlinePlus />
            </button>
        </div>
    )
}

export default QuantitySelector
