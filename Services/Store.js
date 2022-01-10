/* eslint-disable prettier/prettier */
import RootReducers from './Reducers/RootReducers';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';

const store = createStore(RootReducers, applyMiddleware(thunk));

export default store;
