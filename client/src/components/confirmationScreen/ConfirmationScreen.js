import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { AppContext } from "../../contexts/AppContext"
import BookCard from "../shared/BookCard"
import styles from "./ConfirmationScreen.module.scss"
import axios from "axios"

function ConfirmationScreen() {
  const history = useHistory()
  const { state, dispatch } = useContext(AppContext)
  const { user } = state
  const { username, city, country, books } = user

  const getUser = async (username) => {
    try {
      const response = await axios.get(`/api/users/public/${username}`)
      const user = response.data
      console.log(user)
      dispatch({ type: "SET_USER", user })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (!state.isConfirming) {
      history.push("/my-trades")
    } else {
      getUser(state.tradeToConfirm.author.username)
    }
    return () => {
      dispatch({ type: "RESET_USER" })
    }
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.sideBar}>
        <h1 className={styles.header}>Trade with</h1>
        <h1 className={styles.username}>{username}</h1>
        <h2 className={styles.location}>
          From {city}, {country}
        </h2>
      </div>

      <div className={styles.main}>
        {books.map((book, index) => (
          <BookCard
            tradeConfirmation={true}
            item={book}
            key={`card-${index}`}
          />
        ))}
      </div>
    </div>
  )
}

export default ConfirmationScreen
