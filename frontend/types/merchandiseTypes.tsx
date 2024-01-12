export interface MerchandiseCategory {
    name: string
    id: string
}

interface Images {
    src: string
    alt: string
}

interface Cost {
    USD: number
    LKR: number
}

interface CartItem {
    id: string
    quantity: number
    selectedOption: Option
    merchandise: MerchandiseTypes
}

interface Option {
    id: string
    name: string
    cost: Cost
}

interface Options {
    type: string
    option: Option[]
}
export interface MerchandiseTypes {
    name: string
    id: string
    category: MerchandiseCategory
    options: Options
    images: Images[]
    shortDescription: string
    features: string[]
    description: string
    additionalInformation: string
    terms: string[]
    trending: boolean
    onlyRental: boolean
    offer: number | null
}

export interface MerchandiseCart {
    item: CartItem
    itemType: 'EXPERIENCE' | 'MERCHANDISE' | 'VOUCHER' | 'EVENT' | 'RENTAL'
}
