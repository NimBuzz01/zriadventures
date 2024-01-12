'use client'
import Breadcrumbs from '@/components/common/Breadcrumbs'
import QuantitySelector from '@/components/common/QuantitySelector'
import SubHero from '@/components/common/SubHero'
import ThumbnailCarousel from '@/components/carousels/ThumbnailCarousel'
import BaseSkeleton from '@/components/skeletons/BaseSkeleton'
import { useLocal } from '@/contexts/SetLocalContext'
import React, { useEffect, useState } from 'react'
import { useDataContext } from '@/contexts/DataContext'
import NotFoundLabel from '@/components/NotFoundLabel'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import Markdown from 'react-markdown'
import MainButton from '@/components/common/MainButton'
import { useRouter } from 'next/navigation'
import { RentalTypes } from '@/types/rentalTypes'
import DatePicker from '@/components/common/DatePicker'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import InputField from '@/components/common/InputField'
import { BsArrowRight, BsFillCheckCircleFill } from 'react-icons/bs'
import 'react-phone-number-input/style.css'
import CountrySelect from '@/components/common/CountrySelect'
import { sendEmail } from '@/lib/utils/func'
import { createRentalInquiry } from '@/constants/emailTemplates/InquiryForm'
import { NEW_RENTAL_INQUIRY } from '@/constants/emailTemplates/SubjectConstants'
import { EMAIL_SENDER_EMAIL } from '@/app.config'
import { RENTALS_HERO_IMAGE } from '@/constants/pages/RentalPageConstants'

interface FormData {
    firstName: string
    lastName: string
    contactNumber: string
    email: string
    message: string
}

const RentalContent = ({ rentalId }: { rentalId: string }) => {
    const router = useRouter()
    let { rentals } = useDataContext()
    const rental =
        rentals && rentals.find((rental: RentalTypes) => rental.id === rentalId)
    const [startDate, setStartDate] = useState(new Date())
    const [quantity, setQuantity] = useState(1)
    const [imageLoaded, setImageLoaded] = useState(false)
    const { local, setKey } = useLocal()
    const [error, setError] = useState(false)
    const [selectedOption, setSelectedOption] = useState(
        rental && rental.options[0]
    )

    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(true)

    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        contactNumber: '',
        email: '',
        message: '',
    })

    const [errors, setErrors] = useState<{ [key: string]: string }>({
        firstName: '',
        lastName: '',
        contactNumber: '',
        email: '',
        message: '',
    })

    useEffect(() => {
        if (!rental) {
            return // Early return if merchandise is not found
        }

        setSelectedOption(rental && rental.options[0])

        const img = new Image()
        img.src = rental.item.images[0].src
        img.onload = () => setImageLoaded(true)
        setLoading(false)
    }, [rental])

    if (loading) {
        return (
            <div className="h-screen w-full">
                <NotFoundLabel text="Loading..." loading />
            </div>
        )
    }

    if (!rental) {
        return (
            <div className="h-screen w-full">
                <NotFoundLabel text="Sorry! The searched rental is not found" />
            </div>
        )
    }

    const getDurationAmount = (duration: string) => {
        switch (duration) {
            case 'days-1':
                return 1
            case 'days-3':
                return 3
            case 'days-7':
                return 7
            default:
                return 0 // Return the original value if it doesn't match any of the cases
        }
    }

    const getDurationLabel = (duration: string) => {
        switch (duration) {
            case 'days-1':
                return '1 Day'
            case 'days-3':
                return '3 Days'
            case 'days-7':
                return '1 Week'
            default:
                return duration // Return the original value if it doesn't match any of the cases
        }
    }

    const getEndDate = (startDate: Date, duration: number) => {
        const endDate = new Date(startDate)
        endDate.setDate(startDate.getDate() + duration)

        // Return the endDate
        return endDate
    }

    // function handlePurchase(type: 'add' | 'buy') {
    //     if (quantity > 0 && selectedOption != undefined && rental) {
    //         setError(false)
    //         setSelectedOption({
    //             ...selectedOption,
    //             duration: getDurationLabel(selectedOption.duration),
    //         })
    //         const cartItem: RentalCart = {
    //             item: {
    //                 id: uuidv4(),
    //                 quantity: quantity,
    //                 selectedOption: selectedOption,
    //                 rental: rental,
    //                 startDate: startDate,
    //                 endDate: getEndDate(
    //                     startDate,
    //                     getDurationAmount(selectedOption.duration)
    //                 ),
    //             },
    //             itemType: 'RENTAL',
    //         }

    //         const existingCartJSON = localStorage.getItem('Cart')

    //         if (existingCartJSON !== null) {
    //             const existingCart = JSON.parse(existingCartJSON)

    //             const cartArray = Array.isArray(existingCart)
    //                 ? existingCart
    //                 : []

    //             cartArray.push(cartItem)

    //             localStorage.setItem('Cart', JSON.stringify(cartArray))
    //         } else {
    //             localStorage.setItem('Cart', JSON.stringify([cartItem]))
    //         }
    //         if (type === 'add') {
    //             toast.success('Your Rental is Added to Cart!')
    //         } else {
    //             router.push('/cart')
    //         }
    //         setKey()
    //     } else {
    //         setError(true)
    //     }
    // }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
        setErrors({
            ...errors,
            [name]: '',
        })
    }

    const handleInquire = (e: React.FormEvent) => {
        e.preventDefault()
        // Validate the form data here
        const newErrors: { [key: string]: string } = {}

        if (!formData.firstName) {
            newErrors.firstName = 'First name is required'
        }

        if (!formData.lastName) {
            newErrors.lastName = 'Last name is required'
        }

        if (!formData.contactNumber) {
            newErrors.contactNumber = 'Contact number is required'
        } else if (!/^\d{10}$/i.test(formData.contactNumber)) {
            newErrors.contactNumber = 'Contact number must be 10 digits'
        }

        if (!formData.email) {
            newErrors.email = 'Email address is required'
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)
        ) {
            newErrors.email = 'Invalid email address'
        }

        setErrors(newErrors)

        // If there are no errors, you can submit the form
        if (Object.keys(newErrors).length === 0) {
            const inquiry = createRentalInquiry(formData, rental)
            sendEmail(EMAIL_SENDER_EMAIL, NEW_RENTAL_INQUIRY, inquiry)
            setSuccess(true)
        }
    }
    return (
        <>
            {' '}
            <SubHero
                title={rental.name}
                image={RENTALS_HERO_IMAGE}
                fillColor="fill-gray-50"
            />
            <div className="flex w-full flex-col items-center bg-gray-50 py-16">
                <div className="flex w-full flex-col items-center justify-center gap-10 px-4 pb-10 sm:px-10 lg:flex-row lg:items-start">
                    <div className="flex w-full max-w-[550px] flex-col lg:w-1/2">
                        <div className="mb-5">
                            <Breadcrumbs
                                first="Rentals"
                                firstHref="/rentals"
                                last={rental.name}
                            />
                        </div>
                        {rental.item.images && rental.item.images.length > 0 ? (
                            <ThumbnailCarousel>
                                {rental.item.images.map((image, index) => (
                                    <div
                                        key={index}
                                        className="h-full w-full object-contain"
                                    >
                                        {imageLoaded ? (
                                            <img
                                                key={index}
                                                src={image.src}
                                                alt={image.alt}
                                                className="h-full max-h-[600px] w-full object-contain"
                                            />
                                        ) : (
                                            <BaseSkeleton />
                                        )}
                                    </div>
                                ))}
                            </ThumbnailCarousel>
                        ) : (
                            <NotFoundLabel text="No images available for this rentals." />
                        )}
                    </div>
                    <div className="mt-5 flex w-full max-w-[550px] flex-col self-stretch lg:w-1/2">
                        <h1 className="mb-1 mt-5 text-2xl font-semibold text-blue-950 sm:text-3xl lg:text-4xl">
                            {rental.name}
                        </h1>
                        <h2 className="mb-5 text-lg font-medium text-gray-400 md:text-xl">
                            {rental.item.category.name}
                        </h2>
                        <p className="mb-8 text-sm font-medium md:text-base">
                            {rental.item.shortDescription}
                        </p>
                        <p className="font-medium text-blue-900">Price</p>
                        <p className="mb-8 text-2xl font-semibold text-blue-900 md:text-3xl">
                            {local ? (
                                <>LKR {selectedOption?.cost.LKR}</>
                            ) : (
                                <>USD ${selectedOption?.cost.USD}</>
                            )}
                        </p>
                        <ul className="mb-8 ml-5 flex list-disc flex-col gap-2 text-sm text-gray-500">
                            {rental.item.features.map((item, index: number) => (
                                <li key={index}>
                                    <Markdown>{item}</Markdown>
                                </li>
                            ))}
                        </ul>
                        {/* <div className="flex flex-col mt-5 mb-4">
                <p className="mb-1 text-xs font-medium text-gray-500 sm:text-sm">
                    Start Date
                </p>
                <DatePicker
                    value={startDate}
                    setValue={setStartDate}
                />
            </div> */}
                        <div className="mb-4">
                            <p className="mb-1 font-medium capitalize text-gray-600">
                                Select Duration
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {rental.options.map((option, index) => (
                                    <label
                                        key={index}
                                        className={`inline-flex items-center rounded-md border-2 px-3 py-2 text-sm font-medium capitalize ${
                                            selectedOption?.duration ===
                                            option.duration
                                                ? 'border-gray-400 bg-gray-100 text-blue-950'
                                                : 'border-gray-300'
                                        } cursor-pointer`}
                                    >
                                        <input
                                            type="radio"
                                            value={option.duration}
                                            checked={
                                                selectedOption?.duration ===
                                                option.duration
                                            }
                                            onChange={() =>
                                                setSelectedOption(option)
                                            }
                                            className="peer mr-2 hidden"
                                        />
                                        {getDurationLabel(option.duration)}
                                    </label>
                                ))}
                            </div>
                        </div>
                        {/* <div className="mb-auto">
                <p className="mb-1 font-medium">Select Quantity</p>
                <QuantitySelector
                    value={quantity}
                    setValue={setQuantity}
                />
                {error && (
                    <p className="mt-1 text-xs text-red-600">
                        Please select quantity
                    </p>
                )}
            </div> */}
                        <div className="mb-6 mt-6 flex flex-col gap-2 sm:flex-row sm:gap-4">
                            {/* <MainButton
                    text={'Add to Cart'}
                    onClick={() => {
                        handlePurchase('add')
                    }}
                    bgColor="bg-gray-600 group-hover:bg-gray-800"
                />
                <MainButton
                    text={'Buy Now'}
                    onClick={() => {
                        handlePurchase('buy')
                    }}
                /> */}
                            <Dialog>
                                <DialogTrigger asChild>
                                    <MainButton text="Inquire" />
                                </DialogTrigger>
                                <DialogContent className="z-[1001] h-[100dvh] overflow-y-auto scroll-smooth scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-800 sm:h-[90dvh]  sm:max-w-[1000px]">
                                    <div
                                        className={`w-full flex-col  px-4 py-10 sm:px-10 ${
                                            success &&
                                            'flex h-full items-center justify-center gap-10'
                                        }`}
                                    >
                                        {success ? (
                                            <>
                                                <div
                                                    className={`flex flex-col items-center text-2xl font-medium text-green-600 md:text-3xl`}
                                                >
                                                    <BsFillCheckCircleFill className="mb-4 text-3xl" />
                                                    <p>
                                                        Your inquiry has been
                                                        sent.
                                                    </p>
                                                    <p>
                                                        We will get back to you
                                                        shortly!
                                                    </p>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <h2 className="mb-6 text-center text-3xl font-semibold uppercase text-blue-950">
                                                    Inquiry Form
                                                </h2>
                                                <form
                                                    onSubmit={handleInquire}
                                                    className="mt-8 space-y-6"
                                                >
                                                    <div className="flex flex-col gap-6 md:flex-row">
                                                        <InputField
                                                            label="First Name"
                                                            name="firstName"
                                                            type="text"
                                                            value={
                                                                formData.firstName
                                                            }
                                                            error={
                                                                errors.firstName
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            className="w-full"
                                                        />
                                                        <InputField
                                                            label="Last Name"
                                                            name="lastName"
                                                            type="text"
                                                            value={
                                                                formData.lastName
                                                            }
                                                            error={
                                                                errors.lastName
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            className="w-full"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col gap-6 md:flex-row">
                                                        <InputField
                                                            label="Contact Number"
                                                            name="contactNumber"
                                                            type="text"
                                                            value={
                                                                formData.contactNumber
                                                            }
                                                            error={
                                                                errors.contactNumber
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                            className="w-full"
                                                        />
                                                        <InputField
                                                            label="Email"
                                                            name="email"
                                                            type="email"
                                                            value={
                                                                formData.email
                                                            }
                                                            error={errors.email}
                                                            onChange={
                                                                handleChange
                                                            }
                                                            className="w-full"
                                                        />
                                                    </div>
                                                    <div className="mt-4 flex flex-grow flex-col">
                                                        <p className="mb-1 text-sm font-medium text-gray-700">
                                                            Additional requests
                                                        </p>
                                                        <textarea
                                                            rows={7}
                                                            name="additionalRequest"
                                                            className="w-full rounded-md border p-3 text-xs text-gray-600 sm:text-sm"
                                                            value={
                                                                formData.message
                                                            }
                                                            onChange={(
                                                                event
                                                            ) => {
                                                                const value =
                                                                    event.target
                                                                        .value
                                                                setFormData({
                                                                    ...formData,
                                                                    message:
                                                                        value,
                                                                })
                                                                setErrors({
                                                                    ...errors,
                                                                    additionalRequest:
                                                                        '',
                                                                })
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="flex items-center justify-center pt-6">
                                                        <MainButton
                                                            type="submit"
                                                            text="Submit"
                                                        />
                                                    </div>
                                                </form>
                                            </>
                                        )}
                                        <div className="mt-10 text-gray-500">
                                            <h1 className="mb-6 text-lg font-medium text-gray-700">
                                                What Happens Next?
                                            </h1>
                                            <p className="font-medium">
                                                We will contact you via email or
                                                call on your inquiry.
                                            </p>
                                            <p className="mb-4 text-sm">
                                                We don&#39;t allow direct
                                                purchases on our rental items.
                                                We will get in touch with you as
                                                soon as possible. Contact us for
                                                more information.
                                            </p>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </div>
                <Tabs
                    defaultValue="description"
                    className="w-full max-w-[1220px] px-4 sm:px-10"
                >
                    <TabsList className="flex justify-center gap-4 border font-medium sm:gap-10">
                        <TabsTrigger
                            value="description"
                            className="border-b-2 border-transparent p-2 transition-all data-[state=active]:border-blue-600 data-[state=active]:bg-slate-100"
                        >
                            Description
                        </TabsTrigger>
                        <TabsTrigger
                            value="information"
                            className="border-b-2 border-transparent p-2 transition-all data-[state=active]:border-blue-600 data-[state=active]:bg-slate-100"
                        >
                            Additional Information
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="description" className="mt-2 px-6 py-4">
                        <p>{rental.item.description}</p>
                    </TabsContent>
                    <TabsContent value="information" className="mt-2 px-6 py-4">
                        <p>{rental.item.additionalInformation}</p>
                    </TabsContent>
                </Tabs>
            </div>
        </>
    )
}

export default RentalContent
