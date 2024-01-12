import {
    WHATSAPP_LINK,
    ZRI_ADDRESS,
    ZRI_BOOKING_EMAIL,
    ZRI_CONTACT_NUMBER_1,
    ZRI_CONTACT_NUMBER_2,
    ZRI_GENERAL_EMAIL,
    ZRI_NAME,
    ZRI_WHATSAPP_NUMBER,
} from '@/constants/SocialLinksConstants'
import { ZRI_WORKING_HOURS } from '@/constants/pages/ContactPageConstants'
import Link from 'next/link'
import React from 'react'
import {
    AiOutlineMail,
    AiOutlinePhone,
    AiOutlineWhatsApp,
} from 'react-icons/ai'
import { BiTimeFive } from 'react-icons/bi'
import { HiOutlineLocationMarker } from 'react-icons/hi'

const ContactDetails = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-6 px-4 py-20">
            <h1 className="mb-5 text-2xl font-semibold sm:text-3xl md:text-4xl lg:text-5xl">
                {ZRI_NAME}
            </h1>
            <div className="flex flex-col justify-center gap-4">
                <p className="flex items-center gap-2 font-medium text-blue-950 sm:text-lg">
                    <HiOutlineLocationMarker className="text-lg text-blue-500 sm:text-2xl" />
                    {ZRI_ADDRESS}
                </p>
                <p className="flex items-center gap-2 font-medium text-blue-950 sm:text-lg">
                    <AiOutlineMail className="text-lg text-blue-500 sm:text-2xl" />
                    General Inquiries: {ZRI_GENERAL_EMAIL}
                </p>
                <p className="flex items-center gap-2 font-medium text-blue-950 sm:text-lg">
                    <AiOutlineMail className="text-lg text-blue-500 sm:text-2xl" />
                    Bookings and Inquiries: {ZRI_BOOKING_EMAIL}
                </p>
                <p className="flex items-center gap-2 font-medium text-blue-950 sm:text-lg">
                    <AiOutlinePhone className="text-lg text-blue-500 sm:text-2xl" />
                    {ZRI_CONTACT_NUMBER_1} , {ZRI_CONTACT_NUMBER_2}
                </p>
                <Link href={WHATSAPP_LINK} target="_blank">
                    <p className="flex items-center gap-2 font-medium text-blue-950 sm:text-lg">
                        <AiOutlineWhatsApp className="text-lg text-blue-500 sm:text-2xl" />
                        {ZRI_WHATSAPP_NUMBER}
                    </p>
                </Link>
                <p className="flex items-center gap-2 font-medium text-blue-950 sm:text-lg">
                    <BiTimeFive className="text-lg text-blue-500 sm:text-2xl" />
                    {ZRI_WORKING_HOURS}
                </p>
            </div>
        </div>
    )
}

export default ContactDetails
