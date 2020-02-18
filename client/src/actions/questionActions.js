// import axios from 'axios';

// import { QUESTIONS_LOADING } from './types';

// // Get current questions
// export const getQuestions = questionData => dispatch => {
//   dispatch(questionsLoading());
//   axios
//     .post('/api/question/getQuestions', questionData)
//     .then(res => {
//       console.log(res);
//       dispatch({
//         type: GET_QUESTIONS,
//         payload: res.data
//       });
//     })
//     .catch(err => {
//       console.log(err);
//       dispatch({
//         type: GET_QUESTIONS,
//         payload: {}
//       });
//     });
// };

// // Set loading
// export const questionsLoading = () => {
//   return {
//     type: QUESTIONS_LOADING
//   };
// };
