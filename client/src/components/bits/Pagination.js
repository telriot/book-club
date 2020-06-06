import React from "react"
import PaginationItem from "./PaginationItem"
import styles from "./Pagination.module.scss"

function Pagination(props) {
  const { page, pages, displayedResults, setPage } = props
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
  return displayedResults.length ? (
    <div className={styles.wrapper}>
      {page !== 1 ? (
        <PaginationItem
          currentPage={props.page}
          pages={pages}
          setPage={setPage}
          type="first"
        />
      ) : null}
      {page !== 1 ? (
        <PaginationItem
          currentPage={props.page}
          pages={pages}
          setPage={setPage}
          type="prev"
        />
      ) : null}

      {paginationItems().map((page, index) => (
        <PaginationItem
          pages={pages}
          setPage={setPage}
          key={`paginator-${index}`}
          type="page"
          page={page}
          currentPage={props.page}
        />
      ))}
      {page !== pages ? (
        <PaginationItem
          currentPage={props.page}
          pages={pages}
          setPage={setPage}
          type="next"
        />
      ) : null}
      {page !== pages ? (
        <PaginationItem
          currentPage={props.page}
          pages={pages}
          setPage={setPage}
          type="last"
        />
      ) : null}
    </div>
  ) : null
}

export default Pagination
