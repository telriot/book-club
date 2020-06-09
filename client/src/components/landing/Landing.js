import React from "react"
import { useHistory } from "react-router-dom"
import styles from "./Landing.module.scss"

function Landing() {
  const history = useHistory()
  const handleClick = () => {
    history.push("/books")
  }
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.jumbotron}>
          <div className={styles.headerDiv}>
            <h1 className={styles.header}>Your stories are your world.</h1>
            <h1 className={styles.header}>Share them.</h1>
          </div>

          <button className={styles.button} onClick={handleClick}>
            Start exploring
          </button>
        </div>
      </div>
    </div>
  )
}

export default Landing
