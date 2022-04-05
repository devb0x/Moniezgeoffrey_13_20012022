import axios from "axios"

const BASE_URL = 'http://localhost:3001/api/v1/user'

const userAPI = {

  login: (enteredEmail, enteredPassword) => {
    return axios
      .post(`${BASE_URL}/login`, {
        email: enteredEmail,
        password: enteredPassword
      })
      .then(response => {
        return response.data
      })
      .catch((err) => {
        console.log(err)
        if(err.response) {
          console.log(err.response.data.message)
        }
      })
  },

  logout: () => {
    localStorage.removeItem("token")
  },

  setDataUser: (token) => {
    return axios({
      method: 'post',
      url: `${BASE_URL}/profile`,
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(response => {
      return response.data
    })
  },

  updateDataUser: (token, firstname, lastname) => {
    return axios({
      method: 'put',
      url: `${BASE_URL}/profile`,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      data: {
        firstName: firstname,
        lastName: lastname
      }
    })
    .then(response => {
      return response.data
    })
  }

}

export default userAPI
