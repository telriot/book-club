import React, { useContext, useState } from "react"
import styles from "./SideBar.module.scss"
import { AppContext } from "../../contexts/AppContext"
import SideBarBtn from "./SideBarBtn"
import LatestBooks from "../findBooks/LatestBooks"
import SelectFilter from "../bits/SelectFilter"
import { SearchContext } from "../../contexts/SearchContext"
import TextFilter from "../bits/TextFilter"
import languages from "../../data/languages.json"
import sortOptions from "../../data/sortOptions.json"
import sortOptionsMyBooks from "../../data/sortOptionsMyBooks.json"
import sortOptionsTrades from "../../data/sortOptionsTrades.json"

function SideBar(props) {
  const { state, dispatch, handleFilter, handleInOut } = useContext(AppContext)
  const { searchState, searchDispatch, handleFilterNewBook } = useContext(
    SearchContext
  )
  const { myBooks, trades, findBooks, allBooks } = props
  const { inOut } = state

  const handleNewBook = () => {
    dispatch({ type: "TOGGLE_IS_ADDING" })
    searchDispatch({ type: "RESET_RESULTS" })
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
          {sortOptionsTrades.map((option, index) => (
            <SideBarBtn
              key={`btn-${index}`}
              myTrades={true}
              text={option.name}
              param={option.code}
            />
          ))}
        </>
      ) : myBooks ? (
        <>
          <h2 className={styles.selector} onClick={handleNewBook}>
            Add a Book
          </h2>

          <h2 className={styles.header}>Sort by</h2>
          {sortOptionsMyBooks.map((option, index) => (
            <SideBarBtn
              key={`btn-${index}`}
              text={option.name}
              param={option.code}
            />
          ))}
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
            handleChange={handleFilter.allBooks}
            value={state.languageFilter}
            placeholder="Pick a Language"
          />
          <TextFilter
            handleChange={handleFilter.titleFilter}
            value={state.titleFilter}
            placeholder="Filter by title"
            label="Title"
            name="titleFilter"
          />
          <TextFilter
            handleChange={handleFilter.authorFilter}
            value={state.authorFilter}
            placeholder="Filter by author"
            label="Author"
            name="authorFilter"
          />
          <SelectFilter
            options={sortOptions}
            handleChange={handleFilter.sortOrder}
            value={state.sortOrder}
            placeholder="Sort By"
          />
        </>
      ) : null}
    </div>
  )
}

export default SideBar
