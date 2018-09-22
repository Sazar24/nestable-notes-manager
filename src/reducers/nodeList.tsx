import { actionTypes } from "../actions/actionTypes";
import { INode, Node } from "../models/Node";
import NodesManager from "../services/NodesManager";
import LocalStorageAccessor from "../services/LocalStorage";
import { IAction } from "../actions/TaskListActions";
// import { Action } from "../actions/TaskListActions";
// import { IAction } from "../actions/TaskListActions";

const initialState: INode[] = [];

export function nodeListReducer(state: INode[] = initialState, action: any): INode[] { // TODO: remove that "any"-type. Propably u will have to create many similar interfaces for actionCreators and export all of them as one Action-type.

  let newState: INode[] = state.slice();
  let newNode: INode;
  const localStorageAccessor: LocalStorageAccessor = new LocalStorageAccessor();

  switch (action.type) {
    case actionTypes.CREATE_NODE:
      newNode = Object.assign({}, action.payload.node);
     
      if (NodesManager.isAlreadyInState(newNode.Id, state)) {
        return state;
      }
      newState.push(newNode);
      // localStorageAccessor.setNodeInLocalStorage(newNode);
      localStorageAccessor.saveAllNodesInStorage(newState);
      return newState;

    case actionTypes.DELETE_NODE_WITH_GIVEN_ID: // it doesnt remove subNodes (children)
      const nodeId = action.payload.nodeId;
      newState = newState.filter(node => node.Id !== nodeId);
      // localStorageAccessor.removeNodeFromLocalStorage(nodeId);
      localStorageAccessor.saveAllNodesInStorage(newState);
      return newState;

    case actionTypes.UPDATE_NODE_CONTENT:
      newNode = Object.assign({}, action.payload.node);

      // const nodeWithGivenIdAlreadExists: boolean = new NodesManager().isAlreadyInState(newNode.Id, state);
      const nodeWithGivenIdAlreadExists: boolean = NodesManager.isAlreadyInState(newNode.Id, state);
      if (nodeWithGivenIdAlreadExists) {
        const indexOfChangedNode = state.findIndex(item => item.Id === newNode.Id);
        newState[indexOfChangedNode] = newNode;
        // localStorageAccessor.setNodeInLocalStorage(newNode);
      }
      localStorageAccessor.saveAllNodesInStorage(newState);
      return newState

    case actionTypes.ADD_NODE_FROM_MEMORY:
      // newNode = Object.assign({}, action.payload.node);
      newState.push(action.payload.node);
      // newState[newNode.Id] = Object.assign({}, newNode);
      return newState;

    default:
      return state;
  }
};