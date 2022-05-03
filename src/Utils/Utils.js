import axios from "axios";
import { API_SERVICES_URL } from "../API/Api";

export const PostMethode =  async(url , data , token) => {
    let PostUrl = API_SERVICES_URL + url;
    console.log("Api url",PostUrl)
    try {
        let response = await axios.post (PostUrl, data,{
            headers : {
                'Content-Type ':"application/json",
                Accept :"application/json",
                Authorization : token,
            }
        })
        return response.data;
    } catch (error) {
        throw handleError(error)
    }
}
const handleError = (error) => {
    return error
}