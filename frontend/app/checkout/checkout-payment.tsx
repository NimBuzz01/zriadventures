import BlurImage from '@/components/common/blur-image'
import React, { SetStateAction, useEffect, useState } from 'react'
import { AiFillCreditCard } from 'react-icons/ai'
import { BiSolidBank } from 'react-icons/bi'
import { BsCash } from 'react-icons/bs'
import OtherInfo from './checkout-otherinfo'
import { PaymentStatus, useCheckout } from '@/contexts/checkout-context'
import { useRouter } from 'next/navigation'
import { generateOrderId, postOrder } from '@/lib/utils/strapi-utils'
import { constructOrderDetails } from '@/lib/utils/payment/constructor'
import MainButton from '@/components/common/main-button'
import { SelectBox } from '@/components/common/select-box'
import { useLocal } from '@/contexts/local-context'

interface Props {
    setCurrentStep: React.Dispatch<SetStateAction<number>>
    currentStep: number
}

const Payment = ({ setCurrentStep, currentStep }: Props) => {
    const {
        personalInfo,
        items,
        paymentStatus,
        isVoucherAdded,
        editPaymentStatus,
    } = useCheckout()

    const router = useRouter()
    const { local } = useLocal()

    const [currency, setCurrency] = useState(local ? 'lkr' : 'usd')

    const [paymentOption, setPaymentOption] = useState<
        'PAY_NOW' | 'BANK_TRANSFER'
    >('PAY_NOW')
    const [paymentMethod, setPaymentMethod] = useState<
        'PAYHERE' | 'KOKO' | 'MINTPAY' | 'BANK'
    >('PAYHERE')
    const [paymentAmount, setPaymentAmount] = useState<
        'ADVANCE' | 'FULL' | 'INSTALLMENT'
    >('FULL')

    const handlePaymentOptionChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const selectedMethod = e.target.value as 'PAY_NOW' | 'BANK_TRANSFER'
        setPaymentOption(selectedMethod)
        if (selectedMethod === 'BANK_TRANSFER') {
            setPaymentMethod('BANK')
        } else if (selectedMethod === 'PAY_NOW') {
            setPaymentMethod('PAYHERE')
        }
    }

    const [tempTotal] = useState(paymentStatus.tempTotal)

    const handlePaymentMethodChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const selectedMethod = e.target.value as 'PAYHERE' | 'KOKO' | 'MINTPAY'
        setPaymentMethod(selectedMethod)
        setPaymentAmount(selectedMethod === 'PAYHERE' ? 'FULL' : 'INSTALLMENT')
    }

    const handlePaymentAmountChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const selectedAmount = e.target.value as
            | 'ADVANCE'
            | 'FULL'
            | 'INSTALLMENT'
        setPaymentAmount(selectedAmount)
    }

    useEffect(() => {
        if (paymentOption === 'PAY_NOW') {
            if (paymentMethod === 'PAYHERE') {
                if (paymentAmount === 'FULL') {
                    editPaymentStatus({
                        ...paymentStatus,
                        total: parseFloat((tempTotal * 1.03).toFixed(2)),
                        payAmount: parseFloat((tempTotal * 1.03).toFixed(2)),
                    })
                } else if (paymentAmount === 'ADVANCE') {
                    editPaymentStatus({
                        ...paymentStatus,
                        total: parseFloat((tempTotal * 1.03).toFixed(2)),
                        payAmount: parseFloat(
                            ((tempTotal * 1.03) / 4).toFixed(2)
                        ),
                    })
                }
            } else if (
                paymentMethod === 'KOKO' ||
                paymentMethod === 'MINTPAY'
            ) {
                editPaymentStatus({
                    ...paymentStatus,
                    total: parseFloat((tempTotal * 1.1).toFixed(2)),
                    payAmount: parseFloat((tempTotal * 1.1).toFixed(2)),
                })
            }
        }
        if (paymentOption === 'BANK_TRANSFER') {
            if (paymentAmount === 'FULL') {
                editPaymentStatus({
                    ...paymentStatus,
                    total: parseFloat(tempTotal.toFixed(2)),
                    payAmount: parseFloat(tempTotal.toFixed(2)),
                })
            } else if (paymentAmount === 'ADVANCE') {
                editPaymentStatus({
                    ...paymentStatus,
                    total: parseFloat(tempTotal.toFixed(2)),
                    payAmount: parseFloat((tempTotal / 4).toFixed(2)),
                })
            }
        }
    }, [paymentAmount, paymentOption])

    const handlePayment = async () => {
        try {
            const orderId = await generateOrderId()

            if (orderId === undefined) {
                throw new Error('Failed to generate orderId')
            }

            const orderData = {
                data: {
                    orderId,
                    firstName: personalInfo.firstName,
                    lastName: personalInfo.lastName,
                    email: personalInfo.email,
                    contactNumber: personalInfo.contactNumber,
                    nationality: personalInfo.nationality,
                    addrLine1: personalInfo.addrLine1,
                    addrLine2: personalInfo.addrLine2,
                    city: personalInfo.city,
                    postalCode: personalInfo.postalCode,
                    items: items,
                    paymentStatus: paymentStatus.status,
                    totalAmount: paymentStatus.total,
                    amountPaid: paymentStatus.payAmount,
                    currency: paymentStatus.currency,
                    paymentVendor: paymentMethod,
                },
            }

            await postOrder(orderData)

            if (paymentOption === 'BANK_TRANSFER') {
                localStorage.setItem('bank_currency', currency)
                setCurrentStep(currentStep + 1)
                router.push(
                    `?step=final&status=success&vendor=bank&orderId=${orderId}#`
                )
            }

            const updatedPaymentStatus: PaymentStatus = {
                orderId,
                status: 'PENDING',
                option: paymentMethod,
                amountType: paymentAmount,
                currency: paymentStatus.currency,
                total: paymentStatus.total,
                payAmount: paymentStatus.payAmount,
                tempTotal: paymentStatus.tempTotal,
            }

            editPaymentStatus(updatedPaymentStatus)

            localStorage.removeItem('order_email')
            localStorage.removeItem('mintpay_status')

            if (paymentMethod === 'PAYHERE') {
                constructOrderDetails(
                    'PAYHERE',
                    orderId,
                    personalInfo.firstName,
                    personalInfo.lastName,
                    personalInfo.email,
                    personalInfo.contactNumber,
                    personalInfo.nationality,
                    personalInfo.addrLine1,
                    personalInfo.addrLine2,
                    personalInfo.city,
                    personalInfo.postalCode,
                    paymentStatus.currency,
                    paymentStatus.payAmount
                )
            } else if (paymentMethod === 'KOKO') {
                constructOrderDetails(
                    'KOKO',
                    orderId,
                    personalInfo.firstName,
                    personalInfo.lastName,
                    personalInfo.email,
                    personalInfo.contactNumber,
                    personalInfo.nationality,
                    personalInfo.addrLine1,
                    personalInfo.addrLine2,
                    personalInfo.city,
                    personalInfo.postalCode,
                    paymentStatus.currency,
                    paymentStatus.payAmount
                )
            } else if (paymentMethod === 'MINTPAY') {
                constructOrderDetails(
                    'MINTPAY',
                    orderId,
                    personalInfo.firstName,
                    personalInfo.lastName,
                    personalInfo.email,
                    personalInfo.contactNumber,
                    personalInfo.nationality,
                    personalInfo.addrLine1,
                    personalInfo.addrLine2,
                    personalInfo.city,
                    personalInfo.postalCode,
                    paymentStatus.currency,
                    paymentStatus.payAmount
                )
            }
        } catch (error) {
            console.error(error)
            alert('An error occurred during payment.')
        }
    }

    return (
        <div className="w-full px-4 py-10 sm:p-16">
            <h2 className="mb-6 text-center text-3xl font-semibold uppercase text-blue-950">
                Payment
            </h2>
            <ul className="grid w-full gap-4 md:grid-cols-2">
                <li>
                    <input
                        type="radio"
                        id="PAY_NOW"
                        name="payment-option"
                        value="PAY_NOW"
                        className="peer hidden"
                        checked={paymentOption === 'PAY_NOW'}
                        onChange={handlePaymentOptionChange}
                        required
                    />
                    <label
                        htmlFor="PAY_NOW"
                        className="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white p-5 text-gray-500 peer-checked:border-blue-600 peer-checked:bg-blue-50 peer-checked:text-blue-600 hover:bg-gray-100 hover:text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:peer-checked:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                    >
                        <div className="flex items-center gap-4">
                            <BsCash className="text-3xl" />
                            <div className="w-full font-medium">Pay Now</div>
                        </div>
                    </label>
                </li>
                <li>
                    <input
                        type="radio"
                        id="BANK_TRANSFER"
                        name="payment-option"
                        value="BANK_TRANSFER"
                        className="peer hidden"
                        checked={paymentOption === 'BANK_TRANSFER'}
                        onChange={handlePaymentOptionChange}
                    />
                    <label
                        htmlFor="BANK_TRANSFER"
                        className="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white p-5 text-gray-500 peer-checked:border-blue-600 peer-checked:bg-blue-50 peer-checked:text-blue-600 hover:bg-gray-100 hover:text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:peer-checked:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                    >
                        <div className="flex items-center gap-4">
                            <BiSolidBank className="text-3xl" />
                            <div className="w-full font-medium">
                                Bank Transfer
                            </div>
                        </div>
                    </label>
                </li>
            </ul>
            <div className="my-4 border-t border-gray-300" />
            {paymentOption === 'PAY_NOW' && (
                <div>
                    <h3 className="mb-2 uppercase text-gray-500">
                        Select Payment Method
                    </h3>
                    <ul className="grid w-full gap-4 md:grid-cols-3">
                        <li>
                            <input
                                type="radio"
                                id="PAYHERE"
                                name="payment-method"
                                value="PAYHERE"
                                className="peer hidden"
                                checked={paymentMethod === 'PAYHERE'}
                                onChange={handlePaymentMethodChange}
                                required
                            />
                            <label
                                htmlFor="PAYHERE"
                                className="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white p-5 text-gray-500 peer-checked:border-blue-600 peer-checked:bg-blue-50 peer-checked:text-blue-600 hover:bg-gray-100 hover:text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:peer-checked:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                            >
                                <div className="flex items-center gap-4">
                                    <AiFillCreditCard className="text-2xl" />
                                    <div className="w-full font-medium">
                                        Credit / Debit Card
                                    </div>
                                </div>
                            </label>
                        </li>
                        <li>
                            <input
                                type="radio"
                                id="KOKO"
                                name="payment-method"
                                value="KOKO"
                                className="peer hidden"
                                checked={paymentMethod === 'KOKO'}
                                disabled={paymentStatus.currency === 'USD'}
                                // disabled
                                onChange={handlePaymentMethodChange}
                            />
                            <label
                                htmlFor="KOKO"
                                className={`inline-flex w-full cursor-pointer items-center justify-between rounded-lg border p-5 ${
                                    paymentStatus.currency === 'USD'
                                        ? 'cursor-not-allowed border-gray-300 bg-gray-200 text-gray-400'
                                        : 'border-gray-200 bg-white text-gray-500 peer-checked:border-blue-600 peer-checked:bg-blue-50 peer-checked:text-blue-600 hover:bg-gray-100 hover:text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:peer-checked:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-gray-300'
                                }`}
                                // className={`inline-flex w-full cursor-not-allowed items-center justify-between rounded-lg border border-gray-300 bg-gray-200 p-5 text-gray-400 `}
                            >
                                <div className="flex items-center">
                                    <div className="w-full font-medium">
                                        Pay with Koko
                                    </div>
                                    <div className="relative h-6 w-24">
                                        <BlurImage
                                            src="/logos/kokologo.png"
                                            alt="Koko Logo"
                                            objectFit="contain"
                                        />
                                    </div>
                                </div>
                            </label>
                        </li>
                        <li>
                            <input
                                type="radio"
                                id="MINTPAY"
                                name="payment-method"
                                value="MINTPAY"
                                className="peer hidden"
                                disabled={paymentStatus.currency === 'USD'}
                                checked={paymentMethod === 'MINTPAY'}
                                onChange={handlePaymentMethodChange}
                            />
                            <label
                                htmlFor="MINTPAY"
                                className={`inline-flex w-full cursor-pointer items-center justify-between rounded-lg border p-5 ${
                                    paymentStatus.currency === 'USD'
                                        ? 'cursor-not-allowed border-gray-300 bg-gray-200 text-gray-400'
                                        : 'border-gray-200 bg-white text-gray-500 peer-checked:border-blue-600 peer-checked:bg-blue-50 peer-checked:text-blue-600 hover:bg-gray-100 hover:text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:peer-checked:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-gray-300'
                                }`}
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-full font-medium">
                                        Pay with MintPay
                                    </div>
                                    <div className="relative h-6 w-24">
                                        <BlurImage
                                            src="/logos/mintpaylogo.png"
                                            alt="Mint Pay Logo"
                                            objectFit="contain"
                                        />
                                    </div>
                                </div>
                            </label>
                        </li>
                    </ul>
                    <div className="my-4 border-t border-gray-300" />
                    {paymentMethod === 'PAYHERE' && (
                        <ul className="grid w-full gap-4">
                            {!isVoucherAdded && (
                                <li>
                                    <input
                                        type="radio"
                                        id="ADVANCE"
                                        name="payment-amount"
                                        value="ADVANCE"
                                        className="peer hidden"
                                        disabled={isVoucherAdded}
                                        checked={paymentAmount === 'ADVANCE'}
                                        onChange={handlePaymentAmountChange}
                                        required
                                    />
                                    <label
                                        htmlFor="ADVANCE"
                                        className="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white p-5 text-gray-500 peer-checked:border-blue-600 peer-checked:bg-blue-50 peer-checked:text-blue-600 hover:bg-gray-100 hover:text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:peer-checked:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                                    >
                                        <div className="flex flex-col gap-2 py-2">
                                            <p className="w-full font-medium">
                                                Make an advance payment now
                                            </p>
                                            <p className="text-3xl font-medium text-gray-600">
                                                {paymentStatus.currency ===
                                                'LKR' ? (
                                                    <>
                                                        LKR{' '}
                                                        {(
                                                            (tempTotal * 1.03) /
                                                            4
                                                        ).toFixed(2)}
                                                    </>
                                                ) : (
                                                    <>
                                                        USD $
                                                        {(
                                                            (tempTotal * 1.03) /
                                                            4
                                                        ).toFixed(2)}
                                                    </>
                                                )}
                                            </p>
                                            <p className="text-sm text-gray-400">
                                                You will pay 25% off your total
                                                booking value now and balance
                                                can be paid on the day of your
                                                experience. 3% Convenience fee
                                                is added
                                            </p>
                                        </div>
                                    </label>
                                </li>
                            )}
                            <li>
                                <input
                                    type="radio"
                                    id="FULL"
                                    name="payment-amount"
                                    value="FULL"
                                    className="peer hidden"
                                    checked={paymentAmount === 'FULL'}
                                    onChange={handlePaymentAmountChange}
                                    required
                                />
                                <label
                                    htmlFor="FULL"
                                    className="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white p-5 text-gray-500 peer-checked:border-blue-600 peer-checked:bg-blue-50 peer-checked:text-blue-600 hover:bg-gray-100 hover:text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:peer-checked:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                                >
                                    <div className="flex flex-col gap-2 py-2">
                                        <p className="w-full font-medium">
                                            Make the full payment now
                                        </p>
                                        <p className="text-3xl font-medium text-gray-600">
                                            {paymentStatus.currency ===
                                            'LKR' ? (
                                                <>
                                                    LKR{' '}
                                                    {(tempTotal * 1.03).toFixed(
                                                        2
                                                    )}
                                                </>
                                            ) : (
                                                <>
                                                    USD $
                                                    {(tempTotal * 1.03).toFixed(
                                                        2
                                                    )}
                                                </>
                                            )}
                                        </p>
                                        <p className="text-sm text-gray-400">
                                            You will pay the full amount of your
                                            booking now and no further payments.
                                            3% Convenience fee is added
                                        </p>
                                    </div>
                                </label>
                            </li>
                            {isVoucherAdded && (
                                <li className="border-2 border-red-500 bg-red-100 p-5 text-center text-sm sm:text-base">
                                    Please note that full payment is required as
                                    a
                                    <span className="font-medium">
                                        {' '}
                                        voucher
                                    </span>{' '}
                                    has been applied to your order.
                                </li>
                            )}
                        </ul>
                    )}
                    {paymentMethod === 'KOKO' && (
                        <ul className="grid w-full gap-4">
                            <li>
                                <input
                                    type="radio"
                                    id="INSTALLMENT"
                                    name="payment-amount"
                                    value="INSTALLMENT"
                                    className="peer hidden"
                                    checked={paymentAmount === 'INSTALLMENT'}
                                    onChange={handlePaymentAmountChange}
                                    required
                                />
                                <label
                                    htmlFor="INSTALLMENT"
                                    className="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white p-5 text-gray-500 peer-checked:border-blue-600 peer-checked:bg-blue-50 peer-checked:text-blue-600 hover:bg-gray-100 hover:text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:peer-checked:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                                >
                                    <div className="flex flex-col gap-2 py-2">
                                        <p className="w-full font-medium">
                                            Pay in Installments
                                        </p>
                                        <p className="text-3xl font-medium text-gray-600">
                                            {paymentStatus.currency ===
                                            'LKR' ? (
                                                <>
                                                    LKR{' '}
                                                    {(
                                                        paymentStatus.payAmount /
                                                        3
                                                    ).toFixed(2)}
                                                </>
                                            ) : (
                                                <>
                                                    USD $
                                                    {(
                                                        paymentStatus.payAmount /
                                                        3
                                                    ).toFixed(2)}
                                                </>
                                            )}{' '}
                                            <span className="text-2xl text-gray-500">
                                                x 3
                                            </span>
                                        </p>
                                        <p className="text-sm text-gray-400">
                                            You will pay in 3 installments for
                                            the relevant merchants. 10%
                                            Convenience fee is added
                                        </p>
                                    </div>
                                </label>
                            </li>
                            {/* <li>
                                <input
                                    type="radio"
                                    id="FULL"
                                    name="payment-amount"
                                    value="FULL"
                                    className="hidden peer"
                                    checked={paymentAmount === 'FULL'}
                                    onChange={handlePaymentAmountChange}
                                    required
                                />
                                <label
                                    htmlFor="FULL"
                                    className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:bg-blue-50 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:bg-gray-100 hover:text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:peer-checked:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                                >
                                    <div className="flex flex-col gap-2 py-2">
                                        <p className="w-full font-medium">
                                            Make the full payment now
                                        </p>
                                        <p className="text-3xl font-medium text-gray-600">
                                            {paymentStatus.currency ===
                                            'LKR' ? (
                                                <>LKR {tempAmount * 1.1}</>
                                            ) : (
                                                <>USD ${tempAmount * 1.1}</>
                                            )}
                                        </p>
                                        <p className="text-sm text-gray-400">
                                            You will pay the full amount of your
                                            booking now and no further payments.
                                            10% Convenience fee is added
                                        </p>
                                    </div>
                                </label>
                            </li> */}
                        </ul>
                    )}
                    {paymentMethod === 'MINTPAY' && (
                        <ul className="grid w-full gap-4">
                            <li>
                                <input
                                    type="radio"
                                    id="INSTALLMENT"
                                    name="payment-amount"
                                    value="INSTALLMENT"
                                    className="peer hidden"
                                    checked={paymentAmount === 'INSTALLMENT'}
                                    onChange={handlePaymentAmountChange}
                                    required
                                />
                                <label
                                    htmlFor="INSTALLMENT"
                                    className="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white p-5 text-gray-500 peer-checked:border-blue-600 peer-checked:bg-blue-50 peer-checked:text-blue-600 hover:bg-gray-100 hover:text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:peer-checked:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                                >
                                    <div className="flex flex-col gap-2 py-2">
                                        <p className="w-full font-medium">
                                            Pay in Installments
                                        </p>
                                        <p className="text-3xl font-medium text-gray-600">
                                            {paymentStatus.currency ===
                                            'LKR' ? (
                                                <>
                                                    LKR{' '}
                                                    {(
                                                        paymentStatus.payAmount /
                                                        3
                                                    ).toFixed(2)}
                                                </>
                                            ) : (
                                                <>
                                                    USD $
                                                    {(
                                                        paymentStatus.payAmount /
                                                        3
                                                    ).toFixed(2)}
                                                </>
                                            )}{' '}
                                            <span className="text-2xl text-gray-500">
                                                x 3
                                            </span>
                                        </p>
                                        <p className="text-sm text-gray-400">
                                            You will pay in 3 installments for
                                            the relevant merchants. 10%
                                            Convenience fee is added
                                        </p>
                                    </div>
                                </label>
                            </li>
                            {/* <li>
                                <input
                                    type="radio"
                                    id="FULL"
                                    name="payment-amount"
                                    value="FULL"
                                    className="hidden peer"
                                    checked={paymentAmount === 'FULL'}
                                    onChange={handlePaymentAmountChange}
                                    required
                                />
                                <label
                                    htmlFor="FULL"
                                    className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:bg-blue-50 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:bg-gray-100 hover:text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:peer-checked:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                                >
                                    <div className="flex flex-col gap-2 py-2">
                                        <p className="w-full font-medium">
                                            Make the full payment now
                                        </p>
                                        <p className="text-3xl font-medium text-gray-600">
                                            {paymentStatus.currency ===
                                            'LKR' ? (
                                                <>LKR {tempAmount * 1.1}</>
                                            ) : (
                                                <>USD ${tempAmount * 1.1}</>
                                            )}
                                        </p>
                                        <p className="text-sm text-gray-400">
                                            You will pay the full amount of your
                                            booking now and no further payments.
                                            10% Convenience fee is added
                                        </p>
                                    </div>
                                </label>
                            </li> */}
                        </ul>
                    )}
                </div>
            )}
            {paymentOption === 'BANK_TRANSFER' && (
                <div>
                    <ul className="grid w-full gap-4">
                        {!isVoucherAdded && (
                            <li>
                                <input
                                    type="radio"
                                    id="ADVANCE"
                                    name="payment-amount"
                                    value="ADVANCE"
                                    className="peer hidden"
                                    disabled={isVoucherAdded}
                                    checked={paymentAmount === 'ADVANCE'}
                                    onChange={handlePaymentAmountChange}
                                    required
                                />
                                <label
                                    htmlFor="ADVANCE"
                                    className="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white p-5 text-gray-500 peer-checked:border-blue-600 peer-checked:bg-blue-50 peer-checked:text-blue-600 hover:bg-gray-100 hover:text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:peer-checked:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                                >
                                    <div className="flex flex-col gap-2 py-2">
                                        <p className="w-full font-medium">
                                            Make an advance payment now
                                        </p>
                                        <p className="text-3xl font-medium text-gray-600">
                                            {paymentStatus.currency ===
                                            'LKR' ? (
                                                <>
                                                    LKR{' '}
                                                    {(tempTotal / 4).toFixed(2)}
                                                </>
                                            ) : (
                                                <>
                                                    USD $
                                                    {(tempTotal / 4).toFixed(2)}
                                                </>
                                            )}
                                        </p>
                                        <p className="text-sm text-gray-400">
                                            You will pay 25% off your total
                                            booking value now and balance can be
                                            paid on the day of your experience
                                        </p>
                                    </div>
                                </label>
                            </li>
                        )}
                        <li>
                            <input
                                type="radio"
                                id="FULL"
                                name="payment-amount"
                                value="FULL"
                                className="peer hidden"
                                checked={paymentAmount === 'FULL'}
                                onChange={handlePaymentAmountChange}
                                required
                            />
                            <label
                                htmlFor="FULL"
                                className="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white p-5 text-gray-500 peer-checked:border-blue-600 peer-checked:bg-blue-50 peer-checked:text-blue-600 hover:bg-gray-100 hover:text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:peer-checked:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                            >
                                <div className="flex flex-col gap-2 py-2">
                                    <p className="w-full font-medium">
                                        Make the full payment now
                                    </p>
                                    <p className="text-3xl font-medium text-gray-600">
                                        {paymentStatus.currency === 'LKR' ? (
                                            <>LKR {tempTotal.toFixed(2)}</>
                                        ) : (
                                            <>USD ${tempTotal.toFixed(2)}</>
                                        )}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        You will pay the full amount of your
                                        booking now and no further payments.
                                    </p>
                                </div>
                            </label>
                        </li>
                        {isVoucherAdded && (
                            <li className="border-2 border-red-500 bg-red-100 p-5 text-center text-sm sm:text-base">
                                Please note that full payment is required as a
                                <span className="font-medium"> voucher</span>{' '}
                                has been applied to your order.
                            </li>
                        )}
                        <li className="mt-1 flex flex-col items-center md:flex-row">
                            <p className="mt-1 w-full text-gray-500">
                                Select Bank Transfer Currency
                            </p>
                            <SelectBox
                                items={[
                                    {
                                        value: 'usd',
                                        label: 'United States Dollar (USD)',
                                    },
                                    {
                                        value: 'lkr',
                                        label: 'Sri Lankan Rupee (LKR)',
                                    },
                                    {
                                        value: 'aud',
                                        label: 'Australian Dollar (AUD)',
                                    },
                                    {
                                        value: 'nzd',
                                        label: 'New Zealand Dollar (NZD)',
                                    },
                                    { value: 'eur', label: 'Euro (EUR)' },
                                    {
                                        value: 'gbp',
                                        label: 'Great Britian Pound (GBP)',
                                    },
                                    {
                                        value: 'cad',
                                        label: 'Canadian Dollar (CAD)',
                                    },
                                ]}
                                value={currency}
                                setValue={setCurrency}
                                title="currency"
                            />
                        </li>
                        <li className="text-sm italic text-gray-400">
                            The bank details for the payment will be sent
                            according to the bank transfer currency selected.
                        </li>
                    </ul>
                </div>
            )}
            <OtherInfo bankTransfer={paymentOption === 'BANK_TRANSFER'} />
            <div className="flex items-center justify-center pt-10">
                <MainButton
                    text={paymentOption === 'PAY_NOW' ? 'Pay Now' : 'Reserve'}
                    onClick={handlePayment}
                />
            </div>
        </div>
    )
}
export default Payment
