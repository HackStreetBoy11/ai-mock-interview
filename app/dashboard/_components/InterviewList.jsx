'use client'
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import InterviewItemCard from './InterviewItemCard';
import { LoaderCircle } from 'lucide-react';

function InterviewList() {

    const { user } = useUser();
    const [interviewList, setInterviewList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const email = user?.primaryEmailAddress?.emailAddress;
        if (!email) return;

        const fetchInterviews = async () => {

            try {

                const result = await db.select()
                    .from(MockInterview)
                    .where(eq(MockInterview.createdBy, email))
                    .orderBy(desc(MockInterview.id));

                setInterviewList(result);

            } catch (err) {

                console.error("Failed to fetch interviews:", err);

            } finally {

                setLoading(false);

            }

        };

        fetchInterviews();

    }, [user?.primaryEmailAddress?.emailAddress]);

    return (
        <div>

            {/* Heading */}
            <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8'>

                <div>

                    <h2 className='text-4xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent'>
                        Previous Interviews
                    </h2>

                    <p className='text-slate-400 mt-2 text-sm md:text-base'>
                        Track your interview practice and improve performance.
                    </p>

                </div>

                {!loading && interviewList.length > 0 && (

                    <div className='inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl border border-cyan-400/20 bg-cyan-500/10 backdrop-blur-xl'>

                        <div className='w-2 h-2 rounded-full bg-cyan-400 animate-pulse'></div>

                        <span className='text-sm font-semibold text-cyan-300'>
                            {interviewList.length} Interviews
                        </span>

                    </div>

                )}

            </div>

            {/* Loading */}
            {loading ? (

                <div className='flex flex-col items-center justify-center py-20 rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl'>

                    <div className='w-16 h-16 rounded-full border border-cyan-400/20 bg-cyan-500/10 flex items-center justify-center mb-5 shadow-[0_0_30px_rgba(34,211,238,0.2)]'>

                        <LoaderCircle className='animate-spin w-8 h-8 text-cyan-400' />

                    </div>

                    <p className='text-lg font-semibold text-white'>
                        Loading Interviews...
                    </p>

                    <p className='text-slate-400 text-sm mt-2'>
                        Please wait while we fetch your interview history.
                    </p>

                </div>

            ) : interviewList.length === 0 ? (

                /* Empty State */
                <div className='relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e1b4b] p-14 text-center shadow-[0_0_60px_rgba(59,130,246,0.15)]'>

                    {/* Glow */}
                    <div className='absolute top-0 right-0 w-56 h-56 bg-cyan-500/10 blur-3xl rounded-full'></div>
                    <div className='absolute bottom-0 left-0 w-56 h-56 bg-purple-500/10 blur-3xl rounded-full'></div>

                    <div className='relative z-10'>

                        <div className='w-24 h-24 mx-auto rounded-[28px] bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center text-4xl shadow-[0_0_40px_rgba(59,130,246,0.3)]'>
                            ✨
                        </div>

                        <h3 className='text-3xl font-black text-white mt-8'>
                            No Interviews Yet
                        </h3>

                        <p className='text-slate-400 mt-4 max-w-md mx-auto leading-relaxed'>
                            Start your first AI-powered mock interview and
                            track your progress like a pro.
                        </p>

                    </div>

                </div>

            ) : (

                /* Cards */
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>

                    {interviewList.map((interview) => (

                        <InterviewItemCard
                            interview={interview}
                            key={interview.id}
                        />

                    ))}

                </div>

            )}

        </div>
    )
}

export default InterviewList