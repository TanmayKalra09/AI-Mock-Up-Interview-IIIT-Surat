"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import StarRating from '@/components/ui/StarRating';
  

function OverallFeedback() {
    const[feedbackList,setFeedbackList]=useState([]);
    const[rating,setRating]=useState(0);

    const router = useRouter();
  return (
    <div className='p-10'>
        <h2 className='text-2xl font-bold text-green-500'>Interview Completed !!</h2>
        <h3 className='font-bold text-2xl mt-2'>Share your experience with us.</h3>
        <h2 className='text-primary text-lg my-3'>How much do you like to rate our interview?</h2>
        <StarRating
         value={rating}
         onChange={(val) => setRating(val)}
         ></StarRating>
        
        <Button onClick={()=>router.replace('/dashboard')} className='bg-purple-700 mt-5'>Go Home</Button>

    </div>
  )
}

export default OverallFeedback