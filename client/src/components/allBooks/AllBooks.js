import React, { useContext, useEffect } from "react"
import { AppContext } from "../../contexts/AppContext"
import { WindowSizeContext } from "../../contexts/WindowSizeContext"
import useDebounce from "../../hooks/useDebounce"
import BookCard from "../shared/BookCard"
import Pagination from "../bits/Pagination"
import SideBar from "../layout/SideBar"
import Loader from "react-loader-spinner"
import styles from "./AllBooks.module.scss"
import axios from "axios"

function AllBooks() {
  const { state, dispatch } = useContext(AppContext)
  const { isLG } = useContext(WindowSizeContext)
  const { page, pages, maxResults, books, languageFilter, sortOrder } = state
  const debouncedTitle = useDebounce(state.titleFilter, 500)
  const debouncedAuthor = useDebounce(state.authorFilter, 500)

  const getAllBooks = async () => {
    dispatch({ type: "SET_IS_LOADING", isLoading: true })

    let data = { books: [], totalResults: 0, totalPages: 0 }
    try {
      const params = {
        page,
        limit: maxResults,
        language: languageFilter,
        title: debouncedTitle,
        author: debouncedAuthor,
        sortOrder: sortOrder,
      }
      const response = await axios.get("/api/books/", { params })
      const { docs, totalDocs, totalPages } = response.data
      data.books = docs
      data.totalResults = totalDocs
      data.totalPages = totalPages
      if (page > totalPages) {
        dispatch({ type: "SET_PAGE", page: totalPages })
      }
      dispatch({ type: "SET_BOOKS", data })
      dispatch({ type: "SET_IS_LOADING", isLoading: false })
    } catch (error) {
      console.log(error)
      dispatch({ type: "SET_IS_LOADING", isLoading: false })
    }
  }
  const setPage = (page) => dispatch({ type: "SET_PAGE", page })

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch({ type: "SET_PAGE", page: 1 })
    return () => dispatch({ type: "SET_PAGE", page: 1 })
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
    getAllBooks()
  }, [page, languageFilter, sortOrder])

  useEffect(() => {
    if (
      debouncedTitle ||
      debouncedAuthor ||
      (!debouncedTitle && books.length !== 0)
    )
      getAllBooks()
  }, [debouncedTitle])

  useEffect(() => {
    if (
      debouncedAuthor ||
      debouncedTitle ||
      (!debouncedAuthor && books.length !== 0)
    )
      getAllBooks()
  }, [debouncedAuthor])

  return (
    <div className={styles.container}>
      {isLG ? <SideBar allBooks={true} /> : null}
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
          state.books.map((item, index) => (
            <BookCard owners={true} item={item} key={`card-${index}`} />
          ))
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

export default AllBooks
