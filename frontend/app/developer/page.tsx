import Link from 'next/link'
import React from 'react'
import { FaGithub } from 'react-icons/fa'
import { BiLogoGmail } from 'react-icons/bi'
import { FaLinkedin } from 'react-icons/fa'
import { AiFillHome } from 'react-icons/ai'

const Developer = () => {
    return (
        <main className="flex h-screen w-full flex-col items-center justify-center gap-3 bg-gray-900 text-white">
            <Link href="/">
                <AiFillHome className="absolute left-6 top-6 text-xl transition-all hover:text-blue-500 sm:text-2xl" />
            </Link>
            <p className="text-center sm:text-lg md:text-xl">
                This website is developed by Niamat Marjan
            </p>
            <div className="flex justify-center gap-3 text-xl sm:text-2xl">
                <Link
                    href="https://github.com/NimBuzz01"
                    target="_blank"
                    className="transition-all hover:text-blue-500"
                >
                    <FaGithub />
                </Link>
                <a
                    href="mailto:mniamatmarjan@gmail.com"
                    target="_blank"
                    className="transition-all hover:text-blue-500"
                >
                    <BiLogoGmail />
                </a>
                <Link
                    href="https://www.linkedin.com/in/niamatm"
                    target="_blank"
                    className="transition-all hover:text-blue-500"
                >
                    <FaLinkedin />
                </Link>
            </div>
        </main>
    )
}

export default Developer
