import { INote, Note } from './../../../src/models/Note';
import NotesManager from '../../../src/services/NotesManager';

describe('NotesManager .deleteNoteAndDescendants ', () => {

    const notesManager = new NotesManager();

    it('should delete proper values', () => {
        const notesInState: INote[] = [
            Note.newEmpty("1", null),
            Note.newEmpty("22", "1"),
            Note.newEmpty("33", "1"),
            Note.newEmpty("2", null),
        ];

        const expectedResult: INote[] = [
            Note.newEmpty("2", null),
        ];

        const result: INote[] = notesManager.deleteNoteAndDescendants("1", notesInState);

        expect(result).toEqual(expectedResult);
    });


});