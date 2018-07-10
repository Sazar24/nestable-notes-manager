import { ITask } from "../models/Task";

export enum ActionTypes {
    ADD_ITEM = "ADD NEW ITEM TO LIST",
}

// export const addTodoItem = (listItemHeader: string) => ({ type: types.ADD_ITEM, listItemHeader });
export interface IAddTaskAction { type: ActionTypes.ADD_ITEM, payload: { taskItem: ITask } }

export function AddTask(header: string, description: string): IAddTaskAction {

    // if (header !== '' && description !== '')
    return {
        payload: {
            taskItem: {
                // TODO: id: guid(),
                description,
                header,
                isDone: false,
            }
        },
        type: ActionTypes.ADD_ITEM,
    }
    // else
    //     return;
}

export type Action = IAddTaskAction;

// expamples:
// export const addTodo = text => ({ type: types.ADD_TODO, text })
// export const deleteTodo = id => ({ type: types.DELETE_TODO, id })
// export const editTodo = (id, text) => ({ type: types.EDIT_TODO, id, text })
// export const completeTodo = id => ({ type: types.COMPLETE_TODO, id })
// export function saveValidationResult(saveValidationResult, reducerDataType) {
    // 
//     return {
//         type: actionTypes.MAINFORM_DATA_CHANGE,
//         payload: saveValidationResult ,
//         dataType: reducerDataType + validatorMark
//     }
// }