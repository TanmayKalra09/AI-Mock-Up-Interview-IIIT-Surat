import { Ear, Sun } from 'lucide-react';
import React from 'react';

function QuestionSection({ mockIntvQues, activeQuestionIndex }) {

  const textToSpeechConvertor=(text) => {
    if('speechSynthesis' in window){
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    }
    else{
      alert('Speech Translation Unavailable!')
    }
  }

  return (
    mockIntvQues && (
      <div className="p-5 border rounded-lg bg-purple-100 mx-auto mt-1 w-fit">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {mockIntvQues.map((ques, idx) => (
            <h2
              key={idx} // ✅ Added key prop
              className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer mb-5 
                ${activeQuestionIndex === idx ? 'bg-red-400 text-black' : 'bg-gray-200'}`}
            >
              Questions No. #{idx + 1}
            </h2>
          ))}
        </div>

        <h2 className="mt-4 font-bold text-purple-700 text-lg">
          {mockIntvQues[activeQuestionIndex]?.Question}
        </h2>

        <Ear className='cursor-pointer mt-2' onClick={()=>textToSpeechConvertor(mockIntvQues[activeQuestionIndex]?.Question)}/>

        <div className='border rounded-lg p-5 bg-green-300 mt-20'>
          <h2 className='flex gap-2 items-center text-black'>
            <Sun/>
            <strong>Pro Tip!</strong>
          </h2>
          <h2>{process.env.NEXT_PUBLIC_INTERVIEW_PRO_TIP}</h2>
        </div>

      </div>
    )
  );
}

export default QuestionSection;

