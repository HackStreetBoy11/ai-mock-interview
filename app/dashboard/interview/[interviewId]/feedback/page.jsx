'use client'

import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';


function Feedback({ params }) {

    const [feedbackList, setFeedbackList] = useState([]);
    const { interviewId } = React.use(params);
    const router = useRouter();
    const [rating, setRating] = useState(0);

    const GetFeedback = async () => {
        const result = await db.select()
            .from(UserAnswer)
            .where(eq(UserAnswer.mockIdRef, interviewId))
            .orderBy(UserAnswer.id);

        setFeedbackList(result);

        let value = 0;
        result.map((item) => {
            value = value + Number(item?.rating);
        });
        setRating(value);
    }

    useEffect(() => {
        GetFeedback();
    }, [])

    return (
        <div className='p-10'>

            {feedbackList?.length == 0 ?
                <h2 className='font-bold text-xl text-indigo-300'>No Interview Feedback Recorded</h2>
                :
                <>
                    <h2 className='text-3xl font-bold text-white'>Congratulations!</h2>
                    <h2 className='text-xl font-semibold text-indigo-200 mt-1'>Here is your interview feedback</h2>
                    <h2 className='text-indigo-300 text-lg my-3'>
                        Your overall rating: <strong className='text-white'>{rating}/{feedbackList.length * 5}</strong>
                    </h2>
                    <h2 className='text-sm text-indigo-400'>Find below each question with the correct answer, your answer and feedback for improvement</h2>

                    {feedbackList && feedbackList.map((item, index) => (
                        <Collapsible key={index} className="mt-4">
                            <CollapsibleTrigger className='w-full p-3 bg-white/5 border border-indigo-500/30 rounded-xl flex justify-between items-center text-left gap-7 text-sm text-indigo-200 hover:bg-white/10 transition-colors'>
                                {item.question}
                                <ChevronsUpDown className='h-4 w-4 shrink-0 text-indigo-400' />
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <div className='flex flex-col gap-2 mt-2'>
                                    <div className='p-3 border border-indigo-500/30 rounded-xl bg-white/5'>
                                        <span className='text-xs font-medium text-indigo-400 uppercase tracking-wider'>Rating</span>
                                        <p className='text-white font-semibold mt-0.5'>{item.rating} / 5</p>
                                    </div>
                                    <div className='p-3 border border-red-500/30 rounded-xl bg-red-500/10'>
                                        <span className='text-xs font-medium text-red-400 uppercase tracking-wider'>Your Answer</span>
                                        <p className='text-red-200 text-sm mt-0.5'>{item.userAns}</p>
                                    </div>
                                    <div className='p-3 border border-green-500/30 rounded-xl bg-green-500/10'>
                                        <span className='text-xs font-medium text-green-400 uppercase tracking-wider'>Correct Answer</span>
                                        <p className='text-green-200 text-sm mt-0.5'>{item.correctAns}</p>
                                    </div>
                                    <div className='p-3 border border-indigo-500/30 rounded-xl bg-indigo-500/10'>
                                        <span className='text-xs font-medium text-indigo-400 uppercase tracking-wider'>Feedback</span>
                                        <p className='text-indigo-200 text-sm mt-0.5'>{item.feedback}</p>
                                    </div>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                    ))}
                </>
            }

            <Button
                className='mt-8 bg-indigo-600 hover:bg-indigo-500 text-white border-0 px-6'
                onClick={() => router.replace('/dashboard')}
            >
                Go Home
            </Button>
        </div>
    )
}

export default Feedback