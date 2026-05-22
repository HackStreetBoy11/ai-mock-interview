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
        <div className='group relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e1b4b] p-6 transition-all duration-500 hover:scale-[1.02] hover:border-cyan-400/40 hover:shadow-[0_0_40px_rgba(34,211,238,0.18)]'>

            {/* Glow Effects */}
            <div className='absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full'></div>
            <div className='absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full'></div>

            <div className='relative z-10'>

                {/* Top Section */}
                <div className='flex items-start justify-between gap-4'>

                    <div>

                        <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 mb-4'>
                            <div className='w-2 h-2 rounded-full bg-cyan-400 animate-pulse'></div>

                            <p className='text-xs font-semibold text-cyan-300 tracking-wide'>
                                AI MOCK INTERVIEW
                            </p>
                        </div>

                        <h3 className='font-black text-2xl text-white tracking-tight leading-tight'>
                            {interview.jobPosition}
                        </h3>

                        <p className='text-slate-400 text-sm mt-3 leading-relaxed'>
                            {interview.jobExperience} Years Experience
                        </p>

                    </div>

                    {/* Date */}
                    <div className='px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-slate-300 whitespace-nowrap'>
                        {interview.createdAt}
                    </div>

                </div>

                {/* Divider */}
                <div className='w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent my-6'></div>

                {/* Buttons */}
                <div className='flex gap-3'>

                    <Button
                        size='sm'
                        variant='ghost'
                        className="flex-1 h-11 rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white transition-all duration-300"
                        onClick={onFeedbackPress}
                    >
                        View Feedback
                    </Button>

                    <Button
                        size='sm'
                        className="flex-1 h-11 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-semibold shadow-[0_0_20px_rgba(59,130,246,0.35)] hover:opacity-90 transition-all duration-300"
                        onClick={onStart}
                    >
                        Start Interview
                    </Button>

                </div>

            </div>

        </div>
    )
}

export default InterviewItemCard