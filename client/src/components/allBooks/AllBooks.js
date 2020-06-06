import React, { useContext, useEffect } from "react"
import { AppContext } from "../../contexts/AppContext"
import BookCard from "../shared/BookCard"
import styles from "./AllBooks.module.scss"
import axios from "axios"
import SideBar from "../layout/SideBar"
import Pagination from "../bits/Pagination"
import useDebounce from "../../hooks/useDebounce"

function AllBooks() {
  const { state, dispatch } = useContext(AppContext)
  const { page, pages, maxResults, books } = state
  const debouncedTitle = useDebounce(state.titleFilter, 500)
  const debouncedAuthor = useDebounce(state.authorFilter, 500)

  const getAllBooks = async () => {
    let data = { books: [], totalResults: 0, totalPages: 0 }
    try {
      const params = {
        page,
        limit: maxResults,
        language: state.languageFilter,
        title: debouncedTitle,
        author: debouncedAuthor,
        sortOrder: state.sortOrder,
      }
      const response = await axios.get("/api/books/", { params })
      data.books = response.data.docs
      data.totalResults = response.data.totalDocs
      data.totalPages = response.data.totalPages
      if (page > response.data.totalPages) {
        dispatch({ type: "SET_PAGE", page: response.data.totalPages })
      }
      dispatch({ type: "SET_BOOKS", data })
    } catch (error) {
      console.log(error)
    }
  }
  const setPage = (page) => dispatch({ type: "SET_PAGE", page })

  useEffect(() => {
    getAllBooks()
  }, [page, state.languageFilter, state.sortOrder])
  useEffect(() => {
    if (debouncedTitle || (!debouncedTitle && books.length !== 0)) getAllBooks()
  }, [debouncedTitle])
  useEffect(() => {
    if (debouncedAuthor || (!debouncedAuthor && books.length !== 0))
      getAllBooks()
  }, [debouncedAuthor])
  useEffect(() => {
    dispatch({ type: "SET_PAGE", page: 1 })
  }, [])

  return (
    <div className={styles.container}>
      <SideBar allBooks={true} />
      <div className={styles.main}>
        {state.books.length
          ? state.books.map((item, index) => (
              <BookCard owners={true} item={item} key={`card-${index}`} />
            ))
          : null}
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
