import { HOSPITAL_DATA , EMERGRNCY_CONTACTS } from "./actionTypes";

export const HOSPITAL_API = 'https://jsonplaceholder.typicode.com/posts';

export const hospitalData = () => {

    try {
        return async dispatch => {
           
            const result = await fetch(HOSPITAL_API , {
                method :'GET',
                headers:{
                    'Content-type' : 'application/json',
                }
            });
            console.log('im here')
            const json = await result.json();
            console.log('api data ',json)
            if (json){
                dispatch ({
                    type: HOSPITAL_DATA,
                    payload: json,
                })
            }else
            {
                console.log("data not found")
            }
        } 
    } catch (error) {
        console.log(error);
    }
}
export const EmergencyContactData = (url) => {

    try {
        return async dispatch => {
           
            const result = await fetch(url, {
                method :'GET',
                headers:{
                    'Content-type' : 'application/json',
                }
            });
            console.log('im here')
            const json = await result.json();
            console.log('api data ',json)
            if (json){
                dispatch ({
                    type: EMERGRNCY_CONTACTS,
                    payload: json,
                })
            }else
            {
                console.log("data not found")
            }
        } 
    } catch (error) {
        console.log(error);
    }
}