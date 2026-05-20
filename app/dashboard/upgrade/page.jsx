'use client'
import React from 'react'
import PricingPlan from '../_components/PricingPlan'
import { useUser } from '@clerk/nextjs'

function page() {

    const { user } = useUser()

    return (
        <div className='p-10'>
            <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8">

                    {PricingPlan.map((item, index) => (
                        <div key={index} className={`rounded-2xl p-6 sm:px-8 lg:p-12 flex flex-col gap-4 backdrop-blur-sm transition-all duration-300
                            ${index === 1
                                ? 'border-2 border-indigo-500 bg-indigo-600/20'
                                : 'border border-indigo-500/30 bg-white/5'
                            }`}>
                            <div className="text-center">
                                {index === 1 && (
                                    <span className='text-xs font-medium bg-indigo-500/30 text-indigo-200 px-3 py-1 rounded-full mb-3 inline-block'>
                                        Most popular
                                    </span>
                                )}
                                <h2 className="text-lg font-medium text-white">
                                    {item.title}
                                    <span className="sr-only">Plan</span>
                                </h2>

                                <p className="mt-2 sm:mt-4">
                                    <strong className="text-3xl font-bold text-white sm:text-4xl"> {item.price} </strong>
                                    <span className="text-sm font-medium text-indigo-300">{item.duration}</span>
                                </p>
                            </div>

                            <ul className="mt-2 space-y-3">
                                <li className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 text-indigo-400 shrink-0">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                                    </svg>
                                    <span className="text-sm text-indigo-200"> 10 users included </span>
                                </li>

                                <li className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 text-indigo-400 shrink-0">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                                    </svg>
                                    <span className="text-sm text-indigo-200"> 2GB of storage </span>
                                </li>

                                <li className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 text-indigo-400 shrink-0">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                                    </svg>
                                    <span className="text-sm text-indigo-200"> Email support </span>
                                </li>

                                <li className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 text-indigo-400 shrink-0">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                                    </svg>
                                    <span className="text-sm text-indigo-200"> Help center access </span>
                                </li>
                            </ul>

                            <a href={item.link + '?prefilled_email=' + user?.primaryEmailAddress?.emailAddress}
                                target='_blank'
                                className={`mt-4 block rounded-full px-12 py-3 text-center text-sm font-medium transition-all duration-200
                                    ${index === 1
                                        ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
                                        : 'bg-white/10 hover:bg-white/20 text-indigo-200 border border-indigo-500/30'
                                    }`}>
                                Get Started
                            </a>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default page