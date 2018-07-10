import { Action, ActionTypes } from "../actions/TaskListActions";
import { ITask } from "../models/Task";
// import * as definedTypes from '../types/actionTypes';
// import *as TaskListItems from '../actions/TaskListItems';
// import { IMainListStateType, ITask } from '../types/mainListStateType';

export interface IState {
    items: ITask[];
}

const initialState: IState = {
    items: [{
        description: "foobar1 -description. Mleko jest od krowy",
        header: "foobar1 - mleko",
        isDone: false,
    },
    {
        description: "foobar2 -description. Ogródkowe niutaty",
        header: "foobar2 - ziemniaki",
        isDone: false
    }]
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