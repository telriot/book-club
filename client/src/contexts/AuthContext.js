import React, { useReducer, createContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { TYPES } from "./types"
import axios from "axios"

const initialState = {
  id: null,
  isAuthenticated: false,
  username: null,
}
export const AuthContext = createContext(initialState)

const AuthContextProvider = ({ children }) => {
  const history = useHistory()
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

  const handleLogout = async () => {
    try {
      const result = await axios.post("/api/auth/logout")
      authDispatch({ type: "LOGOUT_USER" })
      history.push("/")
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAuth()
  }, [])
  return (
    <AuthContext.Provider value={{ authState, authDispatch, handleLogout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
