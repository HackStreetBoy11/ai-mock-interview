'use client'
import { Button } from '@/components/ui/button'
import { Lightbulb, WebcamIcon } from 'lucide-react'
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
        <div className='my-8 px-4 max-w-5xl mx-auto'>

            {/* Page header */}
            <div className='mb-8'>
                <h2 className='font-semibold text-2xl text-white'>Let's get started</h2>
                <p className='text-sm text-indigo-300 mt-1'>Review your details and enable your camera before beginning</p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>

                {/* Left col */}
                <div className='flex flex-col gap-4'>

                    {/* Job details card */}
                    <div className='rounded-2xl border border-indigo-500/30 bg-white/5 backdrop-blur-sm p-5'>
                        <p className='text-xs font-medium text-indigo-400 uppercase tracking-wider mb-3'>Job details</p>
                        <div className='divide-y divide-indigo-500/20'>
                            <div className='py-3'>
                                <p className='text-xs text-indigo-400 mb-1'>Role / Position</p>
                                <p className='text-sm text-white'>{interviewData?.jobPosition}</p>
                            </div>
                            <div className='py-3'>
                                <p className='text-xs text-indigo-400 mb-1'>Tech Stack</p>
                                <p className='text-sm text-white'>{interviewData?.jobDescription}</p>
                            </div>
                            <div className='py-3 pb-0'>
                                <p className='text-xs text-indigo-400 mb-1'>Years of experience</p>
                                <p className='text-sm text-white'>{interviewData?.jobExperience}</p>
                            </div>
                        </div>
                    </div>

                    {/* Info card */}
                    <div className='rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-5'>
                        <div className='flex items-center gap-2 mb-2'>
                            <Lightbulb className='h-4 w-4 text-indigo-300' />
                            <p className='text-sm font-medium text-indigo-200'>Before you begin</p>
                        </div>
                        <p className='text-sm text-indigo-300/70 leading-relaxed'>
                            {process.env.NEXT_PUBLIC_INFORMATION}
                        </p>
                    </div>
                </div>

                {/* Right col */}
                <div className='flex flex-col gap-4'>
                    {webCamEnable ? (
                        <Webcam
                            onUserMedia={() => setWebCamEnable(true)}
                            onUserMediaError={(err) => {
                                console.error("Webcam error:", err)
                                setWebCamEnable(false)
                                setCamError(true)
                            }}
                            mirrored={true}
                            className='rounded-2xl w-full border border-indigo-500/30'
                            style={{ height: 280 }}
                        />
                    ) : (
                        <div className='rounded-2xl border border-dashed border-indigo-500/30 bg-white/5 backdrop-blur-sm flex flex-col items-center justify-center gap-4 h-64'>
                            <div className='rounded-full bg-indigo-500/20 border border-indigo-500/30 p-4'>
                                <WebcamIcon className='h-8 w-8 text-indigo-300' />
                            </div>
                            <div className='text-center'>
                                <p className='text-sm font-medium text-white'>Camera is off</p>
                                <p className='text-xs text-indigo-400 mt-0.5'>Enable to continue</p>
                            </div>
                            {camError && (
                                <p className='text-xs text-red-400 text-center px-4'>
                                    Camera access denied. Please allow permissions and try again.
                                </p>
                            )}
                            <Button
                                size='sm'
                                onClick={() => {
                                    setCamError(false)
                                    setWebCamEnable(true)
                                }}
                                className='bg-white/10 hover:bg-white/20 text-indigo-200 border border-indigo-500/30 cursor-pointer'
                            >
                                Enable webcam & microphone
                            </Button>
                        </div>
                    )}

                    <div className='flex justify-end'>
                        <Link href={`/dashboard/interview/${interviewId}/start`}>
                            <Button className='bg-indigo-600 hover:bg-indigo-500 text-white border-0 px-6 cursor-pointer'>
                                Start Interview →
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Interview