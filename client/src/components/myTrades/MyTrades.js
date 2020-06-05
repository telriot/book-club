import React, { useContext, useEffect } from "react"
import { AppContext } from "../../contexts/AppContext"
import { AuthContext } from "../../contexts/AuthContext"
import SideBar from "../layout/SideBar"
import TradesList from "./TradesList"
import styles from "./MyTrades.module.scss"
import axios from "axios"

function MyTrades() {
  const { state, dispatch } = useContext(AppContext)
  const { authState } = useContext(AuthContext)
  const { inOut } = state
  const getMyTrades = async () => {
    try {
      const response = await axios.get(`/api/requests/${authState.username}`)
      const { requestsIn, requestsOut } = response.data
      console.log(response.data)
      dispatch({ type: "SET_TRADES", trades: { requestsIn, requestsOut } })
    } catch (error) {}
  }

  useEffect(() => {
    authState.username && getMyTrades()
    return () => {
      dispatch({ type: "RESET_BOOK_DETAIL" })
    }
  }, [authState])

  return (
    <div className={styles.container}>
      <SideBar trades={true} />
      <div className={styles.main}>
        {inOut === "in" ? (
          <TradesList
            refreshTrades={getMyTrades}
            data={state.trades.requestsIn}
          />
        ) : (
          <TradesList
            refreshTrades={getMyTrades}
            data={state.trades.requestsOut}
          />
        )}
      </div>
    </div>
  )
}

export default MyTrades
