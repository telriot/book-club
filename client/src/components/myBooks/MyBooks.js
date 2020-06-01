import React, { useContext, useEffect } from "react"
import axios from "axios"
import { AppContext } from "../../contexts/AppContext"
import { AuthContext } from "../../contexts/AuthContext"
import NewBook from "./NewBook"
import BookSearchResults from "./BookSearchResults"

function MyBooks() {
  const { state, dispatch } = useContext(AppContext)
  const { authState, authDispatch } = useContext(AuthContext)
  const getMyBooks = async () => {
    try {
      const response = await axios.get(`/api/books/${authState.username}`)
      dispatch({ type: "SET_MY_BOOKS" })
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    authState.username && getMyBooks()
  }, [authState, getMyBooks])
  return (
    <div>
      <NewBook />
      <BookSearchResults />
    </div>
  )
}

export default MyBooks
