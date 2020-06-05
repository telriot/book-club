import React, { useContext } from "react"
import { SearchContext } from "../../contexts/SearchContext"
import styles from "./DropdownInput.module.scss"

function DropdownInput(props) {
  const { placeholder } = props
  const { searchState, searchDispatch } = useContext(SearchContext)
  const { input, results } = searchState

  const handleChange = (e) => {
    searchDispatch({ type: "HANDLE_CHANGE", input: e.target.value })
  }
  const handleClick = (item) => () => {
    searchDispatch({ type: "HANDLE_CHANGE", input: item.info.title })
    searchDispatch({ type: "SET_DISPLAY", display: true })
  }
  const handleKeyPress = (e) => {
    e.persist()
    console.log(e)
    console.log(e.charCode === 13)
    if (e.charCode === 13) {
      searchDispatch({ type: "HANDLE_ENTER_KEY" })
    }
  }
  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="text"
        value={input}
        placeholder={placeholder}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      <ul className={styles.inputDropdown}>
        {results.length
          ? results.map((item, index) => (
              <li
                className={styles.dropdownItem}
                key={`result-${index}`}
                onMouseDown={handleClick(item)}
              >
                {item.info.title}
              </li>
            ))
          : null}
      </ul>
    </div>
  )
}

export default DropdownInput
