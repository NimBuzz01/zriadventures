'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

export type PersonalInfo = {
    firstName: string
    lastName: string
    email: string
    nationality: string
    addrLine1: string
    addrLine2: string
    city: string
    postalCode: string
    contactNumber: string
}

export type PaymentStatus = {
    orderId: string
    status: 'PENDING' | 'SUCCESS' | 'FAILED'
    currency: string
    option: 'PAYHERE' | 'BANK' | 'KOKO' | 'MINTPAY'
    amountType: 'ADVANCE' | 'FULL' | 'INSTALLMENT'
    total: number
    tempTotal: number
    payAmount: number
}

type CheckoutContextType = {
    items: any[]
    personalInfo: PersonalInfo
    paymentStatus: PaymentStatus
    isVoucherAdded: boolean
    editPaymentStatus: (status: PaymentStatus) => void
    setItems: (items: any[]) => void
    setPersonalInfo: (personalInfo: PersonalInfo) => void
    clearAllValues: () => void
    setVoucherAdded: (status: boolean) => void
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(
    undefined
)

export function CheckoutProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<any[]>([])
    const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
        firstName: '',
        lastName: '',
        email: '',
        nationality: '',
        addrLine1: '',
        addrLine2: '',
        city: '',
        postalCode: '',
        contactNumber: '',
    })
    const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>({
        orderId: '',
        status: 'PENDING',
        amountType: 'FULL',
        option: 'PAYHERE',
        currency: 'USD',
        total: 0,
        tempTotal: 0,
        payAmount: 0,
    })
    const [isVoucherAdded, setIsVoucherAdded] = useState(false)

    const editPaymentStatus = (status: PaymentStatus) => {
        setPaymentStatus(status)
    }

    const setVoucherAdded = (status: boolean) => {
        setIsVoucherAdded(status)
    }

    const clearAllValues = () => {
        setItems([])
        setPersonalInfo({
            firstName: '',
            lastName: '',
            email: '',
            nationality: '',
            addrLine1: '',
            addrLine2: '',
            city: '',
            postalCode: '',
            contactNumber: '',
        })
        setPaymentStatus({
            orderId: '',
            status: 'PENDING',
            currency: 'USD',
            option: 'PAYHERE',
            amountType: 'FULL',
            total: 0,
            tempTotal: 0,
            payAmount: 0,
        })
    }

    return (
        <CheckoutContext.Provider
            value={{
                items,
                personalInfo,
                paymentStatus,
                isVoucherAdded,
                editPaymentStatus,
                setPersonalInfo,
                setItems,
                clearAllValues,
                setVoucherAdded,
            }}
        >
            {children}
        </CheckoutContext.Provider>
    )
}

export function useCheckout() {
    const context = useContext(CheckoutContext)
    if (context === undefined) {
        throw new Error('useCheckout must be used within a CheckoutProvider')
    }
    return context
}
