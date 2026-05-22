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
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#050816]/80 backdrop-blur-2xl">

            <div className='flex h-20 px-6 md:px-10 items-center justify-between'>

                {/* Logo */}
                <div className='flex items-center gap-3'>

                    <div className='relative'>
                        <div className='absolute inset-0 bg-cyan-500/30 blur-2xl rounded-full'></div>

                        <Image
                            src="/logo1.png"
                            width={90}
                            height={45}
                            alt="logo"
                            className='relative z-10 drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]'
                        />
                    </div>

                    

                </div>

                {/* Navigation */}
                <ul className="hidden md:flex items-center gap-3 list-none bg-white/5 border border-white/10 px-3 py-2 rounded-2xl shadow-[0_0_30px_rgba(59,130,246,0.12)]">

                    <Link href='/dashboard'>
                        <li className={`text-sm cursor-pointer px-5 py-2.5 rounded-xl transition-all duration-300 font-medium
                            ${path === '/dashboard'
                                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                                : 'text-slate-300 hover:bg-white/10 hover:text-white'
                            }`}>
                            Dashboard
                        </li>
                    </Link>

                    <Link href='/dashboard/question'>
                        <li className={`text-sm cursor-pointer px-5 py-2.5 rounded-xl transition-all duration-300 font-medium
                            ${path === '/dashboard/question'
                                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                                : 'text-slate-300 hover:bg-white/10 hover:text-white'
                            }`}>
                            Questions
                        </li>
                    </Link>

                    <Link href='/dashboard/upgrade'>
                        <li className={`text-sm cursor-pointer px-5 py-2.5 rounded-xl transition-all duration-300 font-medium
                            ${path === '/dashboard/upgrade'
                                ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg shadow-purple-500/20'
                                : 'text-slate-300 hover:bg-white/10 hover:text-white'
                            }`}>
                            Upgrade
                        </li>
                    </Link>

                    <Link href='/dashboard/howItWorks'>
                        <li className={`text-sm cursor-pointer px-5 py-2.5 rounded-xl transition-all duration-300 font-medium
                            ${path === '/dashboard/howItWorks'
                                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/20'
                                : 'text-slate-300 hover:bg-white/10 hover:text-white'
                            }`}>
                            How It Works
                        </li>
                    </Link>

                </ul>

                {/* User */}
                <div className='flex items-center gap-4'>

                    {/* <div className='hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10'>
                        <div className='w-2 h-2 rounded-full bg-green-400 animate-pulse'></div>
                        <p className='text-sm text-slate-300 font-medium'>
                            Online
                        </p>
                    </div> */}

                    
                        <div className='bg-[#0b1120] rounded-full p-1'>
                            <UserButton />
                        </div>

                </div>

            </div>

        </header>
    )
}

export default Header