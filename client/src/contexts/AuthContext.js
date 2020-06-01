import React, { useReducer, createContext, useEffect } from "react"
import { TYPES } from "./types"
import axios from "axios"

const initialState = {
  isAuthenticated: false,
  username: null,
  id: null,
}
export const AuthContext = createContext(initialState)

const AuthContextProvider = ({ children }) => {
  const appReducer = (state, action) => {
    switch (action.type) {
      case TYPES.LOGIN_USER:
        return {
          ...state,
          isAuthenticated: true,
          username: action.username,
          id: action.id,
        }
      case TYPES.LOGOUT_USER:
        return {
          ...initialState,
        }
      default:
        return state
    }
  }
  const [authState, authDispatch] = useReducer(appReducer, initialState)

  const getAuth = async () => {
    try {
      const response = await axios.get("/api/auth/")
      const { user } = response.data
      if (user) {
        authDispatch({
          type: "LOGIN_USER",
          username: user.username,
          id: user._id,
          isAuthenticated: true,
        })
      } else {
        authDispatch({ type: "LOGOUT_USER" })
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getAuth()
  }, [])

  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
