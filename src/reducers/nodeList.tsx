import { Action, actionTypes } from "../actions/TaskListActions";
import { INode, SingleNode } from "../models/Node";
// import * as definedTypes from '../types/actionTypes';
// import { IMainListStateType, ITask } from '../types/mainListStateType';

export interface INodesListReducer {
  [nodeId: string]: INode;
}

const initialState: INodesListReducer = {
  "1": { header: "header", description: "description 1", isDone: false, Id: "1", parentID: null },
  "3": { header: "foobar", description: "description : fooobar", isDone: false, Id: "3", parentID: "1" },
  "4": { header: "simba`s motto sdlkjdslfkjdsflkjdsflkjfdslkj", description: "hakuna matata!", isDone: false, Id: "4", parentID: "1" },
  "2": { header: "lorem ipsum", description: "Long live Lorem Ipsum!", isDone: false, Id: "2", parentID: "3" },
};

export function nodeListReducer(state = { ...initialState }, action: Action) {

  const newState = Object.assign({}, state);

  switch (action.type) {
    case actionTypes.ADD_NODE:
      const newNode = Object.assign({}, action.payload.node);
      newNode.parentID = action.payload.parentID;
      newState[action.payload.node.Id] = Object.assign({}, newNode);
      return newState;

    case actionTypes.ADD_NODE_WITH_NO_PARENT:
      const newNode2 = Object.assign({}, action.payload.node);

      newState[action.payload.node.Id] = Object.assign({}, newNode2);
      return newState;

    case actionTypes.DELETE_NODE_WITH_GIVEN_ID:
      // it doesnt remove subNodes (children)
      delete newState[action.payload.nodeId];
      console.log(`deleting id: ${action.payload.nodeId}`)
      return newState;

    case actionTypes.CHANGE_NODE_CONTENT:
      console.log("reducer: CHANGE_NODE_CONTENT has been called ");
      const newNode3 = Object.assign({}, action.payload.node);
      newState[newNode3.Id] = Object.assign({}, newNode3);

      return newState


    default:
      return state;
  }
};
