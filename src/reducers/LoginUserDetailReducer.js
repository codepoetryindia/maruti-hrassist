import {LOGIN_USER, LOGOUT_USER} from '../actions/actionTypes';

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
    case LOGOUT_USER :
      return{loginUserDetail: null}
    default:
      return state;
  }
};
export default LoginUserDetailReducer;