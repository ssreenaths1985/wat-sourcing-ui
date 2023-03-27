import { APIS, APP } from "../constants";
import axios from "axios";
import Notify from "../helpers/notify";

/**
 * Admin service
 * Handles all the data fetching process
 */

export const AdminService = {
  // getAllDepartments,
  getDepartmentDetails,
  getUserDetails,
  downloadDataAsCsv,
  downloadDataAsCsvForDept,
  getMDOByAdmin,
};

// function getAllDepartments() {
//   const requestOptions = {
//     url: window.env.REACT_APP_WAT_API_URL + APIS.ALL_DEPARTMENTS,
//     method: APP.REQUEST.GET,
//     headers: {
//       "x-access-token": sessionStorage.getItem("token"),
//       "Content-Type": "application/json",
//     },
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

function getDepartmentDetails(name) {
  const requestOptions = {
    url: window.env.REACT_APP_WAT_API_URL + APIS.DEPARTMENT_DETAILS + name,
    method: APP.REQUEST.GET,
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

function getUserDetails(id) {
  const requestOptions = {
    url: window.env.REACT_APP_WAT_API_URL + APIS.USER_DETAILS + id,
    method: APP.REQUEST.GET,
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

function downloadDataAsCsv(id) {
  const requestOptions = {
    url: window.env.REACT_APP_WAT_API_URL + APIS.DOWNLOAD_AS_CSV + id,
    method: APP.REQUEST.GET,
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

function downloadDataAsCsvForDept(name) {
  const requestOptions = {
    url: window.env.REACT_APP_WAT_API_URL + APIS.DOWNLOAD_AS_CSV_DEPT + name,
    method: APP.REQUEST.GET,
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

function getMDOByAdmin(id) {
  const requestOptions = {
    url: window.env.REACT_APP_WAT_API_URL + APIS.GET_MDO_BY_ADMIN + id,
    method: APP.REQUEST.GET,
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

