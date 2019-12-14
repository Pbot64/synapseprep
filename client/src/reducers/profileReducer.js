import {
  SET_PRACTICE,
  PRACTICE_LOADING,
  SET_ALERTED,
  SET_ASSIGNMENT,
  UPDATE_SELECTED,
  UPDATE_COMPLETED
} from '../actions/types';

const initialState = {
  practice: null,
  loading: false,
  alerted: false,
  assignment: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PRACTICE_LOADING:
      return {
        ...state,
        loading: true
      };
    case SET_PRACTICE:
      return {
        ...state,
        practice: action.payload,
        loading: false
      };
    case SET_ALERTED:
      return {
        ...state,
        alerted: true
      };
    case SET_ASSIGNMENT:
      return {
        ...state,
        assignment: action.payload
      };
    case UPDATE_SELECTED:
      const { selected } = action.payload;
      return {
        ...state,
        practice: {
          ...state.practice,
          questions: state.practice.questions.map((questionSet, index) => {
            if (index !== action.payload.assignment) {
              return questionSet;
            }
            return questionSet.map((question, index) => {
              if (action.payload.pageNumber !== index) {
                return question;
              }
              return {
                ...question,
                selected
              };
            });
          })
        }
      };
    case UPDATE_COMPLETED:
      const { completed } = action.payload;
      return {
        ...state,
        practice: {
          ...state.practice,
          questions: state.practice.questions.map((questionSet, index) => {
            if (index !== action.payload.assignment) {
              return questionSet;
            }
            return questionSet.map((question, index) => {
              if (action.payload.pageNumber !== index) {
                return question;
              }
              return {
                ...question,
                completed
              };
            });
          })
        }
      };
    default:
      return state;
  }
}
