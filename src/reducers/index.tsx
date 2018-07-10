import { combineReducers } from 'redux'
import * as fromTaskListReducer from './TaskList';

export interface IState {
    taskItems: fromTaskListReducer.IState
}

export const reducer = combineReducers<IState>({
    taskItems: fromTaskListReducer.mainListReducer
})




/////////////////
/*
 * This is the root state of the app
 * It contains every substate of the app
 */
// export interface State {
//   todos: fromTodos.State
// }

/*
 * initialState of the app
 */
// export const initialState: State = {
//   todos: fromTodos.initialState
// }

/*
 * Root reducer of the app
 * Returned reducer will be of type Reducer<State>
 */