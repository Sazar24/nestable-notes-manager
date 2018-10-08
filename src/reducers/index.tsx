import { combineReducers } from 'redux'
import * as allFromNoteSelecting from './noteSelecting';
import { INote } from '../models/Note';
import { notesListReducer } from './notesList';

export interface IGlobalReduxState {
    notes: INote[],
    selectedNotes: allFromNoteSelecting.INoteSelectingReducer
}

export const reducer = combineReducers<IGlobalReduxState>({
    notes: notesListReducer,
    selectedNotes: allFromNoteSelecting.notesSelectingReducer
})