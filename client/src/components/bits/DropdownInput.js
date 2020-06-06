import React, { useContext, useState } from "react"
import { SearchContext } from "../../contexts/SearchContext"
import styles from "./DropdownInput.module.scss"

function DropdownInput(props) {
  const { placeholder } = props
  const { searchState, searchDispatch } = useContext(SearchContext)
  const { input, results } = searchState
  const [selection, setSelection] = useState(-1)

  const handleChange = (e) => {
    searchDispatch({ type: "HANDLE_CHANGE", input: e.target.value })
  }
  const handleClick = (item) => () => {
    searchDispatch({ type: "SET_PAGE", page: 1 })
    searchDispatch({ type: "HANDLE_CHANGE", input: item.info.title })
    searchDispatch({ type: "SET_DISPLAY", display: true })
  }
  const handleKeyDown = (e) => {
    e.persist()
    if (e.keyCode === 13) {
      if (selection === -1) {
        searchDispatch({ type: "SET_PAGE", page: 1 })
        searchDispatch({ type: "HANDLE_ENTER_KEY" })
      } else {
        e.target.blur()
        searchDispatch({
          type: "HANDLE_CHANGE",
          input: results[selection] ? results[selection].info.title : input,
        })
        searchDispatch({ type: "SET_PAGE", page: 1 })
        searchDispatch({ type: "SET_DISPLAY", display: true })
      }
    } else if (e.keyCode === 38) {
      selection >= 0 && setSelection((prevState) => prevState - 1)
    } else if (e.keyCode === 40) {
      selection < searchState.results.length - 1 &&
        setSelection((prevState) => prevState + 1)
    }
  }
  const handleMouseEnter = (index) => () => {
    setSelection(index)
  }
  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="text"
        value={input}
        placeholder={placeholder}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <ul className={styles.inputDropdown}>
        {results.length
          ? results.map((item, index) => (
              <li
                className={
                  index === selection
                    ? styles.dropdownItemActive
                    : styles.dropdownItem
                }
                key={`result-${index}`}
                onMouseEnter={handleMouseEnter(index)}
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
