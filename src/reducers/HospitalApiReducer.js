import { HOSPITAL_DATA } from "../actions/actionTypes";

const initialState = {
    hospitalDetails: [],
};

const apiHospitalDetails = (state = initialState, action) => {
    console.log(action);

  switch (action.type) {
    case HOSPITAL_DATA:
      return {...state, hospitalDetails: action.payload };
    default:
      return state;
  }
};
export default apiHospitalDetails;