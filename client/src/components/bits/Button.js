import React from "react"
import styles from "./Button.module.scss"

function Button(props) {
  const { text, color, type, onClick, disabled } = props
  return (
    <button
      className={
        color === "blue"
          ? styles.buttonBlue
          : disabled
          ? styles.buttonDisabled
          : styles.button
      }
      type={type ? type : "button"}
      onClick={onClick}
      disabled={disabled}
    >
      {disabled ? "submitting" : text}
    </button>
  )
}

export default Button
