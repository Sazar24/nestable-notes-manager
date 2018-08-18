import { Action, ActionTypes } from "../actions/TaskListActions";
import { INode, SingleNode } from "../models/Node";
// import * as definedTypes from '../types/actionTypes';
// import { IMainListStateType, ITask } from '../types/mainListStateType';

export interface INodesListReducer {
  [nodeId: string]: INode;
}

const initialState: INodesListReducer = {
  "1": { header: "header", description: "description 1", isDone: false, Id: "1", parentID: null },
  "3": { header: "foobar", description: "description : fooobar", isDone: false, Id: "3", parentID: "1" },
  "4": { header: "simba`s motto", description: "hakuna matata!", isDone: false, Id: "4", parentID: "1" },
  "2": { header: "lorem ipsum", description: "Long live Lorem Ipsum!", isDone: false, Id: "2", parentID: "3" },
};

export function nodeListReducer(state = { ...initialState }, action: Action) {
  switch (action.type) {
    case ActionTypes.ADD_NODE:
      const newState = Object.assign({}, state);
      const newNode = Object.assign({}, action.payload.node);
      newNode.parentID = action.payload.parentID;
      newState[action.payload.node.Id] = Object.assign({}, newNode);
      return { ...newState };

    case ActionTypes.ADD_NODE_WITH_NO_PARENT:
      const newState2 = Object.assign({}, state);
      const newNode2 = Object.assign({}, action.payload.node);

      newState2[action.payload.node.Id] = Object.assign({}, newNode2);
      return { ...newState2 };


    default:
      return state;
  }
};
