import React, { useContext } from "react"
import { SearchContext } from "../../contexts/SearchContext"
import BookCard from "./BookCard"

function BookSearchResults() {
  const { searchState, searchDispatch } = useContext(SearchContext)
  const { displayedResults } = searchState
  return (
    <div>
      {displayedResults.length
        ? displayedResults.map((item, index) => (
            <BookCard item={item} key={`card-${index}`} />
          ))
        : null}
    </div>
  )
}

export default BookSearchResults
