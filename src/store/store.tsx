import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer } from '../reducers/index';

const store = createStore(
    reducer,
    composeWithDevTools()
);

export default store;