import React, { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { AppContext } from "../../contexts/AppContext"
import { AuthContext } from "../../contexts/AuthContext"
import styles from "./Navbar.module.scss"
import { WindowSizeContext } from "../../contexts/WindowSizeContext"
import NavbarDropdown from "./NavbarDropdown"

function Navbar() {
  const { dispatch } = useContext(AppContext)
  const { authState, handleLogout } = useContext(AuthContext)
  const { isXS, isSM, isMD, isLG } = useContext(WindowSizeContext)
  const { username } = authState
  const [isOpen, setOpen] = useState(false)

  const handleModal = (e) => {
    e.persist()
    dispatch({ type: "TOGGLE_MODAL", modal: e.target.name })
  }

  const toggleHamburger = () => {
    setOpen((prevState) => (prevState ? false : true))
  }

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
              <Link className={styles.navItemText} to="/books">
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
                    className={styles.navItemText}
                    name="my-books"
                    to="/my-books"
                  >
                    My Books
                  </Link>
                </li>

                <li className={styles.navItem}>
                  <Link
                    className={styles.navItemText}
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
                  className={styles.navItemText}
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
          {!isLG ? (
            <>
              <div className={styles.hamburger}>
                <button
                  onClick={toggleHamburger}
                  className={
                    isOpen
                      ? "hamburger hamburger--slider is-active"
                      : "hamburger hamburger--slider"
                  }
                  type="button"
                >
                  <span className="hamburger-box">
                    <span className="hamburger-inner"></span>
                  </span>
                </button>
              </div>
              <NavbarDropdown isOpen={isOpen} />
            </>
          ) : null}
        </nav>
      </header>
    </React.Fragment>
  )
}

export default Navbar
