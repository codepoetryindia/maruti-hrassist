import { HOSPITAL_DATA , EMERGRNCY_CONTACTS } from "../actions/actionTypes";

const initialState = {
    hospitalDetails: [],
    emergencyContacts : [],
};

const apiHospitalDetails = (state = initialState, action) => {
    console.log(action);

  switch (action.type) {
    case HOSPITAL_DATA:
      return {...state, hospitalDetails: action.payload };
    case EMERGRNCY_CONTACTS:
      return {...state, emergencyContacts: action.payload };
    default:
      return state;
  }
};
export default apiHospitalDetails;