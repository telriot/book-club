import React, { useState, useContext } from "react"
import Button from "../bits/Button"
import styles from "./ConfirmDeletion.module.scss"
import { AppContext } from "../../contexts/AppContext"
import { AuthContext } from "../../contexts/AuthContext"
import axios from "axios"

function ConfirmDeletion() {
  const { state, dispatch } = useContext(AppContext)
  const { authState } = useContext(AuthContext)

  const [isDeleting, setDeleting] = useState(false)
  const handleDelete = async () => {
    setDeleting(true)
    const { username } = authState
    if (username)
      try {
        const response = await axios.delete(`/api/books/${username}`, {
          params: { googleId: state.deletionTarget },
        })
        const books = response.data
        dispatch({ type: "SET_BOOKS", data: { books } })
        dispatch({ type: "TOGGLE_MODAL" })
      } catch (error) {
        console.log(error)
      }
    else {
      console.log("Authentication required")
      console.log("delete")
    }
  }

  return (
    <div className={styles.container}>
      <p className={styles.header}>Confirm deletion?</p>
      <div className={styles.btnDiv}>
        <Button
          text="Cancel"
          color="blue"
          type="button"
          onClick={handleDelete}
        />
        <Button disabled={isDeleting} onClick={handleDelete} text="Confirm" />{" "}
      </div>
    </div>
  )
}

export default ConfirmDeletion
