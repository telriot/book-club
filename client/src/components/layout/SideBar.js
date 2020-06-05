import React, { useContext, useState } from "react"
import styles from "./SideBar.module.scss"
import { AppContext } from "../../contexts/AppContext"
import SideBarBtn from "./SideBarBtn"
import { SearchContext } from "../../contexts/SearchContext"

function SideBar(props) {
  const { state, dispatch } = useContext(AppContext)
  const { searchState, searchDispatch } = useContext(SearchContext)
  const { newBook, trades } = props
  const { isAdding, inOut } = state
  const handleNewBook = () => {
    dispatch({ type: "TOGGLE_IS_ADDING" })
    searchDispatch({ type: "RESET_RESULTS" })
  }
  const handleInOut = () => {
    dispatch({ type: "TOGGLE_IN_OUT" })
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
      ) : (
        <>
          {newBook ? (
            isAdding ? (
              <h2 className={styles.selector} onClick={handleNewBook}>
                My Collection
              </h2>
            ) : (
              <h2 className={styles.selector} onClick={handleNewBook}>
                Add a Book
              </h2>
            )
          ) : null}

          <h2 className={styles.header}>Sort by</h2>
          <SideBarBtn text="Title" param="title" />
          <SideBarBtn text="Author" param="authors" />
          <SideBarBtn text="Language" param="language" />
          <SideBarBtn text="Genre" param="categories" />
          <SideBarBtn text="Length" param="pageCount" />
        </>
      )}
    </div>
  )
}

export default SideBar
