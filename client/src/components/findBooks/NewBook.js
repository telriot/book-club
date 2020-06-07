import React, { useContext, useEffect } from "react"
import { SearchContext } from "../../contexts/SearchContext"
import DropdownInput from "../bits/DropdownInput"
import useDebounce from "../../hooks/useDebounce"
import styles from "./NewBook.module.scss"
import axios from "axios"

function NewBook() {
  const { searchState, searchDispatch } = useContext(SearchContext)
  const { input, languageFilter } = searchState
  const searchTerm = useDebounce(input, 500)
  const startIndex = `&startIndex=${
    (searchState.page - 1) * searchState.maxResults
  }`
  const languageRestrictions = languageFilter
    ? `&langRestrict=${languageFilter}`
    : ""
  const maxResults = `&maxResults=${searchState.maxResults}`

  const GOOGLE_API_URL = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}${languageRestrictions}${startIndex}${maxResults}&key=AIzaSyA-VAYQEfoIlFHypONP6mr0GlIYKnUMeT4`

  const findBooks = async () => {
    searchDispatch({ type: "TOGGLE_IS_SEARCHING" })

    let data = { results: [], totalItems: 0, totalPages: 0 }
    try {
      const response = await axios.get(`${GOOGLE_API_URL}`)
      data.results = response.data.items.map((item) => ({
        info: item.volumeInfo,
        googleId: item.id,
      }))
      data.totalItems = response.data.totalItems
      data.totalPages = Math.ceil(
        response.data.totalItems / searchState.maxResults
      )
      searchDispatch({
        type: "SET_RESULTS",
        data,
      })
    } catch (error) {
      console.log(error)
      searchDispatch({ type: "SET_RESULTS", data })
    }
  }

  useEffect(() => {
    searchTerm.length > 2 && findBooks()
  }, [searchTerm])

  useEffect(() => {
    if (languageFilter && searchTerm.length > 2) {
      searchDispatch({ type: "SET_PAGE", page: 1 })
      findBooks()
      searchDispatch({ type: "SET_DISPLAY", display: true })
    }
  }, [languageFilter])

  useEffect(() => {
    if (searchState.page && searchTerm.length > 2) {
      findBooks()
      searchDispatch({ type: "SET_DISPLAY", display: true })
    }
  }, [searchState.page])
  return (
    <div className={styles.container}>
      <DropdownInput placeholder="Find a book" />
    </div>
  )
}

export default NewBook
