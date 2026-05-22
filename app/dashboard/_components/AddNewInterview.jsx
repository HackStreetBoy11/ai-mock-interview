"use client"
import React, { useState } from 'react'
import { v4 as uuidv4 } from "uuid";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { LoaderCircle, Plus } from 'lucide-react'
import { useUser } from '@clerk/nextjs';
import { MockInterview } from '@/utils/schema';
import { db } from '@/utils/db';
import moment from 'moment';
import { useRouter } from 'next/navigation';

function AddNewInterview() {
    const [openDailog, setOpenDailog] = useState(false)
    const [jobPosition, setJobPosition] = useState('')
    const [jobDescription, setJobDescription] = useState()
    const [jobExperience, setJobExperience] = useState()
    const [loading, setLoading] = useState(false)
    const [jsonResponse, setJsonResponse] = useState([])
    const { user } = useUser();
    const router = useRouter();

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(jobPosition, jobDescription, jobExperience)
        setLoading(true);

        try {
            const response = await fetch('/api/generate-questions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ jobPosition, jobDescription, jobExperience })
            });
            const data = await response.json();
            console.log("AI Questions:", data.questions);
            setJsonResponse(data.questions);

            if (data) {
                const resp = await db.insert(MockInterview)
                    .values({
                        mockId: uuidv4(),
                        jsonMockResp: JSON.stringify(data.questions),
                        jobPosition: jobPosition,
                        jobDescription: jobDescription,
                        jobExperience: jobExperience,
                        createdBy: user?.primaryEmailAddress?.emailAddress,
                        createdAt: moment().format('DD-MM-YY')
                    }).returning({ mockId: MockInterview.mockId })

                console.log("Inserted Id", resp);

                if (resp) {
                    router.push('/dashboard/interview/' + resp[0]?.mockId)
                    setOpenDailog(false);
                } else {
                    console.log("Error")
                }
            }

        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>

            {/* Add Card */}
            <div
                className='group relative overflow-hidden rounded-[28px] border border-cyan-500/20 bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e1b4b] p-10 cursor-pointer transition-all duration-500 hover:scale-[1.03] hover:border-cyan-400/50 hover:shadow-[0_0_40px_rgba(34,211,238,0.25)]'
                onClick={() => setOpenDailog(true)}
            >

                {/* Glow */}
                <div className='absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 blur-3xl rounded-full'></div>
                <div className='absolute bottom-0 left-0 w-40 h-40 bg-purple-500/10 blur-3xl rounded-full'></div>

                <div className='relative z-10 flex flex-col items-center text-center gap-5'>

                    <div className='w-20 h-20 rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.35)] group-hover:rotate-6 transition-all duration-500'>
                        <Plus className='text-white w-9 h-9' />
                    </div>

                    <div>
                        <h2 className='text-2xl font-black text-white tracking-tight'>
                            Create Interview
                        </h2>

                        <p className='text-slate-400 mt-2 text-sm leading-relaxed'>
                            Generate smart AI interview questions
                            based on your role and experience.
                        </p>
                    </div>

                    <div className='mt-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-cyan-300 text-sm font-semibold'>
                        Start Now →
                    </div>

                </div>

            </div>

            {/* Dialog */}
            <Dialog open={openDailog} onOpenChange={setOpenDailog}>

                <DialogContent className="max-w-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e1b4b] text-white rounded-[32px] shadow-[0_0_60px_rgba(59,130,246,0.25)]">

                    {/* Background Glow */}
                    <div className='absolute top-0 right-0 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full'></div>
                    <div className='absolute bottom-0 left-0 w-72 h-72 bg-purple-500/10 blur-3xl rounded-full'></div>

                    <div className='relative z-10'>

                        <DialogHeader>

                            <DialogTitle className='text-3xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent'>
                                Create AI Interview
                            </DialogTitle>

                            <DialogDescription className='text-slate-400 text-base mt-2'>
                                Enter your role, skills, and experience to generate personalized interview questions.
                            </DialogDescription>

                        </DialogHeader>

                        <form onSubmit={onSubmit} className='mt-8'>

                            <div className='space-y-6'>

                                {/* Job Position */}
                                <div className='space-y-2'>

                                    <label className='text-sm font-semibold text-cyan-300'>
                                        Job Role
                                    </label>

                                    <Input
                                        placeholder="Frontend Developer"
                                        required
                                        onChange={(e) => setJobPosition(e.target.value)}
                                        className='h-12 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:ring-cyan-400/20'
                                    />

                                </div>

                                {/* Description */}
                                <div className='space-y-2'>

                                    <label className='text-sm font-semibold text-purple-300'>
                                        Tech Stack & Description
                                    </label>

                                    <Textarea
                                        placeholder="React, Next.js, Node.js, MongoDB..."
                                        required
                                        onChange={(e) => setJobDescription(e.target.value)}
                                        className='min-h-28 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-slate-500 focus:border-purple-400 focus:ring-purple-400/20'
                                    />

                                </div>

                                {/* Experience */}
                                <div className='space-y-2'>

                                    <label className='text-sm font-semibold text-blue-300'>
                                        Years of Experience
                                    </label>

                                    <Input
                                        placeholder="2"
                                        type="number"
                                        max="50"
                                        required
                                        onChange={(e) => setJobExperience(e.target.value)}
                                        className='h-12 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-slate-500 focus:border-blue-400 focus:ring-blue-400/20'
                                    />

                                </div>

                            </div>

                            {/* Buttons */}
                            <div className='flex items-center justify-end gap-4 mt-8'>

                                <Button
                                    type='button'
                                    variant='ghost'
                                    onClick={() => setOpenDailog(false)}
                                    className='rounded-xl border border-white/10 bg-white/5 px-6 text-slate-300 hover:bg-white/10 hover:text-white'
                                >
                                    Cancel
                                </Button>

                                <Button
                                    type='submit'
                                    disabled={loading}
                                    className='rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 px-7 text-white font-semibold shadow-[0_0_25px_rgba(59,130,246,0.35)] hover:opacity-90'
                                >

                                    {loading ? (
                                        <>
                                            <LoaderCircle className='animate-spin mr-2 w-4 h-4' />
                                            Generating...
                                        </>
                                    ) : (
                                        'Generate Interview'
                                    )}

                                </Button>

                            </div>

                        </form>

                    </div>

                </DialogContent>

            </Dialog>

        </div>
    )
}

export default AddNewInterview