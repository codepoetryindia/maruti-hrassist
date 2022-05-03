import {LOGIN_USER, GET_LOGIN_DATA, LOGOUT_USER} from '../actions/actionTypes';

const initialState = {
  token: null,
  isLoading: false,
  error: '',
};

const LoginThunkReducers = (state = initialState, action) => {
  
  switch (action.type) {
    case LOGIN_USER:
      console.log('action data', action);
      return {
        ...state,
        token: action.payload,
        isLoading: action.loading,
        error: action.error,
      };
    case GET_LOGIN_DATA:
      return {
        loginUserDetail: payload.data,
        isLoading: action.loading,
      };
    case LOGOUT_USER:
      return {
        loginUserDetail: null,
        isLoading: false,
      };
    default:
      return state;
  }
};
export default LoginThunkReducers;
