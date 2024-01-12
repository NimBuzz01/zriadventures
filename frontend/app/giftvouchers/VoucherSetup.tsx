'use client'
import React, { useEffect, useState } from 'react'
import VoucherTemplate from './VoucherTemplate'
import VoucherDetails from './VoucherDetails'
import VoucherOverview from './VoucherOverview'
import { Card } from '@/components/ui/card'
import { useRouter } from 'next/navigation'

const VoucherSetup: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(0)
    const router = useRouter()

    useEffect(() => {
        if (currentStep > 0) {
            router.push('#voucher-config')
        }
    }, [currentStep])

    return (
        <div className="mb-10">
            <div className="flex flex-wrap items-center justify-center gap-2">
                <h1
                    className={`flex w-72 items-center justify-center gap-2 rounded-br-3xl rounded-tl-3xl border py-3 text-lg font-medium
                ${
                    currentStep === 0 ? 'bg-blue-950 text-white' : 'bg-gray-300'
                }`}
                >
                    1 . Select Template
                </h1>
                <h1
                    className={`flex w-72 items-center justify-center gap-2 rounded-br-3xl rounded-tl-3xl border py-3 text-lg font-medium
                ${
                    currentStep === 1 ? 'bg-blue-950 text-white' : 'bg-gray-300'
                }`}
                >
                    2 . Personalize
                </h1>
                <h1
                    className={`flex w-72 items-center justify-center gap-2 rounded-br-3xl rounded-tl-3xl border py-3 text-lg font-medium
                ${
                    currentStep === 2 ? 'bg-blue-950 text-white' : 'bg-gray-300'
                }`}
                >
                    3 . Overview
                </h1>
            </div>
            <div className="my-5">
                <Card>
                    {currentStep === 0 && (
                        <VoucherTemplate
                            currentStep={currentStep}
                            setCurrentStep={setCurrentStep}
                        />
                    )}
                    {currentStep === 1 && (
                        <VoucherDetails
                            currentStep={currentStep}
                            setCurrentStep={setCurrentStep}
                        />
                    )}
                    {currentStep === 2 && (
                        <VoucherOverview
                            currentStep={currentStep}
                            setCurrentStep={setCurrentStep}
                        />
                    )}
                </Card>
            </div>
        </div>
    )
}

export default VoucherSetup
