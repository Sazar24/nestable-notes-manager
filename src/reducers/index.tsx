import { combineReducers } from 'redux'
import * as fromNodeListReducer from './nodeList';

export interface IState {
    nodes: fromNodeListReducer.INodesListReducer
}

export const reducer = combineReducers<IState>({
    nodes: fromNodeListReducer.nodeListReducer
})