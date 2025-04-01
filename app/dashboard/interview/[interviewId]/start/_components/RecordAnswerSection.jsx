
import React from 'react'
import Webcam from 'react-webcam'
import Image from 'next/image';
import { Button } from '@/components/ui/button';

function RecordAnswerSection() {
  return (
    <div className='flex items-center justify-center flex-col'>
        <div className ="flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5">
            <Image src={'/webcam-2.png'} width={200} height={200} className='absolute'/>
            <Webcam
            mirrored={true}
            style={{
                height:300,width:'100%',zIndex:10
            }}/>
        </div>
        <Button variant="outline" className="my-10">Record Answer</Button>
    </div>
  )
}

export default RecordAnswerSection

