import { Note } from '../../../src/models/Note';
import NotesManager from '../../../src/services/NotesManager';

describe('handling NotesManager.isAlreadyInState method: ', () => {
    test.each([
        // 1 test:
        [
            "1", // <-- testId
            [ Note.newEmpty("1", "55"), Note.newEmpty("2", "1") ],
            true // <--expectedOutput
        ],
        // 2 test:
        [
            "5", // <-- testId
            [ Note.newEmpty("1", null), Note.newEmpty("2", "1"), Note.newEmpty("2", "1lskd") ],
            false // <--expectedOutput
        ],
        // 3 test:
        [
            "findMe", // <-- testId
            [ Note.newEmpty("1", null), Note.newEmpty("findMe", "1"), Note.newEmpty("baz", "fooobar") ],
            true // <--expectedOutput
        ],
    ])
        ('should return proper result', (testId, notesInState, expectedOutput) => {

            const result: boolean = NotesManager.isAlreadyInState(testId, notesInState);
            expect(result).toBe(expectedOutput);

        });

});