import React, { useState } from "react"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
import {v4 as uuidV4} from "uuid"

const Home = () => {
    const navigate = useNavigate();
    const [input , setInput  ] = useState({
        id:'',
        userName:""
    });
   
    const handleInput  = (e) =>{
        setInput({...input ,[e.target.name] : e.target.value })
    }
  const newRoomIDGenerator = (e) => {
    e.preventDefault();
    const id  = uuidV4();
    
    
    setInput({ ...input, id: id });
    toast.success("Create new id")

  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input)
   
   
    navigate(`/editor/${input.id}`,{
        state:{
            userName :input.userName,
        }
    });
  }
  return (
    <div className="login  flex text-white justify-center items-center bg-gray-700  h-screen p-2  ">
      <div className="border flex flex-col gap-2 border-gray-400 bg-slate-700 py-5 rounded-lg px-4">
        <div className=" flex gap-2">
          <figure>
            <img
              src="https://a.storyblok.com/f/99519/1100x619/88ffae4af1/real-time-collaboration-blog.png/m/1080x608/filters:format(webp):quality(90)"
              alt=""
              className="w-24 h-16"
            />
          </figure>
          <div className="border bo h-16 w-0 border-white"></div>
          <div className="name flex  items-center">
            <h1 className="text-red-500 text-2xl">
              Realtime <span className="text-white "> Collaboration</span>
            </h1>
          </div>
        </div>
        <div className="roomId">
          Please invitation <span className="text-red-500">ROOM ID</span>
        </div>
        <form onKeyUp={(e)=> e.key === "enter" ? handleSubmit :''} onSubmit={handleSubmit} className="form flex flex-col gap-2">
          <input
            type="text"
            required
            name="id"
            onChange={handleInput}
            value={input.id}
            placeholder="ROOM ID"
            className="w-full font-semibold text-black  rounded-lg px-2 py-1  placeholder:font-semibold placeholder:text-black"
          />
          <input
            type="text"
            required
            name="userName"
            onChange={handleInput}
            value={input.userName}
            placeholder="USERNAME"
            className="w-full font-semibold text-black  rounded-lg px-2 py-1  placeholder:font-semibold placeholder:text-black"
          />
          <button
            type="submit"
            className="px-3 py-1  w-fit bg-green-500 rounded rounded-mg  ml-auto mr-4 text-black ">
            {" "}
            join
          </button>
        </form>
        <div className="end point">
          <h1>
            if you don't have an invite then create{" "}
            <span
              onClick={newRoomIDGenerator}
              className="text-red-500 cursor-pointer border-b-2 border-red-600">
              new room
            </span>
          </h1>
        </div>
      </div>
    </div>
  )
}

export default Home
