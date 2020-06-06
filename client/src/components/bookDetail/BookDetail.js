import React, { useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import { AppContext } from "../../contexts/AppContext"
import UserDetail from "./UserDetail"
import styles from "./BookDetail.module.scss"
import axios from "axios"

function BookDetail() {
  const params = useParams()
  const { state, dispatch } = useContext(AppContext)
  const { users, info } = state.bookDetail
  const {
    title,
    authors,
    publisher,
    publishedDate,
    description,
    pageCount,
    infoLink,
    imageLinks,
  } = info

  const getBookDetail = async () => {
    try {
      const response = await axios.get(`/api/books/detail/${params.googleId}`)
      const bookDetail = response.data
      dispatch({ type: "SET_BOOK_DETAIL", bookDetail })
    } catch (error) {}
  }

  useEffect(() => {
    getBookDetail()
    return () => {
      dispatch({ type: "RESET_BOOK_DETAIL" })
    }
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.sideBar}>
        <h1 className={styles.sideHeader}>{title}</h1>
        {authors ? (
          <h2 className={styles.author}>By {authors.toString()}</h2>
        ) : null}

        <a href={infoLink}>
          {" "}
          <img
            src={imageLinks.thumbnail}
            alt="Book cover"
            style={{ width: "max-content" }}
          />
        </a>
        <h4 className={styles.data}>
          {publisher}, {publishedDate.slice(0, 4)}
          <br />
          {pageCount}pages
        </h4>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.main}>
        <h2 className={styles.mainHeader}>Owned by</h2>
        {users.map((user, index) => (
          <UserDetail key={`user-detail-${index}`} user={user} index={index} />
        ))}
      </div>
    </div>
  )
}

export default BookDetail
