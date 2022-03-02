import {SET_EMAIL, SET_PASSWORD} from './Actions';

const intialState = {
  email: '',
  password: '',
};

function userReducer(state = intialState, action) {
  switch (action.type) {
    case SET_EMAIL:
      return {...state, email: action.payload};
    case SET_PASSWORD:
      return {...state, password: action.payload};
    default:
      return state;
  }
}
export default userReducer;