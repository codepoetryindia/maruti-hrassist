import axios from "axios";
import { API_SERVICES_URL } from "../API/Api";

export const PostMethode =  async(url , data , token) => {
    let PostUrl = API_SERVICES_URL + url;
    console.log("Api url",PostUrl,data,token)
    try {
        let response = await axios.post (PostUrl, JSON.stringify(data),{
            headers : {
                'Content-Type ':"application/json",
                // Accept :"application/json",
                authToken : token,
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