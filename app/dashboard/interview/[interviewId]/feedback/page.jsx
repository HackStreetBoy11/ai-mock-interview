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

import {
    ChevronsUpDown,
    Sparkles,
    Trophy,
    Brain,
    CheckCircle2,
    XCircle,
    MessageSquareText
} from 'lucide-react'

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

        <div className='relative overflow-hidden px-4 md:px-8 py-10 max-w-7xl mx-auto'>

            {/* Background Glow */}
            <div className='absolute top-0 left-0 w-80 h-80 bg-cyan-500/10 blur-3xl rounded-full'></div>
            <div className='absolute bottom-0 right-0 w-80 h-80 bg-purple-500/10 blur-3xl rounded-full'></div>

            <div className='relative z-10'>

                {feedbackList?.length == 0 ?

                    <div className='flex flex-col items-center justify-center text-center py-32'>

                        <div className='w-24 h-24 rounded-[28px] bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.3)] mb-8'>

                            <Brain className='w-12 h-12 text-white' />

                        </div>

                        <h2 className='text-4xl font-black text-white'>
                            No Feedback Found
                        </h2>

                        <p className='text-slate-400 mt-4 max-w-md'>
                            Complete your interview session to generate AI-powered feedback and performance analysis.
                        </p>

                    </div>

                    :

                    <>

                        {/* Header */}
                        <div className='text-center mb-16'>

                            <div className='inline-flex items-center gap-2 px-5 py-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 backdrop-blur-xl mb-6'>

                                <Sparkles className='w-4 h-4 text-cyan-400' />

                                <span className='text-sm font-semibold text-cyan-300'>
                                    AI Interview Analysis
                                </span>

                            </div>

                            <h2 className='text-5xl md:text-6xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent'>
                                Interview Feedback
                            </h2>

                            <p className='text-slate-400 mt-5 text-lg'>
                                Your complete AI performance breakdown
                            </p>

                        </div>

                        {/* Stats */}
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-14'>

                            {/* Score Card */}
                            <div className='relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e1b4b] p-8 shadow-[0_0_50px_rgba(59,130,246,0.12)]'>

                                <div className='absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 blur-3xl rounded-full'></div>

                                <div className='relative z-10'>

                                    <div className='w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 flex items-center justify-center shadow-[0_0_35px_rgba(59,130,246,0.3)] mb-6'>

                                        <Trophy className='w-8 h-8 text-white' />

                                    </div>

                                    <p className='text-slate-400 text-sm uppercase tracking-wider font-semibold'>
                                        Overall Score
                                    </p>

                                    <h2 className='text-5xl font-black text-white mt-3'>
                                        {rating}
                                        <span className='text-cyan-400 text-2xl'>
                                            /{feedbackList.length * 5}
                                        </span>
                                    </h2>

                                </div>

                            </div>

                            {/* Questions */}
                            <div className='relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl p-8'>

                                <div className='absolute bottom-0 left-0 w-40 h-40 bg-purple-500/10 blur-3xl rounded-full'></div>

                                <div className='relative z-10'>

                                    <div className='w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center shadow-[0_0_35px_rgba(168,85,247,0.3)] mb-6'>

                                        <MessageSquareText className='w-8 h-8 text-white' />

                                    </div>

                                    <p className='text-slate-400 text-sm uppercase tracking-wider font-semibold'>
                                        Questions Attempted
                                    </p>

                                    <h2 className='text-5xl font-black text-white mt-3'>
                                        {feedbackList.length}
                                    </h2>

                                </div>

                            </div>

                            {/* AI Review */}
                            <div className='relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl p-8'>

                                <div className='absolute top-0 left-0 w-40 h-40 bg-cyan-500/10 blur-3xl rounded-full'></div>

                                <div className='relative z-10'>

                                    <div className='w-16 h-16 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center shadow-[0_0_35px_rgba(34,197,94,0.3)] mb-6'>

                                        <Brain className='w-8 h-8 text-white' />

                                    </div>

                                    <p className='text-slate-400 text-sm uppercase tracking-wider font-semibold'>
                                        AI Evaluation
                                    </p>

                                    <h2 className='text-3xl font-black text-white mt-3'>
                                        Completed
                                    </h2>

                                </div>

                            </div>

                        </div>

                        {/* Questions Feedback */}
                        <div className='space-y-5'>

                            {feedbackList && feedbackList.map((item, index) => (

                                <Collapsible
                                    key={index}
                                    className='overflow-hidden rounded-[30px] border border-white/10 bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e1b4b] backdrop-blur-2xl shadow-[0_0_40px_rgba(59,130,246,0.08)]'
                                >

                                    <CollapsibleTrigger className='w-full p-6 flex items-center justify-between gap-6 text-left hover:bg-white/5 transition-all duration-300'>

                                        <div className='flex items-center gap-5'>

                                            <div className='w-14 h-14 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center shadow-[0_0_25px_rgba(59,130,246,0.25)] shrink-0'>

                                                <span className='text-white font-black'>
                                                    {index + 1}
                                                </span>

                                            </div>

                                            <div>

                                                <h3 className='text-lg font-bold text-white leading-relaxed'>
                                                    {item.question}
                                                </h3>

                                                <p className='text-slate-400 text-sm mt-1'>
                                                    Click to view detailed AI feedback
                                                </p>

                                            </div>

                                        </div>

                                        <div className='flex items-center gap-4 shrink-0'>

                                            <div className='px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/20'>

                                                <span className='text-sm font-bold text-cyan-300'>
                                                    {item.rating}/5
                                                </span>

                                            </div>

                                            <ChevronsUpDown className='h-5 w-5 text-slate-400' />

                                        </div>

                                    </CollapsibleTrigger>

                                    <CollapsibleContent>

                                        <div className='px-6 pb-6'>

                                            <div className='grid gap-5'>

                                                {/* Rating */}
                                                <div className='rounded-[26px] border border-cyan-400/10 bg-cyan-500/5 p-6'>

                                                    <div className='flex items-center gap-3 mb-3'>

                                                        <Trophy className='w-5 h-5 text-cyan-400' />

                                                        <span className='text-sm font-bold tracking-wider text-cyan-300 uppercase'>
                                                            AI Rating
                                                        </span>

                                                    </div>

                                                    <h2 className='text-4xl font-black text-white'>
                                                        {item.rating}
                                                        <span className='text-cyan-400 text-xl'>
                                                            /5
                                                        </span>
                                                    </h2>

                                                </div>

                                                {/* User Answer */}
                                                <div className='rounded-[26px] border border-red-500/10 bg-red-500/5 p-6'>

                                                    <div className='flex items-center gap-3 mb-4'>

                                                        <XCircle className='w-5 h-5 text-red-400' />

                                                        <span className='text-sm font-bold tracking-wider text-red-300 uppercase'>
                                                            Your Answer
                                                        </span>

                                                    </div>

                                                    <p className='text-slate-300 leading-relaxed'>
                                                        {item.userAns}
                                                    </p>

                                                </div>

                                                {/* Correct Answer */}
                                                <div className='rounded-[26px] border border-green-500/10 bg-green-500/5 p-6'>

                                                    <div className='flex items-center gap-3 mb-4'>

                                                        <CheckCircle2 className='w-5 h-5 text-green-400' />

                                                        <span className='text-sm font-bold tracking-wider text-green-300 uppercase'>
                                                            Ideal Answer
                                                        </span>

                                                    </div>

                                                    <p className='text-slate-300 leading-relaxed'>
                                                        {item.correctAns}
                                                    </p>

                                                </div>

                                                {/* Feedback */}
                                                <div className='rounded-[26px] border border-purple-500/10 bg-purple-500/5 p-6'>

                                                    <div className='flex items-center gap-3 mb-4'>

                                                        <Brain className='w-5 h-5 text-purple-400' />

                                                        <span className='text-sm font-bold tracking-wider text-purple-300 uppercase'>
                                                            AI Feedback
                                                        </span>

                                                    </div>

                                                    <p className='text-slate-300 leading-relaxed'>
                                                        {item.feedback}
                                                    </p>

                                                </div>

                                            </div>

                                        </div>

                                    </CollapsibleContent>

                                </Collapsible>

                            ))}

                        </div>

                    </>

                }

                {/* Button */}
                <div className='flex justify-center mt-16'>

                    <Button
                        onClick={() => router.replace('/dashboard')}
                        className='h-14 px-10 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white text-base font-bold shadow-[0_0_35px_rgba(59,130,246,0.35)] hover:opacity-90 transition-all duration-300 border-0'
                    >
                        Back To Dashboard
                    </Button>

                </div>

            </div>

        </div>
    )
}

export default Feedback