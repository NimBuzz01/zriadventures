'use client'
import React, { SetStateAction, useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { BiSolidUser, BiSolidUserCircle } from 'react-icons/bi'
import { BsCash, BsPeopleFill } from 'react-icons/bs'
import { ExperienceTypes } from '@/types/experienceTypes'
import { FaMountain } from 'react-icons/fa'
import { useVoucher, useVoucherActions } from '@/contexts/VoucherContext'
import { useLocal } from '@/contexts/SetLocalContext'
import BlurImage from '@/components/common/BlurImage'
import { useDataContext } from '@/contexts/DataContext'
import { Card } from '@/components/ui/card'
import Reservation from '../experiences/[experienceId]/Reservation'
import { useRouter } from 'next/navigation'

interface Props {
    setCurrentStep: React.Dispatch<SetStateAction<number>>
    currentStep: number
}

const VoucherDetails = ({ setCurrentStep, currentStep }: Props) => {
    const { experiences } = useDataContext()
    const voucher = useVoucher()
    const voucherActions = useVoucherActions()
    const { local, key, setKey } = useLocal()
    const [searchQuery, setSearchQuery] = useState('')
    const [showSearchSuggestions, setShowSearchSuggestions] = useState(false)
    const [recipientNameError, setRecipientNameError] = useState('')
    const [recipientEmailError, setRecipientEmailError] = useState('')
    const [senderNameError, setSenderNameError] = useState('')
    const [personalMessageError, setPersonalMessageError] = useState('')
    const [amountError, setAmountError] = useState('')
    const [experienceError, setExperienceError] = useState('')
    const [showConfigure, setShowConfigure] = useState(false)
    const [success, setSuccess] = useState(false)

    const router = useRouter()

    const [selectedExperience, setSelectedExperience] =
        useState<ExperienceTypes>()

    const handleExperienceSelect = (experience: ExperienceTypes) => {
        setSelectedExperience(experience)
        setShowSearchSuggestions(false)
        setSearchQuery('')
        setExperienceError('')
    }

    const handleSearchChange = (event: { target: { value: any } }) => {
        const query = event.target.value
        setSearchQuery(query)
        setShowSearchSuggestions(query.trim() !== '')
    }

    useEffect(() => {
        const storedCartItems = localStorage.getItem('Gift')
        if (storedCartItems) {
            voucherActions.setSelectedExperience(JSON.parse(storedCartItems))
            localStorage.removeItem('Gift')
            setSuccess(true)
            setKey()
            router.push('#voucher-config')
        }
    }, [key])

    useEffect(() => {
        voucherActions.setRecipientEmail('')
        voucherActions.setSenderName('')
        voucherActions.setRecipientName('')
        voucherActions.setPersonalMessage('')
    }, [voucher.giftTo])

    const validateInputs = () => {
        let isValid = true
        if (
            voucher.giftTo === 'Someone' &&
            voucher.recipientName.trim() === ''
        ) {
            setRecipientNameError("Recipient's Name is required.")
            isValid = false
        } else {
            setRecipientNameError('')
        }

        if (
            voucher.giftTo === 'Someone' &&
            voucher.recipientEmail.trim() === ''
        ) {
            setRecipientEmailError("Recipient's Email is required.")
            isValid = false
        } else {
            setRecipientEmailError('')
        }

        if (voucher.senderName.trim() === '') {
            setSenderNameError("Sender's Name is required.")
            isValid = false
        } else {
            setSenderNameError('')
        }

        if (voucher.personalMessage.trim() === '') {
            setPersonalMessageError('Personal Message is required.')
            isValid = false
        } else {
            setPersonalMessageError('')
        }

        if (voucher.voucherType === 'Cash') {
            if (voucher.cashAmount && voucher.cashAmount <= 0) {
                setAmountError('Amount must be greater than 0.')
                isValid = false
            } else {
                setAmountError('')
            }
        } else if (
            voucher.voucherType === 'Experience' &&
            !voucher.selectedExperience
        ) {
            setExperienceError('Please select an Experience.')
            isValid = false
        } else {
            setExperienceError('')
        }

        return isValid
    }

    const handleNext = () => {
        if (validateInputs()) {
            setCurrentStep(currentStep + 1)
        }
    }

    const handleBack = () => {
        setCurrentStep(currentStep - 1)
    }

    return (
        <>
            <div className="flex flex-col gap-16 p-4 sm:p-10 lg:flex-row">
                <div className="w-full lg:w-1/2">
                    <form action="#" className="flex flex-col gap-3">
                        <ul className="grid w-full gap-6 md:grid-cols-2">
                            <li>
                                <input
                                    type="radio"
                                    id="gift-someone"
                                    name="giftTo"
                                    value="gift-someone"
                                    className="peer hidden"
                                    checked={voucher.giftTo === 'Someone'}
                                    onChange={() => {
                                        voucherActions.setGiftTo('Someone')
                                    }}
                                    required
                                />
                                <label
                                    htmlFor="gift-someone"
                                    className="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white p-5 text-gray-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:bg-gray-100 hover:text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:peer-checked:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                                >
                                    <div className="flex items-center gap-4">
                                        <BsPeopleFill className="text-3xl" />
                                        <div className="w-full font-medium">
                                            For Someone Else
                                        </div>
                                    </div>
                                </label>
                            </li>
                            <li>
                                <input
                                    type="radio"
                                    id="gift-self"
                                    name="giftTo"
                                    value="gift-self"
                                    className="peer hidden"
                                    checked={voucher.giftTo === 'Self'}
                                    onChange={() => {
                                        voucherActions.setGiftTo('Self')
                                    }}
                                />
                                <label
                                    htmlFor="gift-self"
                                    className="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white p-5 text-gray-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:bg-gray-100 hover:text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:peer-checked:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                                >
                                    <div className="flex items-center gap-4">
                                        <BiSolidUser className="text-3xl" />
                                        <div className="w-full font-medium">
                                            For Yourself
                                        </div>
                                    </div>
                                </label>
                            </li>
                        </ul>
                        {voucher.giftTo === 'Someone' && (
                            <>
                                <div className="relative">
                                    <label
                                        htmlFor="recipient-name"
                                        className="mb-1 block text-sm font-medium text-gray-900"
                                    >
                                        Recipient&apos;s Name
                                    </label>
                                    <div
                                        className={`pointer-events-none absolute inset-y-0 left-0 top-6 flex items-center pl-3.5 ${
                                            recipientNameError && `top-[0.4rem]`
                                        }`}
                                    >
                                        <BiSolidUserCircle className="h-5 w-5 text-gray-500" />
                                    </div>
                                    <input
                                        type="text"
                                        id="recipient-name"
                                        className="block w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Recipient's Name"
                                        value={voucher.recipientName}
                                        onChange={(e) => {
                                            voucherActions.setRecipientName(
                                                e.target.value
                                            )
                                        }}
                                    />
                                    {recipientNameError && (
                                        <span className="mt-1 text-xs text-red-500">
                                            {recipientNameError}
                                        </span>
                                    )}
                                </div>
                                <div className="relative">
                                    <label
                                        htmlFor="recipient-email"
                                        className="mb-1 block text-sm font-medium text-gray-900"
                                    >
                                        Recipient&apos;s Email
                                    </label>
                                    <div
                                        className={`pointer-events-none absolute inset-y-0 left-0 top-6 flex items-center pl-3.5 ${
                                            recipientEmailError &&
                                            `top-[0.4rem]`
                                        }`}
                                    >
                                        <BiSolidUserCircle className="h-5 w-5 text-gray-500" />
                                    </div>
                                    <input
                                        type="email"
                                        id="recipient-email"
                                        className="block w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Recipient's Email"
                                        value={voucher.recipientEmail}
                                        onChange={(e) => {
                                            voucherActions.setRecipientEmail(
                                                e.target.value
                                            )
                                        }}
                                    />
                                    {recipientEmailError && (
                                        <span className="mt-1 text-xs text-red-500">
                                            {recipientEmailError}
                                        </span>
                                    )}
                                </div>
                            </>
                        )}
                        <div className="relative">
                            <label
                                htmlFor="name"
                                className="mb-1 block text-sm font-medium text-gray-900"
                            >
                                Sender&apos;s Name
                            </label>
                            <div
                                className={`pointer-events-none absolute inset-y-0 left-0 top-6 flex items-center pl-3.5 ${
                                    senderNameError && `top-[0.4rem]`
                                }`}
                            >
                                <BiSolidUserCircle className="h-5 w-5 text-gray-500" />
                            </div>
                            <input
                                type="text"
                                id="name"
                                className="block w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
                                placeholder="Sender's Name"
                                value={voucher.senderName}
                                onChange={(e) => {
                                    voucherActions.setSenderName(e.target.value)
                                }}
                            />
                            {senderNameError && (
                                <span className="mt-1 text-xs text-red-500">
                                    {senderNameError}
                                </span>
                            )}
                        </div>
                        <div className="relative">
                            <label
                                htmlFor="message"
                                className="mb-1 block text-sm font-medium text-gray-900"
                            >
                                Personal Message
                            </label>
                            <textarea
                                rows={9}
                                id="message"
                                className="block w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  "
                                placeholder="Message"
                                value={voucher.personalMessage}
                                onChange={(e) => {
                                    voucherActions.setPersonalMessage(
                                        e.target.value
                                    )
                                }}
                            />
                            {personalMessageError && (
                                <span className="mt-1 text-xs text-red-500">
                                    {personalMessageError}
                                </span>
                            )}
                        </div>
                    </form>
                </div>
                <div className="w-full lg:w-1/2">
                    <ul className="grid w-full gap-6 md:grid-cols-2">
                        <li>
                            <input
                                type="radio"
                                id="gift-cash"
                                name="gift-type"
                                value="gift-cash"
                                className="peer hidden"
                                checked={voucher.voucherType === 'Cash'}
                                onChange={() => {
                                    voucherActions.setVoucherType('Cash')
                                }}
                            />
                            <label
                                htmlFor="gift-cash"
                                className="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white p-5 text-gray-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:bg-gray-100 hover:text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:peer-checked:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                            >
                                <div className="flex items-center gap-4">
                                    <BsCash className="text-3xl" />
                                    <div className="w-full font-medium">
                                        Gift Cash Voucher
                                    </div>
                                </div>
                            </label>
                        </li>
                        <li>
                            <input
                                type="radio"
                                id="gift-experience"
                                name="gift-type"
                                value="gift-experience"
                                className="peer hidden"
                                checked={voucher.voucherType === 'Experience'}
                                onChange={() => {
                                    voucherActions.setVoucherType('Experience')
                                }}
                            />
                            <label
                                htmlFor="gift-experience"
                                className="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white p-5 text-gray-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:bg-gray-100 hover:text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:peer-checked:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                            >
                                <div className="flex items-center gap-4">
                                    <FaMountain className="text-3xl" />
                                    <div className="w-full font-medium">
                                        Gift an Experience
                                    </div>
                                </div>
                            </label>
                        </li>
                    </ul>
                    {voucher.voucherType === 'Cash' ? (
                        <>
                            <div className="relative flex items-center py-4">
                                <div className="flex-grow border-t border-gray-400"></div>
                                <span className="mx-4 flex-shrink text-gray-400">
                                    Cash Voucher
                                </span>
                                <div className="flex-grow border-t border-gray-400"></div>
                            </div>
                            <p className="mb-2 font-medium">Select Amount</p>
                            <div className="flex flex-wrap gap-2">
                                {local
                                    ? [
                                          10000, 15000, 20000, 25000, 30000,
                                          35000, 40000, 45000,
                                      ].map((price) => (
                                          <label
                                              key={price}
                                              className={`flex w-32 items-center justify-center rounded-md border border-gray-300 py-3 font-medium tracking-wide ${
                                                  voucher.cashAmount === price
                                                      ? 'bg-blue-600 text-white'
                                                      : 'bg-gray-50 text-gray-600 hover:bg-gray-200'
                                              }`}
                                          >
                                              <input
                                                  type="radio"
                                                  name="price"
                                                  value={price}
                                                  className="sr-only"
                                                  checked={
                                                      voucher.cashAmount ===
                                                      price
                                                  }
                                                  onChange={(e) => {
                                                      voucherActions.setCashAmount(
                                                          parseInt(
                                                              e.target.value
                                                          )
                                                      )
                                                  }}
                                              />
                                              {local ? (
                                                  <>LKR {price}/-</>
                                              ) : (
                                                  <>USD ${price}</>
                                              )}
                                          </label>
                                      ))
                                    : [10, 15, 20, 25, 30, 35, 40, 45].map(
                                          (price) => (
                                              <label
                                                  key={price}
                                                  className={`flex w-32 items-center justify-center rounded-md border border-gray-300 py-3 font-medium tracking-wide ${
                                                      voucher.cashAmount ===
                                                      price
                                                          ? 'bg-blue-600 text-white'
                                                          : 'bg-gray-50 text-gray-600 hover:bg-gray-200'
                                                  }`}
                                              >
                                                  <input
                                                      type="radio"
                                                      name="price"
                                                      value={price}
                                                      className="sr-only"
                                                      checked={
                                                          voucher.cashAmount ===
                                                          price
                                                      }
                                                      onChange={(e) => {
                                                          voucherActions.setCashAmount(
                                                              parseInt(
                                                                  e.target.value
                                                              )
                                                          )
                                                      }}
                                                  />
                                                  {local ? (
                                                      <>LKR {price}/-</>
                                                  ) : (
                                                      <>USD ${price}</>
                                                  )}
                                              </label>
                                          )
                                      )}
                            </div>
                            <div className="relative flex items-center py-4">
                                <div className="flex-grow border-t border-gray-400"></div>
                                <span className="mx-4 flex-shrink text-gray-400">
                                    OR
                                </span>
                                <div className="flex-grow border-t border-gray-400"></div>
                            </div>
                            <div className="flex items-center gap-4">
                                <label
                                    htmlFor="name"
                                    className="w-full font-medium text-gray-900"
                                >
                                    {local
                                        ? 'Enter Custom Amount (LKR)'
                                        : 'Enter Custom Amount (USD $)'}
                                </label>
                                <input
                                    type="number"
                                    id="amount"
                                    className="w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 px-4 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
                                    placeholder="Enter value..."
                                    value={voucher.cashAmount}
                                    onChange={(e) => {
                                        voucherActions.setCashAmount(
                                            parseInt(e.target.value)
                                        )
                                    }}
                                />
                                {amountError && (
                                    <span className="mt-1 text-sm text-red-500">
                                        {amountError}
                                    </span>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="relative flex items-center py-4">
                                <div className="flex-grow border-t border-gray-400"></div>
                                <span className="mx-4 flex-shrink text-gray-400">
                                    Experience
                                </span>
                                <div className="flex-grow border-t border-gray-400"></div>
                            </div>
                            <p className="mb-2 font-medium">
                                Select an Experience
                            </p>
                            <div className="relative w-full">
                                <label
                                    htmlFor="simple-search"
                                    className="sr-only"
                                >
                                    Search
                                </label>
                                <div className="relative w-full">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <AiOutlineSearch />
                                    </div>
                                    <input
                                        type="text"
                                        id="simple-search"
                                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Search an experience..."
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                        required
                                    />
                                </div>
                                {showSearchSuggestions && (
                                    <ul className="absolute z-10 mt-2 w-full rounded-lg border border-gray-300 bg-white py-1 shadow-lg">
                                        {experiences
                                            .filter((experience) =>
                                                experience.name
                                                    .toLowerCase()
                                                    .includes(
                                                        searchQuery.toLowerCase()
                                                    )
                                            )
                                            .map(
                                                (
                                                    experience: ExperienceTypes
                                                ) => (
                                                    <li
                                                        key={experience.id}
                                                        className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${
                                                            voucher
                                                                .selectedExperience
                                                                ?.item
                                                                .experience
                                                                .id ===
                                                            experience.id
                                                                ? 'bg-gray-100 font-medium'
                                                                : ''
                                                        }`}
                                                        onClick={() => {
                                                            handleExperienceSelect(
                                                                experience
                                                            )
                                                        }}
                                                    >
                                                        {experience.name}
                                                    </li>
                                                )
                                            )}
                                    </ul>
                                )}
                                {experienceError && (
                                    <span className="mt-1 text-sm text-red-500">
                                        {experienceError}
                                    </span>
                                )}
                            </div>
                            {experiences.filter((experience) =>
                                experience.suitedVoucher.some(
                                    (suited) => suited.id === voucher.voucherId
                                )
                            ).length > 0 && (
                                <div className="mt-4">
                                    <p className="mb-2 font-medium">
                                        Recommended Experiences
                                    </p>
                                    {experiences
                                        .filter((experience) =>
                                            experience.suitedVoucher.some(
                                                (suited) =>
                                                    suited.id ===
                                                    voucher.voucherId
                                            )
                                        )
                                        .map((filteredExperience) => (
                                            <div
                                                className="mb-2 cursor-pointer rounded-md border border-gray-300 p-4 text-sm text-gray-700 hover:bg-gray-100"
                                                key={filteredExperience.id}
                                                onClick={() => {
                                                    handleExperienceSelect(
                                                        filteredExperience
                                                    )
                                                }}
                                            >
                                                {filteredExperience.name}
                                            </div>
                                        ))}
                                </div>
                            )}
                            {selectedExperience && (
                                <div className="mt-4">
                                    <p className="font-medium">
                                        Selected Experience:
                                    </p>
                                    <div className="mt-2 flex items-center gap-2">
                                        <Card className="flex w-full items-center gap-2 p-3">
                                            <div className="relative h-12 w-12 rounded-full">
                                                <BlurImage
                                                    src={
                                                        selectedExperience
                                                            .images[0].src
                                                    }
                                                    alt={
                                                        selectedExperience
                                                            .images[0].alt
                                                    }
                                                    objectFit="cover"
                                                    style="rounded-full"
                                                />
                                            </div>

                                            {selectedExperience.name}
                                            {!voucher.selectedExperience ? (
                                                <div
                                                    className="ml-auto rounded-md border p-2 text-sm transition-all hover:bg-gray-100"
                                                    onClick={() => {
                                                        setShowConfigure(true)
                                                        router.push(
                                                            '#reservation-voucher'
                                                        )
                                                    }}
                                                >
                                                    Configure
                                                </div>
                                            ) : (
                                                <p className="ml-auto rounded-md border bg-green-500 p-2 text-sm uppercase text-white transition-all">
                                                    Configured
                                                </p>
                                            )}
                                        </Card>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
            <div className="flex items-center justify-between border-t p-5">
                <button
                    onClick={handleBack}
                    className={`w-44 bg-gray-200 py-3 text-lg font-semibold uppercase text-gray-600 transition-all hover:bg-gray-300 ${
                        currentStep < 1 ? 'opacity-0' : 'opacity-100'
                    }`}
                    disabled={currentStep < 1}
                >
                    Back
                </button>
                <button
                    onClick={handleNext}
                    className={`w-44 bg-green-500 py-3 text-lg font-semibold uppercase text-white transition-all hover:bg-green-600 ${
                        currentStep > 1 ? 'opacity-0' : 'opacity-100'
                    }`}
                    disabled={currentStep > 1}
                >
                    Continue
                </button>
            </div>
            <div id="reservation-voucher" />
            {showConfigure &&
                selectedExperience &&
                !voucher.selectedExperience &&
                !success && (
                    <Reservation
                        experience={selectedExperience}
                        addType="gift"
                    />
                )}
        </>
    )
}

export default VoucherDetails
