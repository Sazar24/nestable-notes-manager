import { Action } from "../actions/TaskListActions";
import { INode, SingleNode } from "../models/Node";
import { actionTypes } from "../actions/actionTypes";
import IsNodeAlreadyExistsInState from "../services/isNodeAlreadyExists";
import LocalStorageHandler from "../services/LocalStorageHandler";
// import LocalStorageHandler from '../services/LocalStorageHandler';


export interface INodesListReducer {
  [nodeId: string]: INode;
}

const initialState: INodesListReducer = {
  // "1": { header: "header", description: "description 1", isDone: false, Id: "1", parentID: null },
  // "3": { header: "foobar", description: "description : fooobar", isDone: false, Id: "3", parentID: "1" },
  // "4": { header: "simba`s motto sdlkjdslfkjdsflkjdsflkjfdslkj", description: "hakuna matata!", isDone: false, Id: "4", parentID: "1" },
  // "2": { header: "lorem ipsum", description: "Long live Lorem Ipsum!", isDone: false, Id: "2", parentID: "3" },
};

export function nodeListReducer(state = { ...initialState }, action: Action): INodesListReducer {

  const newState = Object.assign({}, state);
  let newNode: INode;

  switch (action.type) {
    case actionTypes.ADD_NODE:
      newNode = Object.assign({}, action.payload.node);
      newNode.parentID = action.payload.parentID;
      newState[action.payload.node.Id] = Object.assign({}, newNode);

      LocalStorageHandler.setNodeInLocalStorage(newNode);

      return newState;

    case actionTypes.ADD_NODE_WITH_NO_PARENT:
      newNode = Object.assign({}, action.payload.node);
      newState[action.payload.node.Id] = Object.assign({}, newNode);

      LocalStorageHandler.setNodeInLocalStorage(newNode);

      return newState;

    case actionTypes.DELETE_NODE_WITH_GIVEN_ID: // it doesnt remove subNodes (children)
      delete newState[action.payload.nodeId];
      return newState;

    case actionTypes.CHANGE_NODE_CONTENT:
      newNode = Object.assign({}, action.payload.node);


      const nodeWithGivenIdAlreadExists: boolean = new IsNodeAlreadyExistsInState().call(newNode.Id, state);
      if (nodeWithGivenIdAlreadExists) {
        // console.log(`actionTypes.CHANGE_NODE_CONTENT: node with given ID already exists in state, so i can overwrite changes. State[node.id]: ${JSON.stringify(state[newNode.Id])} and Id: ${newNode.Id}\n service returned: ${nodeWithGivenIdAlreadExists}`)
        newState[newNode.Id] = Object.assign({}, newNode);
      }
      return newState

    case actionTypes.ADD_NODE_FROM_MEMORY:
    console.log(("in reducer: .ADD_NODE_FROM_MEMORY"))
      newNode = Object.assign({}, action.payload.node);
      newState[newNode.Id] = Object.assign({}, newNode);
      return newState;

    default:
      return state;
  }
};
