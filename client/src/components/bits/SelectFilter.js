import React from "react"
import styles from "./SelectFilter.module.scss"
function SelectFilter(props) {
  const { handleChange, options, value, placeholder, size } = props

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
      <select
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        name="language"
        className={
          size === "small"
            ? styles.selectSm
            : size === "xs"
            ? styles.selectXs
            : styles.select
        }
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
