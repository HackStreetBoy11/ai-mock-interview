import { Lightbulb, Volume2, Sparkles } from 'lucide-react'
import React, { useState } from 'react'

function QuestionsSection({ mockInterviewQuestion, activeQuestionIndex }) {

  const [isSpeaking, setIsSpeaking] = useState(false)

  const textToSpeach = (text) => {

    if ('speechSynthesis' in window) {

      const speech = new SpeechSynthesisUtterance(text);

      speech.onstart = () => setIsSpeaking(true)
      speech.onend = () => setIsSpeaking(false)

      window.speechSynthesis.speak(speech)

    } else {

      alert('Sorry, your browser does not support text to speech');

    }

  }

  return mockInterviewQuestion && (

    <div className='relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e1b4b] p-6 md:p-8 shadow-[0_0_60px_rgba(59,130,246,0.12)]'>

      {/* Glow */}
      <div className='absolute top-0 right-0 w-52 h-52 bg-cyan-500/10 blur-3xl rounded-full'></div>
      <div className='absolute bottom-0 left-0 w-52 h-52 bg-purple-500/10 blur-3xl rounded-full'></div>

      <div className='relative z-10'>

        {/* Header */}
        <div className='flex items-center justify-between mb-8'>

          <div>

            <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 mb-4'>

              <Sparkles className='w-4 h-4 text-cyan-400' />

              <span className='text-xs font-bold tracking-wider text-cyan-300 uppercase'>
                AI Interview Questions
              </span>

            </div>

            <h2 className='text-3xl font-black text-white'>
              Interview Session
            </h2>

            <p className='text-slate-400 mt-2 text-sm'>
              Navigate through your interview questions.
            </p>

          </div>

          {/* Voice Button */}
          <button
            onClick={() => textToSpeach(mockInterviewQuestion[activeQuestionIndex]?.question)}
            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 border
              ${isSpeaking
                ? 'bg-cyan-500/20 border-cyan-400/40 shadow-[0_0_30px_rgba(34,211,238,0.25)]'
                : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
          >

            <Volume2
              className={`w-6 h-6 transition-all duration-300
                ${isSpeaking
                  ? 'text-cyan-300 animate-pulse'
                  : 'text-slate-300'
                }`}
            />

          </button>

        </div>

        {/* Question Pills */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>

          {mockInterviewQuestion.map((question, index) => (

            <button
              key={index}
              className={`group relative overflow-hidden rounded-2xl px-4 py-4 text-sm font-semibold transition-all duration-300
                ${activeQuestionIndex === index
                  ? 'bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white shadow-[0_0_25px_rgba(59,130,246,0.35)]'
                  : 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:border-cyan-400/20 hover:text-white'
                }`}
            >

              <span className='relative z-10'>
                Question {index + 1}
              </span>

            </button>

          ))}

        </div>

        {/* Active Question */}
        <div className='mt-10 relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-2xl p-8'>

          <div className='absolute top-0 right-0 w-40 h-40 bg-cyan-500/5 blur-3xl rounded-full'></div>

          <div className='relative z-10'>

            <div className='flex items-center gap-2 mb-5'>

              <div className='w-3 h-3 rounded-full bg-cyan-400 animate-pulse'></div>

              <span className='text-xs font-bold tracking-wider text-cyan-300 uppercase'>
                Current Question
              </span>

            </div>

            <p className='text-xl md:text-2xl font-semibold text-white leading-relaxed tracking-tight'>
              {mockInterviewQuestion[activeQuestionIndex]?.question}
            </p>

          </div>

        </div>

        {/* Note */}
        <div className='mt-8 relative overflow-hidden rounded-[28px] border border-yellow-400/10 bg-yellow-500/5 backdrop-blur-2xl p-6'>

          <div className='absolute top-0 left-0 w-40 h-40 bg-yellow-400/5 blur-3xl rounded-full'></div>

          <div className='relative z-10 flex gap-4'>

            <div className='w-14 h-14 shrink-0 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center shadow-[0_0_25px_rgba(251,191,36,0.25)]'>

              <Lightbulb className='w-7 h-7 text-white' />

            </div>

            <div>

              <h3 className='text-lg font-bold text-white mb-2'>
                Interview Tip
              </h3>

              <p className='text-slate-300 text-sm leading-relaxed'>
                {process.env.NEXT_PUBLIC_QUESTION_NOTE}
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  )
}

export default QuestionsSection