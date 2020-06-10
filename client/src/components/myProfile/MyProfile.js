import React, { useContext, useEffect, useRef, useCallback } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import Autocomplete from "../bits/Autocomplete"
import Button from "../bits/Button"
import Select from "../bits/Select"
import TextInput from "../bits/TextInput"
import countries from "../../data/countries.json"
import validators from "../../helpers/validators"
import styles from "./MyProfile.module.scss"
import axios from "axios"
import { Formik, Form } from "formik"
import * as Yup from "yup"

const MyProfile = () => {
  const { authState } = useContext(AuthContext)
  const formikRef = useRef()
  const validationSchema = {
    firstName: validators.string,
    lastName: validators.string,
    city: validators.string,
    country: validators.string,
  }

  const handleSubmit = async (values) => {
    const formik = formikRef.current

    try {
      const results = await axios.put(
        `/api/users/${authState.username}`,
        values
      )
      formik.setSubmitting(false)
      console.log(results.data)
    } catch (error) {
      formik.setSubmitting(false)
      console.log(error)
    }
  }

  const getUserInfo = useCallback(async (username) => {
    try {
      const results = await axios.get(`/api/users/${username}`)
      const user = results.data
      formikRef.current.setValues(user)
    } catch (error) {
      console.log(error)
    }
  }, [])
  useEffect(() => {
    window.scrollTo(0, 0)
    if (authState.username) getUserInfo(authState.username)
  }, [authState.username, getUserInfo])

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>
        {authState.username ? `${authState.username}'s profile` : " "}
      </h1>
      <Formik
        innerRef={formikRef}
        initialValues={{
          firstName: "",
          lastName: "",
          city: "",
          country: "",
        }}
        validationSchema={Yup.object(validationSchema)}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting }) => (
          <Form className={styles.form}>
            <TextInput
              label="First Name"
              labelShow={values.firstName}
              type="text"
              name="firstName"
              placeholder="First Name"
            />
            <TextInput
              label="Last Name"
              labelShow={values.lastName}
              type="text"
              name="lastName"
              placeholder="Last Name"
            />
            <Select name="country" label="Country" labelShow={values.country}>
              <option disabled key="option-null" value="">
                Pick a Country
              </option>
              {countries.map((country, index) => (
                <option key={`option-${index}`} value={country.Code}>
                  {country.Name}
                </option>
              ))}
            </Select>
            <Autocomplete
              labelShow={values.city}
              label="City"
              type="text"
              name="city"
              country={values.country}
              placeholder="Your city"
            />
            <div className={styles.btnDiv}>
              <Button disabled={isSubmitting} type="submit" text="Update" />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default MyProfile
