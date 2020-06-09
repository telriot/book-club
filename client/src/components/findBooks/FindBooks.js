import React, { useContext, useEffect } from "react"
import BookSearchResults from "./BookSearchResults"
import NewBook from "./NewBook"
import Pagination from "../bits/Pagination"
import SideBar from "../layout/SideBar"
import { SearchContext } from "../../contexts/SearchContext"
import styles from "./FindBooks.module.scss"
import { AppContext } from "../../contexts/AppContext"
import { WindowSizeContext } from "../../contexts/WindowSizeContext"

function FindBooks() {
  const { state, dispatch } = useContext(AppContext)
  const { searchState, searchDispatch } = useContext(SearchContext)
  const { page, pages, displayedResults } = searchState
  const { isMD, isLG } = useContext(WindowSizeContext)
  const setPage = (page) => searchDispatch({ type: "SET_PAGE", page })

  useEffect(() => {
    window.scrollTo(0, 0)
    searchDispatch({ type: "SET_PAGE", page: 1 })
    return () =>
      state.isAdding
        ? dispatch({ type: "TOGGLE_IS_ADDING", close: true })
        : null
  }, [state.isAdding])
  return (
    <div className={styles.container}>
      {isMD ? <SideBar findBooks={true} /> : null}
      {!isLG ? <h2 className={styles.header}>Add new books</h2> : null}
      <NewBook />
      <BookSearchResults />
      <Pagination
        page={page}
        pages={pages}
        displayedResults={displayedResults}
        setPage={setPage}
      />
    </div>
  )
}

export default FindBooks
