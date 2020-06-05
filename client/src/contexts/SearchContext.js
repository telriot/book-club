import React, { useReducer, createContext } from "react"
import { TYPES } from "./types"
const initialState = {
  input: "",
  results: [],
  displayedResults: [],
  isSearching: false,
  display: false,
  languageFilter: "",
  totalResults: 0,
  page: 1,
  maxResults: 10,
  pages: 0,
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
          results: action.data.results,
          isSearching: false,
          displayedResults: state.display
            ? action.data.results
            : state.displayedResults,
          display: false,
          totalResults: action.data.totalItems,
          pages: action.data.totalPages,
        }
      case TYPES.RESET_RESULTS:
        return {
          ...initialState,
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
      case TYPES.HANDLE_ENTER_KEY:
        return {
          ...state,
          displayedResults: state.results,
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
