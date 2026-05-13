'use client'
import React, { useEffect, useState } from 'react'
import QuestionsSection from './_components/QuestionsSection'
import RecordAnswerSection from './_components/RecordAnswerSection'

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
    )
}

export default StartInterview
