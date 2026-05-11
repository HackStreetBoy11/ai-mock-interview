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
                // ✅ Use an API route instead of direct DB call
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
            <div className='mb-6'>
                <h2 className='font-medium text-2xl text-gray-900'>Let's get started</h2>
                <p className='text-sm text-gray-500 mt-1'>Review your details and enable your camera before beginning</p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>

                {/* Left col */}
                <div className='flex flex-col gap-4'>

                    {/* Job details card */}
                    <div className='rounded-xl border border-gray-200 p-5'>
                        <p className='text-xs font-medium text-gray-400 uppercase tracking-wider mb-3'>Job details</p>
                        <div className='divide-y divide-gray-100'>
                            <div className='py-3'>
                                <p className='text-xs text-gray-400 mb-1'>Role / Position</p>
                                <p className='text-sm text-gray-900'>{interviewData?.jobPosition}</p>
                            </div>
                            <div className='py-3'>
                                <p className='text-xs text-gray-400 mb-1'>Tech Stack</p>
                                <p className='text-sm text-gray-900'>{interviewData?.jobDescription}</p>
                            </div>
                            <div className='py-3 pb-0'>
                                <p className='text-xs text-gray-400 mb-1'>Years of experience</p>
                                <p className='text-sm text-gray-900'>{interviewData?.jobExperience}</p>
                            </div>
                        </div>
                    </div>

                    {/* Info card */}
                    <div className='rounded-xl border border-yellow-200 bg-yellow-50 p-5'>
                        <div className='flex items-center gap-2 mb-2'>
                            <Lightbulb className='h-4 w-4 text-yellow-700' />
                            <p className='text-sm font-medium text-yellow-800'>Before you begin</p>
                        </div>
                        <p className='text-sm text-yellow-700 leading-relaxed'>
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
                            className='rounded-xl w-full'
                            style={{ height: 280 }}
                        />
                    ) : (
                        <div className='rounded-xl border border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center gap-4 h-64'>
                            <div className='rounded-full bg-white border border-gray-200 p-4'>
                                <WebcamIcon className='h-8 w-8 text-gray-400' />
                            </div>
                            <div className='text-center'>
                                <p className='text-sm font-medium text-gray-700'>Camera is off</p>
                                <p className='text-xs text-gray-400 mt-0.5'>Enable to continue</p>
                            </div>
                            {camError && (
                                <p className='text-xs text-red-500 text-center px-4'>
                                    Camera access denied. Please allow permissions and try again.
                                </p>
                            )}
                            <Button variant='outline' size='sm' onClick={() => {
                                setCamError(false)
                                setWebCamEnable(true)
                            }}>
                                Enable webcam & microphone
                            </Button>
                        </div>
                    )}

                    <div className='flex justify-end'>
                        <Link href={`/dashboard/interview/${interviewId}/start`}>
                            <Button>
                                Start interview →
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Interview