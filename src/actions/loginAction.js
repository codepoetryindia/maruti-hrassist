import {LOGIN_USER,LOGOUT_USER} from './actionTypes';
export const loginAction = (payload ) =>{
    console.log('payload data',payload)
    return{
        type: LOGIN_USER,
        username:username,
        password:password,
    }
}
export const logoutAction = (payload ) =>{
    console.log(payload)
    return{
        type: LOGOUT_USER,
    
    }
}