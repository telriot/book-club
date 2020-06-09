import React, { useContext } from "react"
import styles from "./Navbar.module.scss"
import { AppContext } from "../../contexts/AppContext"

function HamburgerMenu(props) {
  const { state } = useContext(AppContext)
  const { isOpen } = state
  const { toggleHamburger } = props
  return (
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
  )
}

export default HamburgerMenu
