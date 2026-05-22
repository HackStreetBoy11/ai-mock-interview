'use client'
import React from 'react'
import AddNewInterview from './_components/AddNewInterview'
import InterviewList from './_components/InterviewList'

function Dashboard() {
    return (
        <div className='min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e1b4b] p-8 md:p-10'>

            {/* Add Interview Section */}
            <div className='mb-12'>

                <div className='flex items-center justify-between mb-6'>
                    <div>
                        <h2 className='text-4xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent'>
                            Quick Start
                        </h2>

                        <p className='text-slate-300 mt-2 text-lg font-medium'>
                            Create a new AI interview experience
                        </p>
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <AddNewInterview />
                </div>

            </div>

            {/* Interview List */}
            <div className='bg-white/10 backdrop-blur-2xl border border-white/10 shadow-[0_10px_60px_rgba(59,130,246,0.25)] rounded-[32px] p-8'>

                <div className='mb-6'>
                </div>

                <InterviewList />

            </div>

        </div>
    )
}

export default Dashboard