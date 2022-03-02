import {LOGIN_USER} from '../actions/actionTypes';

const initialState = {
    loginUserDetail: null
};

const LoginUserDetailReducer = (state = initialState, action) => {
    console.log(action);

  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        loginUserDetail: action.payload
      };
    default:
      return state;
  }
};
export default LoginUserDetailReducer;