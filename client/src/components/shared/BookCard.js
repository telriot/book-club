import React, { useContext, useRef } from "react"
import { useHistory } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import { AppContext } from "../../contexts/AppContext"
import coverBlank from "../../assets/NoCover.png"
import styles from "./BookCard.module.scss"
import axios from "axios"

function BookCard(props) {
  const { state, dispatch } = useContext(AppContext)
  const { authState } = useContext(AuthContext)
  const { username } = authState
  const history = useHistory()
  const { item, addBtn, removeBtn, owners, tradeConfirmation } = props
  const { imageLinks, authors, title } = item.info
  const cardRef = useRef()

  const handleAdd = async () => {
    if (username) {
      try {
        const response = await axios.post(`/api/books/${username}`, item)
        response.data.books &&
          dispatch({ type: "SET_BOOKS", data: { books: response.data.books } })
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log("Authentication required")
    }
  }

  const handleRemove = async () => {
    dispatch({ type: "SET_DELETION_TARGET", target: item.googleId })
    dispatch({ type: "TOGGLE_MODAL", modal: "delete" })
  }

  const handleOwners = () => {
    history.push(`/book/${item.googleId}`)
  }

  const handleTradeConfirmation = async () => {
    dispatch({ type: "SET_IS_LOADING", isLoading: true })

    console.log("confirm trade with this")
    const acceptObject = {
      tradeId: state.tradeToConfirm.id,
      bookOut: item.googleId,
      bookIn: state.tradeToConfirm.bookIn.googleId,
      authorId: state.tradeToConfirm.author.id,
      receiverId: state.tradeToConfirm.receiver.id,
    }
    try {
      const response = await axios.post(`/api/requests/accept`, acceptObject)
      dispatch({ type: "SET_IS_LOADING", isLoading: false })
      history.push("/my-trades")
      console.log(response.data)
    } catch (error) {
      dispatch({ type: "SET_IS_LOADING", isLoading: false })
      console.log(error)
    }
  }

  return (
    <div ref={cardRef} className={styles.card}>
      <div
        className={addBtn ? styles.imageDivAdd : styles.imageDiv}
        onClick={addBtn ? handleAdd : handleOwners}
      >
        <img
          className={styles.image}
          src={imageLinks ? imageLinks.thumbnail : coverBlank}
          alt="Book Cover"
        />
      </div>

      <div>
        <p className={styles.title}>{title}</p>
        <p className={styles.author}>
          By {authors ? authors.join(", ") : <em>unknown</em>}
        </p>
        {addBtn ? (
          <button className={styles.button} onClick={handleAdd}>
            Add this book
          </button>
        ) : null}
        {removeBtn ? (
          <button className={styles.button} onClick={handleRemove}>
            Delete
          </button>
        ) : null}
        {owners ? (
          <button className={styles.button} onClick={handleOwners}>
            Show Owners ({item.users.length})
          </button>
        ) : null}
        {tradeConfirmation ? (
          <button className={styles.button} onClick={handleTradeConfirmation}>
            Trade with this
          </button>
        ) : null}
      </div>
    </div>
  )
}

export default BookCard
