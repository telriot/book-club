import React from "react"
import ReactDOM from "react-dom"
import "./index.scss"
import App from "./components/App"
import AppContextProvider from "./contexts/AppContext"
import { BrowserRouter as Router } from "react-router-dom"
import AuthContextProvider from "./contexts/AuthContext"

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AppContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </AppContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
)
