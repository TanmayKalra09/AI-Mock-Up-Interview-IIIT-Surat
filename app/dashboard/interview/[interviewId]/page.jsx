"use client"
import Logo from '@/app/_components/Logo';
import { Button } from '@/components/ui/button';
import { Sun, WebcamIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { useRouter } from "next/navigation";
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';


function Interview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [webCamEnabled,setWebCamEnabled] = useState(false);
  const router = useRouter();


  useEffect(() => {
    console.log(params.interviewId)
    GetInterviewDetails();
    const storedData = localStorage.getItem(`interview-${params.interviewId}`);
    if (storedData) {
      setInterviewData(JSON.parse(storedData));
    }
  }, [params.interviewId]);

  const GetInterviewDetails = async() => {
    const res = await db.select().from(MockInterview).where(eq(MockInterview.mockId,params.interviewId))
    setInterviewData(res[0])
    console.log(res);
  }

  return (
    <div className="relative">
      <div className="flex justify-between items-center p-1">
        <Logo />
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg cursor-pointer"
        onClick={() => router.push('/premium')}>
          Premium
        </button>
      </div>
      <div className='my-10 flex items-center justify-center gap-40'>
        <img src="/Programming-rafiki.png" alt="Interview Illustration" className="w-1/3 max-w-sm object-contain ml-[-550px]" />
        <div className='flex flex-col items-center'>
          <h1 className='font-bold text-2xl mb-5 text-purple-700'>Let's Start Your Interview...</h1>
          
          <div className="flex flex-col items-center">
            {webCamEnabled ?  
              <Webcam 
              mirrored={true}
                onUserMedia={()=>setWebCamEnabled(true)}
                onUserMediaError={()=>setWebCamEnabled(false)}
                className="h-[300px] w-[300px] rounded-lg border"
              />  
              : 
              <WebcamIcon className='h-[300px] w-[300px] p-10 bg-secondary rounded-lg border' />
            }
            <Button className="mt-4 p-2 bg-purple-600  hover:bg-purple-700" onClick={()=>setWebCamEnabled(true)}>Enable Webcam and Microphone</Button>
          </div>
          <div className='absolute bottom-5 right-5'>
            <p className="text-gray-600 text-sm mb-3">Whenever you are ready, just press the button to start the interview.</p>
            <Button className="bg-purple-700 hover:bg-purple-800 transform mb-20 translate-x-35" onClick={() => router.push('/dashboard/interview/'+params.interviewId+'/start')}>Start Interview</Button>
          </div>
        </div>
      </div>

      <div className="p-5 bg-purple-100 rounded-lg shadow-md max-w-md mx-auto mt-10 mr-128">
        <h1 className="text-2xl font-bold text-purple-700 mb-4">Interview Details</h1>
        {interviewData ? (
          <div className="space-y-3">
            <p><strong>Job Position:</strong> {interviewData.jobPosition}</p>
            <p><strong>Job Description:</strong> {interviewData.jobDesc}</p>
            <p><strong>Job Experience:</strong> {interviewData.jobExperience} years</p>
            <p><strong>Target Company:</strong> {interviewData.jobCompany}</p>
          </div>
        ) : (
          <p className="text-red-500">No interview data found.</p>
        )}
      </div>
      <div className='absolute top-1/5 right-20 mt-6 w-1/4'>
        <div className='p-5 border rounded-lg border-purple-100 bg-green-100'>
          <h2 className='flex gap-2 items-center text-black mb-2'><Sun/><strong>Pro Tip!</strong></h2>
          <h2>Maintain eye contact by looking at the camera, use natural gestures, and speak clearly at a moderate pace. Ensure good lighting, a quiet environment, and use headphones for better audio. Dress professionally to set the right mindset. Review AI feedback on tone, clarity, and response time to improve your performance.</h2>
        </div>
      </div>
    </div>
  );
}

export default Interview;