import { getExperienceTotal } from '@/contexts/ExperienceContext'
import { EventCart } from '@/types/eventTypes'
import { ExperienceCart } from '@/types/experienceTypes'
import { MerchandiseCart } from '@/types/merchandiseTypes'
import { RentalCart } from '@/types/rentalTypes'
import { VoucherCart } from '@/types/voucherTypes'

const getFilteredItems = (
    items: any,
    itemType: 'EXPERIENCE' | 'MERCHANDISE' | 'VOUCHER' | 'EVENT' | 'RENTAL'
) => {
    return items.filter((item: any) => item.itemType === itemType)
}

interface MintpayProduct {
    name: string
    product_id: string
    sku: string
    quantity: number
    unit_price: number
    discount: number
    created_date: Date
    updated_date: Date
}

export function createMintpayProducts() {
    const local = localStorage.getItem('Cart')
    let items: any[] = []
    if (local) {
        items = JSON.parse(local)
    }
    const experiences: ExperienceCart[] = getFilteredItems(items, 'EXPERIENCE')
    const merchandise: MerchandiseCart[] = getFilteredItems(
        items,
        'MERCHANDISE'
    )
    const vouchers: VoucherCart[] = getFilteredItems(items, 'VOUCHER')
    const events: EventCart[] = getFilteredItems(items, 'EVENT')
    const rentals: RentalCart[] = getFilteredItems(items, 'RENTAL')

    const filteredExperiences: MintpayProduct[] = experiences.map(
        (item: ExperienceCart) => {
            return {
                name: item.item.experience.name,
                product_id: item.item.experience.id,
                sku: 'Experience',
                quantity: 1,
                unit_price: getExperienceTotal(
                    item.item.experience,
                    item.item.duration,
                    item.item.adults,
                    item.item.children,
                    item.item.extras
                ).LKR,
                discount: item.item.experience.offer ?? 0,
                created_date: new Date(),
                updated_date: new Date(),
            }
        }
    )

    const filteredMerchandise: MintpayProduct[] = merchandise.map(
        (item: MerchandiseCart) => {
            return {
                name: item.item.merchandise.name,
                product_id: item.item.merchandise.id,
                sku: 'Merchandise',
                quantity: item.item.quantity,
                unit_price: item.item.selectedOption.cost.LKR,
                discount: item.item.merchandise.offer ?? 0,
                created_date: new Date(),
                updated_date: new Date(),
            }
        }
    )
    const filteredVouchers: MintpayProduct[] = vouchers.map(
        (item: VoucherCart) => {
            return {
                name: item.item.voucher.voucherType,
                product_id: item.item.id,
                sku: 'Voucher',
                quantity: 1,
                unit_price: item.item.voucher.voucherAmount?.amount ?? 0,
                discount: 0,
                created_date: new Date(),
                updated_date: new Date(),
            }
        }
    )
    const filteredEvents: MintpayProduct[] = events.map((item: EventCart) => {
        return {
            name: item.item.event.name,
            product_id: item.item.event.id,
            sku: 'Event',
            quantity: item.item.info.pax,
            unit_price: item.item.event.cost.LKR,
            discount: 0,
            created_date: new Date(),
            updated_date: new Date(),
        }
    })
    const filteredRentals: MintpayProduct[] = rentals.map(
        (item: RentalCart) => {
            return {
                name: item.item.rental.name,
                product_id: item.item.rental.id,
                sku: 'Rental',
                quantity: item.item.quantity,
                unit_price: item.item.selectedOption.cost.LKR,
                discount: 0,
                created_date: new Date(),
                updated_date: new Date(),
            }
        }
    )

    const combinedItems: MintpayProduct[] = [
        ...filteredExperiences,
        ...filteredEvents,
        ...filteredMerchandise,
        ...filteredRentals,
        ...filteredVouchers,
    ]

    return combinedItems
}
