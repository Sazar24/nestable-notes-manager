import { combineReducers } from 'redux'
import * as fromNodeListReducer from './nodeList';
import * as nodeSelecting from './nodeSelecting';

export interface IState {
    nodes: fromNodeListReducer.INodesListReducer,
    selectedNodes: nodeSelecting.INodeSelectingReducer
}

export const reducer = combineReducers<IState>({
    nodes: fromNodeListReducer.nodeListReducer,
    selectedNodes: nodeSelecting.nodeSelectingReducer
})