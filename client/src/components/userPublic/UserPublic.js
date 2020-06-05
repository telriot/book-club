import React, { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { AppContext } from "../../contexts/AppContext"
import BookCard from "../shared/BookCard"
import styles from "./UserPublic.module.scss"
import axios from "axios"

function UserPublic() {
  const { state, dispatch } = useContext(AppContext)
  const params = useParams()
  const { user } = state
  const { username, city, country, books } = user

  const getUser = async () => {
    try {
      const response = await axios.get(`/api/users/public/${params.username}`)
      const user = response.data
      console.log(user)
      dispatch({ type: "SET_USER", user })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUser()
    return () => {
      dispatch({ type: "RESET_USER" })
    }
  }, [])
  return (
    <div>
      <h1>{username}</h1>
      <h2>
        From {city}, {country}
      </h2>
      <h3>Books for trade</h3>
      <div>
        {books.map((book, index) => (
          <BookCard item={book} key={`card-${index}`} />
        ))}
      </div>
    </div>
  )
}

export default UserPublic
