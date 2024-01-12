import { RentalTypes } from '@/types/rentalTypes'
import { getRentals } from '../utils/api'
import { AxiosResponse } from 'axios'

export async function getRentalsData(): Promise<RentalTypes[]> {
    const response = await getRentals()
    const mappedRental: RentalTypes[] = (
        response as AxiosResponse<RentalTypes[]>
    ).data.map((res: any) => {
        const data = res.attributes
        return {
            id: data.rentalId,
            name: data.name,
            item: {
                id: data.merchandise.data.attributes.merchandiseId,
                name: data.merchandise.data.attributes.name,
                category: {
                    id: data.merchandise.data.attributes.merchandise_category
                        .data.attributes.categoryId,
                    name: data.merchandise.data.attributes.merchandise_category
                        .data.attributes.name,
                },
                options: {
                    type: data.merchandise.data.attributes.options.type,
                    option: data.merchandise.data.attributes.options.option.map(
                        (option: any) => ({
                            id: option.optionId,
                            name: option.name,
                            cost: {
                                USD: option.cost.USD,
                                LKR: option.cost.LKR,
                            },
                        })
                    ),
                },
                images: data.merchandise.data.attributes.images.data.map(
                    (image: any) => ({
                        src: image.attributes.url.replace(/\.[^.]+$/, '.webp'),
                        alt: image.attributes.alternativeText,
                    })
                ),
                shortDescription:
                    data.merchandise.data.attributes.shortDescription,
                description: data.merchandise.data.attributes.description,
                additionalInformation:
                    data.merchandise.data.attributes.additionalInformation,
                features: data.merchandise.data.attributes.features.split('\n'),
                terms: data.merchandise.data.attributes.terms_and_condition.data.attributes.terms.split(
                    '\n'
                ),
                trending: data.merchandise.data.attributes.trending,
                onlyRental: data.merchandise.data.attributes.onlyRental,
                offer: data.merchandise.data.attributes.offer,
            },
            options: data.options.map((option: any) => ({
                duration: option.duration,
                cost: {
                    USD: option.cost.USD,
                    LKR: option.cost.LKR,
                },
            })),
        }
    })
    return mappedRental
}
