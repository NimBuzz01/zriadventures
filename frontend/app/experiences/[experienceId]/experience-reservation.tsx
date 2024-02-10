'use client'
import BlurImage from '@/components/common/blur-image'
import DatePicker from '@/components/common/date-picker'
import MainButton from '@/components/common/main-button'
import QuantitySelector from '@/components/common/quantity-selector'
import TimePicker from '@/components/common/time-picker'
import { Card } from '@/components/ui/card'
import { useExperience } from '@/contexts/experience-context'
import { useLocal } from '@/contexts/local-context'
import { CartItem } from '@/lib/types/common-types'
import { ExperienceExtras, ExperienceTypes } from '@/lib/types/experience-types'
import { getExperiencePrices } from '@/lib/utils'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

interface Props {
    experience: ExperienceTypes
    addType: 'ADDTOCART' | 'BUYNOW' | 'GIFT' | null
}

interface InputErrors {
    pax?: string
    date?: string
    checkInTime?: string
    terms?: string
}

const Reservation = ({ experience, addType }: Props) => {
    const { local, setKey } = useLocal()
    const router = useRouter()

    const [termsChecked, setTermsChecked] = useState(false)
    const [inputErrors, setInputErrors] = useState<InputErrors>({})

    const [success, setSuccess] = useState(false)

    const {
        adults,
        child,
        date,
        checkInTime,
        requests,
        extras,
        selectedExperiences,
        selectedDuration,
        setAdults,
        setChild,
        setDate,
        setCheckInTime,
        setRequests,
        setExtras,
        setSelectedExperiences,
        setSelectedDuration,
        resetContext,
    } = useExperience()

    useEffect(() => {
        if (addType === 'GIFT') {
            setCheckInTime('11:11am')
        }
    }, [])

    const handleSubmit = () => {
        const newErrors: InputErrors = {}

        if (!adults && !child) {
            newErrors.pax = 'Please select Pax'
        }
        if (!date) {
            newErrors.date = 'Please select a date.'
        }
        if (!checkInTime) {
            newErrors.checkInTime = 'Please select a check-in time.'
        }

        if (!termsChecked) {
            newErrors.terms = 'Please accept the terms and conditions.'
        }

        if (Object.keys(newErrors).length > 0) {
            setInputErrors(newErrors)
            return
        }

        const cartItem: CartItem = {
            item: {
                id: uuidv4(),
                date: date,
                duration: selectedDuration,
                checkInTime: checkInTime,
                adults: adults,
                children: child,
                requests: requests,
                experience: selectedExperiences[0],
                extras: extras,
            },
            itemType: 'EXPERIENCE',
        }

        if (addType === 'GIFT') {
            localStorage.setItem('GIFT', JSON.stringify(cartItem))
            setSuccess(true)
            setKey()
            return
        }

        const existingCartJSON = localStorage.getItem('Cart')

        if (existingCartJSON !== null) {
            const existingCart = JSON.parse(existingCartJSON)

            const cartArray = Array.isArray(existingCart) ? existingCart : []

            cartArray.push(cartItem)

            localStorage.setItem('Cart', JSON.stringify(cartArray))
        } else {
            localStorage.setItem('Cart', JSON.stringify([cartItem]))
        }
        setSuccess(true)
        setKey()
        resetContext()
        experience.extras.forEach((extra) => {
            extra.quantity = 0
        })

        if (addType === 'BUYNOW') {
            router.push('/cart')
        } else if (addType === 'ADDTOCART') {
            router.push('#success-cart')
        }
    }

    useEffect(() => {
        setSelectedExperiences([experience])
        setSelectedDuration(experience.options[0].duration)
    }, [])

    const handleAddExtra = (newExtra: ExperienceExtras) => {
        setExtras((prevExtras) => {
            const updatedExtras = prevExtras.map((extra) => {
                if (extra.id === newExtra.id) {
                    return { ...extra, quantity: newExtra.quantity }
                }
                return extra
            })

            const filteredExtras = updatedExtras.filter(
                (extra) => extra.quantity > 0
            )

            if (
                !filteredExtras.some((extra) => extra.id === newExtra.id) &&
                newExtra.quantity > 0
            ) {
                return [...filteredExtras, newExtra]
            }

            return filteredExtras
        })
    }

    const adjustedPrices = getExperiencePrices(
        selectedDuration,
        adults + child,
        experience.options
    )

    const calculateTotal = (adjustedPrices: any) => {
        const adultTotalUSD = adjustedPrices.adult.USD * adults
        const childTotalUSD = adjustedPrices.child.USD * child

        const adultTotalLKR = adjustedPrices.adult.LKR * adults
        const childTotalLKR = adjustedPrices.child.LKR * child

        let extrasTotalUSD = 0
        let extrasTotalLKR = 0

        if (extras) {
            for (const extra of extras) {
                extrasTotalUSD += extra.cost.USD * extra.quantity
                extrasTotalLKR += extra.cost.LKR * extra.quantity
            }
        }

        const total = {
            USD: adultTotalUSD + childTotalUSD + extrasTotalUSD,
            LKR: adultTotalLKR + childTotalLKR + extrasTotalLKR,
        }

        return total
    }

    return (
        <div className="flex items-center justify-center bg-gray-50 pb-16">
            <Card className="w-full max-w-[1000px] bg-blue-50 p-6">
                {success ? (
                    <div className="flex h-[600px] flex-col items-center justify-center">
                        <div className="relative h-32 w-32">
                            <BlurImage
                                src="/icons/cart-success.png"
                                alt="Cart Success"
                                objectFit="contain"
                            />
                        </div>
                        <p className="mb-10 mt-4 text-center text-2xl font-medium">
                            Success! Experience added to Cart.
                        </p>
                        <MainButton
                            href="/experiences"
                            text="Browse more Experiences"
                        />
                    </div>
                ) : (
                    <>
                        <h1 className="mb-10 mt-10 text-center text-lg font-medium sm:text-xl md:text-2xl">
                            Configure your experience
                        </h1>
                        <Card className="mb-4 mt-5 flex flex-col items-center justify-center py-10 ">
                            <p className="mb-4 font-medium text-blue-800 sm:text-lg md:text-xl">
                                Select Duration
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {experience.options.map((option) => (
                                    <label
                                        key={
                                            option.duration.type +
                                            '-' +
                                            option.duration.amount
                                        }
                                        className={`inline-flex items-center rounded-md border-2 px-3 py-2 text-sm font-medium uppercase ${
                                            selectedDuration?.type ===
                                                option.duration.type &&
                                            selectedDuration?.amount ===
                                                option.duration.amount
                                                ? 'border-gray-400 bg-gray-100 text-blue-950'
                                                : 'border-gray-300'
                                        } cursor-pointer`}
                                    >
                                        <input
                                            type="radio"
                                            value={
                                                option.duration.type +
                                                '-' +
                                                option.duration.amount
                                            }
                                            checked={
                                                selectedDuration?.type ===
                                                    option.duration.type &&
                                                selectedDuration?.amount ===
                                                    option.duration.amount
                                            }
                                            onChange={() =>
                                                setSelectedDuration(
                                                    option.duration
                                                )
                                            }
                                            className="peer mr-2 hidden"
                                        />
                                        {option.duration.amount}{' '}
                                        {option.duration.type}
                                    </label>
                                ))}
                            </div>
                        </Card>
                        <div className="mb-10 flex flex-wrap justify-center gap-6 sm:gap-10">
                            <Card className="flex w-56 flex-col items-center px-5 py-8 shadow-lg shadow-blue-200 md:w-64">
                                <p className="mb-4 font-medium text-blue-800 sm:text-lg md:text-xl">
                                    Adults
                                </p>
                                <p className="text-xs sm:text-sm">Per Person</p>
                                <p className="mb-4 font-medium sm:text-lg">
                                    {local ? (
                                        <>LKR {adjustedPrices?.adult.LKR}</>
                                    ) : (
                                        <>USD ${adjustedPrices?.adult.USD}</>
                                    )}
                                </p>
                                <p className="text-xs sm:text-sm">Select Pax</p>
                                <QuantitySelector
                                    value={adults}
                                    setValue={(value: number) => {
                                        setAdults(value)
                                    }}
                                />
                                {inputErrors.pax && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {inputErrors.pax}
                                    </p>
                                )}
                                <p className="mt-4 text-xs sm:text-sm">Total</p>
                                <p className="text-lg font-medium">
                                    {local ? (
                                        <>
                                            LKR{' '}
                                            {adjustedPrices?.adult.LKR * adults}
                                        </>
                                    ) : (
                                        <>
                                            USD $
                                            {adjustedPrices?.adult.USD * adults}
                                        </>
                                    )}
                                </p>
                            </Card>
                            <Card className="flex w-56 flex-col items-center px-5 py-8 shadow-lg shadow-blue-200 md:w-64">
                                <p className="mb-4 font-medium text-blue-800 sm:text-lg md:text-xl">
                                    Children
                                </p>
                                <p className="text-xs sm:text-sm">Per Person</p>
                                <p className="mb-4 font-medium sm:text-lg">
                                    {local ? (
                                        <>LKR {adjustedPrices?.child.LKR}</>
                                    ) : (
                                        <>USD ${adjustedPrices?.child.USD}</>
                                    )}
                                </p>
                                <p className="text-xs sm:text-sm">Select Pax</p>
                                <QuantitySelector
                                    value={child}
                                    setValue={(value: number) => {
                                        setChild(value)
                                    }}
                                />
                                {inputErrors.pax && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {inputErrors.pax}
                                    </p>
                                )}
                                <p className="mt-4 text-xs sm:text-sm">Total</p>
                                <p className="text-lg font-medium">
                                    {local ? (
                                        <>
                                            LKR{' '}
                                            {adjustedPrices &&
                                                adjustedPrices?.child.LKR *
                                                    child}
                                        </>
                                    ) : (
                                        <>
                                            USD $
                                            {adjustedPrices &&
                                                adjustedPrices?.child.USD *
                                                    child}
                                        </>
                                    )}
                                </p>
                            </Card>
                        </div>
                        <div className="flex items-center">
                            <div className="flex-grow border-t border-gray-400"></div>
                            <span className="mx-4 flex-shrink text-gray-400">
                                Extras
                            </span>
                            <div className="flex-grow border-t border-gray-400"></div>
                        </div>
                        {experience.extras && (
                            <div className="mb-10 mt-6 flex flex-wrap justify-center gap-6 text-center md:gap-10">
                                {experience.extras.map((extra) => (
                                    <Card
                                        className="flex w-56 flex-col items-center px-5 py-8 shadow-lg shadow-blue-200 md:w-64"
                                        key={extra.id}
                                    >
                                        <p className="mb-4 font-medium text-blue-800 sm:text-lg md:text-xl">
                                            {extra.name}
                                        </p>
                                        <p className="text-xs sm:text-sm">
                                            Per Person
                                        </p>
                                        <p className="mb-4 text-lg font-medium sm:text-xl">
                                            {local ? (
                                                <>LKR {extra.cost.LKR}</>
                                            ) : (
                                                <>USD ${extra.cost.USD}</>
                                            )}
                                        </p>
                                        <p className="text-xs sm:text-sm">
                                            Select Pax
                                        </p>
                                        <QuantitySelector
                                            value={extra.quantity}
                                            setValue={(value: number) => {
                                                extra.quantity = value
                                                handleAddExtra(extra)
                                            }}
                                        />
                                        <p className="mt-4 text-xs sm:text-sm">
                                            Total
                                        </p>
                                        <p className="text-lg font-medium">
                                            {local ? (
                                                <>
                                                    LKR{' '}
                                                    {extra.cost.LKR *
                                                        extra.quantity}
                                                </>
                                            ) : (
                                                <>
                                                    USD $
                                                    {extra.cost.USD *
                                                        extra.quantity}
                                                </>
                                            )}
                                        </p>
                                    </Card>
                                ))}
                            </div>
                        )}
                        <div className="flex flex-col lg:flex-row">
                            {addType !== 'GIFT' && (
                                <div className="flex flex-col justify-center">
                                    <div className="mt-4 flex flex-col lg:mt-0 lg:p-4">
                                        <p className="mb-1 text-xs font-medium text-gray-500 sm:text-sm">
                                            Start Date
                                        </p>
                                        <DatePicker
                                            value={date}
                                            setValue={setDate}
                                        />
                                    </div>
                                    {inputErrors.date && (
                                        <p className="text-xs text-red-500">
                                            {inputErrors.date}
                                        </p>
                                    )}
                                    <div className="relative mt-4 flex flex-col lg:mt-0 lg:p-4">
                                        <p className="mb-1 text-xs font-medium text-gray-500 sm:text-sm">
                                            Estimated check in time
                                        </p>
                                        <TimePicker
                                            value={checkInTime}
                                            setValue={(value: string) => {
                                                setCheckInTime(value)
                                            }}
                                        />
                                        {inputErrors.checkInTime && (
                                            <p className="absolute -bottom-1 mt-1 text-xs text-red-500">
                                                {inputErrors.checkInTime}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="mt-4 flex flex-grow flex-col lg:px-4">
                                <p className="mb-1 text-xs font-medium text-gray-500 sm:text-sm">
                                    Additional requests
                                </p>
                                <textarea
                                    rows={7}
                                    className="max-w-[700px] rounded-md border p-3 text-xs text-gray-600 sm:text-sm"
                                    value={requests}
                                    onChange={(event) => {
                                        const value = event.target.value
                                        setRequests(value)
                                    }}
                                />
                            </div>
                        </div>
                        <div className="mb-2 mt-6 flex-grow border-t border-gray-300"></div>
                        <div className="flex flex-col items-start gap-4 lg:flex-row lg:items-center">
                            <p className="mr-auto flex items-end gap-2 lg:ml-4">
                                <p className="text-xs text-gray-600 sm:text-base">
                                    Total
                                    <span className="ml-1 text-2xl font-semibold text-gray-800">
                                        {selectedDuration && adjustedPrices && (
                                            <>
                                                {local ? (
                                                    <>
                                                        LKR{' '}
                                                        {
                                                            calculateTotal(
                                                                adjustedPrices
                                                            ).LKR
                                                        }
                                                    </>
                                                ) : (
                                                    <>
                                                        USD $
                                                        {
                                                            calculateTotal(
                                                                adjustedPrices
                                                            ).USD
                                                        }
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </span>
                                </p>
                                <p className="text-xl font-semibold sm:text-2xl"></p>
                            </p>
                            <div className="flex flex-col gap-1">
                                <div className="relative mr-4 flex items-center">
                                    <input
                                        id="link-checkbox"
                                        type="checkbox"
                                        value=""
                                        className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                                        checked={termsChecked}
                                        onChange={(e) =>
                                            setTermsChecked(e.target.checked)
                                        }
                                    />
                                    <label
                                        htmlFor="link-checkbox"
                                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                        I agree with the{' '}
                                        <Link
                                            href="/terms-and-conditions"
                                            target="_blank"
                                            className="text-blue-600 hover:underline dark:text-blue-500"
                                        >
                                            terms and conditions
                                        </Link>
                                        .
                                    </label>
                                    {inputErrors.terms && (
                                        <p className="absolute top-5 text-xs text-red-500">
                                            {inputErrors.terms}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <button
                                onClick={handleSubmit}
                                className="mt-2 bg-green-600 px-5 py-3 text-base font-semibold uppercase text-white transition-all hover:bg-green-800 sm:mt-0 sm:text-lg"
                            >
                                {addType === 'BUYNOW'
                                    ? 'Proceed to Checkout'
                                    : 'Add to Cart'}
                            </button>
                        </div>
                    </>
                )}
            </Card>
        </div>
    )
}

export default Reservation
