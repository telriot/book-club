import React, { useReducer, createContext, useEffect } from "react"
import { TYPES } from "./types"

const initialState = {}
export const WindowSizeContext = createContext(initialState)

const WindowSizeContextProvider = ({ children }) => {
  const appReducer = (state, action) => {
    switch (action.type) {
      default:
        return state
    }
  }
  const [wsState, wsDispatch] = useReducer(appReducer, initialState)

  return (
    <WindowSizeContext.Provider value={{ state, dispatch }}>
      {children}
    </WindowSizeContext.Provider>
  )
}

export default WindowSizeContextProvider
