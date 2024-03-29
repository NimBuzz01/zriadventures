'use client'
import NotFoundLabel from '@/components/notfound-label'
import BannerCarousel from '@/components/carousels/banner-carousel'
import BlurImage from '@/components/common/blur-image'
import { BANNERS_NOT_FOUND } from '@/constants/NotFoundConstants'
import { getBannerData } from '@/lib/data/banner-data'
import { BannerTypes } from '@/lib/types/banner-types'
import Link from 'next/link'
import { Suspense, useEffect, useState } from 'react'
import Loading from '@/components/loading'

const Banner = () => {
    const [banners, setBanners] = useState<BannerTypes[] | null>(null)

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
                <Suspense fallback={<Loading />}>
                    {banners === null ? (
                        <Loading />
                    ) : banners.length > 0 ? (
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
                                    className="relative h-56 w-full sm:h-64 md:h-[500px]"
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
                </Suspense>
            </div>
        </div>
    )
}

export default Banner
