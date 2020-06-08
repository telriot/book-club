import React from "react"
import styles from "./TextFilter.module.scss"

const TextFilter = (props) => {
  const { handleChange, value, placeholder, label, name, size } = props

  return (
    <div
      className={
        size === "small"
          ? styles.wrapperSm
          : size === "xs"
          ? styles.wrapperXs
          : styles.wrapper
      }
    >
      <label className={styles.label} htmlFor={props.id || props.name}>
        {props.labelShow && label}
      </label>{" "}
      <input
        type="text"
        className={
          size === "small"
            ? styles.inputSm
            : size === "xs"
            ? styles.inputXs
            : styles.input
        }
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  )
}

export default TextFilter
