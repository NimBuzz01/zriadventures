'use client'
import { Card } from '@/components/ui/card'
import {
    TNC_BANK_DETAILS,
    TNC_CANCELS_AND_REFUNDS,
    TNC_DISCLAIMER,
    TNC_EMERGENCY,
    TNC_GENERAL_BANKTRANSFER,
    TNC_GENERAL_ONLINEGATEWAY,
    TNC_GENERAL_RESERVATIONS,
    TNC_PAYMENTS,
    TNC_PAYMENTS_LOCAL,
    TNC_PRIVACY_POLICY,
    TNC_RENTALS,
} from '@/constants/pages/TermsNConditionsConstants'
import React from 'react'
import { useLocal } from '@/contexts/SetLocalContext'

const MainContent = () => {
    const { local } = useLocal()

    return (
        <div className="flex flex-col items-center min-h-screen gap-10 py-16 text-sm bg-blue-50 sm:text-base">
            <Card className="flex w-full max-w-[1000px] flex-col items-center bg-white p-10 shadow-lg md:px-16">
                <h1 className="mb-10 text-xl font-semibold tracking-wide text-gray-600 sm:text-2xl md:text-3xl lg:text-4xl">
                    General
                </h1>
                <ul>
                    <li className="flex flex-col mb-4 font-semibold tracking-wide">
                        Reservations
                        <span className="text-base font-normal tracking-normal">
                            {TNC_GENERAL_RESERVATIONS}
                        </span>
                    </li>
                    <li className="flex flex-col mb-4 font-semibold tracking-wide">
                        Bank Transfer
                        <span className="font-normal tracking-normal">
                            {TNC_GENERAL_BANKTRANSFER}
                        </span>
                    </li>
                    <li className="flex flex-col mb-4 font-semibold tracking-wide">
                        Online Gateway
                        <span className="font-normal tracking-normal">
                            {TNC_GENERAL_ONLINEGATEWAY}
                        </span>
                    </li>
                    <li className="flex flex-col mb-4 font-semibold tracking-wide">
                        Disclaimer
                        <span className="font-normal tracking-normal">
                            {TNC_DISCLAIMER}
                        </span>
                    </li>
                    <li className="flex flex-col mb-4 font-semibold tracking-wide">
                        Emergencies
                        <span className="font-normal tracking-normal">
                            {TNC_EMERGENCY}
                        </span>
                    </li>
                </ul>
            </Card>
            <Card className="flex w-full max-w-[1000px] flex-col items-center bg-white p-10 shadow-lg md:px-16">
                <h1 className="mb-10 text-xl font-semibold tracking-wide text-gray-600 sm:text-2xl md:text-3xl lg:text-4xl">
                    Payments
                </h1>
                <ul className="self-start list-disc">
                    {local &&
                        TNC_PAYMENTS_LOCAL.map((text, index: number) => (
                            <li className="mb-4" key={index}>
                                {text}
                            </li>
                        ))}
                    {TNC_PAYMENTS.map((text, index: number) => (
                        <li className="mb-4" key={index}>
                            {text}
                        </li>
                    ))}
                </ul>
            </Card>
            <Card className="w-full max-w-[1000px] p-10 shadow-lg">
                <h1 className="text-xl font-semibold tracking-wide text-center text-gray-600 sm:text-2xl md:text-3xl lg:text-4xl">
                    Bank Details
                </h1>
                <div className="flex flex-col gap-10 p-10">
                    {TNC_BANK_DETAILS.map((details, index) => (
                        <Card
                            key={index}
                            className="flex flex-col items-start w-full p-4 bg-white"
                        >
                            <ul>
                                <li className="mb-4 font-semibold tracking-wide">
                                    {details.currency.toUpperCase()} Account
                                    Details
                                </li>
                                {details.details.map((item, index) => (
                                    <li
                                        className="flex flex-col mb-1 tracking-wide"
                                        key={index}
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    ))}
                </div>
            </Card>
            <Card className="flex w-full max-w-[1000px] flex-col items-center bg-white p-10 shadow-lg md:px-16">
                <h1 className="mb-10 text-xl font-semibold tracking-wide text-gray-600 sm:text-2xl md:text-3xl lg:text-4xl">
                    Cancellations and refunds
                </h1>
                <ul className="self-start list-disc">
                    {TNC_CANCELS_AND_REFUNDS.map((text, index) => (
                        <li key={index} className="mb-4 ">
                            {text}
                        </li>
                    ))}
                </ul>
            </Card>
            <Card className="flex w-full max-w-[1000px] flex-col items-center bg-white p-10 shadow-lg md:px-16">
                <h1 className="mb-10 text-xl font-semibold tracking-wide text-gray-600 sm:text-2xl md:text-3xl lg:text-4xl">
                    Privacy Policy
                </h1>
                <ul className="self-start list-disc">
                    {TNC_PRIVACY_POLICY.map((text, index) => (
                        <li className="mb-6" key={index}>
                            {text}
                        </li>
                    ))}
                </ul>
            </Card>
            <Card
                className="flex w-full max-w-[1000px] flex-col items-center bg-white p-10 shadow-lg md:px-16"
                id="tnc-rentals"
            >
                <h1 className="mb-10 text-xl font-semibold tracking-wide text-gray-600 sm:text-2xl md:text-3xl lg:text-4xl">
                    Rentals
                </h1>
                <ul className="self-start list-disc">
                    <li className="mb-6">
                        We would be needing the following documents before we
                        rent out to you.
                    </li>
                    <p className="mb-6">1. Proof of Billing</p>
                    <p className="mb-6">
                        2. Copy of your National Identity Card
                    </p>
                    <p className="mb-6">3. Two passport size photos</p>
                    <li className="mb-6">
                        (If you don&apos;t have local proof of address/ID, we
                        hate to do it, but orders will be cancelled)
                    </li>
                    {TNC_RENTALS.map((text, index) => (
                        <li className="mb-6" key={index}>
                            {text}
                        </li>
                    ))}
                </ul>
            </Card>
        </div>
    )
}

export default MainContent
