import { APIS, APP } from "../constants";
import axios from "axios";
import Notify from "../helpers/notify";
import { authHeader } from "../helpers/authHeader";

export const AuthService = {
  signIn,
  isLogin,
  logout,
  signup,
};

// Login
function signIn(data) {
  const requestOptions = {
    url:window.env.REACT_APP_WAT_API_URL + APIS.LOGIN,
    method: APP.REQUEST.POST,
    headers: authHeader(),
    data: data,
  };

  return axios(requestOptions)
    .then(handleResponse)
    .catch((err) => {
      if (err.message.includes(401)) {
        Notify.error("Invalid credentials!");
      } else {
        Notify.error(err.message);
      }
    });
}

//signup
function signup(data) {
  const requestOptions = {
    url: window.env.REACT_APP_WAT_API_URL + APIS.SIGNUP,
    method: APP.REQUEST.POST,
    headers: authHeader(),
    data: data,
  };

  return axios(requestOptions)
    .then(handleResponse)
    .catch((err) => {
      if (err.message.includes(401)) {
        Notify.error("Something went wrong! Please try again later");
      } else {
        Notify.error(err.message);
      }
    });
}

function handleResponse(response) {
  if (response.status === 401) {
    const error = (response && response.message) || response.statusText; //Ignoring server side error and using end user readable message
    return Promise.reject(new Error(error));
  }
  return response;
}

//Login status
function isLogin() {
  // if (localStorage.getItem('token')) return true;
  if (sessionStorage.getItem("token")) return true;
  return false;
}

// LOGOUT
function logout() {
  // localStorage.removeItem('token')
  sessionStorage.removeItem("token");
}
