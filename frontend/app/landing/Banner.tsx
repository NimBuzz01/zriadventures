'use client'
import NotFoundLabel from '@/components/NotFoundLabel'
import BannerCarousel from '@/components/carousels/BannerCarousel'
import BlurImage from '@/components/common/BlurImage'
import { BANNERS_NOT_FOUND } from '@/constants/NotFoundConstants'
import { getBannerData } from '@/lib/data/BannerData'
import { BannerTypes } from '@/types/bannerTypes'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const Banner = () => {
    const [banners, setBanners] = useState<BannerTypes[]>()

    useEffect(() => {
        async function fetchData() {
            try {
                const mappedBanners = await getBannerData()
                setBanners(mappedBanners)
            } catch (error) {
                console.error('Error fetching and mapping data:', error)
            }
        }

        fetchData()
    }, [])

    return (
        <div className="flex flex-col items-center justify-center bg-gradient-to-r from-cyan-100 to-blue-50 pt-10 sm:px-2">
            <div className="relative flex w-full flex-col justify-center sm:w-[90%]">
                {banners && banners?.length > 0 ? (
                    <BannerCarousel
                        perView={1}
                        sm={1}
                        md={1}
                        lg={1}
                        xl={1}
                        xl2={1}
                        spacing={10}
                        arrows
                    >
                        {banners.map((banner, index: number) => (
                            <div
                                key={index}
                                className="relative h-80 w-full sm:h-[300px] md:h-[500px]"
                            >
                                <Link href={banner.url}>
                                    <BlurImage
                                        src={banner.image.src}
                                        alt={banner.image.alt}
                                        objectFit="contain"
                                    />
                                </Link>
                            </div>
                        ))}
                    </BannerCarousel>
                ) : (
                    <NotFoundLabel text={BANNERS_NOT_FOUND} />
                )}
            </div>
        </div>
    )
}

export default Banner
