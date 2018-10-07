import { actionTypes } from "../actions/actionTypes";
import { INode, Node } from "../models/Node";
import NodesManager from "../services/NodesManager";
import LocalStorageAccessor from "../services/LocalStorage";
import { IAction } from "../actions/NodesActions";
// import { Action } from "../actions/TaskListActions";
// import { IAction } from "../actions/TaskListActions";

const initialState: INode[] = [];

export function nodeListReducer(state: INode[] = initialState, action: IAction): INode[] {

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
      // TODO: zrobić, żeby wyfiltrowywało też potomków.
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
      if (action.payload.node === undefined) return state;
      if (NodesManager.isAlreadyInState(action.payload.node.Id, state)) {
        return state;
      }
      newState.push(action.payload.node);
      return newState;

    case actionTypes.MOVE_CLOSER_TO_ANCESTOR:
      if (action.payload.node === undefined) return state;
      const transferingNode: Node = action.payload.node;
      if (NodesManager.isAlreadyInState(transferingNode.Id, state) === false) return state;
      if (transferingNode.parentID === null) return state;


      const parentNodeIndex: number = state.findIndex(item => item.Id === transferingNode.parentID);
      if (parentNodeIndex === -1) return state;

      const parentNode: Node = state[parentNodeIndex];
      transferingNode.parentID = parentNode.parentID;

      const indexOfMovingNode: number = state.findIndex(item => item.Id === transferingNode.Id);
      newState[indexOfMovingNode] = transferingNode;

      localStorageAccessor.saveAllNodesInStorage(newState);
      return newState;


    case actionTypes.ATTACH_REMEMBERED_NODE_TO_PARENT: // TODO: refactor me.
      if (action.payload.destinationParentNodeId === undefined ||
        action.payload.movingNodeId === undefined ||
        action.payload.movingNodeId === null)
        return state;
      // if (action.payload.movingNodeId === null) return state;
      const parentNodeId: string = action.payload.destinationParentNodeId;
      const movingNodeId: string = action.payload.movingNodeId;

      if (NodesManager.isAlreadyInState(parentNodeId, state) === false) return state;
      if (NodesManager.isAlreadyInState(movingNodeId, state) === false) return state;

      const isDescendingToItself: boolean = new NodesManager().isDescendingToItself(movingNodeId, parentNodeId, state);
      if (isDescendingToItself) {
        window.alert("The node cannot be nested under itself.")
        return state;
      }
      ////////

      const parentNodeInStateIndex: number = state.findIndex(item => item.Id === parentNodeId); 
      const movinNodeIndex: number = state.findIndex(item => item.Id === action.payload.movingNodeId);

      newState[movinNodeIndex].parentID = state[parentNodeInStateIndex].Id;
      // localStorageAccessor.saveAllNodesInStorage(newState);
      return newState;

    default:
      return state;
  }

};