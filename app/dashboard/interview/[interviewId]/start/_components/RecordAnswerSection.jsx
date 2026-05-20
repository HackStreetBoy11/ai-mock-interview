'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState, useCallback } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text'
import { Mic, MicOff } from 'lucide-react'
import { toast } from 'sonner'
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'

function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex, interviewData }) {
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
                toast('User answer saved successfully')
                setUserAnswer('');
            } else {
                toast('Error while saving answer')
            }
            setResults([]);
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
        <div className='flex items-center justify-center flex-col gap-6'>

            {/* Webcam */}
            <div className='relative w-full rounded-2xl overflow-hidden border border-indigo-500/30 bg-black/40 backdrop-blur-sm'>
                <Image
                    src={'/webcam.png'}
                    width={200}
                    height={200}
                    className='absolute inset-0 m-auto opacity-20 z-0'
                    alt='camera'
                />
                <Webcam
                    mirrored={true}
                    style={{ height: 300, width: '100%', zIndex: 10, position: 'relative' }}
                />
                {/* Recording indicator */}
                {isRecording && (
                    <div className='absolute top-3 right-3 z-20 flex items-center gap-1.5 bg-red-500/90 text-white text-xs px-2.5 py-1 rounded-full'>
                        <span className='w-1.5 h-1.5 bg-white rounded-full animate-pulse' />
                        Live
                    </div>
                )}
            </div>

            {/* Interim transcript */}
            {interimResult && (
                <p className='text-indigo-300/70 text-sm italic text-center px-4'>
                    {interimResult}
                </p>
            )}

            {/* Error */}
            {error && (
                <p className='text-red-400 text-sm'>{error}</p>
            )}

            {/* Record Button */}
            <Button
                disabled={loading}
                onClick={StartStopRecording}
                className={`flex items-center gap-2 px-6 py-5 rounded-full text-sm font-medium transition-all duration-300 border-0
                    ${isRecording
                        ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/40'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                    }`}
            >
                {isRecording ? (
                    <>
                        <MicOff className='w-4 h-4' />
                        Stop Recording
                    </>
                ) : (
                    <>
                        <Mic className='w-4 h-4' />
                        {loading ? 'Saving...' : 'Record Answer'}
                    </>
                )}
            </Button>

        </div>
    )
}

export default RecordAnswerSection