import React from "react"
import styles from "./SelectFilter.module.scss"
function SelectFilter(props) {
  const { handleChange, options, value, placeholder } = props

  return (
    <div className={styles.wrapper}>
      <select
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        name="language"
        className={styles.select}
      >
        <option disabled key="option-null" value="">
          {placeholder}{" "}
        </option>
        {options.map((option, index) => {
          return (
            <option key={`option-${index}`} value={option.code}>
              {option.name}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default SelectFilter
