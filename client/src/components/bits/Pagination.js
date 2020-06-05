import React, { useContext } from "react"
import PaginationItem from "./PaginationItem"
import styles from "./Pagination.module.scss"
import { SearchContext } from "../../contexts/SearchContext"

function Pagination() {
  const { searchState, searchDispatch } = useContext(SearchContext)
  const { page, pages } = searchState
  const paginationItems = () => {
    let items = []
    if (pages > 1 && pages <= 5 && page < 4) {
      for (let number = 1; number <= pages; number++) {
        number <= pages && items.push(number)
      }
    } else if (pages > 1 && page < 4) {
      for (let number = 1; number <= 5; number++) {
        number <= pages && items.push(number)
      }
    } else if (pages > 1 && page >= 4) {
      for (let number = page - 2; number <= page + 2; number++) {
        number <= pages && items.push(number)
      }
    }
    return items
  }
  return searchState.displayedResults.length ? (
    <div className={styles.wrapper}>
      {page !== 1 ? <PaginationItem type="first" /> : null}
      {page !== 1 ? <PaginationItem type="prev" /> : null}

      {paginationItems().map((page, index) => (
        <PaginationItem key={`paginator-${index}`} type="page" page={page} />
      ))}
      {page !== searchState.pages ? <PaginationItem type="next" /> : null}
      {page !== searchState.pages ? <PaginationItem type="last" /> : null}
    </div>
  ) : null
}

export default Pagination
