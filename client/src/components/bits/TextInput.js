import React from "react"
import styles from "./TextInput.module.scss"
import { useField } from "formik"

const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props)

  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={props.id || props.name}>
        {props.labelShow && label}
      </label>{" "}
      <input
        ref={props.innerRef}
        type={props.type}
        className={styles.input}
        rows={props.rows}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className={styles.error}>{meta.error}</div>
      ) : null}
    </div>
  )
}

export default TextInput
