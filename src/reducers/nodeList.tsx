import { actionTypes } from "../actions/actionTypes";
import { INode, Node } from "../models/Node";
import NodesManager from "../services/NodesManager";
import LocalStorageAccessor from "../services/LocalStorage";
import { IAction } from "../actions/NodesActions";
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
      localStorageAccessor.saveAllNodesInStorage(newState);
      return newState;

    case actionTypes.DELETE_NODE_WITH_GIVEN_ID: // it doesnt remove subNodes (children)
      const nodeId = action.payload.nodeId;
      newState = newState.filter(node => node.Id !== nodeId);
      localStorageAccessor.saveAllNodesInStorage(newState);
      return newState;

    case actionTypes.UPDATE_NODE_CONTENT:
      newNode = Object.assign({}, action.payload.node);

      const nodeWithGivenIdAlreadExists: boolean = NodesManager.isAlreadyInState(newNode.Id, state);
      if (nodeWithGivenIdAlreadExists) {
        const indexOfChangedNode: number = state.findIndex(item => item.Id === newNode.Id);
        newState[indexOfChangedNode] = newNode;
      }

      localStorageAccessor.saveAllNodesInStorage(newState);
      return newState;

    case actionTypes.ADD_NODE_FROM_MEMORY:
      if (NodesManager.isAlreadyInState(action.payload.node.Id, state)) {
        return state;
      }
      newState.push(action.payload.node);
      return newState;
    /////////////////////

    case actionTypes.MOVE_CLOSER_TO_ANCESTOR:
      const transferingNode: Node = action.payload.node;

      if (NodesManager.isAlreadyInState(transferingNode.Id, state) === false) return state;
      if (transferingNode.parentID === null) return state;

      // 1. Znajdź index - tj. pozycję w tablicy state`u przenoszonego elementu.
      const indexOfMovingNode: number = state.findIndex(item => item.Id === transferingNode.Id);

      // 2. Znajdź rodzica przenoszonego elementu
      // 3. Znajdź index - tj. pozycję w tablicy znalezionego rodzica:
      const parentNodeIndex: number = state.findIndex(item => item.Id === transferingNode.parentID);
      if (parentNodeIndex === -1) return state;
      const parentNode: Node = state[parentNodeIndex];

      // 4. Przenoszonemu elementowi przypisz jako rodzica rodzica rodzica ( xD ) (tj. elementowi z pkt 1: .parent = parent of element z pkt 3.) 
      transferingNode.parentID = parentNode.parentID;

      // 5. Zapisz zmiany do stanu aplikacji:
      newState[indexOfMovingNode] = transferingNode;
      localStorageAccessor.saveAllNodesInStorage(newState);
      return newState;

    /////////////////////

    default:
      return state;
  }
};