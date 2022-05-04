import {LOGIN_USER, GET_LOGIN_DATA, LOGOUT_USER} from '../actions/actionTypes';
import axios from 'axios';
import {API_SERVICES_URL, API_BASE_URL} from '../API/Api';
export const ThunkPostAction = (url, data) => {
  return async function (dispatch) {
    dispatch(callApi(null, true, ''));
    let postUrl = API_BASE_URL + url;
    console.log(postUrl);
    console.log('payload', data);

    try {
      let response = await axios
      .post(postUrl, JSON.stringify(data), {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      console.log('Api response',response);
      dispatch(
        callApi(
          response.data.token,
          false,
          response.data.title == undefined ? '' : response.data.title,
        ),
      );
    } catch (error) {
      if (error.response) {
        console.log('error occured ', error.response.data.title);
        dispatch(callApi(null, false, error.response.data.title));
      } else if (error.request) {
        console.log('Network Error');
        dispatch(callApi(null, false, 'Network Error'));
      } else {
        console.log('Something Went Wrong');
        dispatch(callApi(null, false, 'Something Went Wrong'));
      }
      console.log('api Erorr: ', error.response.data.title);
      dispatch(callApi(null, false, error.response.data.title));
    }
   
  };
};

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
