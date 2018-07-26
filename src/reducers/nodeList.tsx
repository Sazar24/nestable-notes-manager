import { Action, ActionTypes } from "../actions/TaskListActions";
import { INode, SingleNode } from "../models/Task";
// import * as definedTypes from '../types/actionTypes';
// import *as TaskListItems from '../actions/TaskListItems';
// import { IMainListStateType, ITask } from '../types/mainListStateType';

export interface IState {
    coreNodes: INode[];
}

const initialState: IState = {
    coreNodes: [
        new SingleNode("foobar1-mleczko", "jakiś opis dla mleka", false),
        new SingleNode("Task nr 2", "opis 2`ki", true),
        new SingleNode("umyć gary", "ewentualnie wyrzucić i kupić nowe :)", false),
        new SingleNode("podNotka", "jakiś opis", false)
    ]
}

initialState.coreNodes[3].parentID = initialState.coreNodes[2].ID;

export const nodeListReducer = (state = { ...initialState }, action: Action) => {
    switch (action.type) {
        case ActionTypes.ADD_ITEM:
            const newStateItems: INode[] = state.coreNodes.slice();
            newStateItems.push(action.payload.taskItem);
            return { ...state, coreNodes: newStateItems };

        
        default:
            return state;
    }
}
