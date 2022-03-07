import React, { Fragment } from "react"
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"

import {useSelector} from "react-redux"

import Navbar from "./components/Navbar/Navbar"
import Footer from "./components/Footer/Footer"
import Homepage from "./pages/Homepage"
import LoginPage from "./pages/LoginPage"
import Profile from "./pages/Profile"

function App() {
  const tokenStore = useSelector((state) => state.authentication.token)

  return (
    <Fragment>
      <Router>
        <Navbar />
        <Routes>
          <Route
            exact path={'/'}
            element={ <Navigate to="/homepage" /> }
          />
          <Route
            exact path={"/homepage"}
            element={
              <Homepage />
            }
          />
          <Route
            exact path={"/login"}
            element={
              <LoginPage />
            }
          />
           <Route
            exact path={"/profile"}
            element={tokenStore !== null ? <Profile /> : <Navigate to="/login" /> }
          />
        </Routes>
        <Footer />
      </Router>
    </Fragment>
  )
}

export default App
