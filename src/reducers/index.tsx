import { combineReducers } from 'redux'
import * as fromTaskListReducer from './TaskList';

export interface IState {
    taskItems: fromTaskListReducer.IState
}

export const reducer = combineReducers<IState>({
    taskItems: fromTaskListReducer.mainListReducer
})