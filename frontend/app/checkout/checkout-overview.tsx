'use client'
import React, { useEffect, useState } from 'react'
import { useCheckout } from '@/contexts/checkout-context'
import PaymentStatusLabel from './payment-status-label'
import MainButton from '@/components/common/main-button'
import {
    getOrderDetails,
    postVoucher,
    setCouponStatus,
} from '@/lib/utils/strapi-utils'
import { useSearchParams } from 'next/navigation'
import { useLocal } from '@/contexts/local-context'
import { createGiftVoucherTemplate } from '@/constants/emailTemplates/GiftVoucher'
import { getMintpayResponse } from '@/lib/utils/payment/mintpay'
import PreLoader from '@/components/common/pre-loader'
import {
    sendEmailReceipt,
    sendEmailReceiptBank,
} from '@/lib/utils/courier-func'
import { createBankNotifyEmail } from '@/constants/emailTemplates/PaymentNotification'
import { EMAIL_SENDER_EMAIL } from '@/app.config'
import { NEW_PAYMENT_RECEIVED } from '@/constants/emailTemplates/SubjectConstants'
import ReactGA from 'react-ga4'
import { getRefactoredItems } from '@/lib/utils/refactor-items'
import { convertLKRtoUSD, sendEmail } from '@/lib/utils'

const Overview = () => {
    const { editPaymentStatus } = useCheckout()

    const [order, setOrder] = useState({
        orderId: '',
        name: '',
        email: '',
        contactNumber: '',
        deliveryAddress: '',
        amountPaid: 0,
        totalAmount: 0,
        items: [],
        currency: '',
        status: 'PENDING',
        vendor: '',
    })

    const [loaded, setLoaded] = useState(false)

    const bankCurrency = localStorage.getItem('bank_currency')

    const searchParams = useSearchParams()
    const { setKey } = useLocal()

    const getFilteredItems = (
        items: any,
        itemType: 'EXPERIENCE' | 'MERCHANDISE' | 'VOUCHER' | 'EVENT' | 'RENTAL'
    ) => {
        return items.filter((item: any) => item.itemType === itemType)
    }

    useEffect(() => {
        const fetchData = async () => {
            const step = searchParams.get('step')
            const status = searchParams.get('status')
            const vendor = searchParams.get('vendor')
            const orderId = searchParams.get('orderId')

            const orderEmail = localStorage.getItem('order_email')
            const mintpayStatus = localStorage.getItem('mintpay_status')
            const purchaseId = localStorage.getItem('mp_Id')

            if (
                vendor === 'mintpay' &&
                orderId &&
                mintpayStatus !== 'Success'
            ) {
                await getMintpayResponse(orderId)
                if (purchaseId !== null) {
                    localStorage.removeItem('mp_Id')
                    localStorage.setItem('mintpay_status', 'Success')
                    location.reload()
                }
            }

            if (status === 'failed' || status === 'FAILED') {
                setOrder({ ...order, status: 'FAILED' })
                setLoaded(true)
                return
            }

            if (step) {
                if (step !== 'final' || !orderId || status !== 'success') {
                    setLoaded(true)
                    return
                }
            }

            try {
                if (orderId) {
                    const temp = await getOrderDetails(orderId)
                    const tempOrder = temp[0].attributes

                    if (!tempOrder) {
                        setLoaded(true)
                        return
                    }

                    const {
                        firstName,
                        lastName,
                        email,
                        contactNumber,
                        addrLine1,
                        addrLine2,
                        city,
                        postalCode,
                        amountPaid,
                        totalAmount,
                        currency,
                        paymentVendor,
                        paymentStatus,
                        items,
                    } = tempOrder

                    const updatedOrder = {
                        orderId,
                        name: `${firstName} ${lastName}`,
                        email,
                        contactNumber,
                        deliveryAddress: `${addrLine1} ${addrLine2} ${city} ${postalCode}`,
                        amountPaid,
                        totalAmount,
                        currency,
                        status:
                            paymentVendor === 'BANK'
                                ? 'SUCCESS'
                                : paymentStatus,
                        vendor: paymentVendor,
                        items,
                    }

                    setOrder(updatedOrder)
                    editPaymentStatus({ ...paymentStatus, total: totalAmount })

                    if (
                        paymentStatus === 'SUCCESS' ||
                        paymentVendor === 'BANK'
                    ) {
                        localStorage.setItem('Cart', JSON.stringify([]))
                        const temp = localStorage.getItem('Coupon')
                        if (temp) {
                            const coupon = JSON.parse(temp)
                            setCouponStatus(coupon.id, 'CLAIMED')
                            localStorage.removeItem('Coupon')
                        }

                        setKey()
                    }

                    if (orderEmail !== 'true') {
                        let amount = tempOrder.totalAmount
                        if (tempOrder.currency === 'LKR') {
                            amount = convertLKRtoUSD(tempOrder.totalAmount)
                        }
                        if (
                            paymentStatus === 'SUCCESS' &&
                            paymentVendor !== 'BANK'
                        ) {
                            ReactGA.gtag('event', 'purchase', {
                                orderId: tempOrder.orderId,
                                value: amount,
                                currency: 'USD',
                                items: getRefactoredItems(tempOrder.items),
                            })
                            sendEmailReceipt(
                                tempOrder.firstName,
                                tempOrder.orderId,
                                tempOrder.email,
                                tempOrder.totalAmount,
                                tempOrder.amountPaid,
                                tempOrder.currency,
                                tempOrder.items
                            )
                        }

                        if (
                            paymentStatus === 'PENDING' &&
                            paymentVendor === 'BANK' &&
                            bankCurrency
                        ) {
                            const request = await createBankNotifyEmail(
                                tempOrder.orderId,
                                'BANK',
                                'PENDING',
                                tempOrder.amountPaid,
                                tempOrder.totalAmount,
                                tempOrder.currency
                            )
                            await sendEmail(
                                EMAIL_SENDER_EMAIL,
                                NEW_PAYMENT_RECEIVED,
                                request
                            )
                            sendEmailReceiptBank(
                                tempOrder.firstName,
                                tempOrder.orderId,
                                tempOrder.email,
                                tempOrder.totalAmount,
                                tempOrder.amountPaid,
                                tempOrder.currency,
                                bankCurrency,
                                tempOrder.items
                            )
                        }

                        const vouchers: any[] = getFilteredItems(
                            items,
                            'VOUCHER'
                        )

                        if (
                            vouchers.length > 0 &&
                            (paymentStatus === 'SUCCESS' ||
                                (paymentStatus === 'PENDING' &&
                                    paymentVendor === 'BANK'))
                        ) {
                            vouchers.map(async (voucher) => {
                                const voucherData = {
                                    data: {
                                        couponCode:
                                            voucher.item.voucher.couponId[0],
                                        status:
                                            paymentVendor === 'BANK'
                                                ? 'UNPAID'
                                                : 'AVAILABLE',
                                        expiryDate:
                                            voucher.item.voucher.expiryDate,
                                        type: voucher.item.voucher.voucherType.toUpperCase(),
                                        ...(voucher.item.voucher.voucherType ===
                                        'Cash'
                                            ? {
                                                  cash: {
                                                      amount: voucher.item
                                                          .voucher.voucherAmount
                                                          .amount,
                                                      currency:
                                                          voucher.item.voucher
                                                              .voucherAmount
                                                              .currency,
                                                  },
                                              }
                                            : voucher.item.voucher
                                                    .voucherType ===
                                                'Experience'
                                              ? {
                                                    experience: [
                                                        {
                                                            name: voucher.item
                                                                .voucher
                                                                .voucherExperience
                                                                .item.name,
                                                            adults: voucher.item
                                                                .voucher
                                                                .voucherExperience
                                                                .item.adults,
                                                            children:
                                                                voucher.item
                                                                    .voucher
                                                                    .voucherExperience
                                                                    .item
                                                                    .children,
                                                            extras: voucher.item.voucher.voucherExperience.item.extras.map(
                                                                (
                                                                    extra: any
                                                                ) => ({
                                                                    name: extra.name,
                                                                    quantity:
                                                                        extra.quantity,
                                                                })
                                                            ),
                                                        },
                                                    ],
                                                }
                                              : {}),
                                    },
                                }

                                await postVoucher(voucherData)

                                if (voucher.item.info.recipientsEmail !== '') {
                                    const receipt =
                                        createGiftVoucherTemplate(voucher)
                                    sendEmail(
                                        voucher.item.info.recipientsEmail,
                                        'You have received a Gift Voucher - ZRI Adventures',
                                        receipt
                                    )
                                }
                            })
                        }
                        localStorage.setItem('order_email', 'true')
                    }

                    setLoaded(true)
                }
            } catch (error) {
                console.error('Error fetching order details:', error)
                setLoaded(true)
            }
        }

        fetchData()
    }, [searchParams])

    return (
        <div className="w-full px-4 py-10 sm:p-16">
            {loaded ? (
                <>
                    <PaymentStatusLabel
                        status={
                            order.status as 'SUCCESS' | 'FAILED' | 'PENDING'
                        }
                    />
                    {order.status === 'SUCCESS' ? (
                        <>
                            <p className="mt-4 text-center text-gray-500">
                                Your reservation is confirmed. You will receive
                                a receipt to your email and our team will get
                                back to you shortly!
                            </p>
                            <div className="mt-10 font-medium">
                                <div className="mb-2 flex flex-col sm:flex-row sm:justify-between">
                                    <p>Order Id:</p>
                                    <p className="font-normal">
                                        {order.orderId}
                                    </p>
                                </div>
                                <div className="mb-2 flex flex-col sm:flex-row sm:justify-between">
                                    <p>Name:</p>
                                    <p className="font-normal">{order.name}</p>
                                </div>
                                <div className="mb-2 flex flex-col sm:flex-row sm:justify-between">
                                    <p>Email Address:</p>
                                    <p className="font-normal">{order.email}</p>
                                </div>
                                <div className="mb-2 flex flex-col sm:flex-row sm:justify-between">
                                    <p>Contact Number:</p>
                                    <p className="font-normal">
                                        {order.contactNumber}
                                    </p>
                                </div>
                                <div className="mb-2 flex flex-col sm:flex-row sm:justify-between">
                                    <p>Delivery Address:</p>
                                    <p className="font-normal">
                                        {order.deliveryAddress}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-10 font-medium">
                                <div className="flex items-end justify-between">
                                    <p>Total Amount</p>
                                    <p className="text-lg font-normal">
                                        {order.currency}{' '}
                                        {order.totalAmount.toFixed(2)}
                                    </p>
                                </div>
                                <div className="flex items-end justify-between">
                                    <p>Amount Paid</p>
                                    <p className="text-lg font-normal">
                                        {order.currency}{' '}
                                        {order.amountPaid.toFixed(2)}
                                    </p>
                                </div>
                                <div className="my-2 border-t border-gray-300" />
                                <div className="flex items-end justify-between">
                                    <p>Balance to be Paid</p>
                                    <p className="text-lg font-normal">
                                        {order.currency}{' '}
                                        {(
                                            order.totalAmount - order.amountPaid
                                        ).toFixed(2)}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-16 flex justify-center">
                                <MainButton href="/" text="Continue Shopping" />
                            </div>
                        </>
                    ) : (
                        <div className="mt-10 flex flex-col items-center justify-center gap-10 text-center">
                            <p className="text-lg ">
                                Something went wrong! Please checkout again or
                                contact us for manual reservations. Sorry for
                                the inconvenience.
                            </p>
                            <div className="flex flex-col items-center gap-4 md:flex-row">
                                <MainButton
                                    text="Back to Cart"
                                    href="/cart"
                                    style="w-full md:w-auto"
                                />
                                <MainButton
                                    text="Contact Us"
                                    href="/contact"
                                    style="w-full md:w-auto"
                                    bgColor="bg-gray-500 group-hover:bg-gray-600"
                                />
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className="flex w-full items-center justify-center">
                    <PreLoader />
                </div>
            )}
        </div>
    )
}

export default Overview
