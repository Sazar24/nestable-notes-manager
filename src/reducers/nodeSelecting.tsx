import { Action } from "../actions/EditModeReducerActions";
import { actionTypes } from "../actions/actionTypes";

export interface INodeSelectingReducer {
    IdOfEditableNode: string | null;
    // IdOfHighlighted: string | null;
}

export const initialState: INodeSelectingReducer = {
    IdOfEditableNode: null,
    // IdOfHighlighted: null
}

export function nodeSelectingReducer(state = { ...initialState }, action: Action): INodeSelectingReducer {
    switch (action.type) {
        case actionTypes.SWITCH_EDIT_MODE_TO_GIVEN_ID_ONLY:
            return { ...state, IdOfEditableNode: action.payload.IdOfEditableNode }


        default:
            return state;
    }
}
