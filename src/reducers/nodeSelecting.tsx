import { Action, ActionTypes } from "../actions/EditModeReducerActions";

export interface INodeSelectingReducer {
    IdOfEditableNode: string | null;
    // IdOfHighlighted: string | null;
}

const initialState: INodeSelectingReducer = {
    IdOfEditableNode: null,
    // IdOfHighlighted: null
}

export function nodeSelectingReducer(state = { ...initialState }, action: Action) {
    switch (action.type) {
        case ActionTypes.SWITCH_EDIT_MODE_TO_GIVEN_ID_ONLY:
            return { ...state, IdOfEditableNode: action.payload.IdOfEditableNode }


        default:
            return state;
    }
}
