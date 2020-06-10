import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { AppContext } from "../../contexts/AppContext"
import { WindowSizeContext } from "../../contexts/WindowSizeContext"
import BookCard from "../shared/BookCard"
import LoaderSpinner from "../bits/LoaderSpinner"
import Pagination from "../bits/Pagination"
import styles from "./UserPublic.module.scss"
import "../../styles/flags.css"
import placeholder from "../../styles/img/flag_placeholder.png"

function UserPublic() {
  const { state, dispatch, getUserData } = useContext(AppContext)
  const { isLG } = useContext(WindowSizeContext)
  const params = useParams()
  const { user, maxResults } = state
  const { username, city, country, books } = user
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 0)
    getUserData(params.username, setPage, setPages)
    return () => {
      dispatch({ type: "RESET_USER" })
    }
  }, [params.username, getUserData])

  const renderPage = (arr) => {
    let books = []
    const startIndex = (page - 1) * maxResults
    const endIndex = page * maxResults
    for (let i = startIndex; i < endIndex; i++) {
      arr[i] && books.push(<BookCard item={arr[i]} key={`card-${i}`} />)
    }
    return books
  }

  const UserSideBar = () => (
    <div className={styles.sideBar}>
      <h1 className={styles.sideHeader}>{username}</h1>
      <div className={styles.from}>
        <h2 className={styles.info}>From {city} </h2>
        <img
          src={placeholder}
          className={`flag flag-${country.toLowerCase()}`}
          style={{ height: "15px", width: "22px" }}
          alt="flag"
        />
      </div>
    </div>
  )
  const TopHeaderMd = () => (
    <>
      <h3 className={styles.header}>Books for trade</h3>
      <div className={styles.userDiv}>
        <h5 className={styles.info}>{username}</h5>
        <div className={styles.from}>
          <h5 className={styles.info}>{city ? ` - from ${city}` : null}</h5>
          <img
            src={placeholder}
            className={`flag flag-${country.toLowerCase()}`}
            style={{ height: "15px", width: "22px" }}
            alt="flag"
          />
        </div>
      </div>
    </>
  )
  const BooksMain = () => (
    <div className={styles.main}>{books.length ? renderPage(books) : null}</div>
  )

  return (
    <div className={styles.container}>
      {!state.isLoading && isLG ? <UserSideBar /> : null}

      {state.isLoading ? (
        <LoaderSpinner />
      ) : (
        <>
          <div className={styles.topHeader}>
            {isLG ? (
              <h3 className={styles.header}>Books for trade</h3>
            ) : (
              <TopHeaderMd />
            )}
          </div>
          <BooksMain />
        </>
      )}
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
