import React, { useContext } from "react"
import { AppContext } from "../../contexts/AppContext"
import Button from "../bits/Button"
import TextInput from "../bits/TextInput"
import validators from "../../helpers/validators"
import styles from "./AuthForm.module.scss"
import { Formik, Form } from "formik"
import * as Yup from "yup"

import axios from "axios"

const SignUpForm = () => {
  const { dispatch } = useContext(AppContext)

  const validationSchema = {
    username: validators.username,
    password: validators.password,
    email: validators.email,
  }

  const handleSubmit = async (values) => {
    const { username, email, password } = values
    try {
      const submission = { username, email, password }
      const result = await axios.post("/api/auth/signup", submission, {
        "Content-Type": "application/x-www-form-urlencoded",
      })
      console.log(result)
    } catch (error) {
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
        initialValues={{
          username: "",
          password: "",
          email: "",
          showPassword: false,
        }}
        validationSchema={Yup.object(validationSchema)}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className={styles.form}>
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
              <Button type="submit" text="Submit" />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default SignUpForm
