import React, { useContext } from "react"
import Select from "../bits/Select"
import languages from "../../data/languages.json"
import styles from "./LanguageFilter.module.scss"
import { SearchContext } from "../../contexts/SearchContext"
function LanguageFilter() {
  const { searchState, searchDispatch } = useContext(SearchContext)
  const { languageFilter } = searchState
  const handleFilter = (e) => {
    searchDispatch({ type: "SET_LANGUAGE_FILTER", language: e.target.value })
  }
  return (
    <>
      <h2 className={styles.header}>Filter By Language</h2>
      <select
        value={languageFilter}
        onChange={handleFilter}
        name="language"
        className={styles.select}
      >
        <option disabled key="option-null" value="">
          Pick a Language
        </option>
        {languages.map((language, index) => {
          return (
            <option key={`option-${index}`} value={language.code}>
              {language.name}
            </option>
          )
        })}
      </select>
    </>
  )
}

export default LanguageFilter
/*<option key={`option-${index}`} value={country.Code}>
            {country.Name}
        </option>*/
