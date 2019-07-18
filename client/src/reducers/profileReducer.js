import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, SET_ALERTED } from '../actions/types';

const initialState = {
  profile: null,
  profiles: null,
  loading: false,
  alerted: false
};

export default function(state = initialState, action) {
  switch (action.type) {
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
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };
    case SET_ALERTED:
      return {
        ...state,
        alerted: true
      };
    default:
      return state;
  }
}
