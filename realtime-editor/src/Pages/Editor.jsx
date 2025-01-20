import React, { useEffect, useRef, useState } from 'react'
import LeftSideUser from './LeftSideUser'
import RightSideEditor from './RightSideEditor'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import ACTIONS from '../Action'
import toast from 'react-hot-toast'
import { initSocket } from '../Socket'


const Editor = () => {
   const [client, setClients] = useState([])
   const [code,setCode] = useState('');
   const {roomId} = useParams()
   const socketRef = useRef(null)
   const codeRef = useRef(null)
   const location = useLocation()
   const navigate = useNavigate()
   useEffect(() => {
     const init = async () => {
       socketRef.current = await initSocket()
       socketRef.current.on("connect_error", (err) => handleError(err))
       socketRef.current.on("connect_failed", (err) => handleError(err))
// console.log(socketRef.current)
       function handleError(e) {
         console.log("socket error", e)
         toast.error("socket Connection failed, try again later")
         navigate("/")
       }
       socketRef.current.emit(ACTIONS.JOIN, {
         roomId: roomId,
         userName: location.state?.userName,
       })

       socketRef.current.on(
         ACTIONS.JOINED,
         ({ clients, userName, socketId }) => {
           if (userName !== location.state.userName) {
             toast.success(`${userName} joined the room`)
           }
          //  console.log(`${userName} joined the room`)
           setClients(clients)
           socketRef.current.emit("sync_code",{code:codeRef.current,
            socketId
            
           })
         }
       )

       socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, userName }) => {
         toast.success(`${userName} leave the room`)
         setClients((pre) => {
           return pre.filter((client) => client.socketId !== socketId)
         })
       })

       
          socketRef.current.on("code_change", ({ code }) => {
            if (code !== null) {
              console.log(code)
              setCode(code)
            }
          })

       
     }
     init()
     return () => {
       if (socketRef.current) {
         socketRef.current.disconnect()
         socketRef.current.off(ACTIONS.JOINED)
         socketRef.current.off(ACTIONS.DISCONNECTED)
         socketRef.current.off(ACTIONS.CODE_CHANGE)
       }
     }
   }, [])


   if (!location.state) {
     <Navigate to="/" />
   }

  return (
    <div className="h-screen w-screen">
      <div className="flex  ">
        <LeftSideUser client={client} roomId={roomId} />
        <RightSideEditor roomId={roomId}  socketRef ={socketRef} code={code} onCodeChange ={(code)=>codeRef.current = code} />
      </div>
    </div>
  )
}

export default Editor
