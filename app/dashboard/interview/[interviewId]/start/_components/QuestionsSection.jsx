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
    <div className='p-5 border rounded-lg my-10'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {mockInterviewQuestion && mockInterviewQuestion.map((question, index) => (
          <h2 key={index}
            className={`p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer
            ${activeQuestionIndex == index && `bg-black text-white`}
            `}>
            Question #{index + 1}
          </h2>
        ))}
      </div>
      <h2 className='my-5 text-sm md:text-lg'>{mockInterviewQuestion[activeQuestionIndex]?.question}</h2>
      <Volume2 className={`cursor-pointer transition-all duration-300
                    ${isSpeaking
          ? 'text-blue-500 animate-pulse'
          : 'text-gray-500 hover:text-blue-400'
        }`}
        onClick={() => textToSpeach(mockInterviewQuestion[activeQuestionIndex]?.question)} />
      <div className='border rounded-lg p-5 bg-blue-400 mt-20'>
        <h2 className='flex gap-2 items-center text-blue-600'>
          <Lightbulb />
          <strong>Note:</strong>
        </h2>
        <h2>{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
      </div>
    </div >
  )
}

export default QuestionsSection
