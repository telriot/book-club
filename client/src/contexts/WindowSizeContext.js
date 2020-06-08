import React, { createContext, useState, useEffect } from "react"

export const WindowSizeContext = createContext()

const WindowSizeContextProvider = ({ children }) => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  const isXL = dimensions.width > 1200
  const isLG = dimensions.width > 992
  const isMD = dimensions.width >= 768
  const isSM = dimensions.width >= 576
  const isXS = dimensions.width < 576

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <WindowSizeContext.Provider
      value={{ dimensions, isXL, isLG, isMD, isSM, isXS }}
    >
      {children}
    </WindowSizeContext.Provider>
  )
}

export default WindowSizeContextProvider
