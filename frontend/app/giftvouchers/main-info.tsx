import MainHeader from '@/components/common/main-header'
import React from 'react'
import {
    VOUCHER_INFO_CARD,
    VOUCHER_MAIN_TITLE,
    VOUCHER_SUB_TITLE,
} from '@/constants/pages/VoucherPageConstants'
import VoucherInfoCard from './voucher-infocard'

const MainInfo = () => {
    return (
        <div className="bg-blue-50 py-16">
            <MainHeader
                subtitle={VOUCHER_MAIN_TITLE}
                title={VOUCHER_SUB_TITLE}
            />
            <div className="flex flex-col items-center justify-center gap-10 px-4 sm:px-10">
                {VOUCHER_INFO_CARD.map((rental, index) => (
                    <VoucherInfoCard
                        key={index}
                        number={rental.number}
                        src={rental.image}
                        alt={rental.title}
                        title={rental.title}
                        description={rental.description}
                    />
                ))}
            </div>
        </div>
    )
}

export default MainInfo
