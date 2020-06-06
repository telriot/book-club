import React, { useContext, useEffect } from "react"
import BookSearchResults from "./BookSearchResults"
import NewBook from "./NewBook"
import Pagination from "../bits/Pagination"
import SideBar from "../layout/SideBar"
import { SearchContext } from "../../contexts/SearchContext"
import styles from "./FindBooks.module.scss"

function FindBooks() {
  const { searchState, searchDispatch } = useContext(SearchContext)
  const { page, pages, displayedResults } = searchState
  const setPage = (page) => searchDispatch({ type: "SET_PAGE", page })
  useEffect(() => {
    searchDispatch({ type: "SET_PAGE", page: 1 })
  }, [])
  return (
    <div className={styles.container}>
      <SideBar findBooks={true} />
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
