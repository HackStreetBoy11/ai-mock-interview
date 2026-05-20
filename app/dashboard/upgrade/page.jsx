'use client'
import React from 'react'
import PricingPlan from '../_components/PricingPlan'
import { useUser } from '@clerk/nextjs'

function page() {

    const { user } = useUser()

    return (
        <div className='p-10'>
            <div class="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8">

                    {PricingPlan.map((item, index) => (
                        <div key={index} class="rounded-2xl border border-gray-200 p-6 shadow-xs sm:px-8 lg:p-12">
                            <div class="text-center">
                                <h2 class="text-lg font-medium text-gray-900">
                                    {item.title}
                                    <span class="sr-only">Plan</span>
                                </h2>

                                <p class="mt-2 sm:mt-4">
                                    <strong class="text-3xl font-bold text-gray-900 sm:text-4xl"> {item.price} </strong>

                                    <span class="text-sm font-medium text-gray-700">{item.duration}</span>
                                </p>
                            </div>

                            <ul class="mt-6 space-y-2">
                                <li class="flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 text-indigo-700">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                                    </svg>

                                    <span class="text-gray-700"> 10 users included </span>
                                </li>

                                <li class="flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 text-indigo-700">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                                    </svg>

                                    <span class="text-gray-700"> 2GB of storage </span>
                                </li>

                                <li class="flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 text-indigo-700">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                                    </svg>

                                    <span class="text-gray-700"> Email support </span>
                                </li>

                                <li class="flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5 text-indigo-700">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                                    </svg>

                                    <span class="text-gray-700"> Help center access </span>
                                </li>
                            </ul>

                            <a href={item.link + '?prefilled_email=' + user?.primaryEmailAddress?.emailAddress}
                                target='_blank'
                                class="mt-8 block rounded-full border border-indigo-600 bg-white px-12 py-3 text-center text-sm font-medium text-indigo-600 hover:ring-1 hover:ring-indigo-600">
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
