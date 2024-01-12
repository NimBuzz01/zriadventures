import { AxiosResponse } from 'axios'
import { getBanners } from '../utils/api'
import { BannerTypes } from '@/types/bannerTypes'

export async function getBannerData(): Promise<BannerTypes[]> {
    const response = await getBanners()
    const mappedBanners: BannerTypes[] = (
        response as AxiosResponse<BannerTypes[]>
    ).data.map((res: any) => {
        const data = res.attributes
        return {
            id: data.eventId || '',
            description: data.description || '',
            image: {
                src:
                    data.image.data.attributes.url.replace(
                        /\.[^.]+$/,
                        '.webp'
                    ) || '',
                alt: data.image.data.attributes.alternativeText || '',
            },
            url: data.url || '',
        }
    })
    return mappedBanners
}
