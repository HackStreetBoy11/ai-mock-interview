import React from 'react'
import Header from './_components/Header'

function DashboardLayout({ children }) {
    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e1b4b]">

            {/* Background Glow */}
            <div className='absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/20 blur-3xl rounded-full'></div>
            <div className='absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/20 blur-3xl rounded-full'></div>
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/10 blur-3xl rounded-full'></div>

            {/* Grid Overlay */}
            <div className='absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]'></div>

            {/* Header */}
            <div className='relative z-10 border-b border-white/10 backdrop-blur-xl bg-white/5'>
                <Header />
            </div>

            {/* Main Content */}
            <div className='relative z-10 px-5 md:px-16 lg:px-28 py-8'>

                <div className='bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_10px_80px_rgba(59,130,246,0.25)] rounded-[36px] min-h-[85vh] p-6 md:p-10'>
                    {children}
                </div>

            </div>

        </div>
    )
}

export default DashboardLayout