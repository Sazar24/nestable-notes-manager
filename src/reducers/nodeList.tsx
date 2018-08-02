import { Action, ActionTypes } from "../actions/TaskListActions";
import { INode, SingleNode } from "../models/Node";
// import * as definedTypes from '../types/actionTypes';
// import { IMainListStateType, ITask } from '../types/mainListStateType';

export interface INodesListReducer {
  // coreNodes: INode[];
  [nodeId: string]: INode;
}

const initialState: INodesListReducer = {
  "1": new SingleNode("foobar1-mleczko", "jakiś opis dla mleka", false),
  "2": new SingleNode("Task nr 2", "opis 2`ki", true),
  "3": new SingleNode(
    "umyć gary",
    "ewentualnie wyrzucić i kupić nowe :)",
    false
  ),
  "4": new SingleNode("podNotka", "jakiś opis", false),
  "5": new SingleNode(
    "5szlag",
    "coś się spsuło z JSX`ami i chyba z ts`em też...",
    false
  )
};

initialState[1].ID = "1";
initialState[2].ID = "2";
initialState[3].ID = "3";
initialState[4].ID = "4";
initialState[5].ID = "5";

initialState[2].parentID = "1";
initialState[4].parentID = "1";

export const nodeListReducer = (
  state = { ...initialState },
  action: Action
) => {
  switch (action.type) {
    // case ActionTypes.ADD_ITEM:
    //     const newStateItems: INode[] = state.coreNodes.slice();
    //     newStateItems.push(action.payload.taskItem);
    //     return { ...state, coreNodes: newStateItems };
    // case ActionTypes.ADD_ITEM:
    //     return state;

    case ActionTypes.ADD_NODE:
      // console.log("Im in reducer .ADD_NODE!")
      const newState = Object.assign({}, state);
      const newNode = Object.assign({}, action.payload.node);
      newNode.parentID = action.payload.parentID;
      newState[action.payload.node.ID] = Object.assign({}, newNode);
      console.log("newState: ", newState);
      return { ...newState };

    default:
      return state;
  }
};
