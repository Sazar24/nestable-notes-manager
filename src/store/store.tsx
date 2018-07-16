import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger';
import { reducer } from '../reducers'

// const store = createStore<State>(reducer, applyMiddleware(logger))
// const store = createStore(reducer, applyMiddleware(logger));
const store = createStore(reducer);

export default store;