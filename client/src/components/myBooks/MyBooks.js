import React, { useContext, useEffect } from "react"
import { AppContext } from "../../contexts/AppContext"
import { AuthContext } from "../../contexts/AuthContext"
import BookCard from "../shared/BookCard"
import FindBooks from "../findBooks/FindBooks"
import Pagination from "../bits/Pagination"
import SideBar from "../layout/SideBar"
import Loader from "react-loader-spinner"
import styles from "./MyBooks.module.scss"
import axios from "axios"

function MyBooks() {
  const { state, dispatch } = useContext(AppContext)
  const { isAdding } = state
  const { authState } = useContext(AuthContext)
  const { page, pages, maxResults, books } = state
  const setPage = (page) => dispatch({ type: "SET_PAGE", page })
  const getMyBooks = async () => {
    dispatch({ type: "SET_IS_LOADING", isLoading: true })

    let data = { books: [], totalResults: 0, totalPages: 0 }
    try {
      const response = await axios.get(`/api/books/${authState.username}`)
      data.books = response.data
      data.totalResults = response.data.length
      data.totalPages = Math.ceil(response.data.length / maxResults)

      dispatch({ type: "SET_BOOKS", data })
      dispatch({ type: "SET_IS_LOADING", isLoading: false })
    } catch (error) {
      dispatch({ type: "SET_IS_LOADING", isLoading: false })

      console.log(error)
    }
    return () => {
      dispatch({ type: "RESET_BOOKS" })
    }
  }
  useEffect(() => {
    window.scrollTo(0, 0)
    authState.username && getMyBooks()
    return () => dispatch({ type: "SET_PAGE", page: 1 })
  }, [authState, isAdding])

  const renderPage = (arr) => {
    let books = []
    const startIndex = (page - 1) * maxResults
    const endIndex = page * maxResults
    for (let i = startIndex; i < endIndex; i++) {
      arr[i] &&
        books.push(
          <BookCard removeBtn={true} item={arr[i]} key={`card-${i}`} />
        )
    }
    return books
  }

  return isAdding ? (
    <FindBooks />
  ) : (
    <div className={styles.container}>
      <SideBar myBooks={true} />

      <div className={styles.main}>
        {state.isLoading ? (
          <div className={styles.spinner}>
            <Loader
              type="Puff"
              color={"#e71d36"}
              height={100}
              width={100}
              timeout={3000} //3 secs
            />
          </div>
        ) : state.books.length ? (
          renderPage(state.books)
        ) : null}
      </div>

      <Pagination
        page={page}
        pages={pages}
        displayedResults={books}
        setPage={setPage}
      />
    </div>
  )
}

export default MyBooks
