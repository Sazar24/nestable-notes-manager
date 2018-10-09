import { CreateNote, DeleteNote } from '../../src/actions/NotesActions';
import { notesListReducer } from '../../src/reducers/notesList';
import { INote, Note } from '../../src/models/Note';
import * as NotesActions from '../../src/actions/NotesActions';

describe('handling actionTypes.ADD_NOTE: reducer should return proper state when apply the action to previous state;', () => {

    it('Adding-new-note-action returns the previous state enlarged by added note ', () => {

        const initialState: INote[] = [
            Note.newEmpty("1")
        ]
        const simulatedStateOutput = notesListReducer(initialState, CreateNote("2", "1"));

        const expectedState: INote[] = [
            Note.newEmpty("1", null),
            Note.newEmpty("2", "1")
        ];

        expect(simulatedStateOutput).toEqual(expectedState);
    });

    it('adding subsequent notes to same state gives state with all of the added notes', () => {
        const initialState: INote[] = [
            Note.newEmpty("1", null),
        ]

        let simulatedStateOutput: INote[];
        simulatedStateOutput = notesListReducer(initialState, CreateNote("3", "1"));
        simulatedStateOutput = notesListReducer(simulatedStateOutput, CreateNote("4", "1"));
        simulatedStateOutput = notesListReducer(simulatedStateOutput, CreateNote("2", "3"));

        const expectedState2: INote[] = [
            Note.newEmpty("1", null),
            Note.newEmpty("3", "1"),
            Note.newEmpty("4", "1"),
            Note.newEmpty("2", "3"),
        ];

        expect(simulatedStateOutput).toEqual(expectedState2);
    });

    it('cant add (and store) notes with same Id', () => {
        const initialState: INote[] = [
            Note.newEmpty("1", null)
        ]

        let simulatedStateOutput: INote[];
        simulatedStateOutput = notesListReducer(initialState, CreateNote("3", "1"));
        simulatedStateOutput = notesListReducer(simulatedStateOutput, CreateNote("3", "1"));
        simulatedStateOutput = notesListReducer(simulatedStateOutput, CreateNote("3", "1"));
        simulatedStateOutput = notesListReducer(simulatedStateOutput, CreateNote("3", "1"));
        simulatedStateOutput = notesListReducer(simulatedStateOutput, CreateNote("2", "3"));

        const expectedState2: INote[] = [
            Note.newEmpty("1", null),
            Note.newEmpty("3", "1"),
            Note.newEmpty("2", "3"),
        ];
        expect(simulatedStateOutput).toEqual(expectedState2);
    });
});

///////////////////////////////////////////////////////

describe("handling actiontypes.DELETE_note_WITH_GIVEN_ID", () => {
    it('erase 1 of 3 existing notes ', () => {
        const initialState: INote[] = [
            Note.newEmpty("1", null),
            Note.newEmpty("2", null),
            Note.newEmpty("3", null),
        ];

        const simulatedStateOutput: INote[] = notesListReducer(initialState, DeleteNote("3"));
        const expectedState: INote[] = [
            Note.newEmpty("1", null),
            Note.newEmpty("2", null),
        ];

        expect(simulatedStateOutput).toEqual(expectedState);
    });

    it('erase 1 of 1 - leaves empty state', () => {

        const initialState: INote[] = [
            Note.newEmpty("3", null),
        ];

        const simulatedStateOutput: INote[] = notesListReducer(initialState, DeleteNote("3"));
        const expectedState: INote[] = [];

        expect(simulatedStateOutput).toEqual(expectedState);
    });

    it('Erasing descentants and pointed note', () => {

        const initialState: INote[] = [
            Note.newEmpty("1", null),
            Note.newEmpty("2", "1"),
            Note.newEmpty("3", "2"),
            Note.newEmpty("4", "3"),
            Note.newEmpty("5", null),
        ];

        const simulatedStateOutput: INote[] = notesListReducer(initialState, DeleteNote("2"));
        const expectedState: INote[] = [
            Note.newEmpty("1", null),
            Note.newEmpty("5", null),
        ];

        expect(simulatedStateOutput).toEqual(expectedState);
    });
});

///////////////////

describe("handling actionTypes.CHANGE_NOtE_CONTENT", () => {
    it('should change header of pointed note ', () => {

        const initialState: INote[] = [

            Note.newEmpty("1", null),
            Note.newEmpty("2", "1"),
            Note.newEmpty("3", "2"),
            Note.newEmpty("4", "3"),
            Note.newEmpty("5", null),
        ];

        const changedNote: INote = { header: "I am changed!", description: "foooooooobaaaaar", isDone: true, Id: "4", parentID: "3" };
        const simulatedStateOutput: INote[] = notesListReducer(initialState, NotesActions.ChangeNoteContent(changedNote));

        const expectedState: INote[] = [
            Note.newEmpty("1", null),
            Note.newEmpty("2", "1"),
            Note.newEmpty("3", "2"),
            { header: "I am changed!", description: "foooooooobaaaaar", isDone: true, Id: "4", parentID: "3" },
            Note.newEmpty("5", null),
        ];

        expect(simulatedStateOutput).toEqual(expectedState);
    });

    it('should change description of pointed note ', () => {

        const initialState: INote[] = [
            Note.newEmpty("1", null),
            Note.newEmpty("2", "1"),
        ];

        const changedNote: INote = { header: "I am changed!", description: "foooooooobaaaaar", isDone: true, Id: "2", parentID: "3" };

        const simulatedStateOutput: INote[] = notesListReducer(initialState, NotesActions.ChangeNoteContent(changedNote));

        const expectedState: INote[] = [
            Note.newEmpty("1", null),
            { header: "I am changed!", description: "foooooooobaaaaar", isDone: true, Id: "2", parentID: "3" },
        ];

        expect(simulatedStateOutput).toEqual(expectedState);
    });

    it('cant "change" unexisting note - It leaves state untouched instead.', () => {

        const initialState: INote[] = [
            Note.newEmpty("1", null),
            Note.newEmpty("2", "1"),
        ];

        const changednote: INote = Note.newEmpty("9", "1");
        const simulatedStateOutput: INote[] = notesListReducer(initialState, NotesActions.ChangeNoteContent(changednote));

        expect(simulatedStateOutput).toEqual(initialState);
    });
});

describe("handling actionTypes.MOVE_CLOSER_TO_ANCESTOR", () => {
    test('should move child one step closer to its grandparent', () => {
        const initialState: Note[] = [
            Note.newEmpty("grandfather_Id", null),
            Note.newEmpty("parent_Id", "grandfather_Id"),
            Note.newEmpty("transferingnote_TheChild", "parent_Id")
        ];

        const transferingnote: Note = initialState[2];
        const simulatedStateOutput: INote[] = notesListReducer(initialState, NotesActions.MoveNoteCloserToAncestor(transferingnote));

        const expectedOutcome: Note[] = [
            Note.newEmpty("grandfather_Id", null),
            Note.newEmpty("parent_Id", "grandfather_Id"),
            Note.newEmpty("transferingnote_TheChild", "grandfather_Id")
        ];

        expect(simulatedStateOutput).toEqual(expectedOutcome);
    });

    test('should move child one step closer to its grandparent, when that grandparent is not the top ancestor', () => {
        const initialState: Note[] = [
            Note.newEmpty("topAncestor_grandGrandFather", null),
            Note.newEmpty("grandfather_Id", "topAncestor_grandGrandFather"),
            Note.newEmpty("parent_Id", "grandfather_Id"),
            Note.newEmpty("transferingnote_TheChild", "parent_Id")
        ];

        const transferingnote: Note = initialState[3];
        const simulatedStateOutput: INote[] = notesListReducer(initialState, NotesActions.MoveNoteCloserToAncestor(transferingnote));

        const expectedOutcome: Note[] = [
            Note.newEmpty("topAncestor_grandGrandFather", null),
            Note.newEmpty("grandfather_Id", "topAncestor_grandGrandFather"),
            Note.newEmpty("parent_Id", "grandfather_Id"),
            Note.newEmpty("transferingnote_TheChild", "grandfather_Id")
        ];

        expect(simulatedStateOutput).toEqual(expectedOutcome);
    });

    test('shoudnt move anything when trying to move top-level note', () => {
        const initialState: Note[] = [
            Note.newEmpty("topAncestor_grandGrandFather", null),
            Note.newEmpty("grandfather_Id", "topAncestor_grandGrandFather"),
            Note.newEmpty("parent_Id", "grandfather_Id"),
            Note.newEmpty("transferingnote_TheChild", "parent_Id")
        ];

        const transferingnote: Note = initialState[0];
        const simulatedStateOutput: INote[] = notesListReducer(initialState, NotesActions.MoveNoteCloserToAncestor(transferingnote));

        const expectedOutcome: Note[] = [
            Note.newEmpty("topAncestor_grandGrandFather", null),
            Note.newEmpty("grandfather_Id", "topAncestor_grandGrandFather"),
            Note.newEmpty("parent_Id", "grandfather_Id"),
            Note.newEmpty("transferingnote_TheChild", "parent_Id")
        ];

        expect(simulatedStateOutput).toEqual(expectedOutcome);
    });

});

describe("handling moving notes: cut and paste actions", () => {
    test("handle paste", () => {
        const initialState: Note[] = [
            {header: "head1", description: "descr1", isDone: false, Id: "1", parentID: null},
            {header: "head2", description: "descr2", isDone: false, Id: "2", parentID: "1"},
            {header: "head3", description: "descr3", isDone: false, Id: "3", parentID: "2"},
            {header: "head4", description: "descr4", isDone: false, Id: "4", parentID: "3"},
        ];

        const transferingnote: Note = initialState[0];
        const simulatedStateOutput: INote[] = notesListReducer(initialState, NotesActions.PasteAsChild("4","1"));

        const expectedOutcome: Note[] = [
            {header: "head1", description: "descr1", isDone: false, Id: "1", parentID: null},
            {header: "head2", description: "descr2", isDone: false, Id: "2", parentID: "1"},
            {header: "head3", description: "descr3", isDone: false, Id: "3", parentID: "2"},
            {header: "head4", description: "descr4", isDone: false, Id: "4", parentID: "1"},
        ];

        expect(simulatedStateOutput).toEqual(expectedOutcome);
    });
});