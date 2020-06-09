import React, { useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import { AppContext } from "../../contexts/AppContext"
import { AuthContext } from "../../contexts/AuthContext"
import InfoDetail from "./InfoDetail"
import UserDetail from "./UserDetail"
import Loader from "react-loader-spinner"
import styles from "./BookDetail.module.scss"
import axios from "axios"

function BookDetail() {
  const params = useParams()
  const { state, dispatch, getMyTrades } = useContext(AppContext)
  const { authState } = useContext(AuthContext)

  const { users } = state.bookDetail

  const getBookDetail = async () => {
    dispatch({ type: "SET_IS_LOADING", isLoading: true })
    try {
      const response = await axios.get(`/api/books/detail/${params.googleId}`)
      const bookDetail = response.data
      dispatch({ type: "SET_BOOK_DETAIL", bookDetail })
      dispatch({ type: "SET_IS_LOADING", isLoading: false })
    } catch (error) {
      dispatch({ type: "SET_IS_LOADING", isLoading: false })
      console.log(error)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    getBookDetail()
    return () => {
      dispatch({ type: "RESET_BOOK_DETAIL" })
    }
  }, [])
  useEffect(() => {
    authState.username && getMyTrades(authState.username)
  }, [authState.username])

  return (
    <div className={styles.container}>
      <div className={styles.sideBar}>
        {!state.isLoading ? <InfoDetail /> : null}
      </div>
      <div className={styles.main}>
        <h2 className={styles.mainHeader}>Owned by</h2>
        {state.isLoading ? (
          <div className={styles.spinner}>
            <Loader
              type="Puff"
              color={"#e71d36"}
              height={100}
              width={100}
              timeout={3000} //3 secs
            />
          </div>
        ) : users ? (
          users.map((user, index) => (
            <UserDetail
              key={`user-detail-${index}`}
              user={user}
              index={index}
            />
          ))
        ) : null}
      </div>
    </div>
  )
}

export default BookDetail
