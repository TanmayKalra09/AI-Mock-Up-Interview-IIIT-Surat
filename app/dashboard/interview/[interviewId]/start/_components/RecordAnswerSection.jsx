"use client"
import React, { use, useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic } from 'lucide-react';

function RecordAnswerSection() {

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
        <Button variant="outline" className="my-10"
          onClick={isRecording ? stopSpeechToText : startSpeechToText}
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

