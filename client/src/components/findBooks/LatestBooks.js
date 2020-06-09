import React, { useContext, useEffect, useState, useCallback } from "react"
import { AppContext } from "../../contexts/AppContext"
import { AuthContext } from "../../contexts/AuthContext"
import axios from "axios"

import styles from "./LatestBooks.module.scss"
function LatestBooks() {
  const { state, dispatch } = useContext(AppContext)
  const { authState } = useContext(AuthContext)
  const { books } = state
  const [display, setDisplay] = useState([])

  const getMyBooks = useCallback(async (username) => {
    try {
      const response = await axios.get(`/api/books/${username}`)
      const books = response.data
      dispatch({ type: "SET_BOOKS", data: { books } })
    } catch (error) {
      console.log(error)
    }
    return () => {
      dispatch({ type: "RESET_BOOKS" })
    }
  }, [])

  const getLastFive = (arr) => {
    let display = []
    const number = arr.length < 5 ? arr.length : 5
    for (let i = arr.length; i > arr.length - number; i--) {
      display.push(
        <p className={styles.text} key={`latest-${i}`}>
          {arr[i - 1].info.title}
        </p>
      )
    }
    setDisplay(display)
  }

  useEffect(() => {
    authState.username && getMyBooks(authState.username)
  }, [authState, getMyBooks])

  useEffect(() => {
    books.length && getLastFive(books)
  }, [books])

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>My latest additions</h2>
      {display}
    </div>
  )
}

export default LatestBooks
