import React, { useContext } from "react"
import ReactDOM from "react-dom"
import { AppContext } from "../../contexts/AppContext"
import styles from "./Modal.module.scss"

function Modal({ children }) {
  const { state, dispatch } = useContext(AppContext)

  const handleBtnClick = () => {
    dispatch({ type: "TOGGLE_MODAL" })
  }

  return state.modal
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className={styles.overlay} onClick={handleBtnClick} />
          <div className={styles.modal}>{children}</div>
        </React.Fragment>,
        document.body
      )
    : null
}

export default Modal
