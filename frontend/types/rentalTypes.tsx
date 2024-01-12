import { MerchandiseTypes } from './merchandiseTypes'

interface Option {
    duration: string
    cost: {
        USD: number
        LKR: number
    }
}

export interface RentalTypes {
    id: string
    name: string
    item: MerchandiseTypes
    options: Option[]
}

interface CartItem {
    id: string
    quantity: number
    selectedOption: Option
    startDate: Date
    endDate: Date
    rental: RentalTypes
}

export interface RentalCart {
    item: CartItem
    itemType: 'EXPERIENCE' | 'MERCHANDISE' | 'VOUCHER' | 'EVENT' | 'RENTAL'
}
