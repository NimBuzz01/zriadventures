'use client'
import Image from 'next/image'
import React from 'react'
import {
    AiFillInstagram,
    AiFillFacebook,
    AiFillYoutube,
    AiFillLinkedin,
} from 'react-icons/ai'
import { IoLogoWhatsapp } from 'react-icons/io'
import { FaTripadvisor } from 'react-icons/fa'
import Link from 'next/link'
import {
    ZRI_ADDRESS,
    ZRI_NAME,
    FACEBOOK_LINK,
    INSTAGRAM_LINK,
    LINKEDIN_LINK,
    TRIPADVISOR_LINK,
    WHATSAPP_LINK,
    YOUTUBE_LINK,
    ZRI_CONTACT_NUMBER_1,
    ZRI_GENERAL_EMAIL,
    ZRI_BOOKING_EMAIL,
    ZRI_CONTACT_NUMBER_2,
} from '@/constants/SocialLinksConstants'
import BlurImage from './common/BlurImage'
import { usePathname } from 'next/navigation'

const Footer = () => {
    const pathname = usePathname()

    // Check if the current route matches '/admin' or starts with '/admin/'
    const show = /^\/developer(\/|$)/.test(pathname)

    return (
        <div
            className={`${
                show ? 'hidden' : 'block'
            } flex-col bg-blue-950 px-5 text-white lg:px-40 lg:pt-4`}
        >
            <div className="flex flex-wrap-reverse justify-between gap-10 py-5">
                <div>
                    <div className="flex flex-col gap-2">
                        <div className="relative h-24 w-44">
                            <BlurImage
                                src="/logos/zrilogo.png"
                                alt=""
                                objectFit="contain"
                            />
                        </div>
                        <h3 className="text-2xl">{ZRI_NAME}</h3>
                        <p className="text-sm">{ZRI_ADDRESS}</p>
                        <div className="my-3 flex gap-3 text-2xl">
                            <Link
                                href={WHATSAPP_LINK}
                                className="transition-all hover:text-blue-500"
                                target="_blank"
                            >
                                <IoLogoWhatsapp />
                            </Link>
                            <Link
                                href={FACEBOOK_LINK}
                                className="transition-all hover:text-blue-500"
                                target="_blank"
                            >
                                <AiFillFacebook />
                            </Link>
                            <Link
                                href={LINKEDIN_LINK}
                                className="transition-all hover:text-blue-500"
                                target="_blank"
                            >
                                <AiFillLinkedin />
                            </Link>
                            <Link
                                href={INSTAGRAM_LINK}
                                className="transition-all hover:text-blue-500"
                                target="_blank"
                            >
                                <AiFillInstagram />
                            </Link>
                            <Link
                                href={YOUTUBE_LINK}
                                className="transition-all hover:text-blue-500"
                                target="_blank"
                            >
                                <AiFillYoutube />
                            </Link>
                            <Link
                                href={TRIPADVISOR_LINK}
                                className="transition-all hover:text-blue-500"
                                target="_blank"
                            >
                                <FaTripadvisor />
                            </Link>
                        </div>
                        <Link
                            href="/about#how-we-work"
                            className="transition-all hover:text-blue-500"
                        >
                            How we work?
                        </Link>
                    </div>
                </div>
                <div>
                    <p className="my-3 font-extralight lg:mt-1">QUICK LINKS</p>
                    <div className="flex flex-col gap-3">
                        <Link
                            href="/about"
                            className="transition-all hover:text-blue-500"
                        >
                            About
                        </Link>
                        <Link
                            href="/experiences"
                            className="transition-all hover:text-blue-500"
                        >
                            Experiences
                        </Link>
                        <Link
                            href="/events"
                            className="transition-all hover:text-blue-500"
                        >
                            Events
                        </Link>
                        <Link
                            href="/merchandise"
                            className="transition-all hover:text-blue-500"
                        >
                            Merchandise
                        </Link>
                        <Link
                            href="/rentals"
                            className="transition-all hover:text-blue-500"
                        >
                            Rentals
                        </Link>
                        <Link
                            href="/giftvouchers"
                            className="transition-all hover:text-blue-500"
                        >
                            Gift Vouchers
                        </Link>
                        <Link
                            href="/contact"
                            className="transition-all hover:text-blue-500"
                        >
                            Contact
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <p className="font-light transition-all">PAYMENT VENDORS</p>
                    <div className="flex items-center gap-2 rounded-md bg-white">
                        <Link href="https://payhere.lk/" target="_blank">
                            <Image
                                src="/logos/payherelogo.png"
                                width={80}
                                height={80}
                                alt="payhere logo"
                            />
                        </Link>
                        <Link href="https://paykoko.com/" target="_blank">
                            <Image
                                src="/logos/kokologo.png"
                                width={55}
                                height={55}
                                alt="koko logo"
                            />
                        </Link>
                        <Link href="https://mintpay.lk/" target="_blank">
                            <Image
                                src="/logos/mintpaylogo.png"
                                width={80}
                                height={80}
                                alt="mintpay logo"
                            />
                        </Link>
                    </div>
                </div>
                <div className="mt-3 flex flex-col gap-6 lg:mb-2 lg:mt-1">
                    <div>
                        <p className="font-light">CALL</p>
                        <p className="text-xl">{ZRI_CONTACT_NUMBER_1}</p>
                        <p className="text-xl">{ZRI_CONTACT_NUMBER_2}</p>
                    </div>
                    <Link href={WHATSAPP_LINK} target="_blank">
                        <div className="flex items-center gap-2">
                            <Image
                                src="/logos/whatsapplogo.png"
                                width={30}
                                height={30}
                                alt="whatsapp logo"
                            />
                            <p>Contact us on Whatsapp</p>
                        </div>
                    </Link>
                    <div>
                        <p className="font-light">EMAIL</p>
                        <p className="text-xl">{ZRI_GENERAL_EMAIL}</p>
                        <p className="text-xl">{ZRI_BOOKING_EMAIL}</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-between gap-1 border-t-2 py-2 text-sm sm:flex-row sm:py-4 lg:flex-row">
                <div>{ZRI_NAME}</div>
                {/* <div>Designed by Niamat Marjan</div> */}
                <Link
                    href="/terms-and-conditions"
                    className="mb-2 text-sm transition-all hover:text-blue-500"
                >
                    Privacy Policy and Terms & Conditions
                </Link>
            </div>
        </div>
    )
}

export default Footer
