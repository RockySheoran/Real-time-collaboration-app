import React, { useEffect, useRef, useState } from "react"
import Client from "../Components/Client"
import { initSocket } from "../Socket"
import ACTIONS from "../Action"
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom"
import toast from "react-hot-toast"


const LeftSideUser = ({client,roomId}) => {
  const [filteredClients, setFilteredClients] = useState([])
  const [input, setInput] = useState("")
   const location = useLocation()
   const navigate = useNavigate()
  if (!location.state) {
    <Navigate to="/" />
  }


 useEffect(() => {
   const Searchclient = client?.filter((clientItem) => {
     return (
       clientItem.userName &&
       clientItem.userName.toLowerCase().includes(input.toLowerCase())
     )
   })
  //  console.log(Searchclient)

   setFilteredClients(Searchclient || []) // Update the state with the filtered clients
 }, [input, client])

  // console.log(input)

  const roomIdCopy = async() =>{
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success("roomId copy")
      
    } catch (error) {
      toast.success("does not copy roomId ")
      
    }

  }
  const handleDisconnect = () =>{
    navigate("/")
  }

  return (
    <div className="min-w-[300px] px-2 pt-3  flex flex-col text-white bg-slate-700 h-screen ">
      <div className="header">
        <div className=" flex gap-2">
          <figure>
            <img
              src="https://a.storyblok.com/f/99519/1100x619/88ffae4af1/real-time-collaboration-blog.png/m/1080x608/filters:format(webp):quality(90)"
              alt=""
              className="w-16 h-16"
            />
          </figure>
          <div className="border bo h-16 w-0 border-white"></div>
          <div className="name flex  items-center">
            <h1 className="text-red-500 text-xl">
              Realtime <span className="text-white "> Collaboration</span>
            </h1>
          </div>
        </div>
        <div className="border bo h-0 mt-4 w-full border-gray-400"></div>
      </div>
      <div className="">
        <h1 className="text-white text-xl  text-center ">Connected</h1>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className=" w-full p-1 rounded-md mb-3 text-black"
          placeholder="Search connected user"
        />
      </div>

      <div className="flex-1 overflow-auto">
        {filteredClients?.map((curr) => {
          return <Client key={curr.socketId} userName={curr.userName} />
        })}
      </div>
      <div className=" flex flex-col mt-3">
        <button onClick={roomIdCopy} className="bg-blue-400 font-semibold hover:bg-blue-700 px-2 my-1 border-1 rounded-md">
          Copy ROOM ID
        </button>
        <button
          onClick={handleDisconnect}
          className="bg-red-500 font-semibold hover:bg-red-700 px-2 my-1 border-1 rounded-md">
          Leave
        </button>
      </div>
    </div>
  )
}

export default LeftSideUser
