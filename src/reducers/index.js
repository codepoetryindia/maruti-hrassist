import { combineReducers } from 'redux';
import LoginUserDetailReducer from './LoginUserDetailReducer';
import apiHospitalDetails from './HospitalApiReducer';
import apitodaysEmployBirthday from './birthdaysApiReducer';

export default combineReducers({
    LoginUserDetailReducer, apiHospitalDetails , apitodaysEmployBirthday
});