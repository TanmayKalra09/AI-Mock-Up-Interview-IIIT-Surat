"use client"
import React, { useState } from 'react'
import { useRouter } from "next/navigation"
import Logo from '@/app/_components/Logo';
import QuestionSection from './_components/QuestionSection';
import RecordAnswerSection from './_components/RecordAnswerSection';

function StartInterview() {
    const router = useRouter();
    const [activeQuestionIndex,setActiveQuestionIndex]= useState(0);
  return (
    <div>
       <div className="relative">
      <div className="flex justify-between items-center p-1 ">
        <Logo />
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg cursor-pointer"
        onClick={() => router.push('/premium')}>
          Premium
        </button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        {/* Questions */}
        <QuestionSection activeQuestionIndex={activeQuestionIndex}/>
        <RecordAnswerSection/>
      </div>
      </div>
    </div>
  )
}

export default StartInterview
