import React, { useContext, useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { AppContext } from "../../contexts/AppContext"
import { AuthContext } from "../../contexts/AuthContext"
import { WindowSizeContext } from "../../contexts/WindowSizeContext"
import HamburgerMenu from "./HamburgerMenu"
import NavbarDropdown from "./NavbarDropdown"
import styles from "./Navbar.module.scss"

function Navbar() {
  const { dispatch } = useContext(AppContext)
  const { authState, handleLogout } = useContext(AuthContext)
  const { isSM, isLG } = useContext(WindowSizeContext)
  const [isOpen, setOpen] = useState(false)
  const { username } = authState
  const params = useParams()

  const handleModal = (e) => {
    e.persist()
    dispatch({ type: "TOGGLE_MODAL", modal: e.target.name })
  }

  const toggleHamburger = () => {
    setOpen((prevState) => (prevState ? false : true))
  }

  useEffect(() => {
    setOpen(false)
  }, [params[0]])

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
                  params[0] === "books" || (!params[0] && authState.username)
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
                      params[0] === "my-books"
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
                      params[0] === "my-trades"
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
                    params[0] === "my-profile"
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
          {!isLG && params[0] && !(params[0] === "my-profile" && isSM) ? (
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
