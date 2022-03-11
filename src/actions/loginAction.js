import {LOGIN_USER,LOGOUT_USER} from './actionTypes';
export const loginAction = (payload ) =>{
    console.log(payload)
    return{
        type: LOGIN_USER,
        payload: payload.email,
    }
}
export const logoutAction = (payload ) =>{
    console.log(payload)
    return{
        type: LOGOUT_USER,
        payload: payload,
    }
}