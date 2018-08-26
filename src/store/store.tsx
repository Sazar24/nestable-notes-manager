import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger';
import { reducer } from '../reducers'
import { composeWithDevTools } from 'redux-devtools-extension';

// const store = createStore<State>(reducer, applyMiddleware(logger))
// const store = createStore(reducer, applyMiddleware(logger));
const store = createStore(
    reducer,
    composeWithDevTools()
);

export default store;