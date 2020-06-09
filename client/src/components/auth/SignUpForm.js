import React, { useContext, useRef } from "react"
import { AppContext } from "../../contexts/AppContext"
import Button from "../bits/Button"
import Select from "../bits/Select"
import TextInput from "../bits/TextInput"
import validators from "../../helpers/validators"
import styles from "./AuthForm.module.scss"
import selectStyles from "../bits/Select.module.scss"
import countries from "../../data/countries.json"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import axios from "axios"

const SignUpForm = () => {
  const { dispatch } = useContext(AppContext)

  const validationSchema = {
    username: validators.username,
    password: validators.password,
    email: validators.email,
    country: validators.stringRequired,
  }
  const formikRef = useRef()

  const handleSubmit = async (values) => {
    const formik = formikRef.current

    const { username, email, password, country } = values
    try {
      const submission = { username, email, password, country }
      const result = await axios.post("/api/auth/signup", submission, {
        "Content-Type": "application/x-www-form-urlencoded",
      })

      formik.setSubmitting(false)
      dispatch({ type: "TOGGLE_MODAL" })
      dispatch({ type: "TOGGLE_MODAL", modal: "login" })

      console.log(result)
    } catch (error) {
      formik.setSubmitting(false)
      formik.resetForm()
      formik.setFieldError("general", "Something went wrong...")
      console.log(error)
    }
  }

  const handleCancel = () => {
    dispatch({ type: "TOGGLE_MODAL" })
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Sign up</h2>
      <Formik
        innerRef={formikRef}
        initialValues={{
          username: "",
          password: "",
          email: "",
          showPassword: false,
          country: "",
        }}
        validationSchema={Yup.object(validationSchema)}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors }) => (
          <Form className={styles.form}>
            <p className={styles.error}>{errors.general}</p>
            <TextInput
              label="Username"
              type="text"
              name="username"
              placeholder="Username"
            />
            <TextInput
              label="Email Address"
              type="email"
              name="email"
              placeholder="Email Address"
            />
            <Select label="Country" name="country">
              {countries.map((option, index) => {
                return (
                  <option
                    key={`option-${index}`}
                    value={option.Code}
                    className={selectStyles.option}
                  >
                    {option.Name}
                  </option>
                )
              })}
            </Select>
            <TextInput
              label="Password"
              type="password"
              name="password"
              placeholder="Password"
            />
            <TextInput
              label="PasswordCheck"
              type="password"
              name="password-check"
              placeholder="Confirm your password"
            />

            <div className={styles.btnDiv}>
              <Button
                text="Cancel"
                color="blue"
                type="button"
                onClick={handleCancel}
              />{" "}
              <Button disabled={isSubmitting} type="submit" text="Submit" />{" "}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default SignUpForm
