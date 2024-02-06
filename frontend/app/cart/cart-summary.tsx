import MainButton from '@/components/common/main-button'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCheckout } from '@/contexts/checkout-context'
import { useLocal } from '@/contexts/local-context'
import { CartItem, ItemType } from '@/lib/types/common-types'
import { EventCartItem } from '@/lib/types/event-types'
import { ExperienceCartItem } from '@/lib/types/experience-types'
import { MerchandiseCartItem } from '@/lib/types/merchandise-types'
import { RentalCartItem } from '@/lib/types/rental-types'
import { VoucherCartItem } from '@/lib/types/voucher-types'
import {
    calculateEventTotal,
    calculateExperienceTotal,
    calculateMerchTotal,
    calculateRentalTotal,
    calculateVoucherTotal,
    formatDate,
    getFilteredItems,
} from '@/lib/utils'
import { validateVoucherId } from '@/lib/utils/strapi-utils'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface Props {
    cartItems: CartItem[]
}

const Summary = ({ cartItems }: Props) => {
    const { local } = useLocal()
    const { setItems, editPaymentStatus, paymentStatus, setVoucherAdded } =
        useCheckout()
    const [total, setTotal] = useState({ USD: 0, LKR: 0 })
    const [experienceTotal, setExperienceTotal] = useState({ USD: 0, LKR: 0 })
    const [merchTotal, setMerchTotal] = useState({ USD: 0, LKR: 0 })
    const [rentalTotal, setRentalTotal] = useState({ USD: 0, LKR: 0 })
    const [eventTotal, setEventTotal] = useState({ USD: 0, LKR: 0 })
    const [voucherTotal, setVoucherTotal] = useState({ USD: 0, LKR: 0 })
    const [shippingTotal, setShippingTotal] = useState({ USD: 0, LKR: 0 })
    const [couponCode, setCouponCode] = useState('')
    const [coupon, setCoupon] = useState({ id: 0, USD: 0, LKR: 0 })

    const handleCouponClaim = async () => {
        const response = await validateVoucherId(couponCode, local)
        if (response === 'Valid') {
            const temp = localStorage.getItem('Coupon')
            if (temp) {
                const coupon = JSON.parse(temp)
                if (coupon.currency === 'USD') {
                    setCoupon({
                        id: coupon.id,
                        USD: coupon.amount,
                        LKR: 0,
                    })
                } else if (coupon.currency === 'LKR') {
                    setCoupon({
                        id: coupon.id,
                        USD: 0,
                        LKR: coupon.amount,
                    })
                }
                toast.success('Your coupon is added!')
            }
        } else {
            toast.error('An error occured: ' + response)
        }
    }

    const calculateAndSetTotal = (
        category: ItemType,
        setTotalFunc: React.Dispatch<
            React.SetStateAction<{ USD: number; LKR: number }>
        >
    ) => {
        const filteredItems = getFilteredItems(cartItems, category)
        let total = { USD: 0, LKR: 0 }
        filteredItems.forEach((item) => {
            let itemTotal = { USD: 0, LKR: 0 }

            switch (category) {
                case 'EVENT':
                    itemTotal = calculateEventTotal(item.item as EventCartItem)
                    break
                case 'EXPERIENCE':
                    itemTotal = calculateExperienceTotal(
                        item.item as ExperienceCartItem
                    )
                    break
                case 'VOUCHER':
                    itemTotal = calculateVoucherTotal(
                        item.item as VoucherCartItem
                    )
                    break
                case 'RENTAL':
                    itemTotal = calculateRentalTotal(
                        item.item as RentalCartItem
                    )
                    break
                case 'MERCHANDISE':
                    itemTotal = calculateMerchTotal(
                        item.item as MerchandiseCartItem
                    )
                    break
            }

            total.USD += itemTotal.USD
            total.LKR += itemTotal.LKR
        })
        setTotalFunc(total)
    }

    useEffect(() => {
        calculateAndSetTotal('EXPERIENCE', setExperienceTotal)
        calculateAndSetTotal('EVENT', setEventTotal)
        calculateAndSetTotal('MERCHANDISE', setMerchTotal)
        calculateAndSetTotal('VOUCHER', setVoucherTotal)
        calculateAndSetTotal('RENTAL', setRentalTotal)
    }, [cartItems])

    useEffect(() => {
        setTotal({
            USD:
                experienceTotal.USD +
                eventTotal.USD +
                merchTotal.USD +
                rentalTotal.USD +
                voucherTotal.USD +
                shippingTotal.USD -
                coupon.USD,
            LKR:
                experienceTotal.LKR +
                eventTotal.LKR +
                merchTotal.LKR +
                rentalTotal.LKR +
                voucherTotal.LKR +
                shippingTotal.LKR -
                coupon.LKR,
        })
    }, [
        experienceTotal,
        eventTotal,
        merchTotal,
        rentalTotal,
        voucherTotal,
        shippingTotal,
        coupon,
    ])

    useEffect(() => {
        if (total.USD < 0 || total.LKR < 0) {
            setTotal({ USD: 0, LKR: 0 })
        }
    }, [total])

    const router = useRouter()

    const handleCheckout = () => {
        let currency: string
        let tempTotal: number
        if (local) {
            currency = 'LKR'
            tempTotal = total.LKR
        } else {
            currency = 'USD'
            tempTotal = total.USD
        }

        const experiences: any[] = getFilteredItems(cartItems, 'EXPERIENCE')

        const simplifiedExperiences = experiences.map((experience) => {
            const { name } = experience.item.experience
            const { offer } = experience.item.experience
            const simplifiedExtras = experience.item.extras.map(
                (extra: { name: any; quantity: any }) => {
                    const { name, quantity } = extra
                    return { name, quantity }
                }
            )

            return {
                id: experience.item.id,
                name,
                offer,
                adults: experience.item.adults,
                children: experience.item.children,
                checkInTime: experience.item.checkInTime,
                date: formatDate(experience.item.date.toString().split('T')[0]),
                duration: experience.item.duration,
                extras: simplifiedExtras,
                itemType: experience.itemType,
            }
        })

        const events: any[] = getFilteredItems(cartItems, 'EVENT')

        const simplifiedEvents = events.map((event) => {
            const { name } = event.item.event
            const { startDate } = event.item.event

            return {
                id: event.item.id,
                name,
                startDate,
                info: event.item.info,
                itemType: event.itemType,
            }
        })

        const merchandise: any[] = getFilteredItems(cartItems, 'MERCHANDISE')

        const simplifiedMerchandise = merchandise.map((merch) => {
            const { name } = merch.item.merchandise
            const { offer } = merch.item.merchandise
            const { type } = merch.item.merchandise.options

            return {
                id: merch.item.id,
                name,
                offer,
                type,
                selectedOption: merch.item.selectedOption,
                quantity: merch.item.quantity,
                itemType: merch.itemType,
            }
        })

        const rentals: any[] = getFilteredItems(cartItems, 'RENTAL')

        const simplifiedRentals = rentals.map((rental) => {
            const { item, ...rest } = rental.item.rental
            const { startDate } = rental.item
            const { endDate } = rental.item
            const { quantity } = rental.item
            const { itemType } = rental
            return { ...rest, startDate, endDate, quantity, itemType }
        })

        const vouchers: any[] = getFilteredItems(cartItems, 'VOUCHER')

        const simplifiedVouchers = vouchers.map((voucher) => {
            const newItem: any = { ...voucher }
            if (newItem.voucher.voucherExperience?.item.experience) {
                newItem.voucher.voucherExperience.item.name =
                    newItem.voucher.voucherExperience.item.experience.name
                delete newItem.voucher.voucherExperience.item.experience
            }
            return newItem
        })

        if (simplifiedVouchers.length > 0) {
            setVoucherAdded(true)
        } else {
            setVoucherAdded(false)
        }

        const combinedItems: any[] = [
            ...simplifiedExperiences,
            ...simplifiedEvents,
            ...simplifiedMerchandise,
            ...simplifiedRentals,
            ...simplifiedVouchers,
        ]

        setItems(combinedItems)

        editPaymentStatus({
            ...paymentStatus,
            status: 'PENDING',
            currency: currency,
            tempTotal: tempTotal,
            total: tempTotal,
            payAmount: tempTotal,
        })
        router.push('/checkout')
    }

    return (
        <>
            <h1 className="mb-4 text-xl font-semibold uppercase tracking-wide md:text-2xl lg:text-3xl">
                Order Summary
            </h1>
            <div className="mb-4 w-full border-t border-gray-200" />
            <div className="flex justify-between p-1 font-semibold">
                <p className="text-gray-800">Items</p>
            </div>
            {(experienceTotal.USD > 0 || experienceTotal.LKR > 0) && (
                <div className="flex justify-between p-1 text-sm">
                    <p className="text-gray-800">Experiences</p>
                    <p className="font-medium text-gray-800">
                        {local ? (
                            <>LKR {experienceTotal.LKR.toFixed(2)}</>
                        ) : (
                            <>USD ${experienceTotal.USD.toFixed(2)}</>
                        )}
                    </p>
                </div>
            )}
            {(eventTotal.USD > 0 || eventTotal.LKR > 0) && (
                <div className="flex justify-between p-1 text-sm">
                    <p className="text-gray-800">Events</p>
                    <p className="font-medium text-gray-800">
                        {local ? (
                            <>LKR {eventTotal.LKR.toFixed(2)}</>
                        ) : (
                            <>USD ${eventTotal.USD.toFixed(2)}</>
                        )}
                    </p>
                </div>
            )}
            {(merchTotal.USD > 0 || merchTotal.LKR > 0) && (
                <div className="flex justify-between p-1 text-sm">
                    <p className="text-gray-800">Merchandise</p>
                    <p className="font-medium text-gray-800">
                        {local ? (
                            <>LKR {merchTotal.LKR.toFixed(2)}</>
                        ) : (
                            <>USD ${merchTotal.USD.toFixed(2)}</>
                        )}
                    </p>
                </div>
            )}
            {(rentalTotal.USD > 0 || rentalTotal.LKR > 0) && (
                <div className="flex justify-between p-1 text-sm">
                    <p className="text-gray-800">Rentals</p>
                    <p className="font-medium text-gray-800">
                        {local ? (
                            <>LKR {rentalTotal.LKR.toFixed(2)}</>
                        ) : (
                            <>USD ${rentalTotal.USD.toFixed(2)}</>
                        )}
                    </p>
                </div>
            )}
            {(voucherTotal.USD > 0 || voucherTotal.LKR > 0) && (
                <div className="flex justify-between p-1 text-sm">
                    <p className="text-gray-800">Vouchers</p>
                    <p className="font-medium text-gray-800">
                        {local ? (
                            <>LKR {voucherTotal.LKR.toFixed(2)}</>
                        ) : (
                            <>USD ${voucherTotal.USD.toFixed(2)}</>
                        )}
                    </p>
                </div>
            )}

            {/*
            <div className="flex justify-between p-1 mt-4 text-sm">
                <p className="text-gray-800">Shipping</p>
                <p className="text-gray-800">
                    {local ? (
                        <>LKR {shippingTotal.LKR}</>
                    ) : (
                        <>USD ${shippingTotal.USD}</>
                    )}
                </p>
            </div> */}
            <div className="mt-6 flex items-center gap-2">
                <Input
                    type="text"
                    id="coupon"
                    name="coupon"
                    value={couponCode}
                    placeholder="Enter Coupon Code"
                    onChange={(e) => {
                        setCouponCode(e.target.value)
                    }}
                />
                <Button onClick={handleCouponClaim}>Apply</Button>
            </div>

            <div className="my-4 w-full border-t border-gray-200" />
            {coupon.id > 0 && (
                <div className="flex justify-between p-1 font-semibold">
                    <p className="text-gray-800">Discount</p>
                    <p className="text-gray-800">
                        {local ? (
                            <>LKR {coupon.LKR.toFixed(2)}</>
                        ) : (
                            <>USD ${coupon.USD.toFixed(2)}</>
                        )}
                    </p>
                </div>
            )}
            <div className="mb-4 flex justify-between p-1 font-semibold">
                <p className="text-gray-800">Total</p>
                <p className="text-gray-800">
                    {local ? (
                        <>LKR {total.LKR.toFixed(2)}</>
                    ) : (
                        <>USD ${total.USD.toFixed(2)}</>
                    )}
                </p>
            </div>
            <div className="flex flex-col gap-2">
                <MainButton text="Checkout" onClick={handleCheckout} />
                <MainButton
                    text="Continue Shopping"
                    href="/"
                    bgColor="bg-gray-600 hover:bg-gray-800"
                />
            </div>
        </>
    )
}

export default Summary
