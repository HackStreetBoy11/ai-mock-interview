'use client'
import React, { useState } from 'react'
import { BrainCircuit, Mic, BarChart3, ChevronDown, ChevronUp, Sparkles, Shield, Clock } from 'lucide-react'

const steps = [
    {
        icon: BrainCircuit,
        step: '01',
        title: 'Create your interview',
        description: 'Enter your target job role, tech stack, and years of experience. Our AI instantly generates a set of tailored interview questions specific to your profile.',
        details: [
            'AI-generated questions based on your role',
            'Customized to your experience level',
            'Covers technical and behavioral topics',
            'Ready in under 10 seconds',
        ]
    },
    {
        icon: Mic,
        step: '02',
        title: 'Answer with your voice',
        description: 'Enable your webcam and microphone, then answer each question out loud just like a real interview. Your answers are transcribed in real time.',
        details: [
            'Real-time speech to text transcription',
            'Webcam enabled for realistic practice',
            'Navigate questions at your own pace',
            'Re-attempt any question anytime',
        ]
    },
    {
        icon: BarChart3,
        step: '03',
        title: 'Get AI feedback',
        description: 'After the interview, receive detailed feedback on every answer — including a rating, what you did well, and what the ideal answer looks like.',
        details: [
            'Per-question rating out of 5',
            'Side-by-side answer comparison',
            'Actionable improvement tips',
            'Overall performance score',
        ]
    },
]

const faqs = [
    {
        question: 'Is this suitable for beginners?',
        answer: 'Absolutely. You can set your experience level to 0–1 years and the AI will generate entry-level questions appropriate for your stage.'
    },
    {
        question: 'How many interviews can I create?',
        answer: 'Free plan users can create up to 3 mock interviews. Upgrade to Pro for unlimited interviews and advanced feedback.'
    },
    {
        question: 'Are my answers stored?',
        answer: 'Yes, your answers and feedback are saved to your account so you can revisit them anytime and track your progress over time.'
    },
    {
        question: 'What roles and tech stacks are supported?',
        answer: 'Any role and any tech stack — the AI adapts to whatever you enter. Frontend, backend, full-stack, DevOps, data engineering, and more.'
    },
    {
        question: 'Does it work on mobile?',
        answer: 'The app is fully responsive. However, for the best experience with webcam and microphone recording, we recommend using a desktop or laptop.'
    },
]

const highlights = [
    { icon: Sparkles, title: 'AI-powered questions', description: 'Every interview is unique and tailored to your exact role and stack.' },
    { icon: Clock, title: 'Practice anytime', description: 'No scheduling needed — practice on your own time, as many times as you want.' },
    { icon: Shield, title: 'Private and secure', description: 'Your answers and data are tied to your account and never shared.' },
]

function HowItWorks() {
    const [openFaq, setOpenFaq] = useState(null)

    return (
        <div className='p-8 max-w-4xl mx-auto'>

            {/* Header */}
            <div className='text-center mb-14'>
                <h2 className='text-4xl font-bold text-white'>How it works</h2>
                <p className='text-indigo-300 mt-3 text-sm max-w-xl mx-auto leading-relaxed'>
                    PrepAI helps you practice real interview scenarios with AI-generated questions, voice recording, and instant feedback — all in three simple steps.
                </p>
            </div>

            {/* Steps */}
            <div className='flex flex-col gap-6 mb-16'>
                {steps.map((item, index) => {
                    const Icon = item.icon
                    return (
                        <div key={index} className='relative flex gap-6 p-6 rounded-2xl border border-indigo-500/30 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300'>

                            {/* Connector line */}
                            {index !== steps.length - 1 && (
                                <div className='absolute left-[42px] top-[88px] w-px h-[calc(100%+24px)] bg-indigo-500/20' />
                            )}

                            {/* Icon */}
                            <div className='shrink-0 w-14 h-14 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center'>
                                <Icon className='w-6 h-6 text-indigo-300' />
                            </div>

                            {/* Content */}
                            <div className='flex-1'>
                                <div className='flex items-center gap-3 mb-2'>
                                    <span className='text-xs font-medium text-indigo-500 bg-indigo-500/10 px-2.5 py-1 rounded-full'>
                                        Step {item.step}
                                    </span>
                                </div>
                                <h3 className='text-lg font-semibold text-white mb-2'>{item.title}</h3>
                                <p className='text-sm text-indigo-300 leading-relaxed mb-4'>{item.description}</p>

                                <ul className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                                    {item.details.map((detail, i) => (
                                        <li key={i} className='flex items-center gap-2 text-sm text-indigo-200'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4 text-indigo-400 shrink-0">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                            </svg>
                                            {detail}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Highlights */}
            <div className='mb-16'>
                <h3 className='text-xl font-semibold text-white mb-6 text-center'>Why use PrepAI?</h3>
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                    {highlights.map((item, index) => {
                        const Icon = item.icon
                        return (
                            <div key={index} className='p-5 rounded-2xl border border-indigo-500/30 bg-white/5 backdrop-blur-sm text-center flex flex-col items-center gap-3'>
                                <div className='w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center'>
                                    <Icon className='w-5 h-5 text-indigo-300' />
                                </div>
                                <p className='text-sm font-medium text-white'>{item.title}</p>
                                <p className='text-xs text-indigo-400 leading-relaxed'>{item.description}</p>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* FAQ */}
            <div>
                <h3 className='text-xl font-semibold text-white mb-6 text-center'>Frequently asked questions</h3>
                <div className='flex flex-col gap-3'>
                    {faqs.map((faq, index) => (
                        <div key={index} className='border border-indigo-500/30 rounded-2xl bg-white/5 backdrop-blur-sm overflow-hidden'>
                            <button
                                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                className='w-full flex items-center justify-between gap-4 p-4 text-left hover:bg-white/5 transition-colors'
                            >
                                <span className='text-sm font-medium text-indigo-100'>{faq.question}</span>
                                {openFaq === index
                                    ? <ChevronUp className='w-4 h-4 text-indigo-400 shrink-0' />
                                    : <ChevronDown className='w-4 h-4 text-indigo-400 shrink-0' />
                                }
                            </button>
                            {openFaq === index && (
                                <div className='px-4 pb-4 border-t border-indigo-500/20 pt-3'>
                                    <p className='text-sm text-indigo-300 leading-relaxed'>{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default HowItWorks