'use client'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { useEffect, useState } from 'react'
import NotFoundLabel from './notfound-label'
import MainButton from './common/main-button'
import { useLocal } from '@/contexts/local-context'
import ExperienceSideCartCard from './cards/sidecart-cards/experience-sidecartcard'
import EventSideCartCard from './cards/sidecart-cards/event-sidecartcard'
import MerchandiseSideCartCard from './cards/sidecart-cards/merchandise-sidecartcard'
import VoucherSideCartCard from './cards/sidecart-cards/voucher-sidecartcard'
import RentalSideCartCard from './cards/sidecart-cards/rental-sidecartcard'
import { calculateTotalAmount } from '@/lib/utils'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose,
} from '@/components/ui/sheet'

const CartSidebar: React.FC = () => {
    const [cartItems, setCartItems] = useState<any[]>([])
    const { local, key } = useLocal()

    // Calculate the total price from cartItems
    const [totalPrice, setTotalPrice] = useState({ USD: 0, LKR: 0 })

    useEffect(() => {
        const storedCartItems = localStorage.getItem('Cart')
        if (storedCartItems) {
            try {
                setCartItems(JSON.parse(storedCartItems))
            } catch (error) {
                console.error('Failed to parse cart items:', error)
            }
        }
    }, [key])

    const handleDeleteItem = (id: string) => {
        const updatedCartItems = cartItems.filter((item) => item.item.id !== id)
        setCartItems(updatedCartItems)
        localStorage.setItem('Cart', JSON.stringify(updatedCartItems))
    }

    useEffect(() => {
        setTotalPrice(calculateTotalAmount(cartItems))
    }, [cartItems])

    return (
        <Sheet>
            <SheetTrigger className="relative text-2xl text-white transition-all hover:text-blue-500">
                <AiOutlineShoppingCart />
                {cartItems.length > -1 && (
                    <span
                        key={cartItems.length}
                        className="absolute -bottom-1.5 -right-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 px-1 text-xs text-white"
                    >
                        {cartItems.length}
                    </span>
                )}
            </SheetTrigger>
            <SheetContent className="z-[1000] flex w-full flex-col sm:max-w-[450px]">
                <SheetHeader className="text-xl font-semibold text-blue-950">
                    <SheetTitle>My Cart</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-2 overflow-y-auto px-2 py-4 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-800">
                    {cartItems.length === 0 ? (
                        <NotFoundLabel text="No items in the cart." />
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.item.id}>
                                {item.itemType === 'EXPERIENCE' ? (
                                    <ExperienceSideCartCard
                                        item={item}
                                        onDelete={handleDeleteItem}
                                    />
                                ) : item.itemType === 'EVENT' ? (
                                    <EventSideCartCard
                                        item={item}
                                        onDelete={handleDeleteItem}
                                    />
                                ) : item.itemType === 'MERCHANDISE' ? (
                                    <MerchandiseSideCartCard
                                        item={item}
                                        onDelete={handleDeleteItem}
                                    />
                                ) : item.itemType === 'RENTAL' ? (
                                    <RentalSideCartCard
                                        item={item}
                                        onDelete={handleDeleteItem}
                                    />
                                ) : item.itemType === 'VOUCHER' ? (
                                    <VoucherSideCartCard
                                        item={item}
                                        onDelete={handleDeleteItem}
                                    />
                                ) : null}
                            </div>
                        ))
                    )}
                </div>
                <div className="mt-auto w-full">
                    <div className="flex justify-end border-t-2 border-gray-200">
                        <div className="my-3 flex items-end gap-2 text-blue-950">
                            <p className="text-sm">Total</p>
                            <h5 className="text-xl font-semibold">
                                {(totalPrice.LKR || totalPrice.USD) && (
                                    <>
                                        {local ? (
                                            <>LKR {totalPrice.LKR.toFixed(2)}</>
                                        ) : (
                                            <>
                                                USD ${totalPrice.USD.toFixed(2)}
                                            </>
                                        )}
                                    </>
                                )}
                            </h5>
                        </div>
                    </div>
                    <SheetClose asChild>
                        <MainButton href="/cart" text="View Cart" />
                    </SheetClose>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default CartSidebar
