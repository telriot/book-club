import React, { useReducer, createContext, useEffect } from "react"
import { TYPES } from "./types"
const initialState = {
  modal: false,
  books: [],
}
export const AppContext = createContext(initialState)

const AppContextProvider = ({ children }) => {
  const appReducer = (state, action) => {
    switch (action.type) {
      case TYPES.TOGGLE_MODAL:
        return {
          ...state,
          modal: state.modal ? false : action.modal,
        }
      case TYPES.SET_ALL_BOOKS:
        return {
          ...state,
          books: action.books,
        }
      default:
        return state
    }
  }
  const [state, dispatch] = useReducer(appReducer, initialState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider
