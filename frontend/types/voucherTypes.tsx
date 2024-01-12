import { ExperienceCart, VoucherTemplate } from './experienceTypes'

export interface VoucherTypes {
    couponId: string
    expiryDate: Date
    voucherType: 'Cash' | 'Experience'
    voucherAmount?: {
        amount: number
        currency: 'USD' | 'LKR'
    }
    voucherExperience?: ExperienceCart
    voucherTemplate: VoucherTemplate
}

interface PersonalInfo {
    sendersName: string
    recipientsName?: string
    recipientsEmail?: string
    personalMessage: string
}

interface CartItem {
    id: string
    info: PersonalInfo
    voucher: VoucherTypes
}

export interface VoucherCart {
    item: CartItem
    itemType: 'EXPERIENCE' | 'MERCHANDISE' | 'VOUCHER' | 'EVENT' | 'RENTAL'
}
