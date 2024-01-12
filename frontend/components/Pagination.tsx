'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

interface Props {
    currentPage: number
    totalPages: number
    handlePagination: (value: number) => void
    route?: string
}

const Pagination = ({
    currentPage,
    totalPages,
    handlePagination,
    route,
}: Props) => {
    const router = useRouter()
    return (
        <div className="my-4 flex flex-wrap justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, index) => {
                if (
                    index === 0 ||
                    index === totalPages - 1 ||
                    (index >= currentPage - 2 && index <= currentPage + 2)
                ) {
                    return (
                        <button
                            key={index}
                            className={`h-10 w-10 rounded-lg ${
                                currentPage === index + 1
                                    ? 'bg-green-600 text-white'
                                    : 'bg-gray-200 text-gray-600'
                            }`}
                            onClick={() => {
                                handlePagination(index + 1)
                                route && router.push(route)
                            }}
                        >
                            {index + 1}
                        </button>
                    )
                } else if (
                    (index === currentPage + 3 && index !== totalPages - 1) ||
                    (index === currentPage - 3 && index !== 0)
                ) {
                    return (
                        <button
                            key={index}
                            className="h-10 w-10 rounded-lg bg-gray-200 text-gray-600"
                            onClick={() => {
                                handlePagination(-1)
                                route && router.push(route)
                            }}
                        >
                            ...
                        </button>
                    )
                }
                return null
            })}
        </div>
    )
}

export default Pagination
