import React, { useContext, useEffect } from "react"
import { AppContext } from "../../contexts/AppContext"
import { AuthContext } from "../../contexts/AuthContext"
import BookCard from "../shared/BookCard"
import FindBooks from "../findBooks/FindBooks"
import Pagination from "../bits/Pagination"
import SideBar from "../layout/SideBar"

import styles from "./MyBooks.module.scss"
import axios from "axios"

function MyBooks() {
  const { state, dispatch } = useContext(AppContext)
  const { isAdding } = state
  const { authState } = useContext(AuthContext)
  const { page, pages, maxResults, books } = state

  const getMyBooks = async () => {
    let data = { books: [], totalResults: 0, totalPages: 0 }

    try {
      const response = await axios.get(`/api/books/${authState.username}`)

      data.books = response.data
      data.totalResults = response.data.length
      data.totalPages = Math.ceil(response.data.length / maxResults)

      dispatch({ type: "SET_BOOKS", data })
    } catch (error) {
      console.log(error)
    }
    return () => {
      dispatch({ type: "RESET_BOOKS" })
    }
  }
  useEffect(() => {
    authState.username && getMyBooks()
  }, [authState, isAdding])

  const setPage = (page) => dispatch({ type: "SET_PAGE", page })

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
        {state.books.length ? renderPage(state.books) : null}
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
