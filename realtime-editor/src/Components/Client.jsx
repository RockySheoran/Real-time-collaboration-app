import React from 'react'
import Avatar from "react-avatar"
const Client = ({userName}) => {
  return (
    <div className='client  border p-1 border-blue-400 hover:bg-slate-900 rounded-lg  '>
        <Avatar name={userName} size='50' round="14px"></Avatar>
        <span className='ml-3 cursor-pointer'>{userName}</span>
    </div>
  )
}

export default Client
