import { Action, ActionTypes } from "../actions/TaskListActions";
import { ITask, SingleTask } from "../models/Task";
// import * as definedTypes from '../types/actionTypes';
// import *as TaskListItems from '../actions/TaskListItems';
// import { IMainListStateType, ITask } from '../types/mainListStateType';

export interface IState {
    items: ITask[];
}

const initialState: IState = {
    items: [
        new SingleTask("foobar1-mleczko", "jakiś opis dla mleka", false),
        new SingleTask("Task nr 2", "opis 2`ki", true)
    ]
}

export const mainListReducer = (state = { ...initialState }, action: Action) => {
    switch (action.type) {
        case ActionTypes.ADD_ITEM:
            const newStateItems: ITask[] = state.items.slice();
            newStateItems.push(action.payload.taskItem);
            return { ...state, newStateItems };

        default:
            return state;
    }
}

// ///// example: