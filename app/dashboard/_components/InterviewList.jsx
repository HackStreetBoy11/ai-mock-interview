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
            <div className='flex items-center gap-3 mb-6'>
                <h2 className='font-semibold text-xl text-white'>Previous Mock Interviews</h2>
                {!loading && interviewList.length > 0 && (
                    <span className='text-xs text-indigo-300 bg-indigo-500/20 px-2.5 py-1 rounded-full'>
                        {interviewList.length} total
                    </span>
                )}
            </div>

            {loading ? (
                <div className='flex items-center gap-2 text-indigo-300 mt-4'>
                    <LoaderCircle className='animate-spin w-4 h-4' />
                    <span className='text-sm'>Loading interviews...</span>
                </div>
            ) : interviewList.length === 0 ? (
                <div className='border border-indigo-500/20 rounded-2xl p-10 text-center bg-white/5'>
                    <p className='text-indigo-300 text-sm'>No interviews yet.</p>
                    <p className='text-indigo-400/60 text-xs mt-1'>Create one above to get started.</p>
                </div>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                    {interviewList.map((interview) => (
                        <InterviewItemCard interview={interview} key={interview.id} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default InterviewList