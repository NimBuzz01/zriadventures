'use client'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { BsArrowRight } from 'react-icons/bs'

interface Props {
    href?: string
    text: string
    style?: string
    type?: 'button' | 'submit' | 'reset' | undefined
    bgColor?: string
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const MainButton = ({
    href,
    text,
    style,
    type = 'button',
    onClick,
    bgColor = 'bg-green-600 group-hover:bg-green-800',
}: Props) => {
    const [loading, setLoading] = useState(false)

    const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        setLoading(true)
        if (onClick) {
            setLoading(true)
            try {
                await onClick(event) // Wait for the onClick function to complete
            } finally {
                setTimeout(() => {
                    setLoading(false)
                }, 3000)
            }
        }
        setTimeout(() => {
            setLoading(false)
        }, 3000)
    }

    const buttonContent = (
        <>
            {text}{' '}
            {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
                <BsArrowRight className="text-xl transition-all duration-300 group-hover:translate-x-1" />
            )}
        </>
    )

    const buttonProps = {
        onClick: handleClick,
        className: `flex w-full items-center justify-center gap-2 rounded-sm px-4 py-3 text-base font-medium uppercase tracking-wider text-white transition-all sm:px-6 sm:py-3 md:text-lg ${bgColor}`,
    }

    return href ? (
        <Link href={href} className={style + ' group'}>
            <button {...buttonProps}>{buttonContent}</button>
        </Link>
    ) : (
        <div className={`group ${style}`}>
            <button {...buttonProps} type={type}>
                {buttonContent}
            </button>
        </div>
    )
}

export default MainButton
