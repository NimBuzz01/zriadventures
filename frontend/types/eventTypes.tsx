export interface EventLocation {
    name: string
    id: string
    coordinates: { latitude: number; longitude: number }
    description: string
    trending: boolean
    image: Images
    googleMapsLink: string
}

export interface EventDuration {
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

interface About {
    shortDescription: string
    longDescription: string
}

interface Cost {
    USD: number
    LKR: number
}

export interface EventTypes {
    name: string
    id: string
    location: EventLocation
    duration: EventDuration
    cost: Cost
    images: Images[]
    about: About
    included: string[]
    requirements: Requirements[]
    faq: FAQ[]
    terms: string[]
    startDate: Date
    endDate: Date
    groupSize: number
}

interface PersonalInfo {
    firstName: string
    lastName: string
    contactNumber: string
    email: string
    nationality: string
    pax: number
    requests: string
}

interface CartItem {
    id: string
    info: PersonalInfo
    event: EventTypes
}

export interface EventCart {
    item: CartItem
    itemType: 'EXPERIENCE' | 'MERCHANDISE' | 'VOUCHER' | 'EVENT' | 'RENTAL'
}
