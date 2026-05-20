import React from 'react'
import Header from './_components/Header'

function DashboardLayout({ children }) {
    return (
        <div className="w-full min-h-screen flex flex-col bg-gradient-to-br from-indigo-950 via-indigo-900 to-purple-900">
            <Header />
            <div className='mx-5 md:mx-20 lg:mx-36'>
                {children}
            </div>
        </div>
    )
}

export default DashboardLayout