import React, { useContext } from "react"
import { useHistory } from "react-router-dom"
import { AppContext } from "../../contexts/AppContext"
import styles from "./TradesList.module.scss"
import axios from "axios"
import moment from "moment"
import { MdThumbUp, MdThumbDown } from "react-icons/md"

function TradesList(props) {
  const { data, refreshTrades } = props
  const { state, dispatch } = useContext(AppContext)
  const { inOut } = state
  const history = useHistory()

  const handleAccept = (id, author, receiver, bookIn) => async () => {
    console.log("accept request")
    dispatch({
      type: "TOGGLE_IS_CONFIRMING",
      trade: { id, author, receiver, bookIn },
    })
    history.push(`/confirm/${id}`)
  }

  const handleDecline = (id) => async () => {
    console.log("decline request")
    try {
      const response = await axios.post(`/api/requests/decline`, { id })
      console.log(response.data)
      refreshTrades()
    } catch (error) {
      console.log(error)
    }
  }
  const TradeRequest = ({ data }) => {
    const { author, receiver, bookIn, status, date, _id } = data

    return (
      <tr className={inOut === "out" ? styles.rowAlt : styles.row}>
        <td>{bookIn.title}</td>
        <td className={status === "pending" ? styles.tdPending : null}>
          {status}
        </td>
        <td>
          {inOut === "in" ? `${author.username}` : `${receiver.username}`}
        </td>
        <td>{moment(date).fromNow()}</td>
        <td className={styles.thumbIcons}>
          {status === "pending" ? (
            <>
              <MdThumbUp
                className={styles.thumbIcon}
                onClick={handleAccept(_id, author, receiver, bookIn)}
              />
              <MdThumbDown
                className={styles.thumbIconAlt}
                onClick={handleDecline(_id)}
              />
            </>
          ) : null}
        </td>

        {/*}
        {inOut === "in" && status === "pending" ? (
          <div>
            <button onClick={handleDecline(_id)}>Decline</button>
            <button onClick={handleAccept(_id, author, receiver, bookIn)}>
              Pick a trade
            </button>
          </div>
        ) : null}*/}
      </tr>
    )
  }
  return (
    <table className={styles.table}>
      <thead className={inOut === "out" ? styles.headerAlt : styles.header}>
        <tr>
          <th className={styles.col1}>Book</th>
          <th className={styles.col2}>Status</th>
          <th className={styles.col3}>User</th>
          <th className={styles.col4}>Date</th>
          <th className={styles.col5}>Action</th>
        </tr>
      </thead>
      <tbody className={styles.body}>
        {data &&
          data.map((request, index) => (
            <TradeRequest key={`request-${inOut}-${index}`} data={request} />
          ))}
      </tbody>
    </table>
  )
}

export default TradesList
