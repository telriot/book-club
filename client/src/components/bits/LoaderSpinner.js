import React from "react"
import Loader from "react-loader-spinner"
import styles from "./LoaderSpinner.module.scss"

const LoaderSpinner = (props) => {
  return (
    <div className={styles.spinner}>
      <Loader
        type="Puff"
        color={props.color ? props.color : "#e71d36"}
        height={100}
        width={100}
        timeout={3000}
      />
    </div>
  )
}

export default LoaderSpinner
