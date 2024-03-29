'use client'
import React, { Suspense, useEffect, useState } from 'react'
import MainHeader from '@/components/common/main-header'
import { useDataContext } from '@/contexts/data-context'
import NotFoundLabel from '@/components/notfound-label'
import { useLocal } from '@/contexts/local-context'
import RentalFilters from './rental-filters'
import RentalsCard from '@/components/cards/rental-card'
import Pagination from '@/components/pagination-bar'
import { useRouter } from 'next/navigation'
import SearchBar from '@/components/common/search-bar'
import { RentalTypes } from '@/lib/types/rental-types'
import Loading from '@/components/loading'

const RentalStore = () => {
    const { rentals } = useDataContext()
    const { local } = useLocal()
    const router = useRouter()
    const itemsPerPage = 8
    const [currentPage, setCurrentPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const [showOffers, setShowOffers] = useState(false)
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(local ? 200000 : 200)

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value)
        setCurrentPage(1)
    }

    // Filter experiences based on the search query and selected filters
    const filteredRentals = rentals.filter((rental: RentalTypes) => {
        const matchesSearchQuery = rental.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        const matchesCategory = selectedCategory
            ? rental.item.category.id === selectedCategory
            : true
        // const hasOffer = showOffers ? rental.item.offer : true
        const convertToLowestPrice = (rates: any, local: boolean) => {
            const lowestPrice = Math.min(rates[local ? 'LKR' : 'USD'])

            return lowestPrice
        }

        const matchesPriceRange = rental.options.some((option) => {
            const rates = option.cost
            const lowestPrice = convertToLowestPrice(rates, local)

            return lowestPrice >= minPrice && lowestPrice <= maxPrice
        })

        return (
            matchesSearchQuery &&
            matchesCategory &&
            // hasOffer &&
            matchesPriceRange
        )
    })

    const totalPages = Math.ceil(filteredRentals.length / itemsPerPage)

    const handlePagination = (pageNumber: number) => {
        if (pageNumber === -1) {
            setCurrentPage(totalPages)
        } else {
            setCurrentPage(pageNumber)
        }
    }

    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentRentals = filteredRentals.slice(startIndex, endIndex)

    return (
        <div
            className="flex w-full flex-col items-center justify-center px-2 py-10 sm:px-10"
            id="#rentals-store-items"
        >
            <MainHeader subtitle="Our Rentals" title="Our Rentals Catalog" />
            <div className="w-full border-t-2 border-gray-200"></div>
            <div className="flex w-full flex-col lg:flex-row">
                <div className="mb-5 w-full lg:mb-0 lg:w-[500px]">
                    <RentalFilters
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        showOffers={showOffers}
                        setShowOffers={setShowOffers}
                        minPrice={minPrice}
                        setMinPrice={setMinPrice}
                        maxPrice={maxPrice}
                        setMaxPrice={setMaxPrice}
                    />
                </div>
                <div className="flex w-full flex-col items-center px-2">
                    <SearchBar
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <Suspense fallback={<Loading />}>
                        {currentRentals.length > 0 ? (
                            <div
                                className="flex flex-wrap items-center justify-center gap-4 py-4"
                                id="experience-store-items"
                            >
                                {currentRentals.map((rental: RentalTypes) => (
                                    <RentalsCard
                                        key={rental.id}
                                        rental={rental}
                                        width="w-72"
                                    />
                                ))}
                            </div>
                        ) : (
                            <NotFoundLabel text="Sorry! No search results found" />
                        )}
                    </Suspense>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        handlePagination={handlePagination}
                    />
                </div>
            </div>
        </div>
    )
}

export default RentalStore
