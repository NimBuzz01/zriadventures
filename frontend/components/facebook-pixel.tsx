'use client'
import { useEffect } from 'react'
import { FACEBOOK_PIXEL_ID } from '@/app.config'
import { useRouter } from 'next/navigation'

const FacebookPixel = () => {
    const router = useRouter()

    useEffect(() => {
        import('react-facebook-pixel')
            .then((x) => x.default)
            .then((ReactPixel) => {
                ReactPixel.init(FACEBOOK_PIXEL_ID) // facebookPixelId
                ReactPixel.pageView()
            })
    }, [router])

    return null
    // (
    //     <button
    //         onClick={ReactPixel.grantConsent}
    //         className="absolute bottom-0 right-0"
    //     >
    //         Accept cookies
    //     </button>
    // )
}

export default FacebookPixel
