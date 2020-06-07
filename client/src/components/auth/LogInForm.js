import React, { useContext, useRef } from "react"
import { AppContext } from "../../contexts/AppContext"
import { AuthContext } from "../../contexts/AuthContext"
import Button from "../bits/Button"
import TextInput from "../bits/TextInput"
import styles from "./AuthForm.module.scss"
import validators from "../../helpers/validators"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import axios from "axios"

const LogInForm = () => {
  const { dispatch } = useContext(AppContext)
  const { authDispatch } = useContext(AuthContext)
  const validationSchema = {
    username: validators.username,
    password: validators.password,
  }
  const formikRef = useRef()
  const handleSubmit = async (values) => {
    const formik = formikRef.current
    const { username, password } = values
    try {
      const submission = { username, password }
      const result = await axios.post("/api/auth/login", submission, {
        "Content-Type": "application/x-www-form-urlencoded",
      })
      result.data.id &&
        authDispatch({
          type: "LOGIN_USER",
          username: result.data.username,
          id: result.data.id,
        })
      formik.setSubmitting(false)

      dispatch({ type: "TOGGLE_MODAL" })
    } catch (error) {
      formik.setSubmitting(false)

      console.log(error)
    }
  }
  const handleCancel = () => {
    dispatch({ type: "TOGGLE_MODAL" })
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Log in</h2>
      <Formik
        innerRef={formikRef}
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={Yup.object(validationSchema)}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={styles.form}>
            {" "}
            <TextInput
              label="Username"
              type="text"
              name="username"
              placeholder="Username"
            />
            <TextInput
              label="Password"
              type="password"
              name="password"
              placeholder="Password"
            />
            <div className={styles.btnDiv}>
              <Button
                text="Cancel"
                color="blue"
                type="button"
                onClick={handleCancel}
              />
              <Button disabled={isSubmitting} type="submit" text="Submit" />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default LogInForm
