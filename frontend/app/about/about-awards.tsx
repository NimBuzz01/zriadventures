import React from 'react'
import AwardCard from './cards/award-card'
import {
    ABOUT_AWARDS,
    ABOUT_AWARDS_MAIN_TITLE,
    ABOUT_AWARDS_SUB_TITLE,
} from '@/constants/pages/AboutPageConstants'
import MainHeader from '@/components/common/main-header'

const Awards = () => {
    return (
        <div className="w-full max-w-[80%] px-10 py-16">
            <MainHeader
                subtitle={ABOUT_AWARDS_SUB_TITLE}
                title={ABOUT_AWARDS_MAIN_TITLE}
            />
            <div className="flex flex-col items-center justify-center gap-16 py-10 md:flex-row md:flex-wrap">
                {ABOUT_AWARDS.map((award, index: number) => (
                    <AwardCard
                        key={index}
                        image={award.image}
                        title={award.title}
                        description={award.description}
                    />
                ))}
            </div>
        </div>
    )
}

export default Awards
