import React, { useContext } from "react"
import { Switch, Route } from "react-router-dom"
import AllBooks from "./allBooks/AllBooks"
import Landing from "./landing/Landing"
import LogInForm from "./auth/LogInForm"
import Modal from "./modal/Modal"
import MyBooks from "./myBooks/MyBooks"
import MyProfile from "./myProfile/MyProfile"
import Navbar from "./layout/Navbar"
import SignUpForm from "./auth/SignUpForm"
import { AppContext } from "../contexts/AppContext"
import styles from "./App.module.scss"
import SearchContextProvider from "../contexts/SearchContext"
import FindBooks from "./findBooks/FindBooks"
import BookDetail from "./bookDetail/BookDetail"
import MyTrades from "./myTrades/MyTrades"
import UserPublic from "./userPublic/UserPublic"
import ConfirmationScreen from "./confirmationScreen/ConfirmationScreen"
import ConfirmDeletion from "./shared/ConfirmDeletion"
import WindowSizeContextProvider from "../contexts/WindowSizeContext"
import { AuthContext } from "../contexts/AuthContext"

function App() {
  const { state } = useContext(AppContext)
  const { authState } = useContext(AuthContext)
  const { username } = authState
  return (
    <React.Fragment>
      <SearchContextProvider>
        <WindowSizeContextProvider>
          <Route exact path="/*">
            <Navbar />
          </Route>
          <div className={styles.container}>
            <Switch>
              <Route exact path="/">
                {username ? <AllBooks /> : <Landing />}
              </Route>
              <Route exact path="/books">
                <AllBooks />
              </Route>
              <Route exact path="/my-books">
                {username ? <MyBooks /> : <Landing />}
              </Route>
              <Route exact path="/find-books">
                {username ? <FindBooks /> : <Landing />}
              </Route>
              <Route exact path="/my-profile">
                {username ? <MyProfile /> : <Landing />}
              </Route>
              <Route exact path="/book/:googleId">
                <BookDetail />
              </Route>
              <Route exact path="/my-trades">
                {username ? <MyTrades /> : <Landing />}
              </Route>
              <Route exact path="/users/:username">
                <UserPublic />
              </Route>
              <Route exact path="/confirm/:requestId">
                {username ? <ConfirmationScreen /> : <Landing />}
              </Route>
            </Switch>
          </div>

          <Modal>
            {state.modal === "login" ? (
              <LogInForm />
            ) : state.modal === "signup" ? (
              <SignUpForm />
            ) : state.modal === "delete" ? (
              <ConfirmDeletion />
            ) : null}
          </Modal>
        </WindowSizeContextProvider>
      </SearchContextProvider>
    </React.Fragment>
  )
}

export default App
