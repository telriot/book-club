import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { AppContext } from "../../contexts/AppContext"
import BookCard from "../shared/BookCard"
import Pagination from "../bits/Pagination"
import styles from "./UserPublic.module.scss"
import "../../styles/flags.css"
import placeholder from "../../styles/img/flag_placeholder.png"
import axios from "axios"

function UserPublic() {
  const { state, dispatch } = useContext(AppContext)
  const params = useParams()
  const { user, maxResults } = state
  const { username, city, country, books } = user
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(0)

  const getUser = async () => {
    try {
      const response = await axios.get(`/api/users/public/${params.username}`)
      const user = response.data
      console.log(user)
      setPage(1)
      setPages(Math.ceil(user.books.length / maxResults))
      dispatch({ type: "SET_USER", user })
    } catch (error) {
      console.log(error)
    }
  }
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
    getUser()
    return () => {
      dispatch({ type: "RESET_USER" })
    }
  }, [])
  return (
    <div className={styles.container}>
      <div className={styles.sideBar}>
        <h1 className={styles.sideHeader}>{username}</h1>
        <div className={styles.from}>
          <h2 className={styles.sideInfo}>From {city} </h2>
          <img
            src={placeholder}
            className={`flag flag-${country.toLowerCase()}`}
            style={{ height: "15px", width: "22px" }}
          />
        </div>
      </div>
      <h3 className={styles.header}>Books for trade</h3>
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

export default UserPublic
