"use client"
import React, { useState } from 'react'
import { v4 as uuidv4 } from "uuid";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { LoaderCircle } from 'lucide-react'
import { useUser } from '@clerk/nextjs';
import { MockInterview } from '@/utils/schema';
import { db } from '@/utils/db';
import moment from 'moment';
import { useRouter } from 'next/router';
function AddNewInterview() {
    const [openDailog, setOpenDailog] = useState(false)
    const [jobPosition, setJobPosition] = useState()
    const [jobDescription, setJobDescription] = useState()
    const [jobExperience, setJobExperience] = useState()
    const [loading, setLoading] = useState(false)
    const [jsonResponse, setJsonResponse] = useState([])   // ← stores AI result
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
            console.log("AI Questions:", data.questions); // ← your result is here
            setJsonResponse(data.questions);
            if (data) {

                const resp = await db.insert(MockInterview)
                    .values({
                        mockId: uuidv4(),
                        jsonMockResp: data,
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
                    console.log("Error ")
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
            <div className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all'
                onClick={() => setOpenDailog(true)}>
                <h2 className='ftext-lg text-center'>+ Add New</h2>
            </div>
            <Dialog open={openDailog}>

                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className='text-2xl'>Tell us more about job description</DialogTitle>
                        <DialogDescription>
                            <form onSubmit={onSubmit}>

                                <div>

                                    <h2>Add Details about your job position/role, Job description and years of experience </h2>

                                    <div className='mt-7 my-3'>
                                        <label >Job Role/Job Position</label>
                                        <Input placeholder="Ex. Full Stack Developer" required
                                            onChange={(event) => setJobPosition(event.target.value)} />
                                    </div>
                                    <div className='my-3'>
                                        <label >Job Description/ Tech Stack (In Short)</label>
                                        <Textarea placeholder="Ex. React, Angular, NodeJs, MySql" required
                                            onChange={(event) => setJobDescription(event.target.value)} />
                                    </div>
                                    <div className='my-3'>
                                        <label >Years of experience</label>
                                        <Input placeholder="Ex. 5" type="number" max="50" required
                                            onChange={(event) => setJobExperience(event.target.value)} />
                                    </div>
                                </div>
                                <div className='flex gap-5 justify-end'>
                                    <Button type='button' variant='outline' onClick={() => setOpenDailog(false)}>Cancel</Button>
                                    <Button type='submit' variant='outline' disabled={loading}>
                                        {
                                            loading ?
                                                <>
                                                    <LoaderCircle />'Generating from AI'
                                                </>
                                                : "Start Interview"
                                        }
                                    </Button>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div >
    )
}

export default AddNewInterview
