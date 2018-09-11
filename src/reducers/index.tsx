import { combineReducers } from 'redux'
import * as allFromNodeSelecting from './nodeSelecting';
import { INode } from '../models/Node';
import { nodeListReducer } from './nodeList';

export interface IGlobalReduxState {
    nodes: INode[],
    selectedNodes: allFromNodeSelecting.INodeSelectingReducer
}

export const reducer = combineReducers<IGlobalReduxState>({
    nodes: nodeListReducer,
    selectedNodes: allFromNodeSelecting.nodeSelectingReducer
})