import React, { useContext, useEffect, useCallback } from "react"
import { SearchContext } from "../../contexts/SearchContext"
import DropdownInput from "../bits/DropdownInput"
import useDebounce from "../../hooks/useDebounce"
import styles from "./NewBook.module.scss"
import axios from "axios"
import { AppContext } from "../../contexts/AppContext"

function NewBook() {
  const { dispatch } = useContext(AppContext)
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

  const findBooks = useCallback(
    async (url) => {
      dispatch({ type: "SET_IS_LOADING", isLoading: true })

      searchDispatch({ type: "TOGGLE_IS_SEARCHING" })
      let data = { results: [], totalItems: 0, totalPages: 0 }
      try {
        const response = await axios.get(`${url}`)
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
        dispatch({ type: "SET_IS_LOADING", isLoading: false })
      } catch (error) {
        console.log(error)
        searchDispatch({ type: "SET_RESULTS", data })
        dispatch({ type: "SET_IS_LOADING", isLoading: false })
      }
    },
    [searchState.maxResults]
  )

  useEffect(() => {
    searchTerm.length > 2 && findBooks(GOOGLE_API_URL)
  }, [searchTerm, findBooks])

  useEffect(() => {
    if (languageFilter && searchTerm.length > 2) {
      searchDispatch({ type: "SET_PAGE", page: 1 })
      findBooks(GOOGLE_API_URL)
      searchDispatch({ type: "SET_DISPLAY", display: true })
    }
  }, [languageFilter, findBooks, searchTerm])

  useEffect(() => {
    if (searchState.page && searchTerm.length > 2) {
      findBooks(GOOGLE_API_URL)
      searchDispatch({ type: "SET_DISPLAY", display: true })
    }
  }, [searchState.page, findBooks])
  return (
    <div className={styles.container}>
      <DropdownInput placeholder="Find a book" />
    </div>
  )
}

export default NewBook
