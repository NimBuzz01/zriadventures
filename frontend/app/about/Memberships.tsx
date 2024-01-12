import React from 'react'
import MembershipCard from './cards/MembershipCard'
import {
    ABOUT_MEMBERSHIPS,
    ABOUT_MEMBERSHIPS_MAIN_TITLE,
    ABOUT_MEMBERSHIPS_SUB_TITLE,
} from '@/constants/pages/AboutPageConstants'
import MainHeader from '@/components/common/MainHeader'

const Memberships = () => {
    return (
        <div className="w-full max-w-[80%] px-10 py-16">
            <MainHeader
                subtitle={ABOUT_MEMBERSHIPS_SUB_TITLE}
                title={ABOUT_MEMBERSHIPS_MAIN_TITLE}
            />
            <div className="flex flex-col items-center justify-center gap-16 py-10 md:flex-row md:flex-wrap">
                {ABOUT_MEMBERSHIPS.map((membership, index: number) => (
                    <MembershipCard
                        key={index}
                        image={membership.image}
                        title={membership.title}
                        url={membership.url}
                    />
                ))}
            </div>
        </div>
    )
}

export default Memberships
