import React, { useReducer, createContext } from "react"
import { TYPES } from "./types"
const initialState = {
  modal: false,
  books: [],
  page: 1,
  pages: 0,
  totalResults: 0,
  maxResults: 20,
  sort: "title",
  sortOrder: "",
  tradesSort: "title",
  bookDetail: {
    users: [],
    googleId: "",
    info: {
      title: "",
      authors: [],
      publisher: "",
      publishedDate: "",
      description: "",
      pageCount: 0,
      infoLink: "",
      imageLinks: { thumbnail: "" },
    },
  },
  user: {
    username: "",
    country: "",
    city: "",
    books: [],
  },
  trades: { requestsIn: [], requestsOut: [] },
  isConfirming: false,
  tradeToConfirm: {},
  isAdding: false,
  inOut: "in",
  languageFilter: "",
  titleFilter: "",
  authorFilter: "",
  deletionTarget: "",
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
      case TYPES.SET_BOOKS:
        const { books, totalResults, totalPages } = action.data
        return {
          ...state,
          books,
          totalResults: totalResults ? totalResults : state.totalResults,
          pages: totalPages ? totalPages : state.totalPages,
        }
      case TYPES.RESET_BOOKS:
        return {
          ...state,
          books: initialState.books,
        }
      case TYPES.SET_PAGE:
        return {
          ...state,
          page: action.page,
        }
      case TYPES.SET_BOOK_DETAIL:
        return {
          ...state,
          bookDetail: action.bookDetail,
        }
      case TYPES.RESET_BOOK_DETAIL:
        return {
          ...state,
          bookDetail: initialState.bookDetail,
        }
      case TYPES.SET_USER:
        return {
          ...state,
          user: action.user,
        }
      case TYPES.RESET_USER:
        return {
          ...state,
          user: initialState.user,
          isConfirming: false,
        }
      case TYPES.SET_TRADES:
        return {
          ...state,
          trades: action.trades,
        }
      case TYPES.TOGGLE_IS_CONFIRMING:
        return {
          ...state,
          isConfirming: action.trade ? true : false,
          tradeToConfirm: action.trade ? action.trade : {},
        }
      case TYPES.SET_SORT:
        return {
          ...state,
          sort: action.sort,
          books: action.sortedBooks,
        }
      case TYPES.SET_SORT_SERVER_SIDE:
        return {
          ...state,
          sortOrder: action.sortOrder,
        }
      case TYPES.SET_TRADES_SORT:
        return {
          ...state,
          tradesSort: action.data.sortParam,
          trades: action.data.sortedTrades,
        }
      case TYPES.TOGGLE_IS_ADDING:
        return {
          ...state,
          isAdding: state.isAdding ? false : true,
        }
      case TYPES.TOGGLE_IN_OUT:
        return {
          ...state,
          inOut: state.inOut === "in" ? "out" : "in",
        }
      case TYPES.SET_LANGUAGE_FILTER:
        return {
          ...state,
          languageFilter: action.language,
        }
      case TYPES.SET_TITLE_FILTER:
        return {
          ...state,
          titleFilter: action.title,
        }
      case TYPES.SET_AUTHOR_FILTER:
        return {
          ...state,
          authorFilter: action.author,
        }
      case TYPES.SET_DELETION_TARGET:
        return {
          ...state,
          deletionTarget: action.target,
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
