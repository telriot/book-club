import React, { useContext, useState } from "react"
import styles from "./SideBar.module.scss"
import { AppContext } from "../../contexts/AppContext"
import SideBarBtn from "./SideBarBtn"
import LatestBooks from "../findBooks/LatestBooks"
import SelectFilter from "../bits/SelectFilter"
import { SearchContext } from "../../contexts/SearchContext"
import TextFilter from "../bits/TextFilter"
import languages from "../../data/languages.json"

function SideBar(props) {
  const { state, dispatch } = useContext(AppContext)
  const { searchState, searchDispatch } = useContext(SearchContext)
  const { myBooks, trades, findBooks, allBooks } = props
  const { inOut } = state

  const sortOptions = [
    {
      code: "",
      name: "Any Order",
    },

    {
      code: "latest",
      name: "Latest entries",
    },
    {
      code: "alphabetical",
      name: "Author A-Z",
    },
    {
      code: "length",
      name: "Pages",
    },
    {
      code: "year",
      name: "Published Date",
    },
  ]
  const handleNewBook = () => {
    dispatch({ type: "TOGGLE_IS_ADDING" })
    searchDispatch({ type: "RESET_RESULTS" })
  }
  const handleInOut = () => {
    dispatch({ type: "TOGGLE_IN_OUT" })
  }
  const handleFilterNewBook = (value) => {
    searchDispatch({ type: "SET_LANGUAGE_FILTER", language: value })
  }
  const handleFilterAllBooks = (value) => {
    dispatch({ type: "SET_LANGUAGE_FILTER", language: value })
  }
  const handleTitleFilter = (value) => {
    dispatch({ type: "SET_TITLE_FILTER", title: value })
  }
  const handleAuthorFilter = (value) => {
    dispatch({ type: "SET_AUTHOR_FILTER", author: value })
  }
  const handleSortOrder = (sortOrder) => {
    dispatch({ type: "SET_SORT_SERVER_SIDE", sortOrder })
  }
  return (
    <div className={styles.container}>
      {trades ? (
        <>
          {inOut === "in" ? (
            <h2 className={styles.selectorAlt} onClick={handleInOut}>
              Inbound Trades
            </h2>
          ) : (
            <h2 className={styles.selector} onClick={handleInOut}>
              Outbound Trades
            </h2>
          )}
          <h2 className={styles.header}>Sort by</h2>
          <SideBarBtn myTrades={true} text="Title" param="title" />
          <SideBarBtn myTrades={true} text="Status" param="status" />
          <SideBarBtn myTrades={true} text="User" param="username" />
          <SideBarBtn myTrades={true} text="Date" param="date" />
        </>
      ) : myBooks ? (
        <>
          <h2 className={styles.selector} onClick={handleNewBook}>
            Add a Book
          </h2>

          <h2 className={styles.header}>Sort by</h2>
          <SideBarBtn text="Title" param="title" />
          <SideBarBtn text="Author" param="authors" />
          <SideBarBtn text="Language" param="language" />
          <SideBarBtn text="Genre" param="categories" />
          <SideBarBtn text="Length" param="pageCount" />
        </>
      ) : findBooks ? (
        <>
          <h2 className={styles.selector} onClick={handleNewBook}>
            My Collection
          </h2>{" "}
          <LatestBooks />
          <h2 className={styles.header}>Filter By Language</h2>
          <SelectFilter
            options={languages}
            handleChange={handleFilterNewBook}
            value={searchState.languageFilter}
            placeholder="Pick a Language"
          />
        </>
      ) : allBooks ? (
        <>
          <h2 className={styles.header}>Find a book</h2>

          <SelectFilter
            options={languages}
            handleChange={handleFilterAllBooks}
            value={state.languageFilter}
            placeholder="Pick a Language"
          />
          <TextFilter
            handleChange={handleTitleFilter}
            value={state.titleFilter}
            placeholder="Filter by title"
            label="Title"
            name="titleFilter"
          />
          <TextFilter
            handleChange={handleAuthorFilter}
            value={state.authorFilter}
            placeholder="Filter by author"
            label="Author"
            name="authorFilter"
          />
          <SelectFilter
            options={sortOptions}
            handleChange={handleSortOrder}
            value={state.sortOrder}
            placeholder="Sort By"
          />
        </>
      ) : null}
    </div>
  )
}

export default SideBar
