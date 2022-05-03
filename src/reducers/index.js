import { combineReducers } from 'redux';
// import LoginUserDetailReducer from './LoginUserDetailReducer';
// import apiHospitalDetails from './HospitalApiReducer';
// import apitodaysEmployBirthday from './birthdaysApiReducer';
import LoginThunkReducers from '../ThunkReducer/LoginThunkReducers';
import AllApiReducer from '../ThunkReducer/AllApiReducer';
const reducer ={
    LoginThunkReducers,AllApiReducer
}
const rootReducer = combineReducers(reducer);
export default rootReducer;