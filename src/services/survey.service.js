import { APIS, APP } from "../constants";
import axios from "axios";
import Notify from "../helpers/notify";
import { authHeader } from "../helpers/authHeader";

/**
 * Survey service
 * Handles survey submit process
 */

export const SurveyService = {
  submitSurvey,
};

function submitSurvey(data) {
  const requestOptions = {
    url: window.env.REACT_APP_WAT_API_URL + APIS.SUBMIT_DATA,
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
