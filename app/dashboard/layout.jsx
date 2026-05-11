import React from 'react'
import Header from './_components/Header'

function DashboardLayout({ children }) {
    return (
        <div className="w-full min-h-screen flex flex-col">
            <Header />
            <div className='mx-5 md:mx-20 lg:max-36'>
                {children}
            </div>

        </div>
    )
}

export default DashboardLayout