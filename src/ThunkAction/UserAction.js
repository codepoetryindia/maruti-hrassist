import { API_REQUEST } from "../actions/actionTypes";
import axios from "axios";
import { API_SERVICES_URL } from "../API/Api";

export const ApiPostAction = (url, data,token) => {
    return  function (dispatch) {
      dispatch(CallApi(null, true, ''));
      let postUrl = API_SERVICES_URL + url;
      let Bearer = 'Bearer' + token;
      // console.log(postUrl);
      // console.log('payload', data);
      // console.log('Authorization ',token)
      axios.post(postUrl,data, {
          headers: {
            // Accept: 'application/json',
            'Content-Type': 'application/json',
            "authToken": token,
          }
        }).then(res => {
            console.log("response" , res)
            // dispatch(
            //     CallApi(
            //       res.data.data,
            //       false,
            //       res.data.title,
            //     ),
            //   );
        })
        .catch(err => {
          console.log('api Erorr: ', err);
          // throw handleError(err, dispatch);
        });
      
    };
  };
  
  function handleError(err, dispatch) {
    let error = err;
    if (err.response && err.response.data.hasOwnProperty('message')) {
      error = err.response.data;
      dispatch(CallApi(null, false, error));
    } else if (!err.hasOwnProperty('message')) error = err.toJSON();
    dispatch(CallApi(null, false, new Error(error.message)));
    return;
  }

  const CallApi = (data,loder,error) =>{
    return{
        type:API_REQUEST,
        payload: data,
        loading: loder,
        error:error,
    }
  }