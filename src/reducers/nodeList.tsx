import { Action, ActionTypes } from "../actions/TaskListActions";
import { INode, SingleNode } from "../models/Node";
// import * as definedTypes from '../types/actionTypes';
// import { IMainListStateType, ITask } from '../types/mainListStateType';

export interface INodesListReducer {
  // coreNodes: INode[];
  [nodeId: string]: INode;
}

const initialState: INodesListReducer = {
  "1": { header: "header", description: "descr", isDone: false, Id: "1", parentID: null },
  "3": { header: "header", description: "descr", isDone: false, Id: "3", parentID: "1" },
  "4": { header: "header", description: "descr", isDone: false, Id: "4", parentID: "1" },
  "2": { header: "header", description: "descr", isDone: false, Id: "2", parentID: "3" },
};

// initialState[2].parentID = "1";
// initialState[4].parentID = "2";

// export const nodeListReducer = (state = { ...initialState }, action: Action) => {
export function nodeListReducer(state = { ...initialState }, action: Action) {
  switch (action.type) {

    case ActionTypes.ADD_NODE:
      // console.log("Im in reducer .ADD_NODE!")
      const newState = Object.assign({}, state);
      const newNode = Object.assign({}, action.payload.node);
      newNode.parentID = action.payload.parentID;
      newState[action.payload.node.Id] = Object.assign({}, newNode);
      return { ...newState };

    default:
      return state;
  }
};
