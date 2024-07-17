import React from 'react'
import Card from './Card'
function BookContainer({label}) {
  return (
    <div className='bg-[#FAEFE3] ml-10 mr-10 p-5'>
      <h1 className="text-[30px] font-bold text-gray-800 pl-5 pt-5 relative">
        {label}
        <span className="text-yellow-500"> Books</span> 
        <div className="absolute bottom-0 left-5 w-[350px] h-0.5 bg-gray-600 " />
      </h1>

      <div className='flex flex-row gap-5 mt-10'>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
      </div>
    </div>
  )
}

export default BookContainer
