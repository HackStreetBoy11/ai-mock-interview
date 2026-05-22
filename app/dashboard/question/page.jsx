'use client'
import React, { useState } from 'react'
import {
    Search,
    Plus,
    ChevronDown,
    ChevronUp,
    Tag,
    Sparkles,
    BrainCircuit,
    Filter,
    BookOpen,
    Star
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const categories = ['All', 'React', 'Node.js', 'System Design', 'JavaScript', 'CSS', 'Database', 'Behavioral']

const mockQuestions = [
    { id: 1, category: 'React', question: 'What is the difference between useEffect and useLayoutEffect?', answer: 'useEffect runs asynchronously after the DOM is painted, while useLayoutEffect runs synchronously before the browser paints.' },
    { id: 2, category: 'React', question: 'Explain the concept of React reconciliation.', answer: 'Reconciliation is the process React uses to diff the virtual DOM with the previous version.' },
    { id: 3, category: 'JavaScript', question: 'What is the event loop in JavaScript?', answer: 'The event loop allows JavaScript to perform non-blocking operations despite being single-threaded.' },
    { id: 4, category: 'JavaScript', question: 'What is the difference between == and === in JavaScript?', answer: '== performs type coercion, while === compares value and type strictly.' },
    { id: 5, category: 'Node.js', question: 'What is the difference between process.nextTick() and setImmediate()?', answer: 'process.nextTick() runs before the next event loop iteration.' },
    { id: 6, category: 'System Design', question: 'How would you design a URL shortener like bit.ly?', answer: 'Use hashing, caching, DB mapping, and scalable backend architecture.' },
    { id: 7, category: 'Database', question: 'What is the difference between SQL and NoSQL databases?', answer: 'SQL databases are relational, while NoSQL databases are schema flexible.' },
    { id: 8, category: 'CSS', question: 'Explain the CSS box model.', answer: 'The CSS box model consists of margin, border, padding, and content.' },
]

function QuestionsPage() {

    const [activeCategory, setActiveCategory] = useState('All')
    const [search, setSearch] = useState('')
    const [expandedId, setExpandedId] = useState(null)
    const [showAddForm, setShowAddForm] = useState(false)
    const [questions, setQuestions] = useState(mockQuestions)

    const [newQ, setNewQ] = useState({
        category: 'React',
        question: '',
        answer: ''
    })

    const filtered = questions.filter(q => {
        const matchCategory = activeCategory === 'All' || q.category === activeCategory
        const matchSearch = q.question.toLowerCase().includes(search.toLowerCase())
        return matchCategory && matchSearch
    })

    const handleAdd = () => {
        if (!newQ.question.trim() || !newQ.answer.trim()) return

        setQuestions(prev => [
            ...prev,
            { id: Date.now(), ...newQ }
        ])

        setNewQ({
            category: 'React',
            question: '',
            answer: ''
        })

        setShowAddForm(false)
    }

    return (

        <div className='relative overflow-hidden p-4 md:p-8'>

            {/* Background Glow */}
            <div className='absolute top-0 left-0 w-80 h-80 bg-cyan-500/10 blur-3xl rounded-full'></div>
            <div className='absolute bottom-0 right-0 w-80 h-80 bg-purple-500/10 blur-3xl rounded-full'></div>

            <div className='relative z-10'>

                {/* Header */}
                <div className='flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10'>

                    <div>

                        <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 backdrop-blur-xl mb-5'>

                            <Sparkles className='w-4 h-4 text-cyan-400' />

                            <span className='text-sm font-semibold text-cyan-300'>
                                AI Interview Preparation
                            </span>

                        </div>

                        <h2 className='text-5xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent'>
                            Practice Questions
                        </h2>

                        <p className='text-slate-400 mt-4 max-w-2xl leading-relaxed'>
                            Master technical interviews with curated questions, detailed explanations, and AI-powered preparation.
                        </p>

                    </div>

                    <Button
                        onClick={() => setShowAddForm(!showAddForm)}
                        className='h-14 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white border-0 shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:opacity-90 transition-all duration-300'
                    >

                        <Plus className='w-5 h-5 mr-2' />

                        Add New Question

                    </Button>

                </div>

                {/* Stats */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mb-10'>

                    <div className='rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-2xl p-6'>

                        <div className='flex items-center justify-between'>

                            <div>

                                <p className='text-slate-400 text-sm font-medium'>
                                    Total Questions
                                </p>

                                <h2 className='text-4xl font-black text-white mt-2'>
                                    {questions.length}
                                </h2>

                            </div>

                            <div className='w-14 h-14 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center shadow-[0_0_25px_rgba(59,130,246,0.25)]'>

                                <BookOpen className='w-7 h-7 text-white' />

                            </div>

                        </div>

                    </div>

                    <div className='rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-2xl p-6'>

                        <div className='flex items-center justify-between'>

                            <div>

                                <p className='text-slate-400 text-sm font-medium'>
                                    Categories
                                </p>

                                <h2 className='text-4xl font-black text-white mt-2'>
                                    {categories.length - 1}
                                </h2>

                            </div>

                            <div className='w-14 h-14 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center shadow-[0_0_25px_rgba(168,85,247,0.25)]'>

                                <Filter className='w-7 h-7 text-white' />

                            </div>

                        </div>

                    </div>

                    <div className='rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-2xl p-6'>

                        <div className='flex items-center justify-between'>

                            <div>

                                <p className='text-slate-400 text-sm font-medium'>
                                    AI Ready
                                </p>

                                <h2 className='text-4xl font-black text-white mt-2'>
                                    100%
                                </h2>

                            </div>

                            <div className='w-14 h-14 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center shadow-[0_0_25px_rgba(34,197,94,0.25)]'>

                                <BrainCircuit className='w-7 h-7 text-white' />

                            </div>

                        </div>

                    </div>

                </div>

                {/* Add Form */}
                {showAddForm && (

                    <div className='mb-8 rounded-[32px] border border-white/10 bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e1b4b] p-7 backdrop-blur-2xl shadow-[0_0_40px_rgba(59,130,246,0.08)]'>

                        <div className='flex items-center gap-3 mb-6'>

                            <div className='w-12 h-12 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center'>

                                <Plus className='w-6 h-6 text-white' />

                            </div>

                            <div>

                                <h3 className='text-xl font-bold text-white'>
                                    Add Practice Question
                                </h3>

                                <p className='text-slate-400 text-sm'>
                                    Create your custom interview preparation set
                                </p>

                            </div>

                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'>

                            <select
                                value={newQ.category}
                                onChange={e => setNewQ({ ...newQ, category: e.target.value })}
                                className='h-12 rounded-2xl border border-white/10 bg-white/5 px-4 text-slate-200 outline-none'
                            >

                                {categories.filter(c => c !== 'All').map(c => (

                                    <option key={c} value={c} className='bg-slate-900'>
                                        {c}
                                    </option>

                                ))}

                            </select>

                            <Input
                                placeholder='Enter your question...'
                                value={newQ.question}
                                onChange={e => setNewQ({ ...newQ, question: e.target.value })}
                                className='md:col-span-2 h-12 rounded-2xl border-white/10 bg-white/5 text-white placeholder:text-slate-500'
                            />

                        </div>

                        <textarea
                            placeholder='Enter the answer...'
                            value={newQ.answer}
                            onChange={e => setNewQ({ ...newQ, answer: e.target.value })}
                            rows={4}
                            className='w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white placeholder:text-slate-500 outline-none resize-none'
                        />

                        <div className='flex justify-end gap-3 mt-6'>

                            <Button
                                variant='ghost'
                                onClick={() => setShowAddForm(false)}
                                className='text-slate-300 hover:text-white hover:bg-white/10 rounded-xl'
                            >
                                Cancel
                            </Button>

                            <Button
                                onClick={handleAdd}
                                className='rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white border-0'
                            >
                                Save Question
                            </Button>

                        </div>

                    </div>

                )}

                {/* Search */}
                <div className='relative mb-7'>

                    <Search className='absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500' />

                    <Input
                        placeholder='Search technical questions...'
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className='h-14 rounded-2xl border-white/10 bg-white/5 pl-14 text-white placeholder:text-slate-500 backdrop-blur-xl'
                    />

                </div>

                {/* Categories */}
                <div className='flex flex-wrap gap-3 mb-8'>

                    {categories.map(cat => (

                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-300
                                
                                ${activeCategory === cat
                                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-[0_0_25px_rgba(59,130,246,0.25)]'
                                    : 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'
                                }
                            `}
                        >

                            {cat}

                        </button>

                    ))}

                </div>

                {/* Count */}
                <div className='flex items-center gap-2 mb-6'>

                    <Star className='w-4 h-4 text-cyan-400' />

                    <p className='text-slate-400 text-sm'>
                        {filtered.length} question{filtered.length !== 1 ? 's' : ''} available
                    </p>

                </div>

                {/* Questions */}
                <div className='space-y-4'>

                    {filtered.length === 0 ? (

                        <div className='rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl py-20 text-center'>

                            <h3 className='text-2xl font-bold text-white'>
                                No Questions Found
                            </h3>

                            <p className='text-slate-400 mt-3'>
                                Try another category or search term
                            </p>

                        </div>

                    ) : (

                        filtered.map(item => (

                            <div
                                key={item.id}
                                className='overflow-hidden rounded-[30px] border border-white/10 bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e1b4b] backdrop-blur-2xl shadow-[0_0_30px_rgba(59,130,246,0.06)]'
                            >

                                <button
                                    onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                                    className='w-full flex items-center justify-between gap-5 p-6 text-left hover:bg-white/5 transition-all duration-300'
                                >

                                    <div className='flex items-center gap-4 min-w-0'>

                                        <div className='px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-400/20 flex items-center gap-2 shrink-0'>

                                            <Tag className='w-4 h-4 text-cyan-400' />

                                            <span className='text-sm font-semibold text-cyan-300'>
                                                {item.category}
                                            </span>

                                        </div>

                                        <h3 className='text-white font-semibold truncate'>
                                            {item.question}
                                        </h3>

                                    </div>

                                    {expandedId === item.id
                                        ? <ChevronUp className='w-5 h-5 text-slate-400 shrink-0' />
                                        : <ChevronDown className='w-5 h-5 text-slate-400 shrink-0' />
                                    }

                                </button>

                                {expandedId === item.id && (

                                    <div className='px-6 pb-6'>

                                        <div className='rounded-[24px] border border-purple-500/10 bg-purple-500/5 p-5'>

                                            <p className='text-xs uppercase tracking-wider text-purple-300 font-bold mb-3'>
                                                Answer Explanation
                                            </p>

                                            <p className='text-slate-300 leading-relaxed'>
                                                {item.answer}
                                            </p>

                                        </div>

                                    </div>

                                )}

                            </div>

                        ))

                    )}

                </div>

            </div>

        </div>

    )
}

export default QuestionsPage