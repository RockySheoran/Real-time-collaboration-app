import React, { useContext, useEffect, useRef, useState } from "react"
import LeftSideUser from "./LeftSideUser"
import RightSideEditor from "./RightSideEditor"
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom"
import ACTIONS from "../Action"
import toast from "react-hot-toast"
import { initSocket } from "../Socket"
import {
  WindowSizeContext,
  WindowSizeProvider,
} from "../redux/windowSizeContext"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { setRoomId, setSelect } from "../redux/Slice"

const Editor = () => {
  const { windowWidth } = useContext(WindowSizeContext)
  const [client, setClients] = useState([])
  const [code, setCode] = useState("")
  const { roomId } = useParams()
  const socketRef = useRef(null)
  const { Allcode, roomID, select } = useSelector((store) => store.all)
  const dispatch = useDispatch()

  const codeRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()




  const postCodeAxios = async () => {
    // console.log("dfs")
    // console.log(code)
    try {
       // Declare 'code' in the outer scope to make it accessible
     
      const res = await axios.post(
        "http://localhost:5000/api/code/post",
        { code:Allcode, roomId:roomID },
        {
          headers: {
            // Replace with your actual headers
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      if (res.data.success) {
        // console.log("add data")
        
      }
    } catch (error) {
      console.log(error)
    }
  }
  const getCodeAxios = async () => {
    // console.log("dfs")
    // const code = Allcode
    try {
      // console.log(roomId)
      const res = await axios.get("http://localhost:5000/api/code/get", {
        params: { roomId },

        headers: {
          // Replace with your actual headers
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      if (res.data.success) {
        // console.log("get data")
        // console.log(res.data.data)
        // dispatch(setCode(res.data.data))
        // setCode(res.data.data)

        dispatch(setCode(res.data.data.code)) // Use only when valid
      }
    } catch (error) {
      console.log(error)
    }
  }
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
      dispatch(setRoomId(roomId))
      socketRef.current.emit(ACTIONS.JOIN, {
        roomId: roomId,
        userName: location?.state?.userName,
      })

      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, userName, socketId }) => {
          if (userName !== location?.state?.userName) {
            toast.success(`${userName} joined the room`)
          }
          //  console.log(`${userName} joined the room`)
          setClients(clients)
          // getCodeAxios()
          socketRef.current.emit("sync_code", {
            code: codeRef.current,
            socketId,
          })
        }
      )

      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, userName }) => {
        toast.success(`${userName} leave the room`)
        setClients((pre) => {
          return pre.filter((client) => client.socketId !== socketId)
        })
        postCodeAxios()
      })

      socketRef.current.on("code_change", ({ code }) => {
        if (code !== null) {
          // console.log(code)
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

        postCodeAxios()
      }
    }
  }, [])

  if (!location.state) {
    ;<Navigate to="/" />
  }

  useEffect(() => {
    // getCodeAxios()
     postCodeAxios()
  }, [Allcode])
  useEffect(() => {
    getCodeAxios()
    
  }, [])

  return (
    <div className="h-[100%] w-screen">
      {windowWidth <= 640 ? (
        <div className=" h-[100%] flex flex-col">
          <div className=" fixed top-0  bg-slate-700 py-2 z-[999] w-full flex  justify-center gap-3">
            <button
              onClick={() => dispatch(setSelect(false))}
              className={` px-3 py-1 rounded-md  ${
                !select ? "bg-blue-700" : "bg-slate-600"
              } `}>
              user
            </button>
            <button
              onClick={() => dispatch(setSelect(true))}
              className={` px-3 py-1 rounded-md  ${
                select ? "bg-blue-700" : "bg-slate-600"
              } `}>
              Editor
            </button>
          </div>
          <div className="mt-10 bg-black h-[100%]">
            {!select ? (
              <div className="h-[100%]">
                <LeftSideUser client={client} roomId={roomId} />
              </div>
            ) : (
              <div className="h-[100%]">
                <RightSideEditor
                  roomId={roomId}
                  socketRef={socketRef}
                  code={code}
                  onCodeChange={(code) => (codeRef.current = code)}
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex  ">
          <LeftSideUser client={client} roomId={roomId} />
          <RightSideEditor
            roomId={roomId}
            socketRef={socketRef}
            code={code}
            onCodeChange={(code) => (codeRef.current = code)}
          />
        </div>
      )}
    </div>
  )
}

export default Editor
