import axios from 'axios';

import {
  GET_PROFILE,
  UPDATE_QUESTIONS,
  UPDATE_TASKS,
  PROFILE_LOADING,
  SET_ALERTED,
  SET_ASSIGNMENT,
  UPDATE_SELECTED,
  QUESTION_RESET,
  UPDATE_ANSWERED,
  UPDATE_PAGENUMBER
} from './types';

// Profile loading
export const setLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear alert
export const setAlerted = () => {
  return {
    type: SET_ALERTED
  };
};

// Set current page number in question feed
export const updateStorePageNumbers = pageNumbers => {
  return {
    type: UPDATE_PAGENUMBER,
    payload: pageNumbers
  };
};

// Get current profile
export const getProfile = () => dispatch => {
  dispatch(setLoading());
  axios
    .post('/api/profile/getProfile')
    .then(res => {
      console.log(res);
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_PROFILE,
        payload: []
      });
    });
};

// Set Assignment
export const setAssignment = assignment => {
  return {
    type: SET_ASSIGNMENT,
    payload: assignment
  };
};

// Update current questions or get new set of questions if current questions are completed
export const updateQuestions = questionData => dispatch => {
  console.log('questionData', questionData);
  dispatch(setLoading());
  axios
    .post('/api/profile/updateQuestions', questionData)
    .then(res => {
      console.log(res);
      dispatch({
        type: UPDATE_QUESTIONS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: UPDATE_QUESTIONS,
        payload: []
      });
    });
};

// Get new set of tasks and questions on submitting assignment
export const updateTasks = taskData => dispatch => {
  dispatch(setLoading());
  axios
    .post('/api/profile/updateTasks', taskData)
    .then(res => {
      const { currentSubject, assignment, currentAssQuestionsData } = taskData;

      dispatch({
        type: UPDATE_TASKS,
        payload: res.data
      });
      dispatch(
        updateQuestions({
          assignment,
          currentSubject,
          allCurrentTasks: res.data,
          currentAssQuestionsData
        })
      );
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: UPDATE_TASKS,
        payload: []
      });
    });
};

// Update current question store "selected"
export const updateStoreSelected = selectedData => {
  return {
    type: UPDATE_SELECTED,
    payload: selectedData
  };
};

// Update current question store "answered"
export const updateStoreAnswered = answeredData => {
  console.log('answeredData', answeredData);
  return {
    type: UPDATE_ANSWERED,
    payload: answeredData
  };
};

/* -------------------------------------------------------------------------- */
/*                           EXTRA STUFF FOR DEBUGGING                        */
/* -------------------------------------------------------------------------- */

// Reset Questions
export const resetQuestions = () => {
  return {
    type: QUESTION_RESET
  };
};
