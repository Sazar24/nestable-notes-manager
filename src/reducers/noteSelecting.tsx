import { Action, IAction } from "../actions/NoteSelecting";
import { actionTypes } from "../actions/actionTypes";

export interface INoteSelectingReducer {
    IdOfEditableNote: string | null;
    theOnlyVisibleNoteId: string | null;
    IdOfCuttedNote: string | null;
}

export const initialState: INoteSelectingReducer = {
    IdOfEditableNote: null,
    theOnlyVisibleNoteId: null,
    IdOfCuttedNote: null,
}

export function notesSelectingReducer(state = { ...initialState }, action: IAction): INoteSelectingReducer {
    switch (action.type) {
        case actionTypes.SWITCH_EDIT_MODE_TO_GIVEN_ID_ONLY:
            if (action.payload.IdOfEditableNote === undefined) return state;
            return { ...state, IdOfEditableNote: action.payload.IdOfEditableNote };

        case actionTypes.SELECT_AND_REMEMBER_NOTEID:
            if (action.payload.noteId === undefined) return state;
            return { ...state, IdOfCuttedNote: action.payload.noteId };

        default:
            return state;
    }
}
