import React, { useContext, useRef } from "react"
import { AppContext } from "../../contexts/AppContext"
import { AuthContext } from "../../contexts/AuthContext"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import validators from "../../helpers/validators"
import Button from "../bits/Button"
import TextInput from "../bits/TextInput"
import styles from "./AuthForm.module.scss"
import axios from "axios"

const LogInForm = (props) => {
  const { state, dispatch } = useContext(AppContext)
  const { authState, authDispatch } = useContext(AuthContext)
  const validationSchema = {
    username: validators.username,
    password: validators.password,
  }

  const handleSubmit = async (values) => {
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
      dispatch({ type: "TOGGLE_MODAL" })
    } catch (error) {
      console.log(error)
    }
  }
  const handleCancel = () => {
    dispatch({ type: "TOGGLE_MODAL" })
  }

  return (
    <React.Fragment>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={Yup.object(validationSchema)}
        onSubmit={handleSubmit}
      >
        {({ values, errors }) => (
          <Form>
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
              <Button text="Cancel" type="button" onClick={handleCancel} />
              <Button type="submit" text="Submit" />
            </div>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  )
}

export default LogInForm
