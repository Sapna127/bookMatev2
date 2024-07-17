import React from 'react'
import Header from '../components/Header'
import Inputbox from '../components/Inputbox'
import Button from '../components/Button'
function ChatPage() {
  return (
    <>
    <Header label="Chat"/>
    <div className="flex flex-col justify-center space-y-4 p-24">
        <Inputbox label="Subject" />      
      <input
        type="text"
        placeholder="Type your message"
        className="w-[1010px] h-16 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
      />
      <Button label="Send"/>
      </div>
    </>
    

  )
}

export default ChatPage