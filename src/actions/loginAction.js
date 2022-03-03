import {LOGIN_USER,LOGOUT_USER} from './actionTypes';

// export const spinner = () => {
//     return async dispatch => {
//       let payload = await AsyncStorage.getItem('payload');
//       if (payload !== null) {
//         console.log('token fetched');
//         dispatch({
//           type: 'LOGIN',
//           payload: payload,
//         })
//       }
//     }
//   }

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