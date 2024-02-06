'use client'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { IoMdMail } from 'react-icons/io'
import { BiSolidUserCircle } from 'react-icons/bi'
import {
    CONTACT_FORM_MAIN_TITLE,
    CONTACT_FORM_DESCRIPTION,
    CONTACT_FORM_BG_IMAGE,
} from '@/constants/pages/ContactPageConstants'
import BlurImage from '@/components/common/blur-image'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { toast } from 'sonner'
import MainButton from '@/components/common/main-button'
import { createContactEmail } from '@/constants/emailTemplates/ContactUs'
import { NEW_CONTACT_REQUEST } from '@/constants/emailTemplates/SubjectConstants'
import { EMAIL_SENDER_EMAIL } from '@/app.config'
import {
    loadCaptchaEnginge,
    LoadCanvasTemplate,
    LoadCanvasTemplateNoReload,
    validateCaptcha,
} from '@vinhpd/react-simple-captcha'
import { sendEmail } from '@/lib/utils'

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        contactNumber: '',
        email: '',
        message: '',
        captcha: '',
    })

    const [errors, setErrors] = useState({
        name: '',
        contactNumber: '',
        email: '',
        message: '',
        captcha: '',
    })

    useEffect(() => {
        loadCaptchaEnginge(6)
    }, [])

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handlePhoneNumberChange = (value: string) => {
        setFormData((prevData) => ({
            ...prevData,
            contactNumber: value,
        }))
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        let hasErrors = false
        const newErrors = {
            name: '',
            contactNumber: '',
            email: '',
            message: '',
            captcha: '',
        }

        if (!formData.name) {
            newErrors.name = 'Name is required'
            hasErrors = true
        }

        if (!formData.contactNumber) {
            newErrors.contactNumber = 'Contact number is required'
            hasErrors = true
        }

        if (!formData.email) {
            newErrors.email = 'Email is required'
            hasErrors = true
        }

        if (!formData.message) {
            newErrors.message = 'Message is required'
            hasErrors = true
        }

        if (!formData.captcha) {
            newErrors.message = 'Message is required'
            hasErrors = true
        }

        if (validateCaptcha(formData.captcha) == false) {
            newErrors.captcha = 'Invalid Captcha'
            hasErrors = true
        }

        if (hasErrors) {
            setErrors(newErrors)
            return
        }

        await sendEmail(
            EMAIL_SENDER_EMAIL,
            NEW_CONTACT_REQUEST,
            createContactEmail(
                formData.name,
                formData.contactNumber,
                formData.email,
                formData.message
            )
        )

        toast.success('Your Message has been delivered!')

        setFormData({
            name: '',
            contactNumber: '',
            email: '',
            message: '',
            captcha: '',
        })

        setErrors({
            name: '',
            contactNumber: '',
            email: '',
            message: '',
            captcha: '',
        })
        // Display a success message or handle the success scenario
    }

    return (
        <div className="w-full max-w-[1100px] py-40 sm:w-[90%]">
            <div className="mx-auto flex flex-col overflow-hidden bg-white shadow-lg sm:rounded-xl lg:flex-row">
                <div className="relative w-full lg:w-1/2">
                    <BlurImage
                        src={CONTACT_FORM_BG_IMAGE}
                        alt=""
                        objectFit="cover"
                        style="max-h-96 lg:max-h-none"
                    />
                </div>
                <div className="flex w-full flex-col px-6 py-16 sm:px-12 lg:w-1/2">
                    <h2 className="mb-1 text-3xl font-semibold text-blue-950">
                        {CONTACT_FORM_MAIN_TITLE}
                    </h2>
                    <p className="text-md mb-4 block font-medium text-gray-900">
                        {CONTACT_FORM_DESCRIPTION}
                    </p>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-3"
                    >
                        <div className="relative">
                            <label
                                htmlFor="name"
                                className="mb-1 block text-sm font-medium text-gray-900"
                            >
                                Full Name
                            </label>
                            <div
                                className={`pointer-events-none absolute inset-y-0 left-0 top-6 flex items-center pl-3.5 ${
                                    errors.name && `top-[0.4rem]`
                                }`}
                            >
                                <BiSolidUserCircle className="h-5 w-5 text-gray-500" />
                            </div>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                className="block w-full rounded-md border border-gray-300 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
                                placeholder="Full Name"
                                onChange={handleInputChange}
                            />
                            {errors.name && (
                                <p className="mt-0.5 text-xs text-red-500">
                                    {errors.name}
                                </p>
                            )}
                        </div>
                        <div className="relative">
                            <label
                                htmlFor="number"
                                className="mb-1 block text-sm font-medium text-gray-900"
                            >
                                Contact Number
                            </label>
                            <PhoneInput
                                defaultCountry="LK"
                                value={formData.contactNumber}
                                onChange={handlePhoneNumberChange}
                                className="block w-full rounded-md border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
                            />
                            {errors.contactNumber && (
                                <p className="mt-0.5 text-xs text-red-500">
                                    {errors.contactNumber}
                                </p>
                            )}
                        </div>
                        <div className="relative">
                            <label
                                htmlFor="email"
                                className="mb-1 block text-sm font-medium text-gray-900"
                            >
                                Email
                            </label>
                            <div
                                className={`pointer-events-none absolute inset-y-0 left-0 top-6 flex items-center pl-3.5 ${
                                    errors.name && `top-[0.4rem]`
                                }`}
                            >
                                <IoMdMail className="h-5 w-5 text-gray-500" />
                            </div>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                value={formData.email}
                                className="block w-full rounded-md border border-gray-300 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  "
                                placeholder="Email"
                                onChange={handleInputChange}
                            />
                            {errors.email && (
                                <p className="mt-0.5 text-xs text-red-500">
                                    {errors.email}
                                </p>
                            )}
                        </div>
                        <div className="relative">
                            <label
                                htmlFor="message"
                                className="mb-1 block text-sm font-medium text-gray-900"
                            >
                                Message
                            </label>
                            <textarea
                                rows={7}
                                id="message"
                                name="message"
                                value={formData.message}
                                className="block w-full rounded-md border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  "
                                placeholder="Message"
                                onChange={handleTextareaChange}
                            />
                            {errors.message && (
                                <p className="mt-0.5 text-xs text-red-500">
                                    {errors.message}
                                </p>
                            )}
                        </div>
                        <div className="relative">
                            <LoadCanvasTemplate />
                            <input
                                type="text"
                                id="captcha"
                                name="captcha"
                                value={formData.captcha}
                                className="block w-full rounded-md border border-gray-300 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  "
                                placeholder="Enter Captcha"
                                onChange={handleInputChange}
                            />
                            {errors.captcha && (
                                <p className="mt-0.5 text-xs text-red-500">
                                    {errors.captcha}
                                </p>
                            )}
                        </div>
                        <div className="mt-5">
                            <MainButton text="Submit" type="submit" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ContactForm
