'use client'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'

function page({ params }) {
    const { interviewId } = React.use(params)
    const [interviewData, setInterviewData] = useState();
    useEffect(() => {
        console.log(interviewId)
        GetInterviewDetails();
    }, [interviewId])

    const GetInterviewDetails = async () => {
        const result = await db.select().from(MockInterview)
            .where(eq(MockInterview.mockId, interviewId))

        setInterviewData(result[0])
    }

    return (
        <div className='my-5 flex justify-center flex-col items-center'>
            <h2 className='font-bold text-1xl'>Let's Get Started</h2>
        </div>
    )
}

export default page
