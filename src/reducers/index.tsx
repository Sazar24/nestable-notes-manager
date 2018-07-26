import { combineReducers } from 'redux'
// import * as fromTaskListReducer from './TaskList';
import * as fromNodeListReducer from './nodeList';

export interface IState {
    nodes: fromNodeListReducer.IState
}

export const reducer = combineReducers<IState>({
    nodes: fromNodeListReducer.nodeListReducer
})