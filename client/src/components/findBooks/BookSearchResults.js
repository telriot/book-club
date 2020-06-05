import React, { useContext } from "react"
import { SearchContext } from "../../contexts/SearchContext"
import BookCard from "../shared/BookCard"
import styles from "./BookSearchResults.module.scss"

function BookSearchResults() {
  const { searchState } = useContext(SearchContext)
  const { displayedResults } = searchState
  return (
    <div className={styles.container}>
      {displayedResults.length
        ? displayedResults.map((item, index) => (
            <BookCard addBtn={true} item={item} key={`card-${index}`} />
          ))
        : null}
    </div>
  )
}

export default BookSearchResults
