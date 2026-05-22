'use client'
import { Button } from '@/components/ui/button'
import { Lightbulb, WebcamIcon, ShieldCheck, Sparkles } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'

function Interview({ params }) {

    const { interviewId } = React.use(params)

    const [interviewData, setInterviewData] = useState()
    const [webCamEnable, setWebCamEnable] = useState(false)
    const [camError, setCamError] = useState(false)

    useEffect(() => {

        const GetInterviewDetails = async () => {

            try {

                const res = await fetch(`/api/interview/${interviewId}`)
                const data = await res.json()

                setInterviewData(data)

            } catch (error) {

                console.error("Failed to fetch interview:", error)

            }

        }

        GetInterviewDetails()

    }, [interviewId])

    return (

        <div className='relative overflow-hidden px-4 py-10 max-w-7xl mx-auto'>

            {/* Background Glow */}
            <div className='absolute top-0 left-0 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full'></div>
            <div className='absolute bottom-0 right-0 w-72 h-72 bg-purple-500/10 blur-3xl rounded-full'></div>

            <div className='relative z-10'>

                {/* Header */}
                <div className='mb-12 text-center'>

                    <div className='inline-flex items-center gap-2 px-5 py-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 backdrop-blur-xl mb-6'>
                        <Sparkles className='w-4 h-4 text-cyan-400' />

                        <span className='text-sm font-semibold text-cyan-300'>
                            AI Mock Interview Session
                        </span>
                    </div>

                    <h2 className='text-5xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent'>
                        Ready To Begin?
                    </h2>

                    <p className='text-slate-400 mt-5 text-lg max-w-2xl mx-auto leading-relaxed'>
                        Review your interview setup and enable your webcam
                        before starting the AI interview experience.
                    </p>

                </div>

                {/* Main Grid */}
                <div className='grid grid-cols-1 xl:grid-cols-2 gap-8'>

                    {/* LEFT SIDE */}
                    <div className='space-y-6'>

                        {/* Job Details */}
                        <div className='relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e1b4b] p-8 shadow-[0_0_50px_rgba(59,130,246,0.12)]'>

                            {/* Glow */}
                            <div className='absolute top-0 right-0 w-44 h-44 bg-cyan-500/10 blur-3xl rounded-full'></div>

                            <div className='relative z-10'>

                                <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 mb-8'>

                                    <ShieldCheck className='w-4 h-4 text-cyan-400' />

                                    <span className='text-xs font-bold tracking-wider text-cyan-300 uppercase'>
                                        Interview Details
                                    </span>

                                </div>

                                <div className='space-y-6'>

                                    <div className='rounded-2xl border border-white/10 bg-white/5 p-5'>

                                        <p className='text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-2'>
                                            Job Role
                                        </p>

                                        <h3 className='text-2xl font-black text-white'>
                                            {interviewData?.jobPosition}
                                        </h3>

                                    </div>

                                    <div className='rounded-2xl border border-white/10 bg-white/5 p-5'>

                                        <p className='text-xs font-semibold text-purple-300 uppercase tracking-wider mb-2'>
                                            Tech Stack
                                        </p>

                                        <p className='text-slate-300 leading-relaxed'>
                                            {interviewData?.jobDescription}
                                        </p>

                                    </div>

                                    <div className='rounded-2xl border border-white/10 bg-white/5 p-5'>

                                        <p className='text-xs font-semibold text-blue-300 uppercase tracking-wider mb-2'>
                                            Experience
                                        </p>

                                        <p className='text-white text-lg font-bold'>
                                            {interviewData?.jobExperience} Years
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* Info Card */}
                        <div className='rounded-[28px] border border-cyan-400/20 bg-cyan-500/10 backdrop-blur-2xl p-6'>

                            <div className='flex items-center gap-3 mb-4'>

                                <div className='w-12 h-12 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center shadow-[0_0_25px_rgba(34,211,238,0.25)]'>
                                    <Lightbulb className='w-6 h-6 text-white' />
                                </div>

                                <div>

                                    <h3 className='text-lg font-bold text-white'>
                                        Before You Start
                                    </h3>

                                    <p className='text-sm text-cyan-300'>
                                        Quick interview preparation tips
                                    </p>

                                </div>

                            </div>

                            <p className='text-slate-300 leading-relaxed text-sm'>
                                {process.env.NEXT_PUBLIC_INFORMATION}
                            </p>

                        </div>

                    </div>

                    {/* RIGHT SIDE */}
                    <div className='space-y-6'>

                        {/* Webcam Section */}
                        <div className='relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e1b4b] p-6 min-h-[520px] flex flex-col justify-between shadow-[0_0_50px_rgba(168,85,247,0.12)]'>

                            {/* Glow */}
                            <div className='absolute bottom-0 left-0 w-44 h-44 bg-purple-500/10 blur-3xl rounded-full'></div>

                            <div className='relative z-10'>

                                <div className='flex items-center justify-between mb-6'>

                                    <div>

                                        <h3 className='text-2xl font-black text-white'>
                                            Camera Preview
                                        </h3>

                                        <p className='text-slate-400 mt-1 text-sm'>
                                            Enable webcam & microphone access
                                        </p>

                                    </div>

                                    <div className='px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-cyan-300'>
                                        LIVE SETUP
                                    </div>

                                </div>

                                {webCamEnable ? (

                                    <div className='relative rounded-[28px] overflow-hidden border border-cyan-400/20 shadow-[0_0_40px_rgba(34,211,238,0.12)]'>

                                        <Webcam
                                            onUserMedia={() => setWebCamEnable(true)}
                                            onUserMediaError={(err) => {
                                                console.error("Webcam error:", err)
                                                setWebCamEnable(false)
                                                setCamError(true)
                                            }}
                                            mirrored={true}
                                            className='w-full'
                                            style={{ height: 380, objectFit: 'cover' }}
                                        />

                                        <div className='absolute top-4 left-4 px-3 py-1 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center gap-2'>
                                            <div className='w-2 h-2 rounded-full bg-red-500 animate-pulse'></div>

                                            <span className='text-xs font-semibold text-white'>
                                                Recording Ready
                                            </span>
                                        </div>

                                    </div>

                                ) : (

                                    <div className='rounded-[28px] border border-dashed border-cyan-400/20 bg-white/5 backdrop-blur-xl flex flex-col items-center justify-center gap-5 h-[380px]'>

                                        <div className='w-24 h-24 rounded-[28px] bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.3)]'>
                                            <WebcamIcon className='h-12 w-12 text-white' />
                                        </div>

                                        <div className='text-center'>

                                            <p className='text-2xl font-black text-white'>
                                                Camera Disabled
                                            </p>

                                            <p className='text-slate-400 mt-2'>
                                                Enable webcam access to continue
                                            </p>

                                        </div>

                                        {camError && (

                                            <div className='rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-3 max-w-sm text-center'>
                                                <p className='text-sm text-red-300'>
                                                    Camera access denied. Please allow permissions and try again.
                                                </p>
                                            </div>

                                        )}

                                        <Button
                                            size='lg'
                                            onClick={() => {
                                                setCamError(false)
                                                setWebCamEnable(true)
                                            }}
                                            className='rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 px-8 text-white font-semibold shadow-[0_0_25px_rgba(59,130,246,0.35)] hover:opacity-90'
                                        >
                                            Enable Webcam & Microphone
                                        </Button>

                                    </div>

                                )}

                            </div>

                        </div>

                        {/* Start Button */}
                        <div className='flex justify-end'>

                            <Link href={`/dashboard/interview/${interviewId}/start`}>

                                <Button className='h-14 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 px-10 text-base font-bold text-white shadow-[0_0_35px_rgba(59,130,246,0.35)] hover:opacity-90 transition-all duration-300'>
                                    Start Interview →
                                </Button>

                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    )
}

export default Interview