import React from 'react';

import User from "../components/User/User"
import {useDispatch, useSelector} from "react-redux"
import userAPI from "../services/userAPI"
import {authActions} from "../store/authSlice"

const Profile = () => {
  const token = useSelector((state) => state.authentication.token)
  const dispatch = useDispatch()

  if (token !== null) {
    userAPI
      .setDataUser(token)
      .then((data) => {
        dispatch(authActions.setUser(data))
      })
  }

  return (
    <main className="main">
      <User />
    </main>
  );
}

export default Profile;