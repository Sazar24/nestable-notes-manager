import { Action, ActionTypes } from "../actions/EditModeReducerActions";


export interface IIdOfEditableNodeReducer {
    IdOfEditableNode: string | null;
}

const initialState: IIdOfEditableNodeReducer = {
    IdOfEditableNode: null
}


export function editModeAssigment(state = { ...initialState }, action: Action) {
    switch (action.type) {
        case ActionTypes.SWITCH_EDIT_MODE_TO_GIVEN_ID_ONLY:
            return { ...state, IdOfEditableNode: action.payload.IdOfEditableNode }

        // case ActionTypes.TOGGLE_EDIT_MODE_FOR_GIVEN_ID:
        // ....
        // return {...}

        default:
            return state;
    }
}
