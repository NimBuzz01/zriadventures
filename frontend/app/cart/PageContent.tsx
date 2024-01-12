'use client'
import SubHero from '@/components/common/SubHero'
import React, { useEffect, useState } from 'react'
import ExperienceItems from './ExperienceItems'
import Summary from './Summary'
import NotFoundLabel from '@/components/NotFoundLabel'
import MainButton from '@/components/common/MainButton'
import EventItems from './EventItems'
import { useLocal } from '@/contexts/SetLocalContext'
import MerchandiseItems from './MerchandiseItems'
import VoucherItems from './VoucherItems'
import RentalItems from './RentalItems'

const PageContent = () => {
    const [cartItems, setCartItems] = useState<any | null>([])
    const { key } = useLocal()

    // Function to retrieve items from local storage and filter them
    const getFilteredItems = (
        itemType: 'EXPERIENCE' | 'MERCHANDISE' | 'VOUCHER' | 'EVENT' | 'RENTAL'
    ) => {
        return cartItems.filter((item: any) => item.itemType === itemType)
    }

    useEffect(() => {
        // Retrieve items from local storage (replace 'cartItems' with your actual storage key)
        const storedCartItems = JSON.parse(
            localStorage.getItem('Cart') || '[]'
        ) as any[]

        // Check if the retrieved data is not null
        if (Array.isArray(storedCartItems)) {
            setCartItems(storedCartItems)
        }
    }, [key])

    const handleDeleteItem = (id: string) => {
        const updatedCartItems = cartItems.filter(
            (item: any) => item.item.id !== id
        )
        setCartItems(updatedCartItems)
        localStorage.setItem('Cart', JSON.stringify(updatedCartItems))
    }
    return (
        <div>
            <SubHero title="Cart" image={['/images/eco-2.jpg']} />
            {cartItems.length > 0 ? (
                <div className="flex min-h-screen w-full flex-col justify-center gap-16 px-4 py-16 sm:px-10 lg:flex-row xl:gap-24">
                    <>
                        <div className="w-full max-w-[1100px]">
                            <div className="flex items-center justify-between">
                                <h1 className="text-xl font-semibold uppercase tracking-wide md:text-2xl lg:text-3xl">
                                    My Cart
                                </h1>
                                <p className="self-end text-xl font-semibold uppercase tracking-wide">
                                    {cartItems.length} Items
                                </p>
                            </div>
                            <div className="my-4 w-full border-t border-gray-200" />
                            <div className="min-h-[400px]" key={key}>
                                <>
                                    <ExperienceItems
                                        items={getFilteredItems('EXPERIENCE')}
                                        onDelete={handleDeleteItem}
                                    />
                                    <EventItems
                                        items={getFilteredItems('EVENT')}
                                        onDelete={handleDeleteItem}
                                    />
                                    <MerchandiseItems
                                        items={getFilteredItems('MERCHANDISE')}
                                        onDelete={handleDeleteItem}
                                    />
                                    <RentalItems
                                        items={getFilteredItems('RENTAL')}
                                        onDelete={handleDeleteItem}
                                    />
                                    <VoucherItems
                                        items={getFilteredItems('VOUCHER')}
                                        onDelete={handleDeleteItem}
                                    />
                                </>
                            </div>
                        </div>
                        <div className="w-full lg:w-96">
                            <Summary cartItems={cartItems} />
                        </div>
                    </>
                </div>
            ) : (
                <div className="flex min-h-[300px] flex-col items-center justify-center gap-6 py-16">
                    <NotFoundLabel
                        text="No Items in the Cart"
                        minHeight="min-h-none"
                    />
                    <MainButton text="Continue Shopping" href="/" />
                </div>
            )}
        </div>
    )
}

export default PageContent
