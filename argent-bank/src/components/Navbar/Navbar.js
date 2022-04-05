import React, {Fragment, useEffect, useState} from 'react'
import {Link, useNavigate} from "react-router-dom"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from "@fortawesome/free-solid-svg-icons"
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons"

import classes from './Navbar.module.css'
import logo from '../../assets/img/argentBankLogo.png'
import {useDispatch, useSelector} from "react-redux"
import {authActions} from "../../store/authSlice"
import userAPI from "../../services/userAPI"
import {errorActions} from "../../store/error/errorSlice"

const Navbar = () => {
  const token = useSelector((state) => state.authentication.token)
  const firstName = useSelector((state) => state.authentication.firstName)

  const [isAuth, setIsAuth] = useState(false)

  let navigate = useNavigate()

  const dispatch = useDispatch()
  const logoutHandler = () => {
    setIsAuth(false)
    userAPI.logout()
    dispatch(authActions.logout())
    navigate('/login')
  }

  useEffect(() => {
    if (token) {
      userAPI
        .setDataUser(token)
        .then((data) => {
          dispatch(authActions.setUser(data))
        })
        .then(() => {
          setIsAuth(true)
        })
        .then(() => {
          dispatch(errorActions.clearError())
        })
    }
  }, [dispatch, token])

  return (
    <nav className={`${classes['main-nav']}`}>
      <Link className={`${classes['main-nav-logo']}`} to="/homepage">
        <img
          className={`${classes['main-nav-logo-image']}`}
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className={`${classes['sr-only']}`}>Argent Bank</h1>
      </Link>
      <div className={`${classes['profile-nav']}`}>
        {isAuth &&
          <Fragment>
            <FontAwesomeIcon icon={faUserCircle} className={`${classes['icon-nav']}`}/>
            <Link className={`${classes['username']}`} to="/profile">
              {firstName}
            </Link>
            <FontAwesomeIcon icon={faSignOutAlt} className={`${classes['icon-nav']}`}/>
            <button
              onClick={logoutHandler}
              className={`${classes['main-nav-item']} ${classes['btn-nav']}`}
            >
              Sign out
            </button>
          </Fragment>
        }
        {!isAuth &&
          <Fragment>
            <FontAwesomeIcon icon={faUserCircle} className={`${classes['icon-nav']}`}/>
            <Link className={`${classes['main-nav-item']} ${classes['btn-nav']}`} to="/login">
              Sign In
            </Link>
          </Fragment>
        }
      </div>
    </nav>
  )
}

export default Navbar