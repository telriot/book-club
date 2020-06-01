import React, { useContext } from "react"
import styles from "./DropdownInput.module.scss"
import { SearchContext } from "../../contexts/SearchContext"

function DropdownInput(props) {
  const { placeholder } = props
  const { searchState, searchDispatch } = useContext(SearchContext)
  const { input, results, isSearching } = searchState

  const handleChange = (e) => {
    searchDispatch({ type: "HANDLE_CHANGE", input: e.target.value })
  }
  const handleClick = (item) => () => {
    searchDispatch({ type: "HANDLE_CHANGE", input: item.title })
    searchDispatch({ type: "SET_DISPLAY", display: true })
  }
  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="text"
        value={input}
        placeholder={placeholder}
        onChange={handleChange}
      />
      <ul className={styles.inputDropdown}>
        {results.length
          ? results.map((item, index) => (
              <li
                className={styles.dropdownItem}
                key={`result-${index}`}
                onMouseDown={handleClick(item)}
              >
                {item.title}
              </li>
            ))
          : null}
      </ul>
    </div>
  )
}

export default DropdownInput
