'use client'
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import InterviewItemCard from './InterviewItemCard';

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
            <h2 className='font-medium text-xl'>Previous Mock Interviews</h2>

            {loading ? (
                <p className='text-gray-400 mt-4'>Loading interviews...</p>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-4'>
                    {interviewList.length === 0 ? (
                        <p className='text-gray-500 col-span-3'>No interviews yet. Start one!</p>
                    ) : (
                        interviewList.map((interview) => (
                            <InterviewItemCard interview={interview} key={interview.id} />
                        ))
                    )}
                </div>
            )}
        </div>
    )
}

export default InterviewList