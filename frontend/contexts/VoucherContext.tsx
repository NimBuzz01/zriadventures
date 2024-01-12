'use client'
import { ExperienceCart } from '@/types/experienceTypes'
import { createContext, useContext, useState, ReactNode } from 'react'

type VoucherType = 'Cash' | 'Experience'
type GiftTo = 'Self' | 'Someone'

interface VoucherContextProps {
    voucherId: string
    voucherTemplate: string
    voucherImage: string
    giftTo: GiftTo
    recipientName: string
    recipientEmail: string
    senderName: string
    personalMessage: string
    voucherType: VoucherType
    cashAmount?: number
    selectedExperience?: ExperienceCart
    quantity: number
    couponId: string
    validDate: Date
}

interface VoucherContextActions {
    setVoucherId: (voucherId: string) => void
    setVoucherTemplate: (template: string) => void
    setVoucherImage: (image: string) => void
    setGiftTo: (giftTo: GiftTo) => void
    setRecipientName: (name: string) => void
    setRecipientEmail: (email: string) => void
    setSenderName: (name: string) => void
    setPersonalMessage: (message: string) => void
    setVoucherType: (type: VoucherType) => void
    setCashAmount: (amount: number) => void
    setSelectedExperience: (experience: ExperienceCart) => void
    setQuantity: (quantity: number) => void
    setCouponId: (id: string) => void
    setValidDate: (date: Date) => void
    clearVoucher: () => void
}

interface VoucherProviderProps {
    children: ReactNode
}

const DefaultVoucherContext: VoucherContextProps = {
    voucherId: '',
    voucherTemplate: '',
    voucherImage: '',
    giftTo: 'Someone',
    recipientName: '',
    recipientEmail: '',
    senderName: '',
    personalMessage: '',
    voucherType: 'Cash',
    cashAmount: 0,
    quantity: 1,
    couponId: '',
    validDate: new Date('15-07-2001'),
}

const VoucherContext = createContext<VoucherContextProps | undefined>(undefined)

const VoucherActionsContext = createContext<VoucherContextActions | undefined>(
    undefined
)

export const useVoucher = () => {
    const context = useContext(VoucherContext)
    if (!context) {
        throw new Error('useVoucher must be used within a VoucherProvider')
    }
    return context
}

export const useVoucherActions = () => {
    const context = useContext(VoucherActionsContext)
    if (!context) {
        throw new Error(
            'useVoucherActions must be used within a VoucherProvider'
        )
    }
    return context
}

const VoucherProvider: React.FC<VoucherProviderProps> = ({ children }) => {
    const [voucher, setVoucher] = useState<VoucherContextProps>(
        DefaultVoucherContext
    )

    const setVoucherId = (voucherId: string) => {
        setVoucher((prev) => ({ ...prev, voucherId }))
    }

    const setVoucherTemplate = (template: string) => {
        setVoucher((prev) => ({ ...prev, voucherTemplate: template }))
    }

    const setVoucherImage = (image: string) => {
        setVoucher((prev) => ({ ...prev, voucherImage: image }))
    }

    const setGiftTo = (giftTo: GiftTo) => {
        setVoucher((prev) => ({ ...prev, giftTo: giftTo }))
    }

    const setRecipientName = (name: string) => {
        setVoucher((prev) => ({ ...prev, recipientName: name }))
    }

    const setRecipientEmail = (email: string) => {
        setVoucher((prev) => ({ ...prev, recipientEmail: email }))
    }

    const setSenderName = (name: string) => {
        setVoucher((prev) => ({ ...prev, senderName: name }))
    }

    const setPersonalMessage = (message: string) => {
        setVoucher((prev) => ({ ...prev, personalMessage: message }))
    }

    const setVoucherType = (type: VoucherType) => {
        setVoucher((prev) => ({ ...prev, voucherType: type }))
    }

    const setCashAmount = (amount: number) => {
        setVoucher((prev) => ({ ...prev, cashAmount: amount }))
    }

    const setSelectedExperience = (experience: ExperienceCart) => {
        setVoucher((prev) => ({ ...prev, selectedExperience: experience }))
    }

    const setQuantity = (quantity: number) => {
        setVoucher((prev) => ({ ...prev, quantity: quantity }))
    }

    const setCouponId = (id: string) => {
        setVoucher((prev) => ({ ...prev, couponId: id }))
    }

    const setValidDate = (date: Date) => {
        setVoucher((prev) => ({ ...prev, validDate: date }))
    }

    const clearVoucher = () => {
        setVoucherId('')
        setVoucherTemplate('')
        setVoucherImage('')
        setGiftTo('Self')
        setRecipientName('')
        setRecipientEmail('')
        setSenderName('')
        setPersonalMessage('')
        setVoucherType('Cash')
        setCashAmount(0)
        setQuantity(0)
        setCouponId('')
        setValidDate(new Date())
    }

    const voucherActions: VoucherContextActions = {
        setVoucherId,
        setVoucherTemplate,
        setVoucherImage,
        setGiftTo,
        setRecipientName,
        setRecipientEmail,
        setSenderName,
        setPersonalMessage,
        setVoucherType,
        setCashAmount,
        setSelectedExperience,
        setQuantity,
        setCouponId,
        setValidDate,
        clearVoucher,
    }

    return (
        <VoucherContext.Provider value={voucher}>
            <VoucherActionsContext.Provider value={voucherActions}>
                {children}
            </VoucherActionsContext.Provider>
        </VoucherContext.Provider>
    )
}

export default VoucherProvider
