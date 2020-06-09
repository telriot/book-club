import React, { useContext, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { AppContext } from "../../contexts/AppContext"
import { AuthContext } from "../../contexts/AuthContext"
import { WindowSizeContext } from "../../contexts/WindowSizeContext"
import HamburgerMenu from "./HamburgerMenu"
import NavbarDropdown from "./NavbarDropdown"
import styles from "./Navbar.module.scss"

function Navbar() {
  const { state, dispatch } = useContext(AppContext)
  const { authState, handleLogout } = useContext(AuthContext)
  const { isXS, isSM, isLG } = useContext(WindowSizeContext)
  const { isOpen } = state
  const { username } = authState
  const params = useParams()
  const param = params[0]
  const handleModal = (e) => {
    e.persist()
    dispatch({ type: "TOGGLE_MODAL", modal: e.target.name })
  }

  const toggleHamburger = () => {
    dispatch({ type: "SET_IS_OPEN", isOpen: isOpen ? false : true })
  }

  useEffect(() => {
    dispatch({ type: "SET_IS_OPEN", isOpen: false })
  }, [param])
  const isMainPage =
    param === "books" || param === "my-books" || param === "my-trades"
  return (
    <React.Fragment>
      <header className={styles.header}>
        <h1>
          <Link className={styles.brand} to="/">
            {isLG ? "Book Club" : "BC"}
          </Link>
        </h1>
        <nav className={styles.nav}>
          <ul className={styles.navLeft}>
            <li className={styles.navItem}>
              <Link
                className={
                  param === "books" || (!param && authState.username)
                    ? styles.navItemTextActive
                    : styles.navItemText
                }
                to="/books"
              >
                All Books
              </Link>
            </li>
            {!username ? (
              <>
                <li className={styles.navItem}>
                  <Link
                    className={styles.navItemText}
                    name="signup"
                    onClick={handleModal}
                    to="#"
                  >
                    Sign Up
                  </Link>
                </li>
                <li className={styles.navItem}>
                  <Link
                    className={styles.navItemText}
                    name="login"
                    onClick={handleModal}
                    to="#"
                  >
                    Log In
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className={styles.navItem}>
                  <Link
                    className={
                      param === "my-books"
                        ? styles.navItemTextActive
                        : styles.navItemText
                    }
                    name="my-books"
                    to="/my-books"
                  >
                    My Books
                  </Link>
                </li>

                <li className={styles.navItem}>
                  <Link
                    className={
                      param === "my-trades"
                        ? styles.navItemTextActive
                        : styles.navItemText
                    }
                    name="my-trades"
                    to="/my-trades"
                  >
                    My Trades
                  </Link>
                </li>
              </>
            )}
          </ul>
          {username && isSM ? (
            <ul className={styles.navRight}>
              <li className={styles.navItem}>
                <Link
                  className={
                    param === "my-profile"
                      ? styles.navItemTextActive
                      : styles.navItemText
                  }
                  name="my-profile"
                  to="/my-profile"
                >
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
          ) : null}
          {isXS || (!isLG && isMainPage) ? (
            <>
              <HamburgerMenu
                toggleHamburger={toggleHamburger}
                isOpen={isOpen}
              />
              <NavbarDropdown isOpen={isOpen} />
            </>
          ) : null}
        </nav>
      </header>
    </React.Fragment>
  )
}

export default Navbar
