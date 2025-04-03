"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation"
import Logo from '@/app/_components/Logo';
import QuestionSection from './_components/QuestionSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';

function StartInterview({params}) {
    const router = useRouter();
    const [activeQuestionIndex,setActiveQuestionIndex]= useState(0);
    const [interviewData,setInterviewData] = useState();
    const [mockIntvQues,setMockIntvQues] = useState();

    useEffect(() => {
        GetInterviewDetails();
    },[]);

    const GetInterviewDetails = async() => {
        const res = await db.select().from(MockInterview).where(eq(MockInterview.mockId,params.interviewId))
        const mockResponseJSON  = JSON.parse(res[0].jsonMockResp);
        setInterviewData(res[0]);
        setMockIntvQues(mockResponseJSON);
        console.log(mockResponseJSON)
      }


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
        <QuestionSection 
        mockIntvQues={mockIntvQues}
        activeQuestionIndex={activeQuestionIndex}
        />
        <RecordAnswerSection/>
      </div>
      </div>
    </div>
  )
}

export default StartInterview
