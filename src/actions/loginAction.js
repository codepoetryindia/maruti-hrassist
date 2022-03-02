import {LOGIN_USER} from './actionTypes';

export const loginAction = (payload ) =>{
    return{
        type: LOGIN_USER,
        payload: payload
    }
}