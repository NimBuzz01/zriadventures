import { ExperienceCartItem } from './experience-types'

export interface VoucherTemplate {
    id: string
    name: string
    src: string
    alt: string
}

interface PersonalInfo {
    sendersName: string
    recipientsName?: string
    recipientsEmail?: string
    personalMessage: string
}

export interface VoucherTypes {
    couponId: string
    expiryDate: Date
    voucherType: 'CASH' | 'EXPERIENCE'
    voucherAmount?: {
        amount: number
        currency: 'USD' | 'LKR'
    }
    voucherExperience?: ExperienceCartItem
    voucherTemplate: VoucherTemplate
}

export interface VoucherCartItem {
    id: string
    info: PersonalInfo
    voucher: VoucherTypes
}
