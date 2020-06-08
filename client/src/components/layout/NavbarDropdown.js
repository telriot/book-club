import React, { useContext } from "react"
import styles from "./NavbarDropdown.module.scss"
import { Link, useParams } from "react-router-dom"
import { AppContext } from "../../contexts/AppContext"
import { AuthContext } from "../../contexts/AuthContext"
import SelectFilter from "../bits/SelectFilter"
import { SearchContext } from "../../contexts/SearchContext"
import { WindowSizeContext } from "../../contexts/WindowSizeContext"
import TextFilter from "../bits/TextFilter"
import languages from "../../data/languages.json"
import sortOptions from "../../data/sortOptions.json"
import SideBarBtn from "./SideBarBtn"
function NavbarDropdown(props) {
  const { isOpen } = props
  const { state, dispatch, handleFilter, handleInOut } = useContext(AppContext)
  const { authState, authDispatch, handleLogout } = useContext(AuthContext)
  const params = useParams()
  const { searchState, searchDispatch, handleFilterNewBook } = useContext(
    SearchContext
  )
  const { isXS, isSM, isMD, isLG } = useContext(WindowSizeContext)
  const handleNewBook = () => {
    dispatch({ type: "TOGGLE_IS_ADDING" })
    searchDispatch({ type: "RESET_RESULTS" })
  }
  const NavBottom = () => (
    <ul className={styles.navBottom}>
      <li className={styles.navItem}>
        <Link className={styles.navItemText} name="my-profile" to="/my-profile">
          My Profile
        </Link>
      </li>
      <li className={styles.navItem}>
        <Link
          className={styles.navItemText}
          name="logout"
          onClick={handleLogout}
          to="#"
        >
          Log Out
        </Link>
      </li>
    </ul>
  )
  return (
    <div className={isOpen ? styles.navCollapsible : styles.navCollapsed}>
      {isOpen ? (
        params[0] === "books" ? (
          <>
            <TextFilter
              handleChange={handleFilter.titleFilter}
              value={state.titleFilter}
              placeholder="Filter by title"
              label="Title"
              name="titleFilter"
              size={isXS ? "xs" : "small"}
            />
            <TextFilter
              handleChange={handleFilter.authorFilter}
              value={state.authorFilter}
              placeholder="Filter by author"
              label="Author"
              name="authorFilter"
              size={isXS ? "xs" : "small"}
            />
            <SelectFilter
              options={languages}
              handleChange={handleFilter.allBooks}
              value={state.languageFilter}
              placeholder="Language"
              size={isXS ? "xs" : "small"}
            />
            <SelectFilter
              options={sortOptions}
              handleChange={handleFilter.sortOrder}
              value={state.sortOrder}
              placeholder="Sort By"
              size={isXS ? "xs" : "small"}
            />
            {isXS && authState.username ? <NavBottom /> : null}
          </>
        ) : params[0] === "my-books" ? (
          state.isAdding ? (
            <>
              <h2 className={styles.selector} onClick={handleNewBook}>
                My Collection
              </h2>
              <SelectFilter
                options={languages}
                handleChange={handleFilterNewBook}
                value={searchState.languageFilter}
                placeholder="Language"
                size={isXS ? "xs" : "small"}
              />
              {isXS && authState.username ? <NavBottom /> : null}
            </>
          ) : (
            <>
              <h2 className={styles.selector} onClick={handleNewBook}>
                Add a Book
              </h2>

              <SideBarBtn dropdown="my-books" />
              {isXS ? <NavBottom /> : null}
            </>
          )
        ) : params[0] === "my-trades" ? (
          <>
            <SideBarBtn dropdown="trades" />
            {isXS && authState.username ? <NavBottom /> : null}
          </>
        ) : null
      ) : null}
    </div>
  )
}

export default NavbarDropdown
