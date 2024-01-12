export interface ExperienceCategory {
    name: string
    id: string
    type: 'water' | 'land' | 'air'
}

export interface ExperienceLocation {
    name: string
    id: string
    coordinates: { latitude: number; longitude: number }
    description: string
    trending: boolean
    image: Images
    googleMapsLink: string
}

export interface ExperienceDuration {
    type: 'Minutes' | 'Hours' | 'Days'
    amount: number
}

interface Images {
    src: string
    alt: string
}

interface FAQ {
    question: string
    answer: string
}

interface Requirements {
    name: string
    description: string
}

export interface VoucherTemplate {
    id: string
    name: string
    src: string
    alt: string
}

interface About {
    shortDescription: string
    longDescription: string
}

interface PaxRates {
    minPax: number
    maxPax: number
    rates: {
        USD: number
        LKR: number
    }
}

export interface ExperienceOptions {
    duration: ExperienceDuration
    paxRates: PaxRates
    childCostReduction: {
        USD: number
        LKR: number
    }
}

export interface ExperienceExtras {
    id: string
    name: string
    cost: {
        USD: number
        LKR: number
    }
    quantity: number
}

export interface ExperienceTypes {
    name: string
    id: string
    category: ExperienceCategory[]
    location: ExperienceLocation
    difficulty: string
    options: ExperienceOptions[]
    images: Images[]
    about: About
    included: string[]
    extras: ExperienceExtras[]
    requirements: Requirements[]
    faq: FAQ[]
    terms: string[]
    suitedVoucher: VoucherTemplate[]
    trending: boolean
    offer: number | null
    bundle: boolean
}

interface CartItem {
    id: string
    date: Date
    checkInTime: string
    duration: ExperienceDuration
    adults: number
    children: number
    requests: string
    experience: ExperienceTypes
    extras: ExperienceExtras[]
}

export interface ExperienceCart {
    item: CartItem
    itemType: 'EXPERIENCE' | 'MERCHANDISE' | 'VOUCHER' | 'EVENT' | 'RENTAL'
}
