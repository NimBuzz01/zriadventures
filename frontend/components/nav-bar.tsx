'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import CartSidebar from './cart-sidebar'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { usePathname } from 'next/navigation'

const navLinks = [
    { name: 'about', href: '/about' },
    { name: 'experiences', href: '/experiences' },
    { name: 'events', href: '/events' },
    { name: 'merchandise', href: '/merchandise' },
    { name: 'rentals', href: '/rentals' },
    { name: 'giftvouchers', href: '/giftvouchers', nameFix: 'Gift Vouchers' },
    { name: 'contact', href: '/contact' },
]

const filteredNavLinks = navLinks.filter(
    (link) => link.name !== 'about' && link.name !== 'contact'
)

const NavBar: React.FC = () => {
    const searchParams = useSearchParams()
    const pathname = usePathname()

    const show = /^\/developer(\/|$)/.test(pathname)

    useEffect(() => {
        const region = searchParams.get('region')
        if (region === 'lk') {
            localStorage.setItem('local', 'true')
        } else if (region === 'int') {
            localStorage.setItem('local', 'false')
        }
    }, [])

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
    const [activeLink, setActiveLink] = useState<string>('')
    const [scrolling, setScrolling] = useState<boolean>(false)
    const [isVisible, setIsVisible] = useState<boolean>(isMenuOpen)

    useEffect(() => {
        if (
            pathname === '/reservation' ||
            pathname === '/checkout' ||
            pathname === '/cart'
        ) {
            setScrolling(true)
        }
    }, [pathname])

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const closeMenu = () => {
        setIsVisible(false)
    }

    const handleLinkClick = (link: string) => {
        setActiveLink(link)
        closeMenu()
    }

    const handleScroll = () => {
        if (window.scrollY > 0) {
            setScrolling(true)
        } else {
            setScrolling(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        setIsVisible(isMenuOpen)
    }, [isMenuOpen])

    const handleTransitionEnd = () => {
        if (!isVisible) {
            setIsMenuOpen(false)
        }
    }

    return (
        <nav
            className={`${show ? 'hidden' : 'block'} ${
                scrolling ? 'bg-blue-950/100 py-3' : 'bg-blue-950/20 py-5'
            } fixed z-[1000] flex w-full items-center justify-between px-8 backdrop-blur-xl transition-all`}
        >
            <div className="flex items-center">
                <button
                    className="mr-4 text-2xl text-white transition-all hover:text-blue-500 lg:hidden"
                    onClick={toggleMenu}
                >
                    <AiOutlineMenu />
                </button>
                <Link href="/" onClick={() => handleLinkClick('home')}>
                    <Image
                        src="/logos/zrilogo.png"
                        width={120}
                        height={120}
                        alt="Logo Image"
                    />
                </Link>
            </div>
            <div className="flex items-center">
                <ul className="hidden space-x-4 lg:flex">
                    {filteredNavLinks.map((link, i) => (
                        <li key={i}>
                            <NavLink
                                href={link.href}
                                name={link.name}
                                activeLink={activeLink}
                                linkClick={handleLinkClick}
                                nameFix={link.nameFix}
                            />
                        </li>
                    ))}
                </ul>

                <div className="mx-6 hidden h-10 border-l border-white lg:block"></div>

                <CartSidebar />
            </div>
            {isMenuOpen && (
                <div
                    className={`fixed left-0 top-0 h-screen w-full bg-gray-800/95 px-4 py-5 backdrop-blur-xl transition-all md:w-[500px] ${
                        isVisible ? '-translate-x-0' : '-translate-x-full'
                    }`}
                    onTransitionEnd={handleTransitionEnd}
                >
                    <div className="mr-4 mt-4 flex justify-end">
                        <button
                            className="text-2xl text-white transition-all hover:text-blue-500"
                            onClick={closeMenu}
                        >
                            <AiOutlineClose />
                        </button>
                    </div>
                    <ul className="ml-10 mt-12 space-y-6 text-lg text-white">
                        {navLinks.map((link, i) => (
                            <li key={i}>
                                <SubNavLink
                                    href={link.href}
                                    name={link.name}
                                    linkClick={handleLinkClick}
                                    nameFix={link.nameFix}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </nav>
    )
}

export default NavBar

interface NavLinkProps {
    href: string
    name: string
    nameFix?: string
    activeLink: string
    linkClick: (link: string) => void
}

const NavLink = ({
    href,
    name,
    nameFix,
    activeLink,
    linkClick,
}: NavLinkProps) => {
    return (
        <Link
            href={href}
            className={`rounded-md px-1 py-1 capitalize text-white transition-all hover:text-blue-500 xl:px-2 xl:text-lg ${
                activeLink === name ? 'bg-white/20' : ''
            }`}
            onClick={() => linkClick(name)}
        >
            {nameFix ? nameFix : name}
        </Link>
    )
}

interface SubNavLinkProps {
    href: string
    name: string
    nameFix?: string
    linkClick: (link: string) => void
}

const SubNavLink = ({ href, name, nameFix, linkClick }: SubNavLinkProps) => {
    return (
        <Link
            className="capitalize transition-all hover:text-blue-500"
            href={href}
            onClick={() => linkClick('contact')}
        >
            {nameFix ? nameFix : name}
        </Link>
    )
}
