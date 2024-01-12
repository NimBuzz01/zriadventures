import MainHeader from '@/components/common/MainHeader'
import React from 'react'
import VoucherSetup from './VoucherSetup'

const VoucherStore = () => {
    return (
        <div
            className="flex w-full flex-col items-center px-2 sm:px-10"
            id="voucher-config"
        >
            <MainHeader
                subtitle="Gift your loved ones"
                title="Gift your loved ones"
            />
            <div className="w-full max-w-[1200px]">
                <VoucherSetup />
            </div>
        </div>
    )
}

export default VoucherStore
