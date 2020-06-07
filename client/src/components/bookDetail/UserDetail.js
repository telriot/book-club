import React, { useContext, useState } from "react"
import { AppContext } from "../../contexts/AppContext"
import { AuthContext } from "../../contexts/AuthContext"
import { Link } from "react-router-dom"
import styles from "./UserDetail.module.scss"
import "../../styles/flags.css"
import placeholder from "../../styles/img/flag_placeholder.png"
import axios from "axios"

function UserDetail(props) {
  const { authState } = useContext(AuthContext)
  const { state, dispatch } = useContext(AppContext)
  const [isSubmitting, setSubmitting] = useState(false)
  const { googleId, info } = state.bookDetail
  const { title } = info
  const { user, index } = props

  const handleRequest = (receiver) => async () => {
    try {
      setSubmitting(true)
      const requestObject = {
        author: { username: authState.username, id: authState.id },
        receiver: { username: receiver.username, id: receiver._id },
        bookIn: { title, googleId },
      }
      const response = await axios.post(`/api/requests`, requestObject)
      dispatch({
        type: "SET_TRADES",
        trades: {
          requestsIn: state.trades.requestsIn,
          requestsOut: response.data,
        },
      })
      setSubmitting(false)
    } catch (error) {
      setSubmitting(false)
      console.log(error)
    }
  }

  const isAlreadySubmitted = (googleId, user) => {
    const { requestsOut } = state.trades
    const isSubmitted = requestsOut.filter(
      (request) =>
        request.receiver.id === user._id &&
        request.bookIn.googleId === googleId &&
        request.status === "pending"
    )
    return isSubmitted.length ? true : false
  }

  return (
    <div
      className={styles.wrapper}
      onClick={
        user.username !== authState.username ? handleRequest(user) : null
      }
    >
      <div className={styles.user} key={`userDiv-${index}`}>
        <p className={styles.username}>
          <Link className={styles.username} to={`/users/${user.username}`}>
            {user.username}
          </Link>{" "}
          ({user.books.length})
        </p>
        <img
          src={placeholder}
          className={`flag flag-${user.country.toLowerCase()}`}
          style={{ height: "15px", width: "22px" }}
        />
      </div>

      {isAlreadySubmitted(googleId, user) ? (
        <button className={styles.button}>Trade request sent.</button>
      ) : isSubmitting ? (
        <button className={styles.button}>Submitting</button>
      ) : user.username !== authState.username ? (
        <button className={styles.button}>Send a request</button>
      ) : (
        <button className={styles.button}>In your collection</button>
      )}
    </div>
  )
}

export default UserDetail
