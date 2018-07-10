import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger';
import { reducer } from '../reducers'

/*
 * We're giving State interface to create store
 * store is type of State defined in our reducers
 */
// const store = createStore<State>(reducer, applyMiddleware(logger))
const store = createStore(reducer, applyMiddleware(logger));
// const store = createStore<IState>(reducer)

export default store;