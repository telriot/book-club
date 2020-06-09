import React, { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { AppContext } from "../../contexts/AppContext"
import { WindowSizeContext } from "../../contexts/WindowSizeContext"
import Pagination from "../bits/Pagination"
import styles from "./TradesList.module.scss"
import axios from "axios"
import moment from "moment"
import Loader from "react-loader-spinner"
import { MdThumbUp, MdThumbDown } from "react-icons/md"

function TradesList(props) {
  const { data, refreshTrades } = props
  const { state, dispatch } = useContext(AppContext)
  const { isSM } = useContext(WindowSizeContext)
  const { inOut } = state
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [maxResults] = useState(10)
  const history = useHistory()

  const handleAccept = (id, author, receiver, bookIn) => async () => {
    console.log("accept request")
    dispatch({
      type: "TOGGLE_IS_CONFIRMING",
      trade: { id, author, receiver, bookIn },
    })
    history.push(`/confirm/${id}`)
  }
  const handleCancel = (id) => async () => {
    console.log("cancel request")
    try {
      const response = await axios.post(`/api/requests/cancel`, { id })
      console.log(response.data)
      refreshTrades()
    } catch (error) {
      console.log(error)
    }
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

  const renderPage = (arr) => {
    let items = []
    const startIndex = (page - 1) * maxResults
    const endIndex = page * maxResults
    for (let i = startIndex; i < endIndex; i++) {
      arr[i] &&
        items.push(<TradeRequest key={`request-${inOut}-${i}`} data={arr[i]} />)
    }
    return items
  }

  useEffect(() => {
    setPage(1)
    setPages(Math.ceil(data.length / maxResults))
  }, [data, maxResults])
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
        {isSM ? <td>{moment(date).fromNow()}</td> : null}
        <td className={styles.thumbIcons}>
          {status === "pending" && inOut === "in" ? (
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
          ) : status === "pending" && inOut === "out" ? (
            <span onClick={handleCancel(_id)} className={styles.cancelRequest}>
              Cancel
            </span>
          ) : null}
        </td>
      </tr>
    )
  }
  return (
    <div className={styles.tableDiv}>
      <table className={styles.table}>
        <thead className={inOut === "out" ? styles.headerAlt : styles.header}>
          <tr>
            <th className={styles.col1}>Book</th>
            <th className={styles.col2}>Status</th>
            <th className={styles.col3}>User</th>
            {isSM ? <th className={styles.col4}>Date</th> : null}
            <th className={styles.col5}>Action</th>
          </tr>
        </thead>
        <tbody className={styles.body}>{data && renderPage(data)}</tbody>
      </table>
      {!data.length ? (
        state.isLoading ? (
          <div className={styles.spinner}>
            <Loader
              type="Puff"
              color={inOut === "in" ? "#2ec4b6" : "#e71d36"}
              height={100}
              width={100}
              timeout={3000} //3 secs
            />
          </div>
        ) : (
          <p className={styles.error}>No trades yet</p>
        )
      ) : null}

      <Pagination
        page={page}
        pages={pages}
        displayedResults={data}
        setPage={setPage}
      />
    </div>
  )
}

export default TradesList
