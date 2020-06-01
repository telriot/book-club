import React, { useReducer, createContext, useEffect } from "react"
import { TYPES } from "./types"
const initialState = {
  input: "",
  results: [],
  displayedResults: [],
  isSearching: false,
  display: false,
}
export const SearchContext = createContext(initialState)

const SearchContextProvider = ({ children }) => {
  const appReducer = (state, action) => {
    switch (action.type) {
      case TYPES.HANDLE_CHANGE:
        return {
          ...state,
          input: action.input,
        }
      case TYPES.SET_RESULTS:
        return {
          ...state,
          results: action.data,
          isSearching: false,
          displayedResults: state.display
            ? action.data
            : state.displayedResults,
          display: false,
        }
      case TYPES.TOGGLE_IS_SEARCHING:
        return {
          ...state,
          isSearching: state.isSearching ? false : true,
        }
      case TYPES.SET_DISPLAY:
        return {
          ...state,
          display: action.display,
        }
      default:
        return state
    }
  }
  const [searchState, searchDispatch] = useReducer(appReducer, initialState)

  return (
    <SearchContext.Provider value={{ searchState, searchDispatch }}>
      {children}
    </SearchContext.Provider>
  )
}

export default SearchContextProvider
