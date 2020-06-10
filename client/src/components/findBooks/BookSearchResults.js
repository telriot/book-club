import React, { useContext, useEffect } from "react"
import { SearchContext } from "../../contexts/SearchContext"
import BookCard from "../shared/BookCard"
import Loader from "react-loader-spinner"
import styles from "./BookSearchResults.module.scss"
import { AppContext } from "../../contexts/AppContext"
import LoaderSpinner from "../bits/LoaderSpinner"

function BookSearchResults() {
  const { state } = useContext(AppContext)
  const { searchState, searchDispatch } = useContext(SearchContext)
  const { displayedResults } = searchState
  useEffect(() => searchDispatch({ type: "RESET_RESULTS" }), [])
  return (
    <div className={styles.container}>
      {state.isLoading && searchState.display ? (
        <LoaderSpinner />
      ) : displayedResults.length ? (
        displayedResults.map((item, index) => (
          <BookCard addBtn={true} item={item} key={`card-${index}`} />
        ))
      ) : null}
    </div>
  )
}

export default BookSearchResults
