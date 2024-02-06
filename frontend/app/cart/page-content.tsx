'use client'
import SubHero from '@/components/common/sub-hero'
import React, { useEffect, useState } from 'react'
import ExperienceItems from './experience-items'
import Summary from './cart-summary'
import NotFoundLabel from '@/components/notfound-label'
import MainButton from '@/components/common/main-button'
import EventItems from './event-items'
import { useLocal } from '@/contexts/local-context'
import MerchandiseItems from './merchandise-items'
import VoucherItems from './voucher-items'
import RentalItems from './rental-items'
import { getFilteredItems } from '@/lib/utils'

const PageContent = () => {
    const [cartItems, setCartItems] = useState<any | null>([])
    const { key } = useLocal()

    useEffect(() => {
        const storedCartItems = JSON.parse(
            localStorage.getItem('Cart') || '[]'
        ) as any[]

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
                                        items={getFilteredItems(
                                            cartItems,
                                            'EXPERIENCE'
                                        )}
                                        onDelete={handleDeleteItem}
                                    />
                                    <EventItems
                                        items={getFilteredItems(
                                            cartItems,
                                            'EVENT'
                                        )}
                                        onDelete={handleDeleteItem}
                                    />
                                    <MerchandiseItems
                                        items={getFilteredItems(
                                            cartItems,
                                            'MERCHANDISE'
                                        )}
                                        onDelete={handleDeleteItem}
                                    />
                                    <RentalItems
                                        items={getFilteredItems(
                                            cartItems,
                                            'RENTAL'
                                        )}
                                        onDelete={handleDeleteItem}
                                    />
                                    <VoucherItems
                                        items={getFilteredItems(
                                            cartItems,
                                            'VOUCHER'
                                        )}
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
