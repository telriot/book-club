import React, { useContext, useEffect } from "react"
import { AppContext } from "../../contexts/AppContext"
import axios from "axios"

function AllBooks() {
  const { state, dispatch } = useContext(AppContext)

  const getAllBooks = async () => {
    const response = await axios.get("/api/books/")
    const { books } = response.data
    console.log(response)
    dispatch({ type: "SET_ALL_BOOKS", books })
  }

  useEffect(() => {
    console.log("allbooks effect")
    getAllBooks()
  }, [])

  return <div></div>
}

export default AllBooks
