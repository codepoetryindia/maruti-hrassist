import { BIRTHDAY_DATA } from "./actionTypes";

const TODAYS_BIRTHDAY_API = ('https://jsonplaceholder.typicode.com/users');
export const todaysBirthday = () => {
    try {
        return async dispatch => {
            const result = await fetch(TODAYS_BIRTHDAY_API , {
                method :'GET',
                headers:{
                    'Content-type' : 'application/json',
                }
            });
            const json = await result.json();
            console.log(json);
            if (json){
                // dispatch ({
                //     type: BIRTHDAY_DATA,
                //     payload: json,
                // })
                return{
                    type: BIRTHDAY_DATA,
                    payload: json,
                }
            }else
            {

                console.log("data not found")
            }
        };
    } catch (error) {
        console.log(error)
    }
} 