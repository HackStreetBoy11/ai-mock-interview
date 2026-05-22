'use client'

import React from 'react'
import PricingPlan from '../_components/PricingPlan'
import { useUser } from '@clerk/nextjs'

import {
    Sparkles,
    Crown,
    CheckCircle2,
    Shield,
    Zap,
    BrainCircuit
} from 'lucide-react'

function page() {

    const { user } = useUser()

    return (

        <div className='relative overflow-hidden min-h-screen px-4 md:px-10 py-12'>

            {/* Background Glow */}
            <div className='absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full'></div>
            <div className='absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 blur-3xl rounded-full'></div>

            <div className='relative z-10 max-w-7xl mx-auto'>

                {/* Header */}
                <div className='text-center mb-16'>

                    <div className='inline-flex items-center gap-2 px-5 py-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 backdrop-blur-xl mb-6'>

                        <Sparkles className='w-4 h-4 text-cyan-400' />

                        <span className='text-sm font-semibold text-cyan-300'>
                            AI Powered Interview Preparation
                        </span>

                    </div>

                    <h1 className='text-5xl md:text-6xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent leading-tight'>
                        Upgrade Your PrepAI Experience
                    </h1>

                    <p className='text-slate-400 text-lg mt-6 max-w-2xl mx-auto leading-relaxed'>
                        Unlock unlimited mock interviews, advanced AI feedback,
                        premium analytics, and everything you need to crack your dream job.
                    </p>

                </div>

                {/* Highlight Cards */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-16'>

                    <div className='rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-2xl p-6 shadow-[0_0_30px_rgba(59,130,246,0.08)]'>

                        <div className='w-14 h-14 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center mb-5 shadow-[0_0_25px_rgba(59,130,246,0.25)]'>

                            <BrainCircuit className='w-7 h-7 text-white' />

                        </div>

                        <h3 className='text-xl font-bold text-white mb-2'>
                            AI Driven Interviews
                        </h3>

                        <p className='text-slate-400 leading-relaxed'>
                            Get personalized interview questions generated using advanced AI models.
                        </p>

                    </div>

                    <div className='rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-2xl p-6 shadow-[0_0_30px_rgba(168,85,247,0.08)]'>

                        <div className='w-14 h-14 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center mb-5 shadow-[0_0_25px_rgba(168,85,247,0.25)]'>

                            <Zap className='w-7 h-7 text-white' />

                        </div>

                        <h3 className='text-xl font-bold text-white mb-2'>
                            Instant Feedback
                        </h3>

                        <p className='text-slate-400 leading-relaxed'>
                            Receive detailed answer analysis, ratings, and improvement suggestions instantly.
                        </p>

                    </div>

                    <div className='rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-2xl p-6 shadow-[0_0_30px_rgba(34,197,94,0.08)]'>

                        <div className='w-14 h-14 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center mb-5 shadow-[0_0_25px_rgba(34,197,94,0.25)]'>

                            <Shield className='w-7 h-7 text-white' />

                        </div>

                        <h3 className='text-xl font-bold text-white mb-2'>
                            Secure & Private
                        </h3>

                        <p className='text-slate-400 leading-relaxed'>
                            Your interview data and feedback stay fully secure and accessible anytime.
                        </p>

                    </div>

                </div>

                {/* Pricing */}
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto'>

                    {PricingPlan.map((item, index) => (

                        <div
                            key={index}
                            className={`relative overflow-hidden rounded-[36px] p-8 lg:p-10 backdrop-blur-2xl transition-all duration-500 border
                                
                                ${index === 1
                                    ? 'border-cyan-400/30 bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e1b4b] shadow-[0_0_60px_rgba(59,130,246,0.18)] scale-[1.02]'
                                    : 'border-white/10 bg-white/5 hover:bg-white/[0.07]'
                                }
                            `}
                        >

                            {/* Glow */}
                            {index === 1 && (
                                <div className='absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full'></div>
                            )}

                            <div className='relative z-10'>

                                {/* Badge */}
                                {index === 1 && (

                                    <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-sm font-semibold mb-6 shadow-[0_0_25px_rgba(59,130,246,0.25)]'>

                                        <Crown className='w-4 h-4' />

                                        Most Popular

                                    </div>

                                )}

                                {/* Title */}
                                <div className='mb-8'>

                                    <h2 className='text-3xl font-black text-white'>
                                        {item.title}
                                    </h2>

                                    <div className='mt-4 flex items-end gap-2'>

                                        <span className='text-5xl font-black text-white'>
                                            {item.price}
                                        </span>

                                        <span className='text-slate-400 mb-1'>
                                            {item.duration}
                                        </span>

                                    </div>

                                </div>

                                {/* Features */}
                                <div className='space-y-4 mb-10'>

                                    <div className='flex items-center gap-3'>

                                        <CheckCircle2 className='w-5 h-5 text-cyan-400 shrink-0' />

                                        <span className='text-slate-300'>
                                            Unlimited AI mock interviews
                                        </span>

                                    </div>

                                    <div className='flex items-center gap-3'>

                                        <CheckCircle2 className='w-5 h-5 text-cyan-400 shrink-0' />

                                        <span className='text-slate-300'>
                                            Advanced AI feedback analysis
                                        </span>

                                    </div>

                                    <div className='flex items-center gap-3'>

                                        <CheckCircle2 className='w-5 h-5 text-cyan-400 shrink-0' />

                                        <span className='text-slate-300'>
                                            Personalized interview roadmap
                                        </span>

                                    </div>

                                    <div className='flex items-center gap-3'>

                                        <CheckCircle2 className='w-5 h-5 text-cyan-400 shrink-0' />

                                        <span className='text-slate-300'>
                                            Real-time speech analysis
                                        </span>

                                    </div>

                                    <div className='flex items-center gap-3'>

                                        <CheckCircle2 className='w-5 h-5 text-cyan-400 shrink-0' />

                                        <span className='text-slate-300'>
                                            Priority support access
                                        </span>

                                    </div>

                                </div>

                                {/* Button */}
                                <a
                                    href={item.link + '?prefilled_email=' + user?.primaryEmailAddress?.emailAddress}
                                    target='_blank'
                                    className={`flex items-center justify-center h-14 rounded-2xl font-bold transition-all duration-300
                                        
                                        ${index === 1
                                            ? 'bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white shadow-[0_0_35px_rgba(59,130,246,0.3)] hover:opacity-90'
                                            : 'bg-white/10 border border-white/10 text-white hover:bg-white/20'
                                        }
                                    `}
                                >

                                    {index === 1 ? 'Upgrade To Pro' : 'Get Started'}

                                </a>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </div>

    )
}

export default page