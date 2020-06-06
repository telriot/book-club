import React from "react"
import styles from "./TextFilter.module.scss"

const TextFilter = (props) => {
  const { handleChange, value, placeholder, label, name } = props

  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={props.id || props.name}>
        {props.labelShow && label}
      </label>{" "}
      <input
        type="text"
        className={styles.input}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  )
}

export default TextFilter
