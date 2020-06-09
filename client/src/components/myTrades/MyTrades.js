import React, { useContext, useEffect } from "react"
import { AppContext } from "../../contexts/AppContext"
import { AuthContext } from "../../contexts/AuthContext"
import { WindowSizeContext } from "../../contexts/WindowSizeContext"
import SideBar from "../layout/SideBar"
import TradesList from "./TradesList"
import styles from "./MyTrades.module.scss"

function MyTrades() {
  const { state, dispatch, handleInOut, getMyTrades } = useContext(AppContext)
  const { authState } = useContext(AuthContext)
  const { inOut } = state
  const { isLG } = useContext(WindowSizeContext)

  useEffect(() => {
    window.scrollTo(0, 0)
    authState.username && getMyTrades(authState.username)
    return () => {
      dispatch({ type: "RESET_BOOK_DETAIL" })
    }
  }, [authState, getMyTrades])

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
