// import { createStore, applyMiddleware } from "redux";
// import thunk  from 'redux-thunk';
// import rootReducer from './../reducers';

// const initialstate = {};
// const middleware = [thunk];

// const store = createStore(rootReducer, initialstate, applyMiddleware(...middleware));

// export default store;

import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
const initialstate = {};
const middleware = [thunk];

export const Store = createStore(rootReducer,initialstate, applyMiddleware(...middleware));
