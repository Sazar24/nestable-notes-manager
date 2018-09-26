import { Action, IAction } from "../actions/NodeSelecing";
import { actionTypes } from "../actions/actionTypes";

export interface INodeSelectingReducer {
    IdOfEditableNode: string | null;
    theOnlyVisibleNodeId: string | null;
    IdOfCuttedNode: string | null;
}

export const initialState: INodeSelectingReducer = {
    IdOfEditableNode: null,
    theOnlyVisibleNodeId: null,
    IdOfCuttedNode: null,
}

export function nodeSelectingReducer(state = { ...initialState }, action: IAction): INodeSelectingReducer {
    switch (action.type) {
        case actionTypes.SWITCH_EDIT_MODE_TO_GIVEN_ID_ONLY:
            if (action.payload.IdOfEditableNode === undefined) return state;
            return { ...state, IdOfEditableNode: action.payload.IdOfEditableNode };

        case actionTypes.SELECT_AND_REMEMBER_NODEID:
            if (action.payload.nodeId === undefined) return state;
            return { ...state, IdOfCuttedNode: action.payload.nodeId };

        default:
            return state;
    }
}
