import { actionTypes } from "./actionTypes";

export interface IAction {
    type: actionTypes,
    payload: {
        IdOfEditableNote?: string | null,
        noteId? : string | null, 
    }
}

export function PassEditModeToId(noteId: string | null): IAction {
    return {
        type: actionTypes.SWITCH_EDIT_MODE_TO_GIVEN_ID_ONLY,
        payload: {
            IdOfEditableNote: noteId
        }
    }
}

export function SelectAndRememberNoteId(noteId: string): IAction {
  return {
    type: actionTypes.SELECT_AND_REMEMBER_NOTEID,
    payload: {
      noteId
    }
  }
}

export type Action = IAction;