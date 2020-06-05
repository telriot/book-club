import React, { useContext, useEffect } from "react"
import { AppContext } from "../../contexts/AppContext"
import { AuthContext } from "../../contexts/AuthContext"
import BookCard from "../shared/BookCard"
import styles from "./MyBooks.module.scss"
import axios from "axios"
import SideBar from "../layout/SideBar"
import FindBooks from "../findBooks/FindBooks"
import NewBook from "../findBooks/NewBook"
import BookSearchResults from "../findBooks/BookSearchResults"

function MyBooks() {
  const { state, dispatch } = useContext(AppContext)
  const { isAdding } = state
  const { authState } = useContext(AuthContext)

  const getMyBooks = async () => {
    try {
      const response = await axios.get(`/api/books/${authState.username}`)
      const books = response.data
      dispatch({ type: "SET_BOOKS", books })
    } catch (error) {
      console.log(error)
    }
    return () => {
      dispatch({ type: "RESET_BOOKS" })
    }
  }

  useEffect(() => {
    authState.username && getMyBooks()
  }, [authState, isAdding])
  return (
    <div className={styles.container}>
      <SideBar newBook={true} />
      {isAdding ? (
        <>
          <NewBook /> <BookSearchResults />
        </>
      ) : (
        <div className={styles.main}>
          {state.books.length
            ? state.books.map((item, index) => (
                <BookCard removeBtn={true} item={item} key={`card-${index}`} />
              ))
            : null}
        </div>
      )}
    </div>
  )
}

export default MyBooks
