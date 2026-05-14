import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

function InterviewItemCard({ interview }) {
    const router = useRouter()
    const onStart = () => {
        router.push('/dashboard/interview/' + interview?.mockId)
    }

    const onFeedbackPress = () => {
        router.push('/dashboard/interview/' + interview?.mockId + '/feedback')
    }

    return (
        <div className='border rounded-lg p-4 shadow-sm overflow-hidden'>
            <h3 className='font-bold text-lg'>{interview.jobPosition}</h3>
            <p className='text-gray-500 text-sm'>{interview.jobExperience} years of experience</p>
            <p className='text-xs text-gray-400 mt-1'>Created: {interview.createdAt}</p>
            <div className='flex justify-between gap-2 mt-2'>
                <Button size='sm' variant='outline' className="flex-1"
                    onClick={onFeedbackPress}
                >Feedback</Button>
                <Button size='sm' variant='outline' className="flex-1 bg-blue-800 text-white"
                    onClick={onStart}
                >Start</Button>
            </div>
        </div>

    )
}

export default InterviewItemCard
