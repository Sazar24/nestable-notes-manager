// import { IAction } from "../actions/TaskListActions";
import { INode, SingleNode } from "../models/Node";
import { actionTypes } from "../actions/actionTypes";
import NodesManager from "../services/NodesManager";

import LocalStorageAccessor from "../services/LocalStorageHandler";
import { IAction } from "../actions/TaskListActions";
// import { Action } from "../actions/TaskListActions";

export interface INodesListReducer {
  [nodeId: string]: INode;
}

const initialState: INodesListReducer = {};

export function nodeListReducer(state = { ...initialState }, action: any): INodesListReducer { // TODO: remove that "any"-type. Propably u will have to create many similar interfaces for actionCreators and export all of them as one Action-type.

  const newState = Object.assign({}, state);
  let newNode: INode;
  const localStorageAccessor: LocalStorageAccessor = new LocalStorageAccessor();

  switch (action.type) {
    case actionTypes.ADD_NODE:
      newNode = Object.assign({}, action.payload.node);
      newNode.parentID = action.payload.parentId;

      newState[action.payload.node.Id] = Object.assign({}, newNode);

      localStorageAccessor.setNodeInLocalStorage(newNode);
      return newState;

    case actionTypes.ADD_NODE_WITH_NO_PARENT:
      newNode = Object.assign({}, action.payload.node);
      newState[action.payload.node.Id] = Object.assign({}, newNode);

      localStorageAccessor.setNodeInLocalStorage(newNode);
      return newState;

    case actionTypes.DELETE_NODE_WITH_GIVEN_ID: // it doesnt remove subNodes (children)
      const nodeId = action.payload.nodeId;
      delete newState[nodeId];
      localStorageAccessor.removeNodeFromLocalStorage(nodeId);
      return newState;


    case actionTypes.CHANGE_NODE_CONTENT:
      newNode = Object.assign({}, action.payload.node);

      const nodeWithGivenIdAlreadExists: boolean = new NodesManager().isAlreadyInState(newNode.Id, state);
      if (nodeWithGivenIdAlreadExists) {
        // console.log(`actionTypes.CHANGE_NODE_CONTENT: node with given ID already exists in state, so i can overwrite changes. State[node.id]: ${JSON.stringify(state[newNode.Id])} and Id: ${newNode.Id}\n service returned: ${nodeWithGivenIdAlreadExists}`)
        newState[newNode.Id] = Object.assign({}, newNode);
        localStorageAccessor.setNodeInLocalStorage(newNode);
      }

      return newState

    case actionTypes.ADD_NODE_FROM_MEMORY:
      newNode = Object.assign({}, action.payload.node);
      newState[newNode.Id] = Object.assign({}, newNode);
      return newState;

    default:
      return state;
  }
};
