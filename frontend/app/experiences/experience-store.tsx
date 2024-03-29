'use client'
import ExperienceCard from '@/components/cards/experience-card'
import React, { Suspense, useEffect, useState } from 'react'
import ExperienceFilters from './experience-filters'
import MainHeader from '@/components/common/main-header'
import { useSearchParams } from 'next/navigation'
import { useDataContext } from '@/contexts/data-context'
import NotFoundLabel from '@/components/notfound-label'
import { useLocal } from '@/contexts/local-context'
import Pagination from '@/components/pagination-bar'
import SearchBar from '@/components/common/search-bar'
import Loading from '@/components/loading'
import { ExperienceTypes } from '@/lib/types/experience-types'

const ExperienceStore = () => {
    const { experiences } = useDataContext()
    const { local } = useLocal()
    const [filteredExperiences, setFilteredExperiences] = useState<
        ExperienceTypes[] | null
    >(null)
    const [currentExperiences, setCurrentExperiences] = useState<
        ExperienceTypes[] | null
    >(null)
    const itemsPerPage = 9
    const [currentPage, setCurrentPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState('')

    const searchParams = useSearchParams()

    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedLocation, setSelectedLocation] = useState('')
    const [selectedDuration, setSelectedDuration] = useState('')
    const [showOffers, setShowOffers] = useState(false)
    const [showBundles, setShowBundles] = useState(false)
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(local ? 200000 : 200)

    // Parse the destination query parameter from the URL
    useEffect(() => {
        const location = searchParams.get('location')
        const duration = searchParams.get('duration')
        const category = searchParams.get('category')
        const showOffers = searchParams.get('offers')
        const showBundles = searchParams.get('bundles')
        const minPrice = searchParams.get('minPrice')
        const maxPrice = searchParams.get('maxPrice')
        if (location) {
            setSelectedLocation(location)
        }
        if (duration) {
            setSelectedDuration(duration)
        }
        if (category) {
            setSelectedCategory(category)
        }
        if (showOffers) {
            setShowOffers(true)
        }
        if (showBundles) {
            setShowBundles(true)
        }
        if (minPrice) {
            setMinPrice(parseInt(minPrice))
        }
        if (maxPrice) {
            setMaxPrice(parseInt(maxPrice))
        }
    }, [searchParams])

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value)
        setCurrentPage(1)
    }

    useEffect(() => {
        const filteredExperiences = experiences.filter((experience) => {
            const matchesSearchQuery = experience.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
            const matchesCategory = selectedCategory
                ? experience.category.some(
                      (category) =>
                          category.id.toLowerCase() ===
                          selectedCategory.toLowerCase()
                  )
                : true
            const matchesLocation = selectedLocation
                ? experience.location.id.toLowerCase() ===
                  selectedLocation.toLowerCase()
                : true
            const hasOffer = showOffers ? experience.offer : true
            const isBundle = showBundles ? experience.bundle : true
            const convertToLowestPrice = (paxRates: any, local: boolean) => {
                const lowestPrice = Math.min(
                    ...paxRates.map(
                        (paxRate: any) => paxRate.rates[local ? 'LKR' : 'USD']
                    )
                )
                return lowestPrice
            }

            const matchesPriceRange = experience.options.some((option) => {
                const paxRates = option.paxRates
                const lowestPrice = convertToLowestPrice(paxRates, local)

                return lowestPrice >= minPrice && lowestPrice <= maxPrice
            })

            const convertDurationToHours = (
                amount: number,
                type: 'Minutes' | 'Hours' | 'Days'
            ) => {
                if (type === 'Minutes') {
                    return amount / 60
                } else if (type === 'Days') {
                    return amount * 24
                }
                return amount // Return as is for hours
            }

            const matchesDuration = selectedDuration
                ? experience.options.some((option) => {
                      const { amount, type } = option.duration
                      const durationInHours = convertDurationToHours(
                          amount,
                          type
                      )

                      if (selectedDuration === '1-hour-or-less') {
                          return durationInHours <= 1
                      } else if (selectedDuration === '2-4-hours') {
                          return durationInHours >= 2 && durationInHours <= 4
                      } else if (selectedDuration === '4-10-hours') {
                          return durationInHours >= 4 && durationInHours <= 10
                      } else if (selectedDuration === 'overnight') {
                          return durationInHours >= 24 // 24 hours or more
                      }

                      return true // Default case
                  })
                : true

            return (
                matchesSearchQuery &&
                matchesCategory &&
                matchesLocation &&
                hasOffer &&
                isBundle &&
                matchesPriceRange &&
                matchesDuration
            )
        })
        if (experiences.length > 0) {
            setFilteredExperiences(filteredExperiences)
        }
    }, [
        experiences,
        searchQuery,
        selectedCategory,
        selectedDuration,
        selectedLocation,
        showOffers,
        showBundles,
        minPrice,
        maxPrice,
    ])

    const totalPages = Math.ceil(
        filteredExperiences ? filteredExperiences.length / itemsPerPage : 0
    )

    const handlePagination = (pageNumber: number) => {
        if (pageNumber === -1) {
            setCurrentPage(totalPages)
        } else {
            setCurrentPage(pageNumber)
        }
    }

    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage

    useEffect(() => {
        setCurrentExperiences(
            filteredExperiences
                ? filteredExperiences.slice(startIndex, endIndex)
                : null
        )
    }, [filteredExperiences, currentPage])

    return (
        <div
            className="flex w-full flex-col items-center justify-center px-2 py-10 sm:px-10"
            id="experience-store-items"
        >
            <MainHeader subtitle="All in one" title="Our Experiences" />
            <div className="w-full border-t-2 border-gray-200"></div>
            <div className="flex w-full flex-col lg:flex-row">
                <div className="my-5 flex w-full flex-col gap-4 px-2 sm:px-0 lg:mb-0 lg:w-[500px]">
                    <SearchBar
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <ExperienceFilters
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        selectedLocation={selectedLocation}
                        setSelectedLocation={setSelectedLocation}
                        showOffers={showOffers}
                        setShowOffers={setShowOffers}
                        showBundles={showBundles}
                        setShowBundles={setShowBundles}
                        minPrice={minPrice}
                        setMinPrice={setMinPrice}
                        maxPrice={maxPrice}
                        setMaxPrice={setMaxPrice}
                        selectedDuration={selectedDuration}
                        setSelectedDuration={setSelectedDuration}
                    />
                </div>
                <div className="flex w-full flex-col items-center px-2">
                    <Suspense fallback={<Loading />}>
                        {currentExperiences == null ? (
                            <Loading />
                        ) : currentExperiences.length > 0 ? (
                            <div className="flex flex-wrap items-center justify-center gap-4 py-4">
                                {currentExperiences.map((experience) => (
                                    <ExperienceCard
                                        key={experience.id}
                                        experience={experience}
                                        width="w-[22rem] sm:w-96"
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
                        route="#experience-store-items"
                    />
                </div>
            </div>
        </div>
    )
}

export default ExperienceStore
