'use client'
import React, { useState } from 'react'
import {
    BrainCircuit,
    Mic,
    BarChart3,
    ChevronDown,
    ChevronUp,
    Sparkles,
    Shield,
    Clock
} from 'lucide-react'

const steps = [
    {
        icon: BrainCircuit,
        step: '01',
        title: 'Create your interview',
        description: 'Enter your role, stack, and experience. AI instantly creates personalized interview questions.',
        details: [
            'Tailored AI questions',
            'Role-based interview flow',
            'Technical + behavioral rounds',
            'Generated in seconds',
        ]
    },
    {
        icon: Mic,
        step: '02',
        title: 'Answer naturally',
        description: 'Use your microphone and webcam to simulate a real interview environment.',
        details: [
            'Voice answer support',
            'Real-time transcription',
            'Real interview simulation',
            'Practice anytime',
        ]
    },
    {
        icon: BarChart3,
        step: '03',
        title: 'Receive smart feedback',
        description: 'Get AI ratings, ideal answers, and detailed suggestions to improve.',
        details: [
            'Instant evaluation',
            'Performance analysis',
            'Answer comparison',
            'Improvement suggestions',
        ]
    },
]

const faqs = [
    {
        question: 'Is PrepAI beginner friendly?',
        answer: 'Yes. The AI adapts questions according to your experience level.'
    },
    {
        question: 'Can I practice unlimited interviews?',
        answer: 'You can create multiple interviews and continuously improve over time.'
    },
    {
        question: 'Does PrepAI save my interview history?',
        answer: 'Yes, your previous interviews and feedback remain saved in your dashboard.'
    },
    {
        question: 'Can I practice technical interviews?',
        answer: 'Absolutely. You can prepare for frontend, backend, full-stack, AI/ML, and more.'
    },
]

const highlights = [
    {
        icon: Sparkles,
        title: 'Smart AI Questions',
        description: 'Questions adapt to your exact role and experience.'
    },
    {
        icon: Clock,
        title: 'Practice Anytime',
        description: 'Train whenever you want without scheduling interviews.'
    },
    {
        icon: Shield,
        title: 'Private & Secure',
        description: 'Your interview data stays protected and secure.'
    },
]

function HowItWorks() {

    const [openFaq, setOpenFaq] = useState(null)

    return (

        <div className='relative overflow-hidden p-6 md:p-10'>

            {/* Background Glow */}
            <div className='absolute top-0 left-0 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full'></div>
            <div className='absolute bottom-0 right-0 w-72 h-72 bg-purple-500/10 blur-3xl rounded-full'></div>

            <div className='relative z-10 max-w-6xl mx-auto'>

                {/* Header */}
                <div className='text-center mb-20'>

                    <div className='inline-flex items-center gap-2 px-5 py-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 backdrop-blur-xl mb-6'>
                        <Sparkles className='w-4 h-4 text-cyan-400' />

                        <span className='text-sm font-semibold text-cyan-300'>
                            AI Powered Interview Experience
                        </span>
                    </div>

                    <h2 className='text-5xl md:text-6xl font-black leading-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent'>
                        How PrepAI Works
                    </h2>

                    <p className='text-slate-400 mt-6 max-w-2xl mx-auto text-lg leading-relaxed'>
                        Experience realistic AI interviews with voice interaction,
                        instant analysis, and personalized feedback.
                    </p>

                </div>

                {/* Steps */}
                <div className='space-y-8 mb-24'>

                    {steps.map((item, index) => {

                        const Icon = item.icon

                        return (

                            <div
                                key={index}
                                className='group relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e1b4b] p-8 md:p-10 transition-all duration-500 hover:border-cyan-400/30 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]'
                            >

                                {/* Glow */}
                                <div className='absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 blur-3xl rounded-full'></div>
                                <div className='absolute bottom-0 left-0 w-40 h-40 bg-purple-500/10 blur-3xl rounded-full'></div>

                                <div className='relative z-10 flex flex-col lg:flex-row gap-8'>

                                    {/* Left */}
                                    <div className='flex items-start gap-5 min-w-[280px]'>

                                        <div className='w-20 h-20 rounded-3xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 flex items-center justify-center shadow-[0_0_35px_rgba(59,130,246,0.35)] group-hover:scale-105 transition-all duration-500'>
                                            <Icon className='w-9 h-9 text-white' />
                                        </div>

                                        <div>

                                            <div className='inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4'>
                                                <span className='text-xs font-bold tracking-wider text-cyan-300'>
                                                    STEP {item.step}
                                                </span>
                                            </div>

                                            <h3 className='text-3xl font-black text-white'>
                                                {item.title}
                                            </h3>

                                            <p className='text-slate-400 mt-4 leading-relaxed'>
                                                {item.description}
                                            </p>

                                        </div>

                                    </div>

                                    {/* Right */}
                                    <div className='flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4'>

                                        {item.details.map((detail, i) => (

                                            <div
                                                key={i}
                                                className='flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-5 py-4 hover:bg-white/10 transition-all duration-300'
                                            >

                                                <div className='w-2 h-2 rounded-full bg-cyan-400'></div>

                                                <p className='text-sm font-medium text-slate-200'>
                                                    {detail}
                                                </p>

                                            </div>

                                        ))}

                                    </div>

                                </div>

                            </div>

                        )

                    })}

                </div>

                {/* Highlights */}
                <div className='mb-24'>

                    <div className='text-center mb-12'>

                        <h3 className='text-4xl font-black bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent'>
                            Why Choose PrepAI
                        </h3>

                        <p className='text-slate-400 mt-4'>
                            Built to help you prepare smarter and faster.
                        </p>

                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>

                        {highlights.map((item, index) => {

                            const Icon = item.icon

                            return (

                                <div
                                    key={index}
                                    className='group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-2xl p-8 text-center transition-all duration-500 hover:border-cyan-400/30 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]'
                                >

                                    <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-cyan-500/5 to-purple-500/5'></div>

                                    <div className='relative z-10'>

                                        <div className='w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.25)]'>
                                            <Icon className='w-7 h-7 text-white' />
                                        </div>

                                        <h4 className='text-xl font-bold text-white mt-6'>
                                            {item.title}
                                        </h4>

                                        <p className='text-slate-400 mt-3 text-sm leading-relaxed'>
                                            {item.description}
                                        </p>

                                    </div>

                                </div>

                            )

                        })}

                    </div>

                </div>

                {/* FAQ */}
                <div>

                    <div className='text-center mb-10'>

                        <h3 className='text-4xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent'>
                            Frequently Asked Questions
                        </h3>

                        <p className='text-slate-400 mt-4'>
                            Everything you need to know about PrepAI.
                        </p>

                    </div>

                    <div className='space-y-4 max-w-4xl mx-auto'>

                        {faqs.map((faq, index) => (

                            <div
                                key={index}
                                className='overflow-hidden rounded-[24px] border border-white/10 bg-white/5 backdrop-blur-2xl transition-all duration-300 hover:border-cyan-400/20'
                            >

                                <button
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                    className='w-full flex items-center justify-between gap-4 p-6 text-left'
                                >

                                    <span className='text-lg font-semibold text-white'>
                                        {faq.question}
                                    </span>

                                    <div className='w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center'>

                                        {openFaq === index ? (
                                            <ChevronUp className='w-5 h-5 text-cyan-400' />
                                        ) : (
                                            <ChevronDown className='w-5 h-5 text-cyan-400' />
                                        )}

                                    </div>

                                </button>

                                {openFaq === index && (

                                    <div className='px-6 pb-6 border-t border-white/10 pt-5'>

                                        <p className='text-slate-400 leading-relaxed'>
                                            {faq.answer}
                                        </p>

                                    </div>

                                )}

                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </div>

    )
}

export default HowItWorks