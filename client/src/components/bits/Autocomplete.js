import React, { useEffect, useRef } from "react"
import useScript from "../../hooks/useScript"
import useDebounce from "../../hooks/useDebounce"
import styles from "./TextInput.module.scss"
import { useField } from "formik"

const Autocomplete = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props)
  const { setValue } = helpers
  const [loaded, error] = useScript(
    "https://maps.googleapis.com/maps/api/js?key=AIzaSyA-VAYQEfoIlFHypONP6mr0GlIYKnUMeT4&libraries=places"
  )
  const searchTerm = useDebounce(field.value, 300)
  const inputField = useRef()

  const handleAutocomplete = (setValue) => {
    let input = inputField.current
    const options = {
      types: ["(cities)"],
      componentRestrictions: { country: `${props.country}` },
    }
    const autoComplete = new window.google.maps.places.Autocomplete(
      input,
      options
    )
    autoComplete.setFields(["address_components"])
    autoComplete.addListener("place_changed", () => handlePlaceSelect(setValue))
    async function handlePlaceSelect(setValue) {
      const addressObject = autoComplete.getPlace() // get place from google api
      const query = addressObject.address_components[0].long_name
      setValue(query)
    }
  }

  useEffect(() => {
    if (loaded && !error) {
      handleAutocomplete(setValue)
    }
  }, [searchTerm])

  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={props.id || props.name}>
        {props.labelShow && label}
      </label>
      <input
        ref={inputField}
        type={props.type}
        className={styles.input}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className={styles.error}>{meta.error}</div>
      ) : null}
    </div>
  )
}

export default Autocomplete
