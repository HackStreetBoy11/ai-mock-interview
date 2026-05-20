'use client'
import React, { useState } from 'react'
import { Search, Plus, ChevronDown, ChevronUp, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const categories = ['All', 'React', 'Node.js', 'System Design', 'JavaScript', 'CSS', 'Database', 'Behavioral']

const mockQuestions = [
    { id: 1, category: 'React', question: 'What is the difference between useEffect and useLayoutEffect?', answer: 'useEffect runs asynchronously after the DOM is painted, while useLayoutEffect runs synchronously before the browser paints. useLayoutEffect is useful when you need to measure or mutate the DOM before the user sees it.' },
    { id: 2, category: 'React', question: 'Explain the concept of React reconciliation.', answer: 'Reconciliation is the process React uses to diff the virtual DOM with the previous version and determine the minimal set of changes needed to update the real DOM. React uses a heuristic O(n) algorithm based on two assumptions: elements of different types produce different trees, and keys help identify which items have changed.' },
    { id: 3, category: 'JavaScript', question: 'What is the event loop in JavaScript?', answer: 'The event loop is a mechanism that allows JavaScript to perform non-blocking operations despite being single-threaded. It continuously checks the call stack and the task queue, pushing queued callbacks onto the stack when it is empty.' },
    { id: 4, category: 'JavaScript', question: 'What is the difference between == and === in JavaScript?', answer: '== performs type coercion before comparison, while === checks both value and type without coercion. It is generally recommended to use === to avoid unexpected behavior.' },
    { id: 5, category: 'Node.js', question: 'What is the difference between process.nextTick() and setImmediate()?', answer: 'process.nextTick() fires before the next iteration of the event loop, while setImmediate() fires in the check phase of the next iteration. nextTick has higher priority.' },
    { id: 6, category: 'System Design', question: 'How would you design a URL shortener like bit.ly?', answer: 'Key components include: a hash function to generate short codes, a database to map short codes to original URLs, a cache layer (Redis) for fast lookups, load balancers for traffic distribution, and CDN for global performance. Consider collision handling and expiry logic.' },
    { id: 7, category: 'Database', question: 'What is the difference between SQL and NoSQL databases?', answer: 'SQL databases are relational, use structured schemas, and support ACID transactions. NoSQL databases are non-relational, schema-flexible, and optimized for horizontal scaling. Choose SQL for complex queries and relationships, NoSQL for large-scale unstructured data.' },
    { id: 8, category: 'CSS', question: 'Explain the CSS box model.', answer: 'The box model describes the rectangular boxes generated for elements. It consists of: content (the actual element), padding (space inside the border), border (surrounds the padding), and margin (space outside the border).' },
    { id: 9, category: 'Behavioral', question: 'Tell me about a time you handled a conflict in your team.', answer: 'Use the STAR method: Situation (describe the conflict), Task (your role), Action (steps you took to resolve it), Result (the outcome). Focus on communication, empathy, and finding common ground.' },
    { id: 10, category: 'Node.js', question: 'What are streams in Node.js and when would you use them?', answer: 'Streams are objects that let you read/write data continuously. They are useful for handling large files or network requests without loading everything into memory. Types: Readable, Writable, Duplex, and Transform.' },
]

function QuestionsPage() {
    const [activeCategory, setActiveCategory] = useState('All')
    const [search, setSearch] = useState('')
    const [expandedId, setExpandedId] = useState(null)
    const [showAddForm, setShowAddForm] = useState(false)
    const [questions, setQuestions] = useState(mockQuestions)
    const [newQ, setNewQ] = useState({ category: 'React', question: '', answer: '' })

    const filtered = questions.filter(q => {
        const matchCategory = activeCategory === 'All' || q.category === activeCategory
        const matchSearch = q.question.toLowerCase().includes(search.toLowerCase())
        return matchCategory && matchSearch
    })

    const handleAdd = () => {
        if (!newQ.question.trim() || !newQ.answer.trim()) return
        setQuestions(prev => [...prev, { id: Date.now(), ...newQ }])
        setNewQ({ category: 'React', question: '', answer: '' })
        setShowAddForm(false)
    }

    return (
        <div className='p-8'>

            {/* Header */}
            <div className='flex items-center justify-between mb-8'>
                <div>
                    <h2 className='text-3xl font-bold text-white'>Practice Questions</h2>
                    <p className='text-indigo-300 mt-1 text-sm'>Browse, search and add questions to prepare for your interviews</p>
                </div>
                <Button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className='bg-indigo-600 hover:bg-indigo-500 text-white border-0 flex items-center gap-2'
                >
                    <Plus className='w-4 h-4' />
                    Add Question
                </Button>
            </div>

            {/* Add Question Form */}
            {showAddForm && (
                <div className='mb-6 p-6 rounded-2xl border border-indigo-500/30 bg-white/5 backdrop-blur-sm flex flex-col gap-4'>
                    <h3 className='text-white font-medium'>New Question</h3>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                        <select
                            value={newQ.category}
                            onChange={e => setNewQ({ ...newQ, category: e.target.value })}
                            className='bg-white/10 border border-indigo-500/30 text-indigo-200 rounded-lg px-3 py-2 text-sm focus:outline-none'
                        >
                            {categories.filter(c => c !== 'All').map(c => (
                                <option key={c} value={c} className='bg-indigo-950'>{c}</option>
                            ))}
                        </select>
                        <Input
                            placeholder='Enter your question...'
                            value={newQ.question}
                            onChange={e => setNewQ({ ...newQ, question: e.target.value })}
                            className='md:col-span-2 bg-white/5 border-indigo-500/30 text-white placeholder:text-indigo-400/50'
                        />
                    </div>
                    <textarea
                        placeholder='Enter the answer...'
                        value={newQ.answer}
                        onChange={e => setNewQ({ ...newQ, answer: e.target.value })}
                        rows={3}
                        className='w-full bg-white/5 border border-indigo-500/30 rounded-lg px-3 py-2 text-sm text-white placeholder:text-indigo-400/50 focus:outline-none resize-none'
                    />
                    <div className='flex gap-3 justify-end'>
                        <Button
                            variant='ghost'
                            onClick={() => setShowAddForm(false)}
                            className='text-indigo-300 hover:text-white hover:bg-white/10'
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleAdd}
                            className='bg-indigo-600 hover:bg-indigo-500 text-white border-0'
                        >
                            Save Question
                        </Button>
                    </div>
                </div>
            )}

            {/* Search */}
            <div className='relative mb-5'>
                <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400' />
                <Input
                    placeholder='Search questions...'
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className='pl-9 bg-white/5 border-indigo-500/30 text-white placeholder:text-indigo-400/50'
                />
            </div>

            {/* Category filters */}
            <div className='flex flex-wrap gap-2 mb-6'>
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`text-xs px-4 py-1.5 rounded-full transition-all duration-200 font-medium
                            ${activeCategory === cat
                                ? 'bg-indigo-600 text-white'
                                : 'bg-white/5 text-indigo-300 border border-indigo-500/30 hover:bg-white/10 hover:text-white'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Count */}
            <p className='text-xs text-indigo-400 mb-4'>{filtered.length} question{filtered.length !== 1 ? 's' : ''} found</p>

            {/* Questions list */}
            <div className='flex flex-col gap-3'>
                {filtered.length === 0 ? (
                    <div className='text-center py-16 border border-indigo-500/20 rounded-2xl bg-white/5'>
                        <p className='text-indigo-300'>No questions found.</p>
                        <p className='text-indigo-400/60 text-sm mt-1'>Try a different search or category.</p>
                    </div>
                ) : (
                    filtered.map(item => (
                        <div
                            key={item.id}
                            className='border border-indigo-500/30 rounded-2xl bg-white/5 backdrop-blur-sm overflow-hidden transition-all duration-200'
                        >
                            <button
                                onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                                className='w-full flex items-center justify-between gap-4 p-4 text-left hover:bg-white/5 transition-colors'
                            >
                                <div className='flex items-center gap-3 min-w-0'>
                                    <span className='text-xs bg-indigo-500/20 text-indigo-300 px-2.5 py-1 rounded-full shrink-0 flex items-center gap-1'>
                                        <Tag className='w-3 h-3' />
                                        {item.category}
                                    </span>
                                    <span className='text-sm text-indigo-100 truncate'>{item.question}</span>
                                </div>
                                {expandedId === item.id
                                    ? <ChevronUp className='w-4 h-4 text-indigo-400 shrink-0' />
                                    : <ChevronDown className='w-4 h-4 text-indigo-400 shrink-0' />
                                }
                            </button>

                            {expandedId === item.id && (
                                <div className='px-4 pb-4 border-t border-indigo-500/20 pt-3'>
                                    <p className='text-xs font-medium text-indigo-400 uppercase tracking-wider mb-2'>Answer</p>
                                    <p className='text-sm text-indigo-200 leading-relaxed'>{item.answer}</p>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>

        </div>
    )
}

export default QuestionsPage