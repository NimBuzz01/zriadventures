'use client'
import { GoChecklist } from 'react-icons/go'
import { MdOutlineReviews } from 'react-icons/md'
import { BsCashCoin } from 'react-icons/bs'
import { FaRegThumbsUp } from 'react-icons/fa'
import { BiTimer } from 'react-icons/bi'
import InfoIcon from '../../components/InfoIcon'
import MainButton from '../../components/common/MainButton'
import {
    LANDING_ABOUT_CONTENT_BUTTON,
    LANDING_ABOUT_CONTENT_BUTTON_URL,
    LANDING_ABOUT_CONTENT_DESCRIPTION,
    LANDING_ABOUT_CONTENT_IMAGE,
    LANDING_ABOUT_CONTENT_TITLE,
    LANDING_ABOUT_INFO_ICON_1,
    LANDING_ABOUT_INFO_ICON_2,
    LANDING_ABOUT_INFO_ICON_3,
    LANDING_ABOUT_INFO_ICON_4,
    LANDING_ABOUT_INFO_ICON_5,
    LANDING_ABOUT_MAIN_TITLE,
    LANDING_ABOUT_SUB_TITLE,
} from '@/constants/pages/LandingPageConstants'
import MainHeader from '@/components/common/MainHeader'
import BlurImage from '@/components/common/BlurImage'

const About = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-16 bg-[url('/mountains-bg.png')] bg-cover py-16">
            <MainHeader
                subtitle={LANDING_ABOUT_SUB_TITLE}
                title={LANDING_ABOUT_MAIN_TITLE}
            />
            <div className="relative flex min-h-[1000px] w-full flex-col justify-center lg:h-[730px] lg:flex-row">
                <div className="z-20 flex min-h-[550px] w-full flex-col  items-center justify-center gap-8 bg-white p-6 py-8 lg:absolute lg:w-[50%] lg:-translate-x-1/3 lg:border-[1px] lg:px-10 xl:w-[50%] xl:max-w-[700px]">
                    <h1 className="mb-2 text-2xl font-semibold text-blue-500 md:text-3xl">
                        {LANDING_ABOUT_CONTENT_TITLE}
                    </h1>
                    <div className="ml-2 block w-32 self-start border-t-4 border-blue-500"></div>
                    <p>{LANDING_ABOUT_CONTENT_DESCRIPTION}</p>
                    <MainButton
                        href={LANDING_ABOUT_CONTENT_BUTTON_URL}
                        text={LANDING_ABOUT_CONTENT_BUTTON}
                        style="self-start"
                    />
                </div>
                <div className="relative min-h-[550px] w-full lg:absolute lg:w-[50%] lg:translate-x-1/3 lg:translate-y-1/4 xl:w-[50%] xl:max-w-[700px]">
                    <BlurImage
                        src={LANDING_ABOUT_CONTENT_IMAGE}
                        alt="Landing About Image"
                        objectFit="cover"
                    />
                </div>
            </div>
            <div className="flex flex-col gap-14 lg:flex-row">
                <InfoIcon
                    icon={<GoChecklist />}
                    title={LANDING_ABOUT_INFO_ICON_1}
                />
                <InfoIcon
                    icon={<MdOutlineReviews />}
                    title={LANDING_ABOUT_INFO_ICON_2}
                />
                <InfoIcon
                    icon={<BsCashCoin />}
                    title={LANDING_ABOUT_INFO_ICON_3}
                />
                <InfoIcon
                    icon={<BiTimer />}
                    title={LANDING_ABOUT_INFO_ICON_4}
                />
                <InfoIcon
                    icon={<FaRegThumbsUp />}
                    title={LANDING_ABOUT_INFO_ICON_5}
                />
            </div>
        </div>
    )
}

export default About
