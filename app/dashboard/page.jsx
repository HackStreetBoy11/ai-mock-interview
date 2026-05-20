'use client'
import React from 'react'
import AddNewInterview from './_components/AddNewInterview'
import InterviewList from './_components/InterviewList'

function Dashboard() {
    return (
        <div className='p-10'>

            <div className='mb-8'>
                <h2 className='font-bold text-3xl text-white'>Dashboard</h2>
                <p className='text-indigo-300 mt-1'>Create and start your AI mock interview</p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-5 my-5'>
                <AddNewInterview />
            </div>

            <div className='mt-10'>
                <InterviewList />
            </div>

        </div>
    )
}

export default Dashboard