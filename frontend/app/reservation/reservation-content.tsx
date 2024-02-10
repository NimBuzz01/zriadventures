'use client'
import { Card } from '@/components/ui/card'
import { ItemType } from '@/lib/types/common-types'
import { useSearchParams } from 'next/navigation'
import React, { Suspense, useEffect, useState } from 'react'
import ReservationExperience from './reservation-experience'
import NotFoundLabel from '@/components/notfound-label'
import Loading from '@/components/loading'

const itemTypeMap: { [key: string]: ItemType } = {
    experience: 'EXPERIENCE',
    merchandise: 'MERCHANDISE',
    rental: 'RENTAL',
    voucher: 'VOUCHER',
    event: 'EVENT',
}

const reservationMap: { [key: string]: 'BUYNOW' | 'ADDTOCART' | 'GIFT' } = {
    buynow: 'BUYNOW',
    addtocart: 'ADDTOCART',
    gift: 'GIFT',
}

const ReservationContent = () => {
    const searchParams = useSearchParams()

    const [itemType, setItemType] = useState<ItemType | null>(null)
    const [reservation, setReservation] = useState<
        'BUYNOW' | 'ADDTOCART' | 'GIFT' | null
    >(null)
    const [itemId, setItemId] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const itemType = searchParams.get('itemType')
        const itemId = searchParams.get('itemId')
        const reservation = searchParams.get('reservation')

        if (itemType && itemTypeMap[itemType]) {
            setItemType(itemTypeMap[itemType])
        }

        if (itemId) {
            setItemId(itemId)
        }

        if (reservation && reservationMap[reservation]) {
            setReservation(reservationMap[reservation])
        }
        setLoading(false)
    }, [searchParams])

    return (
        <div className="flex min-h-screen w-full justify-center bg-gray-50 py-28">
            <Card className="w-full max-w-[1000px] bg-blue-50">
                <Suspense fallback={<Loading />}>
                    {loading ? (
                        <Loading />
                    ) : (
                        <>
                            {itemType === 'EXPERIENCE' && itemId ? (
                                <ReservationExperience
                                    id={itemId}
                                    reservation={reservation}
                                />
                            ) : (
                                <NotFoundLabel text={'Invalid Reservation'} />
                            )}
                        </>
                    )}
                </Suspense>
            </Card>
        </div>
    )
}

export default ReservationContent
