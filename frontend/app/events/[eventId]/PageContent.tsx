import NotFoundLabel from '@/components/NotFoundLabel'
import ThumbnailCarousel from '@/components/carousels/ThumbnailCarousel'
import Breadcrumbs from '@/components/common/Breadcrumbs'
import CustomAccordion from '@/components/common/CustomAccordion'
import BaseSkeleton from '@/components/skeletons/BaseSkeleton'
import React, { useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import { EventCart, EventTypes } from '@/types/eventTypes'
import { useLocal } from '@/contexts/SetLocalContext'
import { formatDate } from '@/lib/utils/func'
import { v4 as uuidv4 } from 'uuid'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import InputField from '@/components/common/InputField'
import { BsArrowRight, BsFillCheckCircleFill } from 'react-icons/bs'
import 'react-phone-number-input/style.css'
import CountrySelect from '@/components/common/CountrySelect'

interface Props {
    event: EventTypes
}

interface FormData {
    firstName: string
    lastName: string
    contactNumber: string
    nationality: string
    email: string
    additionalRequest: string
    pax: number
}

const PageContent = ({ event }: Props) => {
    const { local, setKey } = useLocal()
    const [imageLoaded, setImageLoaded] = useState(false)
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        if (event) {
            const img = new Image()
            img.src = event.images[0].src
            img.onload = () => setImageLoaded(true)
        }
    }, [event])

    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        contactNumber: '',
        nationality: '',
        email: '',
        additionalRequest: '',
        pax: 0,
    })

    const [errors, setErrors] = useState<{ [key: string]: string }>({
        firstName: '',
        lastName: '',
        contactNumber: '',
        nationality: '',
        email: '',
        additionalRequest: '',
        pax: '',
    })

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

    const handleCountryChange = (value: string) => {
        setFormData({
            ...formData,
            nationality: value,
        })
        setErrors({
            ...errors,
            nationality: '',
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
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

        if (!formData.nationality) {
            newErrors.nationality = 'Nationality is required'
        }

        if (!formData.email) {
            newErrors.email = 'Email address is required'
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)
        ) {
            newErrors.email = 'Invalid email address'
        }

        if (!formData.pax || formData.pax <= 0) {
            newErrors.pax = 'Select Number of Pax'
        }

        setErrors(newErrors)

        // If there are no errors, you can submit the form
        if (Object.keys(newErrors).length === 0) {
            const cartItem: EventCart = {
                item: {
                    id: uuidv4(),
                    info: {
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        email: formData.email,
                        contactNumber: formData.contactNumber,
                        nationality: formData.nationality,
                        pax: formData.pax,
                        requests: formData.additionalRequest,
                    },
                    event: event,
                },
                itemType: 'EVENT',
            }

            const existingCartJSON = localStorage.getItem('Cart')

            if (existingCartJSON !== null) {
                const existingCart = JSON.parse(existingCartJSON)

                const cartArray = Array.isArray(existingCart)
                    ? existingCart
                    : []

                cartArray.push(cartItem)

                localStorage.setItem('Cart', JSON.stringify(cartArray))
            } else {
                localStorage.setItem('Cart', JSON.stringify([cartItem]))
            }
            setSuccess(true)
            setKey()
        }
    }

    return (
        <>
            <div className="flex w-full flex-col justify-center gap-16 bg-gray-50 px-4 py-20 sm:px-10 lg:flex-row">
                <div className="w-full lg:w-1/2 ">
                    <div className="mb-5">
                        <Breadcrumbs
                            first="Events"
                            firstHref="/events"
                            last={event.name}
                        />
                    </div>
                    <h1 className="mb-10 text-xl font-medium sm:text-2xl">
                        {event.about.shortDescription}
                    </h1>
                    <div className="mb-10 flex flex-wrap items-center justify-center gap-12 sm:gap-24">
                        <div>
                            <p className="text-sm font-medium uppercase text-gray-500">
                                Location
                            </p>
                            <p className="text-lg font-medium text-blue-950 sm:text-xl md:text-2xl">
                                {event.location.name}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm font-medium uppercase text-gray-500">
                                Duration
                            </p>
                            <p className="text-lg font-medium text-blue-950 sm:text-xl md:text-2xl">
                                {event.duration.amount +
                                    ' ' +
                                    event.duration.type}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm font-medium uppercase text-gray-500">
                                Group Size
                            </p>
                            <p className="text-lg font-medium text-blue-950 sm:text-xl md:text-2xl">
                                {event.groupSize}
                            </p>
                        </div>
                    </div>
                    <div className="mb-10 flex items-center justify-center gap-12 bg-gray-100 py-10 sm:gap-24">
                        <div>
                            <p className="text-sm font-medium uppercase text-gray-500">
                                Start Date
                            </p>
                            <p className="text-lg font-medium text-blue-950 sm:text-xl md:text-2xl">
                                {formatDate(event.startDate)}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm font-medium uppercase text-gray-500">
                                End Date
                            </p>
                            <p className="text-lg font-medium text-blue-950 sm:text-xl md:text-2xl">
                                {formatDate(event.endDate)}
                            </p>
                        </div>
                    </div>
                    <p>{event.about.longDescription}</p>
                    <div className="my-6">
                        <p className="mb-2 text-xl font-semibold">
                            Image Gallery
                        </p>
                        {event.images && event.images.length > 0 ? (
                            <ThumbnailCarousel>
                                {event.images.map((image, index) => (
                                    <div
                                        key={index}
                                        className="h-full w-full object-cover"
                                    >
                                        {imageLoaded ? (
                                            <img
                                                src={image.src}
                                                className="h-full max-h-[600px] w-full object-cover"
                                                alt={image.alt}
                                            />
                                        ) : (
                                            <BaseSkeleton />
                                        )}
                                    </div>
                                ))}
                            </ThumbnailCarousel>
                        ) : (
                            <NotFoundLabel text="No images available for this experience." />
                        )}
                    </div>
                    <CustomAccordion title="What's Included">
                        <ul className="list-disc">
                            {event.included.map((e, index: number) => (
                                <li
                                    key={index}
                                    className="my-4 text-sm font-medium sm:text-base"
                                >
                                    <Markdown>{e}</Markdown>
                                </li>
                            ))}
                        </ul>
                    </CustomAccordion>
                    <CustomAccordion title="Additional Information">
                        {event.requirements.map((req, index: number) => (
                            <div key={index} className="my-6">
                                <h1 className="mb-1 text-sm font-medium sm:text-base">
                                    {req.name}
                                </h1>
                                <p className="text-sm sm:text-base">
                                    {req.description}
                                </p>
                            </div>
                        ))}
                    </CustomAccordion>
                    <CustomAccordion title="Frequently asked questions">
                        {event.faq.map((f, index) => (
                            <div key={index} className="my-6">
                                <h1 className="mb-4 text-sm font-medium sm:text-base">
                                    {f.question}
                                </h1>
                                <p className="text-sm sm:text-base">
                                    {f.answer}
                                </p>
                            </div>
                        ))}
                    </CustomAccordion>
                    <div id="success-cart" className="hidden lg:block"></div>
                    <div id="reservation" className="hidden lg:block"></div>
                    <CustomAccordion title="Terms and Conditions">
                        <ul className="list-disc">
                            {event.terms.map((e, index: number) => (
                                <li
                                    key={index}
                                    className="my-4 text-sm sm:text-base"
                                >
                                    <Markdown>{e}</Markdown>
                                </li>
                            ))}
                        </ul>
                    </CustomAccordion>
                </div>
                <div className="flex w-full flex-col lg:w-80">
                    {new Date(event.startDate) >= new Date() && (
                        <div>
                            <p className="text-3xl font-semibold">
                                {local ? (
                                    <>LKR {event.cost.LKR}</>
                                ) : (
                                    <>USD ${event.cost.USD}</>
                                )}{' '}
                                <span className="text-sm font-medium uppercase">
                                    per Adult
                                </span>
                            </p>
                            <p className="text-lg font-semibold">
                                {local ? (
                                    <>LKR {event.cost.LKR}</>
                                ) : (
                                    <>USD ${event.cost.USD}</>
                                )}{' '}
                                <span className="text-sm font-medium uppercase">
                                    per Child
                                </span>
                            </p>
                        </div>
                    )}
                    <Dialog>
                        <DialogTrigger
                            asChild
                            disabled={
                                new Date(event.startDate) < new Date()
                                    ? true
                                    : false
                            }
                        >
                            <button
                                disabled={
                                    new Date(event.startDate) < new Date()
                                        ? true
                                        : false
                                }
                                className={`mb-4 mt-5 w-full py-3 text-lg font-semibold uppercase text-white transition-all ${
                                    new Date(event.startDate) < new Date()
                                        ? 'bg-gray-500'
                                        : 'bg-green-500 hover:bg-green-600'
                                }`}
                            >
                                {new Date(event.startDate) < new Date()
                                    ? 'Event Ended'
                                    : 'Reserve Now'}
                            </button>
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
                                            You Have Reserved Successfully!
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <h2 className="mb-6 text-center text-3xl font-semibold uppercase text-blue-950">
                                            Reserve your booking
                                        </h2>
                                        <form
                                            onSubmit={handleSubmit}
                                            className="mt-8 space-y-6"
                                        >
                                            <div className="flex flex-col gap-6 md:flex-row">
                                                <InputField
                                                    label="First Name"
                                                    name="firstName"
                                                    type="text"
                                                    value={formData.firstName}
                                                    error={errors.firstName}
                                                    onChange={handleChange}
                                                    className="w-full"
                                                />
                                                <InputField
                                                    label="Last Name"
                                                    name="lastName"
                                                    type="text"
                                                    value={formData.lastName}
                                                    error={errors.lastName}
                                                    onChange={handleChange}
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
                                                    error={errors.contactNumber}
                                                    onChange={handleChange}
                                                    className="w-full"
                                                />
                                                <CountrySelect
                                                    label="Nationality"
                                                    name="nationality"
                                                    value={formData.nationality}
                                                    error={errors.nationality}
                                                    onChange={
                                                        handleCountryChange
                                                    }
                                                    className="w-full"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-6 md:flex-row">
                                                <InputField
                                                    label="Email"
                                                    name="email"
                                                    type="email"
                                                    value={formData.email}
                                                    error={errors.email}
                                                    onChange={handleChange}
                                                    className="w-full"
                                                />
                                                <InputField
                                                    label="Number of People"
                                                    name="pax"
                                                    type="number"
                                                    value={formData.pax}
                                                    error={errors.pax}
                                                    onChange={handleChange}
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
                                                        formData.additionalRequest
                                                    }
                                                    onChange={(event) => {
                                                        const value =
                                                            event.target.value
                                                        setFormData({
                                                            ...formData,
                                                            additionalRequest:
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
                                                <button
                                                    type="submit"
                                                    className="group flex w-44 items-center justify-center gap-2 rounded-sm bg-green-600 px-4 py-2.5 text-base font-medium uppercase tracking-wider text-white transition-all hover:bg-green-800 sm:px-6 sm:py-3 md:text-lg"
                                                >
                                                    Reserve{' '}
                                                    <BsArrowRight className="text-xl transition-all duration-300 group-hover:translate-x-1" />
                                                </button>
                                            </div>
                                        </form>
                                    </>
                                )}
                                <div className="mt-10 text-gray-500">
                                    <h1 className="mb-6 text-lg font-medium text-gray-700">
                                        What Happens Next?
                                    </h1>
                                    <p className="font-medium">
                                        Make the payment
                                    </p>
                                    <p className="mb-4 text-sm">
                                        Go Through Checkout to Pay for the
                                        Event. It can be either through bank or
                                        the available Payment Vendors.
                                    </p>
                                    <p className="font-medium">
                                        Your reservation is confirmed!
                                    </p>
                                    <p className="mb-4 text-sm">
                                        Once your payment is verified, You will
                                        receive reservation confirmation via
                                        Email.
                                    </p>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </>
    )
}

export default PageContent
