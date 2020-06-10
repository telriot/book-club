import React, { useEffect, useContext, useCallback } from "react"
import { useParams } from "react-router-dom"
import { AppContext } from "../../contexts/AppContext"
import { AuthContext } from "../../contexts/AuthContext"
import InfoDetail from "./InfoDetail"
import LoaderSpinner from "../bits/LoaderSpinner"
import UserDetail from "./UserDetail"
import styles from "./BookDetail.module.scss"
import axios from "axios"

function BookDetail() {
  const params = useParams()
  const { state, dispatch, getMyTrades } = useContext(AppContext)
  const { authState } = useContext(AuthContext)

  const { users } = state.bookDetail

  const getBookDetail = useCallback(async (params) => {
    dispatch({ type: "SET_IS_LOADING", isLoading: true })
    try {
      const response = await axios.get(`/api/books/detail/${params}`)
      const bookDetail = response.data
      dispatch({ type: "SET_BOOK_DETAIL", bookDetail })
      dispatch({ type: "SET_IS_LOADING", isLoading: false })
    } catch (error) {
      dispatch({ type: "SET_IS_LOADING", isLoading: false })
      console.log(error)
    }
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
    getBookDetail(params.googleId)
    return () => {
      dispatch({ type: "RESET_BOOK_DETAIL" })
    }
  }, [getBookDetail, params.googleId])
  useEffect(() => {
    authState.username && getMyTrades(authState.username)
  }, [authState.username, getMyTrades])

  return (
    <div className={styles.container}>
      {!state.isLoading ? (
        <>
          <div className={styles.sideBar}>
            <InfoDetail />
          </div>
        </>
      ) : null}
      <div className={styles.main}>
        <h2 className={styles.mainHeader}>Owned by</h2>
        {state.isLoading ? (
          <LoaderSpinner />
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
