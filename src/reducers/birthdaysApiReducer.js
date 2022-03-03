import { todaysBirthday } from "../actions/birthdaysAction";

const initialState =  {
    employBirthdayTodays : [],
};
const apitodaysEmployBirthday = (state = initialState, action) => {
    console.log('reducer data',action.payload);

  switch (action.type) {
    case todaysBirthday:
      return {...state, employBirthdayTodays :action.payload };
    default:
      return state;
  }
};
export default apitodaysEmployBirthday;