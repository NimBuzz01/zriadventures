import BlurImage from '@/components/common/BlurImage'
import Link from 'next/link'
import React from 'react'

interface Props {
    image: string
    title: string
    url?: string
}

const MembershipCard = ({ image, title, url }: Props) => {
    return (
        <>
            {url ? (
                <Link href={url} target="_blank">
                    <div className="flex w-64 flex-col items-center justify-center gap-4 text-center">
                        <div className="relative h-40 w-40">
                            <BlurImage
                                src={image}
                                alt={title}
                                objectFit="contain"
                            />
                        </div>
                        <p className="text-lg font-medium text-blue-950">
                            {title}
                        </p>
                    </div>
                </Link>
            ) : (
                <div className="flex w-64 flex-col items-center justify-center gap-4 text-center">
                    <div className="relative h-40 w-40">
                        <BlurImage
                            src={image}
                            alt={title}
                            objectFit="contain"
                        />
                    </div>
                    <p className="text-lg font-medium text-blue-950">{title}</p>
                </div>
            )}
        </>
    )
}

export default MembershipCard
