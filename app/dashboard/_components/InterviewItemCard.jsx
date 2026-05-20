import { Button } from '@/components/ui/button'
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
        <div className='border border-indigo-500/30 rounded-2xl p-5 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-indigo-400/60 transition-all duration-300'>
            <div className='flex items-start justify-between mb-3'>
                <div>
                    <h3 className='font-semibold text-white text-base'>{interview.jobPosition}</h3>
                    <p className='text-indigo-300 text-sm mt-0.5'>{interview.jobExperience} years of experience</p>
                </div>
                <span className='text-xs text-indigo-400 bg-indigo-500/20 px-2.5 py-1 rounded-full'>
                    {interview.createdAt}
                </span>
            </div>

            <div className='flex gap-2 mt-4'>
                <Button
                    size='sm'
                    variant='ghost'
                    className="flex-1 text-indigo-300 hover:text-white hover:bg-white/10 border border-indigo-500/30"
                    onClick={onFeedbackPress}
                >
                    Feedback
                </Button>
                <Button
                    size='sm'
                    className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white border-0"
                    onClick={onStart}
                >
                    Start
                </Button>
            </div>
        </div>
    )
}

export default InterviewItemCard