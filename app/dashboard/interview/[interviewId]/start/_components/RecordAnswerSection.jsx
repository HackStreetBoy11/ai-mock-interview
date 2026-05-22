'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState, useCallback } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text'
import { Mic, MicOff, Sparkles, AudioWaveform } from 'lucide-react'
import { toast } from 'sonner'
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'

function RecordAnswerSection({
    mockInterviewQuestion,
    activeQuestionIndex,
    interviewData
}) {

    const [userAnswer, setUserAnswer] = useState('')
    const { user } = useUser()
    const [loading, setLoading] = useState(false)

    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false,
    })

    useEffect(() => {

        results.forEach((result) => {

            setUserAnswer(prev => prev + result?.transcript)

        })

    }, [results])

    const UpdateUserAnswer = useCallback(async () => {

        try {

            setLoading(true)

            const response = await fetch('/api/generate-feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    question: mockInterviewQuestion[activeQuestionIndex]?.question,
                    userAnswer: userAnswer,
                }),
            })

            const { feedback } = await response.json()

            const resp = await db.insert(UserAnswer)
                .values({
                    mockIdRef: interviewData?.mockId,
                    question: mockInterviewQuestion[activeQuestionIndex]?.question,
                    correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
                    userAns: userAnswer,
                    feedback: feedback?.feedback,
                    rating: feedback?.rating,
                    userEmail: user?.primaryEmailAddress?.emailAddress,
                    createdAt: moment().format('DD-MM-YY')
                })

            if (resp) {

                toast('Answer saved successfully')
                setUserAnswer('')

            } else {

                toast('Error while saving answer')

            }

            setResults([])

        } catch (error) {

            console.error(error)
            toast('Failed to save answer, please try again')

        } finally {

            setLoading(false)

        }

    }, [userAnswer, activeQuestionIndex, mockInterviewQuestion, interviewData, user])

    useEffect(() => {

        if (!isRecording && userAnswer.length > 10) {

            UpdateUserAnswer()

        }

    }, [isRecording, UpdateUserAnswer])

    const StartStopRecording = () => {

        if (isRecording) {

            stopSpeechToText()

        } else {

            startSpeechToText()

        }

    }

    return (

        <div className='relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e1b4b] p-6 md:p-8 shadow-[0_0_60px_rgba(59,130,246,0.12)]'>

            {/* Glow */}
            <div className='absolute top-0 right-0 w-56 h-56 bg-cyan-500/10 blur-3xl rounded-full'></div>
            <div className='absolute bottom-0 left-0 w-56 h-56 bg-purple-500/10 blur-3xl rounded-full'></div>

            <div className='relative z-10 flex flex-col gap-8'>

                {/* Header */}
                <div className='flex items-center justify-between'>

                    <div>

                        <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 mb-4'>

                            <Sparkles className='w-4 h-4 text-cyan-400' />

                            <span className='text-xs font-bold tracking-wider text-cyan-300 uppercase'>
                                AI Voice Recording
                            </span>

                        </div>

                        <h2 className='text-3xl font-black text-white'>
                            Record Your Answer
                        </h2>

                        <p className='text-slate-400 mt-2 text-sm'>
                            Speak naturally and let AI analyze your response.
                        </p>

                    </div>

                    {isRecording && (

                        <div className='flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20'>

                            <span className='w-2 h-2 rounded-full bg-red-500 animate-pulse'></span>

                            <span className='text-sm font-semibold text-red-300'>
                                Recording
                            </span>

                        </div>

                    )}

                </div>

                {/* Webcam */}
                <div className='relative overflow-hidden rounded-[28px] border border-white/10 bg-black/40 backdrop-blur-2xl'>

                    {/* Overlay Glow */}
                    <div className='absolute inset-0 bg-gradient-to-tr from-cyan-500/5 via-transparent to-purple-500/5 z-0'></div>

                    {/* Placeholder */}
                    <Image
                        src={'/webcam.png'}
                        width={220}
                        height={220}
                        className='absolute inset-0 m-auto opacity-10 z-0'
                        alt='camera'
                    />

                    {/* Webcam */}
                    <Webcam
                        mirrored={true}
                        className='relative z-10 w-full object-cover'
                        style={{
                            height: 420,
                        }}
                    />

                    {/* Live Badge */}
                    {isRecording && (

                        <div className='absolute top-5 left-5 z-20 flex items-center gap-2 rounded-full border border-red-500/20 bg-black/40 backdrop-blur-xl px-4 py-2'>

                            <div className='w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse'></div>

                            <span className='text-xs font-bold tracking-wider text-white uppercase'>
                                Live Recording
                            </span>

                        </div>

                    )}

                    {/* AI Badge */}
                    <div className='absolute top-5 right-5 z-20 flex items-center gap-2 rounded-full border border-cyan-400/20 bg-black/40 backdrop-blur-xl px-4 py-2'>

                        <AudioWaveform className='w-4 h-4 text-cyan-400' />

                        <span className='text-xs font-bold tracking-wider text-cyan-300 uppercase'>
                            AI Listening
                        </span>

                    </div>

                </div>

                {/* Interim Transcript */}
                {(interimResult || userAnswer) && (

                    <div className='relative overflow-hidden rounded-[28px] border border-cyan-400/10 bg-white/5 backdrop-blur-2xl p-6'>

                        <div className='absolute top-0 right-0 w-40 h-40 bg-cyan-500/5 blur-3xl rounded-full'></div>

                        <div className='relative z-10'>

                            <div className='flex items-center gap-2 mb-4'>

                                <div className='w-2 h-2 rounded-full bg-cyan-400 animate-pulse'></div>

                                <span className='text-xs font-bold tracking-wider text-cyan-300 uppercase'>
                                    Live Transcript
                                </span>

                            </div>

                            <p className='text-slate-200 leading-relaxed text-sm md:text-base'>
                                {interimResult || userAnswer}
                            </p>

                        </div>

                    </div>

                )}

                {/* Error */}
                {error && (

                    <div className='rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4'>

                        <p className='text-sm text-red-300'>
                            {error}
                        </p>

                    </div>

                )}

                {/* Button */}
                <div className='flex items-center justify-center pt-2'>

                    <Button
                        disabled={loading}
                        onClick={StartStopRecording}
                        className={`h-16 px-10 rounded-2xl text-base font-bold border-0 transition-all duration-300 shadow-[0_0_35px_rgba(59,130,246,0.25)]
                            
                            ${isRecording
                                ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white hover:opacity-90'
                                : 'bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white hover:opacity-90'
                            }
                        `}
                    >

                        {isRecording ? (

                            <div className='flex items-center gap-3'>

                                <MicOff className='w-5 h-5' />

                                <span>
                                    Stop Recording
                                </span>

                            </div>

                        ) : (

                            <div className='flex items-center gap-3'>

                                <Mic className='w-5 h-5' />

                                <span>
                                    {loading ? 'Saving Answer...' : 'Start Recording'}
                                </span>

                            </div>

                        )}

                    </Button>

                </div>

            </div>

        </div>

    )
}

export default RecordAnswerSection