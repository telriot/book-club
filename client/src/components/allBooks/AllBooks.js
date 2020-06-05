import React, { useContext, useEffect } from "react"
import { AppContext } from "../../contexts/AppContext"
import BookCard from "../shared/BookCard"
import styles from "./AllBooks.module.scss"
import axios from "axios"
import SideBar from "../layout/SideBar"

function AllBooks() {
  const { state, dispatch } = useContext(AppContext)

  const getAllBooks = async () => {
    try {
      const response = await axios.get("/api/books/")
      const books = response.data
      console.log(response)
      dispatch({ type: "SET_BOOKS", books })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllBooks()
  }, [])

  return (
    <div className={styles.container}>
      <SideBar />
      <div className={styles.main}>
        {state.books.length
          ? state.books.map((item, index) => (
              <BookCard owners={true} item={item} key={`card-${index}`} />
            ))
          : null}
      </div>
    </div>
  )
}

export default AllBooks
