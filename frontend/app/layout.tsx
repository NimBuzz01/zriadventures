import NavBar from '@/components/nav-bar'
import './globals.css'
import type { Metadata } from 'next'
import { Rubik } from 'next/font/google'
import ScrollToTopButton from '@/components/scrolltop-button'
import Footer from '@/components/page-footer'
import { LocalProvider } from '@/contexts/local-context'
import { DataProvider } from '@/contexts/data-context'
import { CheckoutProvider } from '@/contexts/checkout-context'
import { Toaster } from 'sonner'
import FacebookPixel from '@/components/facebook-pixel'
import GoogleAnalytics from '@/components/google-analytics'
import TawkTo from '@/components/tawk-to'
import { ExperienceProvider } from '@/contexts/experience-context'

const rubik = Rubik({
    weight: ['300', '400', '500', '600', '700', '800', '900'],
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'ZRI Adventures',
    description: 'Your adventure begins here',
    icons: 'https://www.zriadventures.com/favicon.ico',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html
            lang="en"
            className="select-none scroll-smooth text-gray-700 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-800"
            suppressHydrationWarning
        >
            <body className={rubik.className}>
                <LocalProvider>
                    <DataProvider>
                        <CheckoutProvider>
                            <ExperienceProvider>
                                <NavBar />
                                <ScrollToTopButton />
                                <GoogleAnalytics />
                                <FacebookPixel />
                                {children}
                                <Footer />
                                <TawkTo />
                                <Toaster
                                    richColors
                                    position="top-center"
                                    expand
                                    closeButton
                                />
                            </ExperienceProvider>
                        </CheckoutProvider>
                    </DataProvider>
                </LocalProvider>
            </body>
        </html>
    )
}
