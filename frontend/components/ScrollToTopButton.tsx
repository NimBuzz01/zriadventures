'use client'
import React, { useState, useEffect } from 'react'
import { FiArrowUp } from 'react-icons/fi'
import { usePathname } from 'next/navigation'

const ScrollToTopButton: React.FC = () => {
    const pathname = usePathname()

    // Check if the current route matches '/admin' or starts with '/admin/'
    const isAdminRoute = /^\/admin(\/|$)/.test(pathname)

    const [isVisible, setIsVisible] = useState(false)

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true)
        } else {
            setIsVisible(false)
        }
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility)
        return () => {
            window.removeEventListener('scroll', toggleVisibility)
        }
    }, [])

    return (
        <>
            <button
                className={`${
                    isAdminRoute ? 'hidden' : 'block'
                } fixed bottom-24 right-6 z-[999] rounded-sm border-[1px] bg-white  p-2 text-gray-600 transition-all hover:border-green-600 hover:text-green-600 sm:bottom-6 sm:right-24 ${
                    isVisible ? 'opacity-100' : 'opacity-0'
                }`}
                onClick={scrollToTop}
            >
                <FiArrowUp className="h-6 w-6 lg:h-8 lg:w-8" />
            </button>
        </>
    )
}

export default ScrollToTopButton
