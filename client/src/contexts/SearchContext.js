import React, { useReducer, createContext } from "react"
import { TYPES } from "./types"
const initialState = {
  display: false,
  displayedResults: [],
  input: "",
  isSearching: false,
  languageFilter: "",
  maxResults: 10,
  page: 1,
  pages: 0,
  results: [],
  totalResults: 0,
}
export const SearchContext = createContext(initialState)

const SearchContextProvider = ({ children }) => {
  const appReducer = (state, action) => {
    switch (action.type) {
      case TYPES.HANDLE_CHANGE:
        return action.input.length > 2
          ? {
              ...state,
              input: action.input,
            }
          : {
              ...state,
              input: action.input,
              results: [],
            }
      case TYPES.HANDLE_ENTER_KEY:
        return {
          ...state,

          displayedResults: state.results,
        }
      case TYPES.RESET_RESULTS:
        return {
          ...initialState,
        }
      case TYPES.SET_DISPLAY:
        return {
          ...state,
          display: action.display,
        }
      case TYPES.SET_LANGUAGE_FILTER:
        return {
          ...state,
          languageFilter: action.language,
        }
      case TYPES.SET_PAGE:
        return {
          ...state,
          page: action.page,
        }
      case TYPES.SET_RESULTS:
        return {
          ...state,
          results: action.data.results,
          isSearching: false,
          displayedResults: state.display
            ? action.data.results
            : state.displayedResults,
          display: false,
          totalResults: action.data.totalItems,
          pages: action.data.totalPages,
        }
      case TYPES.TOGGLE_IS_SEARCHING:
        return {
          ...state,
          isSearching: state.isSearching ? false : true,
        }
      default:
        return state
    }
  }
  const [searchState, searchDispatch] = useReducer(appReducer, initialState)
  const handleFilterNewBook = (value) => {
    searchDispatch({ type: "SET_LANGUAGE_FILTER", language: value })
  }
  return (
    <SearchContext.Provider
      value={{ searchState, searchDispatch, handleFilterNewBook }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export default SearchContextProvider
