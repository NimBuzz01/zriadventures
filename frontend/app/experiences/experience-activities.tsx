import BannerCarousel from '@/components/carousels/banner-carousel'
import BlurImage from '@/components/common/blur-image'
import MainButton from '@/components/common/main-button'
import { EXPERIENCE_BANNERS } from '@/constants/pages/ExperiencesPageConstants'
import React from 'react'

const Activities = () => {
    return (
        <div className="relative flex w-full flex-col justify-center">
            <BannerCarousel
                perView={1}
                sm={1}
                md={1}
                lg={1}
                xl={1}
                xl2={1}
                spacing={0}
                dots
                drag={false}
            >
                {EXPERIENCE_BANNERS.map((banner, index: number) => (
                    <div
                        key={index}
                        className="relative flex h-[90dvh] w-full items-end justify-center md:items-center md:justify-start"
                    >
                        <BlurImage src={banner.image} alt={banner.name} />
                        <div className="absolute h-screen w-full bg-black/40"></div>
                        <div className="absolute mb-16 flex flex-col px-4 md:mb-0 md:ml-16 md:w-1/3 md:px-0">
                            <p className="text-xs font-medium uppercase text-white sm:text-sm md:text-base">
                                {banner.name}
                            </p>
                            <h1 className="mb-10 text-xl font-semibold tracking-wide text-white sm:text-2xl md:text-3xl lg:text-4xl">
                                {banner.title}
                            </h1>
                            <p className="mb-4 text-white">
                                {banner.description}
                            </p>
                            <div className="flex">
                                <MainButton
                                    text={`View ${banner.name}`}
                                    href={banner.href}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </BannerCarousel>
        </div>
    )
}

export default Activities
