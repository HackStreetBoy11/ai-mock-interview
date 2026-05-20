import { Lightbulb, Volume2 } from 'lucide-react'
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
    <div className='p-6 border border-indigo-500/30 rounded-2xl bg-white/5 backdrop-blur-sm'>

      {/* Question Pills */}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
        {mockInterviewQuestion.map((question, index) => (
          <h2 key={index}
            className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer transition-all duration-200
              ${activeQuestionIndex === index
                ? 'bg-indigo-600 text-white font-medium'
                : 'bg-white/10 text-indigo-300 hover:bg-white/20 hover:text-white'
              }`}>
            Question #{index + 1}
          </h2>
        ))}
      </div>

      {/* Active Question */}
      <p className='my-6 text-sm md:text-base text-white leading-relaxed'>
        {mockInterviewQuestion[activeQuestionIndex]?.question}
      </p>

      {/* Text to Speech */}
      <Volume2
        className={`cursor-pointer transition-all duration-300 w-5 h-5
          ${isSpeaking
            ? 'text-indigo-400 animate-pulse'
            : 'text-indigo-400/60 hover:text-indigo-300'
          }`}
        onClick={() => textToSpeach(mockInterviewQuestion[activeQuestionIndex]?.question)}
      />

      {/* Note */}
      <div className='border border-indigo-500/30 rounded-xl p-4 bg-indigo-500/10 mt-8'>
        <h2 className='flex gap-2 items-center text-indigo-300 font-medium mb-1'>
          <Lightbulb className='w-4 h-4' />
          Note
        </h2>
        <p className='text-indigo-300/70 text-sm leading-relaxed'>
          {process.env.NEXT_PUBLIC_QUESTION_NOTE}
        </p>
      </div>

    </div>
  )
}

export default QuestionsSection