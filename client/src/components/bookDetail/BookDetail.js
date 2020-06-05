import React, { useEffect, useContext } from "react"
import { useParams, Link } from "react-router-dom"
import { AppContext } from "../../contexts/AppContext"
import { AuthContext } from "../../contexts/AuthContext"
import styles from "./BookDetail.module.scss"
import axios from "axios"

function BookDetail() {
  const params = useParams()
  const { state, dispatch } = useContext(AppContext)
  const { authState } = useContext(AuthContext)
  const { googleId, users, info } = state.bookDetail
  const {
    title,
    authors,
    publisher,
    publishedDate,
    description,
    pageCount,
    infoLink,
    imageLinks,
  } = info

  const getBookDetail = async () => {
    try {
      const response = await axios.get(`/api/books/detail/${params.googleId}`)
      const bookDetail = response.data
      dispatch({ type: "SET_BOOK_DETAIL", bookDetail })
    } catch (error) {}
  }

  useEffect(() => {
    getBookDetail()
    return () => {
      dispatch({ type: "RESET_BOOK_DETAIL" })
    }
  }, [])

  const handleRequest = (receiver) => async () => {
    console.log("request sent")
    try {
      const requestObject = {
        author: { username: authState.username, id: authState.id },
        receiver: { username: receiver.username, id: receiver.id },
        bookIn: { title, googleId },
      }
      const response = await axios.post(`/api/requests`, requestObject)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <React.Fragment>
      <div>
        <h1>{title}</h1>
        {authors ? <h2>By {authors.toString()}</h2> : null}
        <h4>
          Published by {publisher} in {publishedDate.slice(0, 4)}
        </h4>
        <h4>{pageCount}pages</h4>
        <a href={infoLink}>
          {" "}
          <img
            src={imageLinks.thumbnail}
            alt="Book cover"
            style={{ width: "max-content" }}
          />
        </a>
        <p>{description}</p>
      </div>
      <div>
        <h2>Owned by</h2>
        {users.map((user, index) => (
          <div key={`userDiv-${index}`}>
            <p>
              <Link to={`/users/${user.username}`}>{user.username}</Link> from{" "}
              {user.country}
            </p>
            <button onClick={handleRequest(user)}>Send a request</button>
          </div>
        ))}
      </div>
    </React.Fragment>
  )
}

export default BookDetail
