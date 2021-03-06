import { actionTypes } from "../actions/actionTypes";
import { INote, Note } from "../models/Note";
import NotesManager from "../services/NotesManager";
import LocalStorageAccessor from "../services/LocalStorage";
import { IAction } from "../actions/NotesActions";

const initialState: INote[] = [];

export function notesListReducer(state: INote[] = initialState, action: IAction): INote[] { // TODO: refactor.

  let newState: INote[] = state.slice();
  let newNote: Note;
  let noteId: string
  const localStorageAccessor: LocalStorageAccessor = new LocalStorageAccessor();
  const notesManager = new NotesManager();

  switch (action.type) {
    case actionTypes.CREATE_NOTE:
      newNote = Object.assign({}, action.payload.note);

      if (NotesManager.isAlreadyInState(newNote.Id, state))
        return state;
      newState.push(newNote);
      localStorageAccessor.saveAllNotesInStorage(newState);
      return newState;

    case actionTypes.DELETE_NOTE: // it doesnt remove subNotes (children)
      if (action.payload.noteId === undefined) return state;
      noteId = action.payload.noteId;

      newState = notesManager.deleteNoteAndDescendants(noteId, newState);
      localStorageAccessor.saveAllNotesInStorage(newState);
      return newState;

    case actionTypes.UPDATE_NOTE_CONTENT:
      newNote = Object.assign({}, action.payload.note);

      const noteWithGivenIdAlreadExists: boolean = NotesManager.isAlreadyInState(newNote.Id, state);
      if (noteWithGivenIdAlreadExists) {
        const indexOfChangedNote: number = state.findIndex(item => item.Id === newNote.Id);
        newState[indexOfChangedNote] = newNote;
      };

      localStorageAccessor.saveAllNotesInStorage(newState);
      return newState;

    case actionTypes.MOVE_CLOSER_TO_ANCESTOR:
      if (action.payload.note === undefined) return state;

      const transferingNote: Note = action.payload.note;
      if (NotesManager.isAlreadyInState(transferingNote.Id, state) === false) {
        window.alert("Firstly you need to pick (cut) existing Note.");
        return state;
      }

      if (transferingNote.parentID === null) return state;


      const parentNoteIndex: number = state.findIndex(item => item.Id === transferingNote.parentID);
      if (parentNoteIndex === -1) return state;

      const parentNote: Note = state[parentNoteIndex];
      transferingNote.parentID = parentNote.parentID;

      const indexOfMovingNote: number = state.findIndex(item => item.Id === transferingNote.Id);
      newState[indexOfMovingNote] = transferingNote;

      localStorageAccessor.saveAllNotesInStorage(newState);
      return newState;


    case actionTypes.ATTACH_REMEMBERED_NOTE_TO_PARENT: // TODO: refactor me.
      if (action.payload.destinationParentNoteId === undefined || action.payload.movingNoteId === undefined || action.payload.movingNoteId === null)
        return state;
      if (action.payload.movingNoteId === null) return state;
      // const destinationPArentNodeId: string = action.payload.destinationParentNoteId;
      // const movingNoteId: string = action.payload.movingNoteId;
      const {destinationParentNoteId, movingNoteId} = action.payload;

      if (NotesManager.isAlreadyInState(destinationParentNoteId, state) === false) return state;
      if (NotesManager.isAlreadyInState(movingNoteId, state) === false) return state;

      const isDescendingToItself: boolean = new NotesManager().isDescendingToItself(movingNoteId, destinationParentNoteId, state);
      if (isDescendingToItself) {
        window.alert("The note cannot be nested under itself.")
        return state;
      }
      ////////

      const parentNoteInStateIndex: number = state.findIndex(item => item.Id === destinationParentNoteId);
      const movinNoteIndex: number = state.findIndex(item => item.Id === action.payload.movingNoteId);

      newState[movinNoteIndex].parentID = state[parentNoteInStateIndex].Id;
      localStorageAccessor.saveAllNotesInStorage(newState);
      return newState;


    case actionTypes.TOGGLE_DONE_STATUS_ENTIRE_NOTE_BRANCH: // TODO: test me!
      if (action.payload.noteId === undefined) return state;
      noteId = action.payload.noteId;

      notesManager.toggleBranchStatus(noteId, newState);

      localStorageAccessor.saveAllNotesInStorage(newState);
      return newState;

    case actionTypes.LOAD_ALL_NOTES:
      if (action.payload.allNotes) {
        newState = action.payload.allNotes;
      };
      return newState;


    default:
      return state;
  }

};