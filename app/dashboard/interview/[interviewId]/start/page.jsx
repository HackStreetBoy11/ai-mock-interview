'use client'
import React, { useEffect, useState } from 'react'
import QuestionsSection from './_components/QuestionsSection'
import RecordAnswerSection from './_components/RecordAnswerSection'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function StartInterview({ params }) {
    const { interviewId } = React.use(params)
    const [interviewData, setInterviewData] = useState()
    const [mockInterviewQuestion, setMockInterviewQuestion] = useState()
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)

    useEffect(() => {
        const GetInterviewDetails = async () => {
            try {
                const res = await fetch(`/api/interview/${interviewId}`)
                const data = await res.json()
                const question = JSON.parse(data.jsonMockResp)
                setInterviewData(data)
                setMockInterviewQuestion(question)
            } catch (error) {
                console.error("Failed to fetch interview:", error)
            }
        }
        GetInterviewDetails()
    }, [interviewId])

    return (
        <div className='p-6 min-h-screen'>

            {/* Progress bar */}
            {mockInterviewQuestion && (
                <div className='mb-6'>
                    <div className='flex justify-between text-xs text-indigo-300 mb-1.5'>
                        <span>Question {activeQuestionIndex + 1} of {mockInterviewQuestion.length}</span>
                        <span>{Math.round(((activeQuestionIndex + 1) / mockInterviewQuestion.length) * 100)}% complete</span>
                    </div>
                    <div className='w-full h-1 bg-white/10 rounded-full overflow-hidden'>
                        <div
                            className='h-full bg-indigo-500 rounded-full transition-all duration-500'
                            style={{ width: `${((activeQuestionIndex + 1) / mockInterviewQuestion.length) * 100}%` }}
                        />
                    </div>
                </div>
            )}

            {/* Main grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <QuestionsSection
                    mockInterviewQuestion={mockInterviewQuestion}
                    activeQuestionIndex={activeQuestionIndex}
                />
                <RecordAnswerSection
                    mockInterviewQuestion={mockInterviewQuestion}
                    activeQuestionIndex={activeQuestionIndex}
                    interviewData={interviewData}
                />
            </div>

            {/* Navigation */}
            <div className='flex justify-end gap-3 mt-6'>
                {activeQuestionIndex > 0 && (
                    <Button
                        onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}
                        className='bg-white/10 hover:bg-white/20 text-indigo-200 border border-indigo-500/30 border-0'
                    >
                        Previous
                    </Button>
                )}

                {activeQuestionIndex !== mockInterviewQuestion?.length - 1 && (
                    <Button
                        onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
                        className='bg-indigo-600 hover:bg-indigo-500 text-white border-0'
                    >
                        Next Question
                    </Button>
                )}

                {activeQuestionIndex === mockInterviewQuestion?.length - 1 && (
                    <Link href={'/dashboard/interview/' + interviewData?.mockId + '/feedback'}>
                        <Button className='bg-green-600 hover:bg-green-500 text-white border-0'>
                            End Interview
                        </Button>
                    </Link>
                )}
            </div>

        </div>
    )
}

export default StartInterview