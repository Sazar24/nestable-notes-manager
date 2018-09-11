// import { IAction } from "../actions/TaskListActions";
import { INode, SingleNode } from "../models/Node";
import { actionTypes } from "../actions/actionTypes";
import NodesManager from "../services/NodesManager";

import LocalStorageAccessor from "../services/LocalStorage";
import { IAction } from "../actions/TaskListActions";
// import { Action } from "../actions/TaskListActions";

// export interface INodesListReducer {
//   // [nodeId: string]: INode;
//   nodes: INode[];
// }

/* 
//// const initialState: INodesListReducer = {};
//// Z tej struktury stanu:
//// "1": { header: "new node", description: "click me, to edit", isDone: false, Id: "1", parentID: null },
//// chcę przejść na tę:
//// nodes: [{ header: "new node", description: "click me, to edit", isDone: false, Id: "1", parentID: null },
//// { header: "new node", description: "click me, to edit", isDone: false, Id: "1", parentID: null }]
*/

const initialState: INode[] = [];

export function nodeListReducer(state: INode[] = initialState, action: any): INode[] { // TODO: remove that "any"-type. Propably u will have to create many similar interfaces for actionCreators and export all of them as one Action-type.

  let newState: INode[] = state.slice();
  let newNode: INode;
  const localStorageAccessor: LocalStorageAccessor = new LocalStorageAccessor();

  switch (action.type) {
    case actionTypes.ADD_NODE:
      newNode = Object.assign({}, action.payload.node);
      newNode.parentID = action.payload.parentId;
      //TODO: dodać blokadę, żeby nie można było dwóch notek o identycznym Id
      newState.push(newNode);
      // localStorageAccessor.setNodeInLocalStorage(newNode);
      return newState;

    case actionTypes.ADD_NODE_WITH_NO_PARENT:
      newNode = Object.assign({}, action.payload.node);
      newState.push(newNode);
      // localStorageAccessor.setNodeInLocalStorage(newNode);
      return newState;

    case actionTypes.DELETE_NODE_WITH_GIVEN_ID: // it doesnt remove subNodes (children)
      const nodeId = action.payload.nodeId;
      newState = newState.filter(node => node.Id !== nodeId);
      // localStorageAccessor.removeNodeFromLocalStorage(nodeId);
      return newState;

    case actionTypes.CHANGE_NODE_CONTENT:
      newNode = Object.assign({}, action.payload.node);

      const nodeWithGivenIdAlreadExists: boolean = new NodesManager().isAlreadyInState(newNode.Id, state);
      if (nodeWithGivenIdAlreadExists) {
        const indexOfChangedNode = state.findIndex(item => item.Id === newNode.Id);
        newState[indexOfChangedNode] = newNode;
        // localStorageAccessor.setNodeInLocalStorage(newNode);
      }

      return newState

    // case actionTypes.ADD_NODE_FROM_MEMORY:
    //   newNode = Object.assign({}, action.payload.node);
    //   newState[newNode.Id] = Object.assign({}, newNode);
    //   return newState;

    default:
      return state;
  }
};