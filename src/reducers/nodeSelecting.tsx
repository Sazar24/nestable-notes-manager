import { Action } from "../actions/NodeSelecing";
import { actionTypes } from "../actions/actionTypes";

export interface INodeSelectingReducer {
    IdOfEditableNode: string | null;
    theOnlyVisibleNodeId: string | null;
}

export const initialState: INodeSelectingReducer = {
    IdOfEditableNode: null,
    theOnlyVisibleNodeId: null
}

export function nodeSelectingReducer(state = { ...initialState }, action: Action): INodeSelectingReducer {
    switch (action.type) {
        case actionTypes.SWITCH_EDIT_MODE_TO_GIVEN_ID_ONLY:
            return { ...state, IdOfEditableNode: action.payload.IdOfEditableNode };

        default:
            return state;
    }
}
