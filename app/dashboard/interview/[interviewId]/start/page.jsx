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
                // ✅ Use an API route instead of direct DB call
                const res = await fetch(`/api/interview/${interviewId}`)
                const data = await res.json()
                const question = JSON.parse(data.jsonMockResp)
                setInterviewData(data)
                console.log(data)
                console.log(question)
                setMockInterviewQuestion(question)

            } catch (error) {
                console.error("Failed to fetch interview:", error)
            }
        }
        GetInterviewDetails()
    }, [interviewId])
    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                {/* Question */}
                <QuestionsSection
                    mockInterviewQuestion={mockInterviewQuestion}
                    activeQuestionIndex={activeQuestionIndex}
                />
                {/* video/ Audio Recording */}
                <RecordAnswerSection
                    mockInterviewQuestion={mockInterviewQuestion}
                    activeQuestionIndex={activeQuestionIndex}
                    interviewData={interviewData}
                />
            </div>
            <div className='flex justify-end gap-6'>
                {activeQuestionIndex > 0 && <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)} variant='outline'>Previous Question</Button>}
                {activeQuestionIndex != mockInterviewQuestion?.length - 1 && <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)} variant='outline'>Next Question</Button>}

                {activeQuestionIndex == mockInterviewQuestion?.length - 1 &&
                    <Link href={'/dashboard'}>
                        <Button variant='outline'>End Interview</Button>
                    </Link>
                }       
            </div>
        </>
    )
}

export default StartInterview
