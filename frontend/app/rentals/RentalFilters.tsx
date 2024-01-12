'use client'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import React, { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { getMerchandiseCategoryData } from '@/lib/data/MerchandiseData'
import { SelectBox } from '@/components/common/SelectBox'
import { useLocal } from '@/contexts/SetLocalContext'

interface Props {
    selectedCategory: string
    setSelectedCategory: React.Dispatch<React.SetStateAction<string>>
    showOffers: boolean
    setShowOffers: React.Dispatch<React.SetStateAction<boolean>>
    minPrice: number
    setMinPrice: React.Dispatch<React.SetStateAction<number>>
    maxPrice: number
    setMaxPrice: React.Dispatch<React.SetStateAction<number>>
}

interface Item {
    value: string
    label: string
}

const RentalFilters = ({
    selectedCategory,
    setSelectedCategory,
    showOffers,
    setShowOffers,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
}: Props) => {
    const [categories, setCategories] = useState<Item[]>([])
    const { local } = useLocal()

    // Min price filter
    const handleMinPriceChange = (value: number) => {
        setMinPrice(value)
    }

    // Max price filter
    const handleMaxPriceChange = (value: number) => {
        setMaxPrice(value)
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const mappedCategories = await getMerchandiseCategoryData()
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

    return (
        <Card className="mt-20">
            {/* Filters */}
            <div className="px-4 py-4">
                {/* Category select */}
                <div className="mb-4">
                    <label
                        htmlFor="category-select"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Category
                    </label>
                    <SelectBox
                        items={categories}
                        value={selectedCategory}
                        setValue={setSelectedCategory}
                        title="category"
                    />
                </div>
                {/* Show Offers */}
                <div className="mb-4">
                    <label className="flex items-center gap-2 font-medium text-gray-700">
                        <input
                            type="checkbox"
                            className="form-checkbox"
                            checked={showOffers}
                            onChange={(e) => setShowOffers(e.target.checked)}
                        />
                        <span className="text-sm">Show Offers</span>
                    </label>
                </div>
                {/* Price range */}
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

export default RentalFilters
