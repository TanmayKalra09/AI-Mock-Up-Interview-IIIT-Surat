"use client"
import Logo from '@/app/_components/Logo';
import { Button } from '@/components/ui/button';
import { WebcamIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { useRouter } from "next/navigation";


function Interview({ params }) {
  const [interviewData, setInterviewData] = useState(null);
  const [webCamEnabled,setWebCamEnabled] = useState(false);
  const router = useRouter();


  useEffect(() => {
    console.log(params.interviewId)
    const storedData = localStorage.getItem(`interview-${params.interviewId}`);
    if (storedData) {
      setInterviewData(JSON.parse(storedData));
    }
  }, [params.interviewId]);

  return (
    <div className="relative">
      <div className="flex justify-between items-center p-1 shadow-md">
        <Logo />
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg cursor-pointer"
        onClick={() => router.push('/premium')}>
          Premium
        </button>
      </div>
      <div className='my-10 flex items-center justify-center gap-40'>
        <img src="/5148270_2701776 2.jpg" alt="Interview Illustration" className="w-1/3 max-w-sm object-contain ml-[-550px]" />
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
            <p className="text-gray-600 text-sm mb-2">Whenever you are ready, just press the button to start the interview.</p>
            <Button className="bg-purple-700 hover:bg-purple-800 transform translate-x-35" onClick={() => router.push('/dashboard/interview/'+params.interviewId+'/start')}>Start Interview</Button>
          </div>
        </div>
      </div>

      <div className="p-5 bg-purple-100 rounded-lg shadow-md max-w-md mx-auto mt-10 mr-128">
        <h1 className="text-2xl font-bold text-purple-700 mb-4">Interview Details</h1>
        {interviewData ? (
          <div className="space-y-3">
            <p><strong>Job Position:</strong> {jobPosition}</p>
            <p><strong>Job Description:</strong> {jobDesc}</p>
            <p><strong>Experience:</strong> {jobExperience} years</p>
            <p><strong>Expected Salary:</strong> ₹{interviewData.expectedSalary} per annum</p>
            <p><strong>Company:</strong> {interviewData.company}</p>
          </div>
        ) : (
          <p className="text-red-500">No interview data found.</p>
        )}
      </div>
    </div>
  );
}

export default Interview;