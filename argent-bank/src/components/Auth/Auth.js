import React, {useRef} from 'react'
import {useDispatch, useSelector} from "react-redux"
import classes from './Auth.module.css'

import {authActions} from "../../store/authSlice"
import {useNavigate} from "react-router-dom"
import userAPI from "../../services/userAPI"
import {errorActions} from "../../store/error/errorSlice"

const Auth = () => {
  const dispatch = useDispatch()
  const emailInputRef = useRef()
  const passwordInputRef = useRef()
  const rememberMeRef = useRef()
  const errorMessage = useSelector((state) => state.error.message)

  let navigate = useNavigate()

  const submitHandler = (event) => {
    event.preventDefault()
    const enteredEmail = emailInputRef.current.value
    const enteredPassword = passwordInputRef.current.value
    const rememberMe = rememberMeRef.current.checked

    userAPI
      .login(enteredEmail, enteredPassword)
      .then((data) => {
        dispatch(authActions.login({token: data.body.token}))

        if (rememberMe) {
          localStorage.setItem("token", data.body.token)
        }
      })
      .then(() => {
        navigate('/profile')
      })
      .catch((err) => {
        if (err) {
          dispatch(errorActions
            .showError({
              message: 'Invalid email / password',
            })
          )
          console.error(errorMessage)
        }
      })
  }

  return (
    <section className={`${classes['sign-in-content']}`}>
      <i className="fa fa-user-circle sign-in-icon" />
      <h1>Sign In</h1>
      <form onSubmit={submitHandler}>
        <div className={`${classes['input-wrapper']}`}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={`${classes['input-wrapper']}`}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" required ref={passwordInputRef} />
        </div>
        <div className={`${classes['input-remember']}`}>
          <input type="checkbox" id="remember-me" ref={rememberMeRef}/>
          <label htmlFor="remember-me">Remember me</label>
        </div>

        {errorMessage &&
          <p style={{color: 'red'}}>{errorMessage}</p>
        }

        <button type="submit" className={`${classes['sign-in-button']}`}>Sign In</button>
      </form>
    </section>
  )
}

export default Auth
