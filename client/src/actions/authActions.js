import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, CLEAR_ERRORS, SET_CURRENT_USER } from "./types";

// Register User
export const registerUser = (userData, history) => dispatch => {
  console.log(userData, history);
  axios
    .post("/api/users/register", userData)
    .then(() => {
      dispatch(clearErrors());
      history.push("/login");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - Get User Token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      // Set token to LS
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      //Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
      dispatch(clearErrors());
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Logout user
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will also set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

// Change Currently Loggedin User's Password
export const changePassword = (passwordData, updated) => dispatch => {
  axios
    .post("/api/users/changePass", passwordData)
    .then(() => {
      dispatch(clearErrors());
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Reset User's Forgotten Password
export const resetPassword = email => dispatch => {
  axios
    .post("/api/users/emailResetToken", email)
    .then(res => {
      this.setState({
        messageFromServer: "nice!"
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Delete account & profile
export const deleteAccount = () => dispatch => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    axios
      .delete("/api/deleteAccount")
      .then(() => dispatch(logoutUser()))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

export const updateAccount = updatedUser => dispatch => {
  console.log(updatedUser);
  axios
    .post("/api/users/updateAccount", updatedUser)
    .then(res => {
      // Save to localStorage
      const { token } = res.data;
      // Set token to LS
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      //Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
      dispatch(clearErrors());
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
