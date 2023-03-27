import { APIS, APP } from "../constants";
import axios from "axios";
import Notify from "../helpers/notify";

/**
 * Superadmin service
 * Handles all the data fetching process
 */

export const SuperAdminService = {
  createDepartments,
  getAllAdmins,
  createAdmin,
  getDepartmentList,
  deleteDepartmentById,
  getAllMappedAdmins,
  getMDODetailsById,
  updateMDOById,
};

function createDepartments(data) {
  const requestOptions = {
    url: window.env.REACT_APP_WAT_API_URL + APIS.CREATE_DEPTS,
    method: APP.REQUEST.POST,
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
        Notify.error("MDO already exist!");
      }
    });
}

function getAllAdmins() {
  const requestOptions = {
    url: window.env.REACT_APP_WAT_API_URL + APIS.GET_ALL_ADMINS,
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

function createAdmin(data) {
  const requestOptions = {
    url: window.env.REACT_APP_WAT_API_URL + APIS.CREATE_MDO_ADMIN,
    method: APP.REQUEST.POST,
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

function getDepartmentList() {
  const requestOptions = {
    url: window.env.REACT_APP_WAT_API_URL + APIS.GET_DEPT_LIST,
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

function getMDODetailsById(id) {
  const requestOptions = {
    url: window.env.REACT_APP_WAT_API_URL + APIS.GET_MDO_DETAILS_BY_ID + id,
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

function deleteDepartmentById(id) {
  const requestOptions = {
    url: window.env.REACT_APP_WAT_API_URL + APIS.DELETE_DEPT_BY_ID + id,
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

function getAllMappedAdmins(id) {
  const requestOptions = {
    url: window.env.REACT_APP_WAT_API_URL + APIS.GET_MAPPED_ADMINS + id,
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

function updateMDOById(id, data) {
  const requestOptions = {
    url: window.env.REACT_APP_WAT_API_URL + APIS.UPDATE_MDO_BY_ID + id,
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

function handleResponse(response) {
  if (response.status === 401) {
    const error = (response && response.message) || response.statusText; //Ignoring server side error and using end user readable message
    return Promise.reject(new Error(error));
  }
  return response;
}
