"use client"
import React, { use, useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react';
import { toast } from 'sonner';
import { chatSession } from '@/utils/GeminiAIModel';
import { UserAnswer } from '@/utils/schema';
import moment from 'moment';
import { db } from '@/utils/db';

function RecordAnswerSection({ mockIntvQues, activeQuestionIndex, interviewData }) {
  const [loading,setLoading]=useState(false);

  const [userResponse,setUserResponse] = useState("");

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  useEffect(() => {
    results.map((result) => (
      setUserResponse(prevAns => prevAns + result?.transcript)
    ))
  },[results])

  useEffect(()=>{
    if(!isRecording&&userResponse.length>5){
      UpdateUserAnswer();
    }
    
  },[userResponse])

  const StartStopRecording=async()=>{
    if(isRecording){
      stopSpeechToText()
    

    }
    else{
      startSpeechToText();
    }

  } 
  const UpdateUserAnswer=async()=>{
    console.log(userResponse)
    console.log("mockIdRef:", interviewData?.mockId);
    setLoading(true)
    const feedbackPrompt = "Question:" + mockIntvQues[activeQuestionIndex]?.Question +
      "User Answer:" +userResponse+ "Depends on question and user response for given interview question"+
      "please give us rating for answer in numbers out of 10 and feedback at area of improvement in just 2-3 lines.";

      const result=await chatSession.sendMessage(feedbackPrompt);
      const mockJSONResponse = (await result.response.text())
  .replace('```json','')
  .replace('```','');
      console.log(mockJSONResponse);
      const JsonFeedbackResp=JSON.parse(mockJSONResponse);

      try {
        const resp = await db.insert(UserAnswer)
          .values({
            mockIdRef: interviewData?.id,
            question: mockIntvQues[activeQuestionIndex]?.Question,
            correctAns: mockIntvQues[activeQuestionIndex]?.Answer,
            userAns: userResponse,
            feedback: JsonFeedbackResp?.feedback,
            rating: JsonFeedbackResp?.rating,
            userEmail: "N/A",
            createdAt: moment().format('DD-MM-yyyy'),
          })
          .execute();
      
        if (resp) {
          toast('User Answer Recorded');
        }
      } catch (error) {
        console.error('Database insertion error:', error);
        toast('Failed to save answer. Check console.');
      }
      setUserResponse('');
      setLoading(false);

  }

  return (
    <div className='flex items-center justify-center flex-col'>
        <div className ="flex flex-col mt-20 w-100 justify-center items-center bg-black rounded-lg p-5">
            <Image src={'/webcam-2.png'} width={200} height={200} className='absolute'/>
            <Webcam
            mirrored={true}
            style={{
                height:300,width:'100%',zIndex:10
            }}/>
        </div>
        <Button 
        disabled={loading}
        variant="outline" className="my-10"
          onClick={StartStopRecording}
        >
          {isRecording ?
          <h2 className='text-red-700 flex gap-2'>
            <Mic/> Stop Recording Response
          </h2>
        :
        "Record Response"}</Button>
       <Button onClick={()=>console.log(userResponse)}>Show Answer</Button>
    </div>
    
  )
}

export default RecordAnswerSection
