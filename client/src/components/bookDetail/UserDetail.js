import React, { useContext } from "react"
import { AppContext } from "../../contexts/AppContext"
import { AuthContext } from "../../contexts/AuthContext"
import { Link } from "react-router-dom"
import axios from "axios"
import styles from "./UserDetail.module.scss"
import "../../styles/flags.css"
import placeholder from "../../styles/img/flag_placeholder.png"

function UserDetail(props) {
  const { authState } = useContext(AuthContext)
  const { state } = useContext(AppContext)
  const { googleId, info } = state.bookDetail
  const { title } = info
  const { user, index } = props
  const handleRequest = (receiver) => async () => {
    try {
      const requestObject = {
        author: { username: authState.username, id: authState.id },
        receiver: { username: receiver.username, id: receiver._id },
        bookIn: { title, googleId },
      }
      const response = await axios.post(`/api/requests`, requestObject)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.wrapper} onClick={handleRequest(user)}>
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
      <button className={styles.button}>Send a request</button>
    </div>
  )
}

export default UserDetail
