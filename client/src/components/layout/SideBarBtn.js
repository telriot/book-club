import React, { useContext, useState, useEffect } from "react"
import styles from "./SideBar.module.scss"
import { AppContext } from "../../contexts/AppContext"
import { SearchContext } from "../../contexts/SearchContext"
import { deepCopy } from "../../helpers/functions"
import sortOptionsMyBooks from "../../data/sortOptionsMyBooks.json"
import sortOptionsTrades from "../../data/sortOptionsTrades.json"
import SelectFilter from "../bits/SelectFilter"
import { WindowSizeContext } from "../../contexts/WindowSizeContext"

function SideBarBtn(props) {
  const { text, param, myTrades, dropdown } = props
  const { state, dispatch } = useContext(AppContext)
  const { searchState, searchDispatch } = useContext(SearchContext)
  const { books, isAdding, inOut } = state
  const { displayedResults } = searchState
  const [selectSort, setSelectSort] = useState("")
  const [selectSortTrades, setSelectSortTrades] = useState("")

  const { isXS } = useContext(WindowSizeContext)

  const handleSort = (sortParam, books, search) => () => {
    console.log(sortParam)
    let booksCopy = deepCopy(books)
    if (sortParam === "title" || sortParam === "language") {
      booksCopy.sort((a, b) => {
        return a.info[sortParam].localeCompare(b.info[sortParam])
      })
    } else if (sortParam === "pageCount") {
      booksCopy.sort((a, b) => {
        a = a.info[sortParam] ? a.info[sortParam] : 0
        b = b.info[sortParam] ? b.info[sortParam] : 0
        return a - b
      })
    } else {
      booksCopy.sort((a, b) => {
        a = a.info[sortParam] ? a.info[sortParam].toString() : "z"
        b = b.info[sortParam] ? b.info[sortParam].toString() : "z"
        return a.localeCompare(b)
      })
    }
    dispatch({ type: "SET_SORT", sort: sortParam, sortedBooks: booksCopy })
    search && searchDispatch({ type: "SET_DISPLAY", display: booksCopy })
  }
  const handleSortTrades = (sortParam, trades) => () => {
    let tradesCopy = deepCopy(trades)
    if (sortParam === "status") {
      tradesCopy.requestsIn.sort((a, b) =>
        a[sortParam].localeCompare(b[sortParam])
      )
      tradesCopy.requestsOut.sort((a, b) =>
        a[sortParam].localeCompare(b[sortParam])
      )
    } else if (sortParam === "username") {
      tradesCopy.requestsIn.sort((a, b) =>
        a.author[sortParam].localeCompare(b.author[sortParam])
      )
      tradesCopy.requestsOut.sort((a, b) =>
        a.receiver[sortParam].localeCompare(b.receiver[sortParam])
      )
    } else if (sortParam === "title") {
      tradesCopy.requestsIn.sort((a, b) =>
        a.bookIn[sortParam].localeCompare(b.bookIn[sortParam])
      )
      tradesCopy.requestsOut.sort((a, b) =>
        a.bookIn[sortParam].localeCompare(b.bookIn[sortParam])
      )
    } else if (sortParam === "date") {
      tradesCopy.requestsIn.sort((a, b) => {
        let dateA = new Date(a[sortParam])
        let dateB = new Date(b[sortParam])
        return dateB - dateA
      })
      tradesCopy.requestsOut.sort((a, b) => {
        let dateA = new Date(a[sortParam])
        let dateB = new Date(b[sortParam])
        return dateB - dateA
      })
    }

    dispatch({
      type: "SET_TRADES_SORT",
      data: { sortedTrades: tradesCopy, sortParam },
    })
  }
  const btnClassName = (name) => {
    if (myTrades) {
      if (inOut === "in") {
        return state.tradesSort === param
          ? styles.buttonActiveAlt
          : styles.buttonAlt
      } else {
        return state.tradesSort === param ? styles.buttonActive : styles.button
      }
    } else {
      return state.sort === name ? styles.buttonActive : styles.button
    }
  }
  useEffect(() => {
    if (selectSort) {
      state.isAdding
        ? handleSort(selectSort, books, true)()
        : handleSort(selectSort, books)()
    }
  }, [selectSort])
  useEffect(() => {
    selectSortTrades && handleSortTrades(selectSortTrades, state.trades)()
  }, [selectSortTrades])
  return dropdown === "my-books" ? (
    <SelectFilter
      options={sortOptionsMyBooks}
      handleChange={setSelectSort}
      value={selectSort}
      size={isXS ? "xs" : "small"}
      placeholder="Sort Results"
    />
  ) : dropdown === "trades" ? (
    <SelectFilter
      options={sortOptionsTrades}
      handleChange={setSelectSortTrades}
      value={selectSort}
      size={isXS ? "xs" : "small"}
      placeholder="Sort Results"
    />
  ) : (
    <button
      onClick={
        myTrades
          ? handleSortTrades(param, state.trades)
          : isAdding
          ? handleSort(param, displayedResults, true)
          : handleSort(param, books)
      }
      className={btnClassName(param)}
    >
      {text}
    </button>
  )
}

export default SideBarBtn
