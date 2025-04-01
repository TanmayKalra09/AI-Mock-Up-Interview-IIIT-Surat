import React from 'react'

function QuestionSection(activeQuestionIndex) {
  return (
    <div className='p-5 border rounded-lg'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            <h2 className={`p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer ${activeQuestionIndex}`}>
                Questions No. 1

            </h2>
        </div>

    </div>
  )
}

export default QuestionSection
