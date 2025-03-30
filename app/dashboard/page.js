import React from 'react'
import AddNewInterview from './_components/AddNewInterview'

function page() {
  return (
    <div className='p-10'>
     <h1 className='font-bold text-2xl'>Dashboard</h1>
     <h1>Create and Start your AI Mockup Interview</h1>
    <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
      <AddNewInterview/>
    </div>
    </div>
  )
}

export default page
