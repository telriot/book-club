import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { AppContext } from "../../contexts/AppContext"
import { WindowSizeContext } from "../../contexts/WindowSizeContext"
import BookCard from "../shared/BookCard"
import Pagination from "../bits/Pagination"
import placeholder from "../../styles/img/flag_placeholder.png"
import styles from "./ConfirmationScreen.module.scss"

function ConfirmationScreen() {
  const history = useHistory()
  const { state, dispatch, getUserData } = useContext(AppContext)
  const { isLG } = useContext(WindowSizeContext)
  const { user, maxResults } = state
  const { username, city, country, books } = user
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(0)

  const renderPage = (arr) => {
    let books = []
    const startIndex = (page - 1) * maxResults
    const endIndex = page * maxResults
    for (let i = startIndex; i < endIndex; i++) {
      arr[i] && books.push(<BookCard item={arr[i]} key={`card-${i}`} />)
    }
    return books
  }

  useEffect(() => {
    if (!state.isConfirming) {
      history.push("/my-trades")
    } else {
      getUserData(state.tradeToConfirm.author.username, setPage, setPages)
    }
    return () => {
      dispatch({ type: "RESET_USER" })
    }
  }, [])

  return (
    <div className={styles.container}>
      <div className={isLG ? styles.sideBar : styles.headerTop}>
        <h1 className={styles.header}>Trade with</h1>
        <h1 className={styles.username}>{username}</h1>
        <div className={styles.location}>
          <p>From {city} </p>
          <img
            src={placeholder}
            className={`flag flag-${country.toLowerCase()}`}
            style={{ height: "15px", width: "22px" }}
          />
        </div>
      </div>

      <div className={styles.main}>
        {books.length ? renderPage(books) : null}
      </div>
      <Pagination
        page={page}
        pages={pages}
        displayedResults={books}
        setPage={setPage}
      />
    </div>
  )
}

export default ConfirmationScreen
