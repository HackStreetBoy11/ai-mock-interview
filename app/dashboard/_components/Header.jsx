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
        <header className="flex h-16 px-7 items-center justify-between bg-gradient-to-r from-indigo-950 via-indigo-900 to-purple-900 border-b border-indigo-800">
            <Image
                src="/logo.svg"
                width={120}
                height={50}
                alt="logo"
            />
            <ul className="hidden md:flex items-center gap-1 list-none">
                <Link href='/dashboard'>
                    <li className={`text-sm cursor-pointer px-3.5 py-1.5 rounded-lg transition-colors
                        ${path === '/dashboard'
                            ? 'bg-white/15 text-white font-medium'
                            : 'text-indigo-300 font-normal hover:bg-white/10 hover:text-white'}`}>
                        Dashboard
                    </li>
                </Link>
                <Link href='/dashboard/question'>
                    <li className={`text-sm cursor-pointer px-3.5 py-1.5 rounded-lg transition-colors
                        ${path === '/dashboard/question'
                            ? 'bg-white/15 text-white font-medium'
                            : 'text-indigo-300 font-normal hover:bg-white/10 hover:text-white'}`}>
                        Question
                    </li>
                </Link>
                <Link href='/dashboard/upgrade'>
                    <li className={`text-sm cursor-pointer px-3.5 py-1.5 rounded-lg transition-colors
                        ${path === '/dashboard/upgrade'
                            ? 'bg-white/15 text-white font-medium'
                            : 'text-indigo-300 font-normal hover:bg-white/10 hover:text-white'}`}>
                        Upgrade
                    </li>
                </Link>
                <Link href='/dashboard/howItWorks'>
                    <li className={`text-sm cursor-pointer px-3.5 py-1.5 rounded-lg transition-colors
                        ${path === '/dashboard/howItWorks'
                            ? 'bg-white/15 text-white font-medium'
                            : 'text-indigo-300 font-normal hover:bg-white/10 hover:text-white'}`}>
                        How it Works?
                    </li>
                </Link>
            </ul>
            <UserButton />
        </header>
    )
}

export default Header