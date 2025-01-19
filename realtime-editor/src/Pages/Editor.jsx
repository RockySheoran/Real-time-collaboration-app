import React from 'react'
import LeftSideUser from './LeftSideUser'
import RightSideEditor from './RightSideEditor'


const Editor = () => {
  return (
    <div className='h-screen w-screen'>
        <div className="flex  ">
            <LeftSideUser/>
            <RightSideEditor/>



        </div>
        
      
    </div>
  )
}

export default Editor
