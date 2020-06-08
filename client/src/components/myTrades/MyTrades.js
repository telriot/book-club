import React, { useContext, useEffect } from "react"
import { AppContext } from "../../contexts/AppContext"
import { AuthContext } from "../../contexts/AuthContext"
import SideBar from "../layout/SideBar"
import TradesList from "./TradesList"
import styles from "./MyTrades.module.scss"
import axios from "axios"
import { WindowSizeContext } from "../../contexts/WindowSizeContext"

function MyTrades() {
  const { state, dispatch, handleInOut } = useContext(AppContext)
  const { authState } = useContext(AuthContext)
  const { inOut } = state
  const { isSM, isMD, isLG } = useContext(WindowSizeContext)
  const getMyTrades = async () => {
    try {
      const response = await axios.get(`/api/requests/${authState.username}`)
      const { requestsIn, requestsOut } = response.data
      dispatch({ type: "SET_TRADES", trades: { requestsIn, requestsOut } })
    } catch (error) {}
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    authState.username && getMyTrades()
    return () => {
      dispatch({ type: "RESET_BOOK_DETAIL" })
    }
  }, [authState])

  return (
    <div className={styles.container}>
      {isLG ? (
        <SideBar trades={true} />
      ) : state.inOut === "in" ? (
        <h2 className={styles.selectorAlt} onClick={handleInOut}>
          Inbound Trades
        </h2>
      ) : (
        <h2 className={styles.selector} onClick={handleInOut}>
          Outbound Trades
        </h2>
      )}
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
