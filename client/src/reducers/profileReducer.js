import {
  GET_PROFILE,
  PROFILE_LOADING,
  SET_ALERTED,
  SET_ASSIGNMENT,
  UPDATE_PAGENUMBER,
  UPDATE_SELECTED,
  UPDATE_ANSWERED,
  UPDATE_TASKS,
  UPDATE_QUESTIONS
} from '../actions/types';

const initialState = {
  profile: null,
  loading: false,
  alerted: false,
  pageNumbers: [0, 0, 0],
  assignment: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ALERTED:
      return {
        ...state,
        alerted: true
      };
    case UPDATE_PAGENUMBER:
      return {
        ...state,
        pageNumbers: action.payload
      };
    case SET_ASSIGNMENT:
      return {
        ...state,
        assignment: action.payload
      };
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case UPDATE_TASKS:
      return {
        ...state,
        profile: {
          ...state.profile,
          tasksHistory: action.payload
        }
      };
    case UPDATE_QUESTIONS:
      return {
        ...state,
        profile: {
          ...state.profile,
          questionsHistory: action.payload
        },
        loading: false
      };
    case UPDATE_SELECTED:
      const { selected, currentQuestion } = action.payload;
      return {
        ...state,
        profile: {
          ...state.profile,
          questionsHistory: state.profile.questionsHistory.map(question => {
            if (currentQuestion.questionContent._id !== question.questionContent._id) {
              return question;
            }
            return {
              ...question,
              selected
            };
          })
        }
      };
    case UPDATE_ANSWERED:
      const { answered } = action.payload;
      return {
        ...state,
        profile: {
          ...state.profile,
          questionsHistory: state.profile.questionsHistory.map(question => {
            if (
              action.payload.currentQuestion.questionContent._id !== question.questionContent._id
            ) {
              return question;
            }
            return {
              ...question,
              answered
            };
          })
        }
      };
    default:
      return state;
  }
}
