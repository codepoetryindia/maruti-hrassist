import {LOGIN_USER, GET_LOGIN_DATA, LOGOUT_USER} from '../actions/actionTypes';
import axios from 'axios';
import {API_SERVICES_URL, API_BASE_URL} from '../API/Api';

// export const ThunkAction = url => {
//   return async function (dispatch) {
//     dispatch(
//       callApi(
//         {
//           userId: null,
//           token: null,
//         },
//         true,

//       ),
//     );
//     // return;
//     let postUrl = API_SERVICES_URL + url;
//     try {
//       let res = await axios.get(postUrl, {
//         headers: {
//           'Content-Type': 'application/json',
//           Accept: 'application/json',
//         },
//       });
//       dispatch(setLoginData(res.data, false));
//     } catch (error) {
//       throw handleError(error);
//     }
//   };
// };
export const ThunkPostAction = (url, data) => {
  return async function (dispatch) {
    dispatch(callApi(null, true, ''));
    let postUrl = API_BASE_URL + url;
    console.log(postUrl);
    console.log('payload', data);

    let response = await axios
      .post(postUrl, JSON.stringify(data), {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .catch(error => {
        if (error.response) {
          console.log('You Are ', error.response.data.title);
          dispatch(callApi(null, false, error.response.data.title));
        } else if (error.request) {
          console.log('Network Error');
          dispatch(callApi(null, false, 'Network Error'));
        } else {
          console.log('Something Went Wrong');
          dispatch(callApi(null, false, 'Something Went Wrong'));
        }
        console.log('api Erorr: ', error.response.data.title);
        // throw handleError(err, dispatch);
      });

    console.log('Result', response);
    dispatch(
      callApi(
        response.data.token,
        false,
        response.data.title == undefined ? '' : response.data.title,
      ),
    );
  };
};

// function handleError(err, dispatch) {
//   let error = err;
//   if (err.response && err.response.data.hasOwnProperty('message')) {
//     error = err.response.data;
//     dispatch(callApi(null, false, error));
//   } else if (!err.hasOwnProperty('message')) error = err.toJSON();
//   dispatch(callApi(null, false, new Error(error.message)));
//   return;
// }

export const callApi = (data, loder,error) => {
  console.log('payload data', data);
  console.log('payload loader', loder);
  return {
    type: LOGIN_USER,
    payload: data,
    loading: loder,
    error:error,
  };
};
export const setLoginData = (data, loder,error) => {
  console.log(data);
  return {
    type: GET_LOGIN_DATA,
    payload: data,
    loading: loder,
    error:error,
  };
};
export const logoutAction = payload => {
  console.log(payload);
  return {
    type: LOGOUT_USER,
  };
};
