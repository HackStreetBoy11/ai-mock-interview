'use client'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState, useCallback } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text'
import { Mic } from 'lucide-react'
import { toast } from 'sonner'
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'                          // ✅ added

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
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false,
    })

    useEffect(() => {
        results.forEach((result) => {
            setUserAnswer(prev => prev + result?.transcript)
        })
    }, [results])

    // ✅ useCallback prevents stale closure in useEffect
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
                    feedback: feedback?.feedback,        // ✅ typo fixed
                    rating: feedback?.rating,
                    userEmail: user?.primaryEmailAddress?.emailAddress,
                    createdAt: moment().format('DD-MM-YY')  // ✅ moment imported
                })

            if (resp) {
                toast('User Answer Added Successfully In Database')
            } else {
                toast('Error while adding to db')
            }

            setUserAnswer('')
        } catch (error) {
            console.error(error)
            toast('Failed to save answer, please try again')
        } finally {
            setLoading(false)                          // ✅ always runs, even on error
        }
    }, [userAnswer, activeQuestionIndex, mockInterviewQuestion, interviewData, user])

    // ✅ Only fires when recording stops, not on every transcript update
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
        <div className='flex items-center justify-center flex-col'>
            <div className='flex flex-col my-20 justify-center items-center bg-black rounded-lg p-5'>
                <Image
                    src={'/webcam.png'}
                    width={200}
                    height={200}
                    className='absolute'
                    alt='camera'
                />
                <Webcam
                    mirrored={true}
                    style={{ height: 300, width: '100%', zIndex: 10 }}
                />
            </div>

            <Button
                disabled={loading}
                variant='outline'
                className='my-10'
                onClick={StartStopRecording}
            >
                {isRecording ? (
                    <span className='flex items-center gap-2 text-red-500'>
                        <Mic className='w-4 h-4 animate-pulse' /> Recording...
                    </span>
                ) : (
                    'Record Answer'
                )}
            </Button>

            {error && <p className='text-red-500'>{error}</p>}
            {interimResult && <p className='text-gray-400 italic'>{interimResult}</p>}
        </div>
    )
}

export default RecordAnswerSection