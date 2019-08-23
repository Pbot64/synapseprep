import { GET_QUESTIONS, QUESTIONS_LOADING } from '../actions/types';

const initialState = {
  loading: false,
  currentQuestions: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case QUESTIONS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_QUESTIONS:
      return {
        ...state,
        loading: false,
        currentQuestions: action.payload
      };

    default:
      return state;
  }
}
