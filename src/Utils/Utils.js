import axios from "axios";
import { API_SERVICES_URL } from "../API/Api";
import Toast from 'react-native-simple-toast';

export const PostMethode = async (url, data, token) => {
    let PostUrl = API_SERVICES_URL + url;
    console.log("Api url", PostUrl, data);
    try {
        let response = await axios.post(PostUrl, data, {
            headers: {
                'Content-Type ': "application/json",
                // Accept :"application/json",
                authToken: token,
            }
        })
        // console.log("Api resp",response)
        return response.data;
    } catch (error) {
        throw handleError(error)
    }
}

export const getRawurl = async (url, data, token) => {

    try {
        let response = await axios.get(url, {
            headers: {
                'Content-Type ': "application/json",
                // Accept :"application/json",
                authToken: token,
            }
        })
        // console.log("Api resp",response)
        return response.data;
    } catch (error) {
        throw handleError(error)
    }
}

// const handleError = (error) => {
//     return error
// }

const handleError = (err) => {
    let error = err;
    if (err.response && err.response.data.hasOwnProperty('message'))
        error = err.response.data;
    else if (!err.hasOwnProperty('message')) error = err.toJSON();
    return new Error(error.message);
}

export const showErrorMessage = (error) => {
    if (error.response) {
        if (error.response.status == 401) {
            console.log('error from api', error.response);
        }
        Toast.show(error.response.data.title);
    } else if (error) {
        Toast.show('Network Error');
    } else {
        Toast.show('Something Went Wrong');
    }
}