import React, { useContext } from "react"
import styles from "./Pagination.module.scss"
import { SearchContext } from "../../contexts/SearchContext"
import {
  MdChevronLeft,
  MdChevronRight,
  MdLastPage,
  MdFirstPage,
} from "react-icons/md"

function PaginationItem(props) {
  const { searchState, searchDispatch } = useContext(SearchContext)
  //const { pages } = searchState

  const { page, type } = props
  const { pages } = searchState
  const handlePageSelection = (page) => () => {
    if (page > pages) page = pages
    if (page < 1) page = 1
    searchDispatch({ type: "SET_PAGE", page })
  }

  const PageItem = () => (
    <div
      className={searchState.page === page ? styles.itemActive : styles.item}
      onClick={handlePageSelection(page)}
    >
      {page}
    </div>
  )

  const PagePrev = () => (
    <div
      className={styles.itemIcon}
      onClick={handlePageSelection(searchState.page - 1)}
    >
      <MdChevronLeft />
    </div>
  )
  const PageNext = () => (
    <div
      className={styles.itemIcon}
      onClick={handlePageSelection(searchState.page + 1)}
    >
      <MdChevronRight />
    </div>
  )
  const PageFirst = () => (
    <div className={styles.itemIcon} onClick={handlePageSelection(1)}>
      <MdFirstPage />
    </div>
  )
  const PageLast = () => (
    <div
      className={styles.itemIcon}
      onClick={handlePageSelection(searchState.page + 5)}
    >
      <MdLastPage />
    </div>
  )

  return type === "page" ? (
    <PageItem />
  ) : type === "prev" ? (
    <PagePrev />
  ) : type === "next" ? (
    <PageNext />
  ) : type === "first" ? (
    <PageFirst />
  ) : type === "last" ? (
    <PageLast />
  ) : null
}

export default PaginationItem
