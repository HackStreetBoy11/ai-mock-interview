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
            <div
                className='group p-10 border border-indigo-500/30 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-indigo-400/60 cursor-pointer transition-all duration-300 hover:scale-105'
                onClick={() => setOpenDailog(true)}
            >
                <div className='flex flex-col items-center gap-3'>
                    <div className='w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center group-hover:bg-indigo-500/30 transition-colors'>
                        <Plus className='text-indigo-300 w-6 h-6' />
                    </div>
                    <h2 className='text-lg font-medium text-indigo-200 group-hover:text-white transition-colors'>Add New Interview</h2>
                </div>
            </div>

            <Dialog open={openDailog} onOpenChange={setOpenDailog}>
                <DialogContent className="max-w-2xl bg-indigo-950 border border-indigo-700/50 text-white">
                    <DialogHeader>
                        <DialogTitle className='text-2xl font-semibold text-white'>
                            Tell us about the job
                        </DialogTitle>
                        <DialogDescription className='text-indigo-300'>
                            Add details about the role, tech stack, and your experience level.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={onSubmit} className='mt-2'>
                        <div className='space-y-4'>
                            <div className='space-y-1.5'>
                                <label className='text-sm font-medium text-indigo-200'>Job Role / Position</label>
                                <Input
                                    placeholder="Ex. Full Stack Developer"
                                    required
                                    onChange={(e) => setJobPosition(e.target.value)}
                                    className='bg-white/5 border-indigo-700/50 text-white placeholder:text-indigo-400/50 focus:border-indigo-500'
                                />
                            </div>
                            <div className='space-y-1.5'>
                                <label className='text-sm font-medium text-indigo-200'>Job Description / Tech Stack</label>
                                <Textarea
                                    placeholder="Ex. React, Angular, NodeJs, MySql"
                                    required
                                    onChange={(e) => setJobDescription(e.target.value)}
                                    className='bg-white/5 border-indigo-700/50 text-white placeholder:text-indigo-400/50 focus:border-indigo-500 min-h-24'
                                />
                            </div>
                            <div className='space-y-1.5'>
                                <label className='text-sm font-medium text-indigo-200'>Years of Experience</label>
                                <Input
                                    placeholder="Ex. 5"
                                    type="number"
                                    max="50"
                                    required
                                    onChange={(e) => setJobExperience(e.target.value)}
                                    className='bg-white/5 border-indigo-700/50 text-white placeholder:text-indigo-400/50 focus:border-indigo-500'
                                />
                            </div>
                        </div>

                        <div className='flex gap-3 justify-end mt-6'>
                            <Button
                                type='button'
                                variant='ghost'
                                onClick={() => setOpenDailog(false)}
                                className='text-indigo-300 hover:text-white hover:bg-white/10'
                            >
                                Cancel
                            </Button>
                            <Button
                                type='submit'
                                disabled={loading}
                                className='bg-indigo-600 hover:bg-indigo-500 text-white border-0'
                            >
                                {loading ? (
                                    <><LoaderCircle className='animate-spin mr-2 w-4 h-4' /> Generating...</>
                                ) : (
                                    'Start Interview'
                                )}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddNewInterview