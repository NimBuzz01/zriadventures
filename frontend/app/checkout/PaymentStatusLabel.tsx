import React from 'react'
import { BsFillCheckCircleFill, BsFillXCircleFill } from 'react-icons/bs'

interface Props {
    status: 'SUCCESS' | 'FAILED' | 'PENDING'
}

const PaymentStatusLabel = ({ status }: Props) => {
    return (
        <div
            className={`flex flex-col items-center text-2xl font-medium md:text-3xl ${
                status === 'SUCCESS' ? 'text-green-600' : 'text-red-600'
            }`}
        >
            {status === 'SUCCESS' && (
                <>
                    <BsFillCheckCircleFill className="mb-2 text-3xl" />
                    Payment Success!
                </>
            )}
            {status === 'FAILED' && (
                <>
                    <BsFillXCircleFill className="mb-2 text-3xl" />
                    Payment Failed!
                </>
            )}
            {status === 'PENDING' && (
                <>
                    <BsFillXCircleFill className="mb-2 text-3xl" />
                    Payment Incomplete!
                </>
            )}
        </div>
    )
}

export default PaymentStatusLabel
