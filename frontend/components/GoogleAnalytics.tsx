'use client'
import { useEffect } from 'react'
import ReactGA from 'react-ga4'
import { usePathname } from 'next/navigation'
import { GA_MEASUREMENT_ID, GA_TAGMANAGER_ID } from '@/app.config'

const GoogleAnalytics = () => {
    const pathname = usePathname()
    ReactGA.initialize([
        {
            trackingId: GA_MEASUREMENT_ID,
            gaOptions: {
                testMode: false,
            },
        },
        {
            trackingId: GA_TAGMANAGER_ID,
        },
    ])

    useEffect(() => {
        ReactGA.send({
            hitType: 'pageview',
            page: pathname,
        })
    }, [pathname])
    return null
}

export default GoogleAnalytics
