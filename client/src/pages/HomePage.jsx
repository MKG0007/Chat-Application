import React, { useContext } from 'react'
import Sidebar from '../components/Sidebar'
import ChatContainer from '../components/ChatContainer'
import RightSidebar from '../components/RightSidebar'
import { ChatContext } from '../../context/ChatContext'

const HomePage = () => {
  const { selectedUser } = useContext(ChatContext)

  return (
    // Added a background gradient to the main window for depth
    <div className='w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black sm:px-8 sm:py-6 flex justify-center items-center'>
      
      <div className={`
        bg-slate-900/60 backdrop-blur-2xl 
        border border-slate-700/50 shadow-2xl shadow-black/50
        rounded-3xl overflow-hidden w-full max-w-[1600px] h-[95vh] sm:h-[90vh] 
        grid grid-cols-1 relative transition-all duration-500 ease-in-out
        ${selectedUser 
            ? 'md:grid-cols-[320px_1fr_300px] lg:grid-cols-[350px_1fr_350px]' 
            : 'md:grid-cols-[350px_1fr]'}
      `}>
        <Sidebar />
        <ChatContainer />
        <RightSidebar />
      </div>

    </div>
  )
}

export default HomePage