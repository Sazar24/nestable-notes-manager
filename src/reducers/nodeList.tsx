import { Action, ActionTypes } from "../actions/TaskListActions";
import { INode, SingleNode } from "../models/Node";
// import * as definedTypes from '../types/actionTypes';
// import { IMainListStateType, ITask } from '../types/mainListStateType';

export interface INodesListReducer {
  // coreNodes: INode[];
  [nodeId: string]: INode;
}

const initialState: INodesListReducer = {
  "1": new SingleNode("foobar1-mleczko", "jakiś opis dla mleka", false, "1"),
  // "2": new SingleNode("Task nr 2", "opis 2`ki", true, "2"),
  // "3": new SingleNode("umyć gary", "ewentualnie wyrzucić i kupić nowe :)", false, "3"),
  // "4": new SingleNode("podNotka", "jakiś opis", false, "4"),
  // "5": new SingleNode("5szlag", "coś się spsuło z JSX`ami i chyba z ts`em też...", false, "5")
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
