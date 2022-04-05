import React, {useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {authActions} from "../../store/authSlice"

import classes from './User.module.css'
import userAPI from "../../services/userAPI"

const User = () => {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.authentication.token)
  const firstName = useSelector((state) => state.authentication.firstName)
  const lastName = useSelector((state) => state.authentication.lastName)

  const [editMode, setEditMode] = useState(false)

  const [firstname, setFirstname] = useState(firstName)
  const [lastname, setLastname] = useState(lastName)

  const editModeHandler = () => {
    setEditMode(!editMode)
    setFirstname(firstName)
    setLastname(lastName)
  }

  const firstnameInputHandler = (event) => {
    setFirstname(event.target.value)
  }

  const lastnameInputHandler = (event) => {
    setLastname(event.target.value)
  }

  const updateUserHandler = (event) => {
    event.preventDefault()

    userAPI
      .updateDataUser(token, firstname, lastname)
      .then((data) => {
        dispatch(authActions.updateUser(data))
      })
      .then(() => {
        setEditMode(false)
      })
  }

  return (
    <main className={`${classes['main']} ${classes['bg-dark']}`}>
      <div className={`${classes['header']}`}>
        <h1>Welcome back<br/>{firstName} {lastName}!</h1>

        {!editMode &&  (
          <button
            className={`${classes['edit-button']}`}
            onClick={editModeHandler}
          >
            Edit Name
          </button>
        )}
        {editMode && (
          <form onSubmit={updateUserHandler} className={`${classes['form']}`}>
            <div className={`${classes['input-wrapper']}`}>
              <label htmlFor="firstname" className={`${classes['hidden']}`}>firstname</label>
              <input
                type="text"
                id="firstname"
                className={`${classes['input']} ${classes['input-firstname']}`}
                placeholder={firstName}
                onChange={firstnameInputHandler}
              />
              <label htmlFor="lastname" className={`${classes['hidden']}`}>lastname</label>
              <input
                type="text"
                id="lastname"
                className={`${classes['input']} ${classes['input-lastname']}`}
                placeholder={lastName}
                onChange={lastnameInputHandler}
              />
            </div>
            <div className={`${classes['button-wrapper']}`}>
              <button
                type="submit"
                className={`${classes['edit-button']} ${classes['edit-button__save']}`}
                onClick={updateUserHandler}
              >
                Save
              </button>
              <button
                type="button"
                className={`${classes['edit-button']} ${classes['edit-button__cancel']}`}
                onClick={editModeHandler}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      <h2 className="sr-only">Accounts</h2>
      <section className={`${classes['account']}`}>
        <div className={`${classes['account-content-wrapper']}`}>
          <h3 className={`${classes['account-title']}`}>Argent Bank Checking (x8349)</h3>
          <p className={`${classes['account-amount']}`}>$2,082.79</p>
          <p className={`${classes['account-amount-description']}`}>Available Balance</p>
        </div>
        <div className={`${classes['account-content-wrapper']} ${classes['cta']}`}>
          <button className={`${classes['transaction-button']}`}>View transactions</button>
        </div>
      </section>
      <section className={`${classes['account']}`}>
        <div className={`${classes['account-content-wrapper']}`}>
          <h3 className={`${classes['account-title']}`}>Argent Bank Savings (x6712)</h3>
          <p className={`${classes['account-amount']}`}>$10,928.42</p>
          <p className={`${classes['account-amount-description']}`}>Available Balance</p>
        </div>
        <div className={`${classes['account-content-wrapper']} ${classes['cta']}`}>
          <button className={`${classes['transaction-button']}`}>View transactions</button>
        </div>
      </section>
      <section className={`${classes['account']}`}>
        <div className={`${classes['account-content-wrapper']}`}>
          <h3 className={`${classes['account-title']}`}>Argent Bank Credit Card (x8349)</h3>
          <p className={`${classes['account-amount']}`}>$184.30</p>
          <p className={`${classes['account-amount-description']}`}>Current Balance</p>
        </div>
        <div className={`${classes['account-content-wrapper']} ${classes['cta']}`}>
          <button className={`${classes['transaction-button']}`}>View transactions</button>
        </div>
      </section>
    </main>
  )
}

export default User