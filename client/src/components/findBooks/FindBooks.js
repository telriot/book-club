import React from "react"
import BookSearchResults from "./BookSearchResults"
import LanguageFilter from "./LanguageFilter"
import LatestBooks from "./LatestBooks"
import MaxResults from "./MaxResults"
import NewBook from "./NewBook"
import Pagination from "../bits/Pagination"

import styles from "./FindBooks.module.scss"

function FindBooks() {
  return (
    <div className={styles.container}>
      <div className={styles.sideBar}>
        <LatestBooks />
        <LanguageFilter />
        <MaxResults />
      </div>
      <NewBook />
      <BookSearchResults />
      <Pagination />
    </div>
  )
}

export default FindBooks
