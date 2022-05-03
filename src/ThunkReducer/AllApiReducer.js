import {API_REQUEST} from '../actions/actionTypes';

const initialState = {
  token: null,
  data: [],
  isLoading: false,
  error: '',
};

const AllApiReducer = (state = initialState, action) => {
  console.log(action);

  switch (action.type) {
    case API_REQUEST:
      console.log('API_REQUEST', action);
      return {
        ...state,
        token: action.payload,
        data: action.payload,
        isLoading: action.loading,
        error: action.error,
      };
    default:
      return state;
  }
};
export default AllApiReducer;
