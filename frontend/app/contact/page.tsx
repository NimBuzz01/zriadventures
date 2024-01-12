import SubHero from '@/components/common/SubHero'
import ContactDetails from './ContactDetails'
import ContactForm from './ContactForm'
import {
    CONTACT_HERO_BG_IMAGE,
    CONTACT_HERO_MAIN_TITLE,
} from '@/constants/pages/ContactPageConstants'
import Head from 'next/head'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Contact - ZRI Adventures',
    description:
        'ZRI Adventures crafts unique experiences, from thrilling escapades to serene strolls, each time revealing a new facet of yourself. Your ultimate adventure awaits!',
    icons: 'https://www.zriadventures.com/favicon.ico',
}

export default function Contact() {
    return (
        <main>
            <Head>
                <title>Contact - ZRI Adventures</title>
                <meta
                    name="Contact - ZRI Adventures"
                    content="ZRI Adventures crafts unique experiences, from thrilling escapades to serene strolls, each time revealing a new facet of yourself. Your ultimate adventure awaits!"
                />
            </Head>
            <SubHero
                title={CONTACT_HERO_MAIN_TITLE}
                image={CONTACT_HERO_BG_IMAGE}
            />
            <div className="flex flex-col">
                <ContactDetails />
                <div className="flex justify-center bg-gradient-to-t from-blue-200 to-white">
                    <ContactForm />
                </div>
            </div>
        </main>
    )
}
