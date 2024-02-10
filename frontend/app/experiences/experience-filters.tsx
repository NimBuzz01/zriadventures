'use client'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import React, { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import {
    getExperienceCategoryData,
    getExperienceLocationData,
} from '@/lib/data/experience-data'
import { SelectBox } from '@/components/common/select-box'
import { useLocal } from '@/contexts/local-context'

interface Props {
    selectedCategory: string
    setSelectedCategory: React.Dispatch<React.SetStateAction<string>>
    selectedLocation: string
    setSelectedLocation: React.Dispatch<React.SetStateAction<string>>
    showOffers: boolean
    setShowOffers: React.Dispatch<React.SetStateAction<boolean>>
    showBundles: boolean
    setShowBundles: React.Dispatch<React.SetStateAction<boolean>>
    minPrice: number
    setMinPrice: React.Dispatch<React.SetStateAction<number>>
    maxPrice: number
    setMaxPrice: React.Dispatch<React.SetStateAction<number>>
    selectedDuration: string
    setSelectedDuration: React.Dispatch<React.SetStateAction<string>>
}

interface Item {
    value: string
    label: string
}

const ExperienceFilters = ({
    selectedCategory,
    setSelectedCategory,
    selectedLocation,
    setSelectedLocation,
    showOffers,
    setShowOffers,
    showBundles,
    setShowBundles,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    selectedDuration,
    setSelectedDuration,
}: Props) => {
    const [locations, setLocations] = useState<Item[]>([])
    const [categories, setCategories] = useState<Item[]>([])
    const [durations] = useState<Item[]>([
        { label: '1 Hour or Less', value: '1-hour-or-less' },
        { label: '2-4 Hours', value: '2-4-hours' },
        { label: '4-10 Hours', value: '4-10-hours' },
        { label: 'Overnight', value: 'overnight' },
    ])
    const { local } = useLocal()

    useEffect(() => {
        async function fetchData() {
            try {
                const mappedLocations = await getExperienceLocationData()
                const formattedLocations = mappedLocations.map((location) => ({
                    value: location.id,
                    label: location.name,
                }))
                setLocations(formattedLocations)

                const mappedCategories = await getExperienceCategoryData()
                const formattedCategories = mappedCategories.map(
                    (category) => ({
                        value: category.id,
                        label: category.name,
                    })
                )
                setCategories(formattedCategories)
            } catch (error) {
                console.error('Error fetching and mapping data:', error)
            }
        }

        fetchData()
    }, [])

    // Offers filter
    const handleOffersChange = () => {
        setShowOffers(!showOffers)
    }

    const handleBundlesChange = () => {
        setShowBundles(!showBundles)
    }

    // Min price filter
    const handleMinPriceChange = (value: number) => {
        setMinPrice(value)
    }

    // Max price filter
    const handleMaxPriceChange = (value: number) => {
        setMaxPrice(value)
    }

    return (
        <Card>
            <div className="rounded-lg border border-gray-200 bg-white p-4">
                {/* Category filter */}
                <label
                    htmlFor="category"
                    className="mb-1 block text-sm font-medium"
                >
                    Category
                </label>
                <SelectBox
                    items={categories}
                    value={selectedCategory}
                    setValue={setSelectedCategory}
                    title="category"
                />

                {/* Location filter */}
                <label
                    htmlFor="location"
                    className="mb-1 mt-4 block text-sm font-medium"
                >
                    Location
                </label>
                <SelectBox
                    items={locations}
                    value={selectedLocation}
                    setValue={setSelectedLocation}
                    title="location"
                />
                {/* Duration filter */}
                <label
                    htmlFor="duration"
                    className="mb-1 mt-4 block text-sm font-medium"
                >
                    Duration
                </label>
                <SelectBox
                    items={durations}
                    value={selectedDuration}
                    setValue={setSelectedDuration}
                    title="duration"
                />
                {/* Show Offers filter */}
                <div className="mt-4 flex items-center gap-4">
                    <input
                        type="checkbox"
                        id="showOffers"
                        className="form-checkbox ml-2 focus:ring focus:ring-blue-200"
                        checked={showOffers}
                        onChange={handleOffersChange}
                    />
                    <label
                        htmlFor="showOffers"
                        className="block text-sm font-medium"
                    >
                        Show Offers
                    </label>
                </div>
                <div className="mt-4 flex items-center gap-4">
                    <input
                        type="checkbox"
                        id="showBundles"
                        className="form-checkbox ml-2 focus:ring focus:ring-blue-200"
                        checked={showBundles}
                        onChange={handleBundlesChange}
                    />
                    <label
                        htmlFor="showBundles"
                        className="block text-sm font-medium"
                    >
                        Show Bundles
                    </label>
                </div>
                <div className="mb-4 mt-4">
                    <div className="flex items-center justify-between text-sm font-medium text-gray-500">
                        <label
                            htmlFor="price-slider"
                            className="block font-medium text-gray-700"
                        >
                            Price
                        </label>
                        {local ? (
                            <>
                                LKR {minPrice} - {maxPrice}
                            </>
                        ) : (
                            <>
                                USD ${minPrice} - ${maxPrice}
                            </>
                        )}
                    </div>

                    <div className="p-2">
                        <Slider
                            range
                            allowCross={false}
                            min={0}
                            max={local ? 200000 : 200}
                            value={[minPrice, maxPrice]}
                            onChange={(value) => {
                                if (Array.isArray(value) && value.length > 0) {
                                    handleMinPriceChange(value[0])
                                    handleMaxPriceChange(value[1])
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default ExperienceFilters
