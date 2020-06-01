import React, { useContext, useState, useEffect } from "react"
import { AppContext } from "../../contexts/AppContext"
import styles from "./NewBook.module.scss"
import axios from "axios"
import Button from "../bits/Button"
import useDebounce from "../../hooks/useDebounce"
import DropdownInput from "../bits/DropdownInput"
import { SearchContext } from "../../contexts/SearchContext"

function NewBook() {
  const { state, dispatch } = useContext(AppContext)
  const { searchState, searchDispatch } = useContext(SearchContext)
  const { input, results, isSearching } = searchState
  const searchTerm = useDebounce(input, 500)
  const GOOGLE_API_URL = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=AIzaSyA-VAYQEfoIlFHypONP6mr0GlIYKnUMeT4`

  const handleAdd = () => {}

  const findBooks = async () => {
    searchDispatch({ type: "TOGGLE_IS_SEARCHING" })
    try {
      const response = await axios.get(`${GOOGLE_API_URL}`)
      const data = response.data.items.map((item) => item.volumeInfo)
      searchDispatch({ type: "SET_RESULTS", data })
    } catch (error) {
      console.log(error)
      searchDispatch({ type: "SET_RESULTS", data: [] })
    }
  }

  useEffect(() => {
    console.log("fired", searchTerm)
    searchTerm && findBooks()
  }, [searchTerm])

  return (
    <div className={styles.container}>
      <DropdownInput placeholder="Find a book" />
    </div>
  )
}

export default NewBook
