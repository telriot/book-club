import React from "react"
import styles from "./Button.module.scss"

function Button(props) {
  const { text, color, type, onClick } = props
  return (
    <button
      className={color === "blue" ? styles.buttonBlue : styles.button}
      type={type ? type : "button"}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default Button
