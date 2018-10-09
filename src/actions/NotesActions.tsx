import { INote } from "../models/Note";
import { v1 } from "uuid";
import { Note } from "../models/Note";
import { actionTypes } from "./actionTypes";

export interface IAction {
  type: actionTypes;
  payload: {
    note?: INote;
    noteId?: string;
    movingNoteId?: string,
    destinationParentNoteId?: string,
    allNotes?: Note[],
  };
}

export function CreateNote(newNoteId: string, parentId?: string): IAction {
  return {
    type: actionTypes.CREATE_NOTE,
    payload: {
      note: Note.newEmpty(newNoteId, parentId),
    }
  }
}

export function DeleteNote(noteId: string): IAction {
  return {
    type: actionTypes.DELETE_NOTE,
    payload: {
      noteId
    }
  }
}

export function ChangeNoteContent(note: INote): IAction {
  return {
    type: actionTypes.UPDATE_NOTE_CONTENT,
    payload: {
      note
    }
  }
}

export function AddLoadedNote(note: INote): IAction {
  return {
    type: actionTypes.ADD_NOTE_FROM_MEMORY,
    payload: {
      note
    }
  }
}

export function MoveNoteCloserToAncestor(note: INote): IAction { // TODO: przerobić na (noteId:string), bo ta akcja nie potrzebuje całego note`a.
  return {
    type: actionTypes.MOVE_CLOSER_TO_ANCESTOR,
    payload: {
      note
    }
  }
}

export function PasteAsChild(movingNoteId: string, destinationParentNoteId: string): IAction {
  return {
    type: actionTypes.ATTACH_REMEMBERED_NOTE_TO_PARENT,
    payload: {
      movingNoteId,
      destinationParentNoteId
    }
  }
}

export function toglleDoneNotesBranch(noteId: string): IAction {
  return {
    type: actionTypes.TOGGLE_DONE_STATUS_ENTIRE_NOTE_BRANCH,
    payload: {
      noteId
    }
  }
}

export function loadAllNotes(allNotes: Note[]): IAction {
  return {
    type: actionTypes.LOAD_ALL_NOTES,
    payload: {
      allNotes
    }
  }
}