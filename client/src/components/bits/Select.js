import React from "react"
import { useField } from "formik"
import styles from "./Select.module.scss"

const Select = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <div className={styles.wrapper}>
      {props.label ? (
        <label className={styles.label} htmlFor={props.id || props.name}>
          {label}
        </label>
      ) : null}
      <select
        className={styles.select}
        disabled={props.disabled}
        {...field}
        {...props}
      >
        {props.children}
      </select>
      {meta.touched && meta.error ? (
        <p className={styles.error}>{meta.error}</p>
      ) : null}
    </div>
  )
}

export default Select
