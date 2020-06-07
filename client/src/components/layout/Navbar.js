import React, { useContext } from "react"
import { Link, useHistory } from "react-router-dom"
import { AppContext } from "../../contexts/AppContext"
import { AuthContext } from "../../contexts/AuthContext"
import styles from "./Navbar.module.scss"
import axios from "axios"

function Navbar() {
  const { dispatch } = useContext(AppContext)
  const { authState, authDispatch } = useContext(AuthContext)
  const { username } = authState
  const history = useHistory()

  const handleModal = (e) => {
    e.persist()
    dispatch({ type: "TOGGLE_MODAL", modal: e.target.name })
  }

  const handleLogout = async () => {
    try {
      const result = await axios.post("/api/auth/logout")
      authDispatch({ type: "LOGOUT_USER" })
      history.push("/")
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <React.Fragment>
      <header className={styles.header}>
        <h1>
          <Link className={styles.brand} to="/">
            Book Club
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
          {username ? (
            <ul className={styles.navRight}>
              <li className={styles.navItem}>
                <Link
                  className={styles.navItemText}
                  name="my-profile"
                  to="/my-profile"
                >
                  {authState.username}'s Profile
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
        </nav>
      </header>
    </React.Fragment>
  )
}

export default Navbar
