import axios from 'axios';

import {
  SET_PRACTICE,
  PRACTICE_LOADING,
  SET_ALERTED,
  SET_ASSIGNMENT,
  UPDATE_SELECTED,
  QUESTION_RESET,
  UPDATE_COMPLETED
} from './types';

// Practice loading
export const setLoading = () => {
  return {
    type: PRACTICE_LOADING
  };
};

// Clear alert
export const setAlerted = () => {
  return {
    type: SET_ALERTED
  };
};

// Get current practice
export const setPractice = () => dispatch => {
  dispatch(setLoading());
  axios
    .get('/api/practice/setPractice')
    .then(res => {
      console.log(res);
      dispatch({
        type: SET_PRACTICE,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: SET_PRACTICE,
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
    .post('/api/practice/updateQuestions', questionData)
    .then(res => {
      console.log(res);
      dispatch({
        type: SET_PRACTICE,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: SET_PRACTICE,
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

// Update current question store "completed"
export const updateStoreCompleted = completedData => {
  console.log('completedData', completedData);
  return {
    type: UPDATE_COMPLETED,
    payload: completedData
  };
};

//
// // Get profile questions
// export const setTasks = taskData => dispatch => {
//   dispatch(setLoading());
//   axios
//     .post('/api/practice/setTasks', taskData)
//     .then(res => {
//       console.log(res);
//       dispatch({
//         type: SET_PRACTICE,
//         payload: res.data
//       });
//     })
//     .catch(err => {
//       console.log(err);
//       dispatch({
//         type: SET_PRACTICE,
//         payload: []
//       });
//     });
// };

// Get new set of tasks and questions on submitting assignment
export const setTasks = taskData => dispatch => {
  dispatch(setLoading());
  axios
    .post('/api/practice/setTasks', taskData)
    .then(res => {
      console.log('res', res);
      console.log('res.data.practice', res.data.practice);
      console.log('assignment', taskData.assignment);
      const { tasks } = res.data;
      const { assignment, questions } = taskData;
      dispatch({
        type: SET_PRACTICE,
        payload: res.data
      });
      dispatch(
        updateQuestions({
          assignment,
          tasks,
          currentQuestions: questions
        })
      );
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: SET_PRACTICE,
        payload: []
      });
    });
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

// Update all profiles
export const updateAllProfiles = () => dispatch => {
  dispatch(setLoading());
  axios
    .get('/api/profile/updateAllProfiles')
    .then(res => {
      console.log(res);
      dispatch({
        type: SET_PRACTICE,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: SET_PRACTICE,
        payload: {}
      });
    });
};
