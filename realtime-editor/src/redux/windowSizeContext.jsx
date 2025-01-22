// WindowSizeContext.js
import React, { createContext, useEffect, useState } from "react"


export const WindowSizeContext = createContext()

export const WindowSizeProvider = ({ children }) => {
  // const navigate = useNavigate()
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
 

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
      
      // console.log(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <WindowSizeContext.Provider value={{ windowWidth }}>
      {children}
    </WindowSizeContext.Provider>
  )
}
