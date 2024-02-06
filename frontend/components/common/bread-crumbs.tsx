import Link from 'next/link'
import React from 'react'
import { BiChevronRight } from 'react-icons/bi'
import { GoHomeFill } from 'react-icons/go'

interface Props {
    first?: string
    firstHref?: string
    second?: string
    secondHref?: string
    last: string
}

const Breadcrumbs = ({ first, firstHref, second, secondHref, last }: Props) => {
    return (
        <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex flex-wrap items-center gap-1 space-x-1 sm:gap-0 md:space-x-3">
                <li className="inline-flex items-center">
                    <Link
                        href="/"
                        passHref={true}
                        className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 transition-all hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                    >
                        <GoHomeFill />
                        Home
                    </Link>
                </li>
                {first && firstHref && (
                    <li>
                        <div className="flex items-center">
                            <BiChevronRight />
                            <Link
                                href={firstHref}
                                passHref={true}
                                className="ml-1 text-sm font-medium text-gray-700 transition-all hover:text-blue-600 dark:text-gray-400 dark:hover:text-white md:ml-2"
                            >
                                {first}
                            </Link>
                        </div>
                    </li>
                )}
                {second && secondHref && (
                    <li>
                        <div className="flex items-center">
                            <BiChevronRight />
                            <Link
                                href={secondHref}
                                passHref={true}
                                className="ml-1 text-sm font-medium text-gray-700 transition-all hover:text-blue-600 dark:text-gray-400 dark:hover:text-white md:ml-2"
                            >
                                {second}
                            </Link>
                        </div>
                    </li>
                )}

                <li aria-current="page">
                    <div className="flex items-center">
                        <BiChevronRight />
                        <span className="ml-1 text-sm font-medium text-gray-500 dark:text-gray-400 md:ml-2">
                            {last}
                        </span>
                    </div>
                </li>
            </ol>
        </nav>
    )
}

export default Breadcrumbs
