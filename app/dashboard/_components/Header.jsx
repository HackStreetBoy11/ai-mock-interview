"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react'



function Header() {

    const path = usePathname();
    useEffect(() => {
        console.log(path);
    })
    return (
        <header className="flex p-4 items-center justify-between shadow-md bg-white border-b border-gray-100">
            <Image
                src="/logo.svg"
                width={120}
                height={50}
                alt="logo"
            />
            <ul className="hidden md:flex items-center gap-8 list-none ">
                <Link href='/dashboard'>
                    <li className={`text-sm font-medium cursor-pointer transition-colors hover:text-indigo-600
          ${path === '/dashboard' ? 'text-indigo-600 font-bold' : 'text-gray-600'}`}>
                        Dashboard
                    </li>
                </Link>

                <Link href='/dashboard/question'>
                    <li className={`text-sm font-medium cursor-pointer transition-colors hover:text-indigo-600
          ${path === '/dashboard/question' ? 'text-indigo-600 font-bold' : 'text-gray-600'}`}>Question</li>
                </Link>

                <Link href='/dashboard/upgrade'>
                    <li className={`text-sm font-medium cursor-pointer transition-colors hover:text-indigo-600
          ${path === '/dashboard/upgrade' ? 'text-indigo-600 font-bold' : 'text-gray-600'}`}>Upgrade</li>
                </Link>

                <Link href='/dashboard/howItWorks'>
                    <li className={`text-sm font-medium cursor-pointer transition-colors hover:text-indigo-600
          ${path === '/dashboard/howItWorks' ? 'text-indigo-600 font-bold' : 'text-gray-600'}`}>How it Works?</li>
                </Link>
            </ul>
            <UserButton />
        </header>
    )
}

export default Header