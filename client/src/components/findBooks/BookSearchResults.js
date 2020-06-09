import React, { useContext, useEffect } from "react"
import { SearchContext } from "../../contexts/SearchContext"
import BookCard from "../shared/BookCard"
import Loader from "react-loader-spinner"
import styles from "./BookSearchResults.module.scss"
import { AppContext } from "../../contexts/AppContext"

function BookSearchResults() {
  const { state } = useContext(AppContext)
  const { searchState, searchDispatch } = useContext(SearchContext)
  const { displayedResults } = searchState
  useEffect(() => searchDispatch({ type: "RESET_RESULTS" }), [])
  return (
    <div className={styles.container}>
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
      ) : displayedResults.length ? (
        displayedResults.map((item, index) => (
          <BookCard addBtn={true} item={item} key={`card-${index}`} />
        ))
      ) : null}
    </div>
  )
}

export default BookSearchResults
