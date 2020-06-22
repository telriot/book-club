import React from "react"
import styles from "./Pagination.module.scss"
import {
  MdChevronLeft,
  MdChevronRight,
  MdLastPage,
  MdFirstPage,
} from "react-icons/md"

function PaginationItem(props) {
  const { page, type, pages, setPage, currentPage } = props
  const handlePageSelection = (page) => () => {
    if (page > pages) page = pages
    if (page < 1) page = 1
    setPage(page)
  }

  const PageItem = () => (
    <div
      tabIndex={0}
      className={currentPage === page ? styles.itemActive : styles.item}
      onClick={handlePageSelection(page)}
    >
      {page}
    </div>
  )

  const PagePrev = () => (
    <div
      tabIndex={0}
      className={styles.itemIcon}
      onClick={handlePageSelection(currentPage - 1)}
    >
      <MdChevronLeft />
    </div>
  )
  const PageNext = () => (
    <div
      tabIndex={0}
      className={styles.itemIcon}
      onClick={handlePageSelection(currentPage + 1)}
    >
      <MdChevronRight />
    </div>
  )
  const PageFirst = () => (
    <div
      tabIndex={0}
      className={styles.itemIcon}
      onClick={handlePageSelection(1)}
    >
      <MdFirstPage />
    </div>
  )
  const PageLast = () => (
    <div
      tabIndex={0}
      className={styles.itemIcon}
      onClick={handlePageSelection(currentPage + 5)}
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
