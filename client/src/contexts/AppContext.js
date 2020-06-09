import React, { useReducer, createContext } from "react"
import { TYPES } from "./types"
import axios from "axios"
const initialState = {
  authorFilter: "",
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
  books: [],
  deletionTarget: "",
  inOut: "in",
  isAdding: false,
  isConfirming: false,
  languageFilter: "",
  maxResults: 20,
  modal: false,
  page: 1,
  pages: 0,
  sort: "title",
  sortOrder: "",
  titleFilter: "",
  totalResults: 0,
  trades: { requestsIn: [], requestsOut: [] },
  tradesSort: "title",
  tradeToConfirm: {},
  user: {
    username: "",
    country: "",
    city: "",
    books: [],
  },
}
export const AppContext = createContext(initialState)

const AppContextProvider = ({ children }) => {
  const appReducer = (state, action) => {
    switch (action.type) {
      case TYPES.RESET_BOOK_DETAIL:
        return {
          ...state,
          bookDetail: initialState.bookDetail,
        }

      case TYPES.RESET_BOOKS:
        return {
          ...state,
          books: initialState.books,
          totalResults: initialState.totalResults,
          pages: initialState.totalPages,
        }
      case TYPES.RESET_USER:
        return {
          ...state,
          user: initialState.user,
          isConfirming: false,
        }
      case TYPES.SET_AUTHOR_FILTER:
        return {
          ...state,
          authorFilter: action.author,
        }
      case TYPES.SET_BOOK_DETAIL:
        return {
          ...state,
          bookDetail: action.bookDetail,
        }
      case TYPES.SET_BOOKS:
        const { books, totalResults, totalPages } = action.data
        return {
          ...state,
          books,
          totalResults: totalResults ? totalResults : state.totalResults,
          pages: totalPages ? totalPages : state.totalPages,
        }
      case TYPES.SET_DELETION_TARGET:
        return {
          ...state,
          deletionTarget: action.target,
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
      case TYPES.SET_TRADES:
        return {
          ...state,
          trades: action.trades,
        }
      case TYPES.SET_TRADES_SORT:
        return {
          ...state,
          tradesSort: action.data.sortParam,
          trades: action.data.sortedTrades,
        }
      case TYPES.SET_USER:
        return {
          ...state,
          user: action.user,
        }
      case TYPES.SET_TITLE_FILTER:
        return {
          ...state,
          titleFilter: action.title,
        }
      case TYPES.TOGGLE_IN_OUT:
        return {
          ...state,
          inOut: state.inOut === "in" ? "out" : "in",
        }
      case TYPES.TOGGLE_IS_ADDING:
        return action.close
          ? {
              ...state,
              isAdding: false,
            }
          : {
              ...state,
              isAdding: state.isAdding ? false : true,
            }
      case TYPES.TOGGLE_MODAL:
        return {
          ...state,
          modal: state.modal ? false : action.modal,
        }
      case TYPES.TOGGLE_IS_CONFIRMING:
        return {
          ...state,
          isConfirming: action.trade ? true : false,
          tradeToConfirm: action.trade ? action.trade : {},
        }
      default:
        return state
    }
  }
  const [state, dispatch] = useReducer(appReducer, initialState)
  const handleFilter = {
    allBooks: (value) => {
      dispatch({ type: "SET_LANGUAGE_FILTER", language: value })
    },
    titleFilter: (value) => {
      dispatch({ type: "SET_TITLE_FILTER", title: value })
    },
    authorFilter: (value) => {
      dispatch({ type: "SET_AUTHOR_FILTER", author: value })
    },
    sortOrder: (sortOrder) => {
      dispatch({ type: "SET_SORT_SERVER_SIDE", sortOrder })
    },
  }
  const handleInOut = () => {
    dispatch({ type: "TOGGLE_IN_OUT" })
  }
  const getUserData = async (username, setPage, setPages) => {
    try {
      const response = await axios.get(`/api/users/public/${username}`)
      const user = response.data
      console.log(user)
      setPage(1)
      setPages(Math.ceil(user.books.length / state.maxResults))
      dispatch({ type: "SET_USER", user })
    } catch (error) {
      console.log(error)
    }
  }
  const getMyTrades = async (username) => {
    try {
      const response = await axios.get(`/api/requests/${username}`)
      const { requestsIn, requestsOut } = response.data
      dispatch({ type: "SET_TRADES", trades: { requestsIn, requestsOut } })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        handleFilter,
        handleInOut,
        getMyTrades,
        getUserData,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider
