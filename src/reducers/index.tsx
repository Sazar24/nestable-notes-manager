import { combineReducers } from 'redux'
import * as fromNodeListReducer from './nodeList';
import * as nodeSelecting from './nodeSelecting';

export interface IGlobalReduxState {
    nodes: fromNodeListReducer.INodesListReducer,
    selectedNodes: nodeSelecting.INodeSelectingReducer
}

export const reducer = combineReducers<IGlobalReduxState>({
    nodes: fromNodeListReducer.nodeListReducer,
    selectedNodes: nodeSelecting.nodeSelectingReducer
})