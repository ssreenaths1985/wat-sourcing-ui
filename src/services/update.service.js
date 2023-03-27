import { APIS, APP } from "../constants";
import axios from "axios";
import Notify from "../helpers/notify";

/**
 * Update service
 * Handles survey update process
 */

export const UpdateService = {
  updateUserData,
  updateRolesData,
  // updateRoleActData,
  // updateRoleCompData,
  deleteAnRecord,
  deleteAnRole,
};

function updateUserData(data, id) {
  const requestOptions = {
    url: window.env.REACT_APP_WAT_API_URL + APIS.UPDATE_USER_DATA + id,
    method: APP.REQUEST.PUT,
    headers: {
      "x-access-token": sessionStorage.getItem("token"),
      "Content-Type": "application/json",
    },
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

function updateRolesData(data) {
  const requestOptions = {
    url: window.env.REACT_APP_WAT_API_URL + APIS.UPDATE_ROLE_DATA,
    method: APP.REQUEST.PUT,
    headers: {
      "x-access-token": sessionStorage.getItem("token"),
      "Content-Type": "application/json",
    },
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

// function updateRoleActData(data) {
//   const requestOptions = {
//     url: window.env.REACT_APP_WAT_API_URL + APIS.UPDATE_ROLE_ACT_DATA,
//     method: APP.REQUEST.PUT,
//     headers: {
//       "x-access-token": sessionStorage.getItem("token"),
//       "Content-Type": "application/json",
//     },
//     data: data,
//   };

//   return axios(requestOptions)
//     .then(handleResponse)
//     .catch((err) => {
//       if (err.message.includes(401)) {
//         Notify.error("Something went wrong! Please try again later");
//       } else {
//         Notify.error(err.message);
//       }
//     });
// }

// function updateRoleCompData(data) {
//   const requestOptions = {
//     url: window.env.REACT_APP_WAT_API_URL + APIS.UPDATE_ROLE_COMP_DATA,
//     method: APP.REQUEST.PUT,
//     headers: {
//       "x-access-token": sessionStorage.getItem("token"),
//       "Content-Type": "application/json",
//     },
//     data: data,
//   };

//   return axios(requestOptions)
//     .then(handleResponse)
//     .catch((err) => {
//       if (err.message.includes(401)) {
//         Notify.error("Something went wrong! Please try again later");
//       } else {
//         Notify.error(err.message);
//       }
//     });
// }

function deleteAnRecord(data) {
  const requestOptions = {
    url:
      window.env.REACT_APP_WAT_API_URL +
      APIS.DELETE_AN_RECORD +
      data.table +
      "/" +
      data.field +
      "/" +
      data.item,
    method: APP.REQUEST.DELETE,
    headers: {
      "x-access-token": sessionStorage.getItem("token"),
      "Content-Type": "application/json",
    },
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

function deleteAnRole(id) {
  const requestOptions = {
    url: window.env.REACT_APP_WAT_API_URL + APIS.DELETE_AN_ROLE + id,
    method: APP.REQUEST.DELETE,
    headers: {
      "x-access-token": sessionStorage.getItem("token"),
      "Content-Type": "application/json",
    },
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
