import React, { useContext } from "react"
import { Switch, Route } from "react-router-dom"
import AllBooks from "./allBooks/AllBooks"
import Landing from "./landing/Landing"
import LogInForm from "./auth/LogInForm"
import Modal from "./modal/Modal"
import MyBooks from "./myBooks/MyBooks"
import Navbar from "./layout/Navbar"
import SignUpForm from "./auth/SignUpForm"
import { AppContext } from "../contexts/AppContext"
import styles from "./App.module.scss"
import SearchContextProvider from "../contexts/SearchContext"

function App() {
  const { state } = useContext(AppContext)
  return (
    <React.Fragment>
      <Route exact path="/*">
        <Navbar />
      </Route>
      <div className={styles.container}>
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route exact path="/books">
            <AllBooks />
          </Route>
          <Route exact path="/my-books">
            <SearchContextProvider>
              <MyBooks />
            </SearchContextProvider>
          </Route>
        </Switch>
      </div>

      <Modal>
        {state.modal === "login" ? (
          <LogInForm />
        ) : state.modal === "signup" ? (
          <SignUpForm />
        ) : null}
      </Modal>
    </React.Fragment>
  )
}

export default App
