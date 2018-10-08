import * as fromNoteSelectingReducer from '../../src/reducers/noteSelecting';
import { INoteSelectingReducer, notesSelectingReducer } from '../../src/reducers/noteSelecting';
import { PassEditModeToId } from '../../src/actions/NoteSelecting';

describe("noteSelecting Reducer >> handling ActionTypes.SWITCH_EDIT_MODE_TO_GIVEN_ID_ONLY", () => {
    let initialState: INoteSelectingReducer;
    let expectedOutput: INoteSelectingReducer;

    beforeEach(() => {
        initialState = Object.assign({}, fromNoteSelectingReducer.initialState);
        expectedOutput = Object.assign({}, fromNoteSelectingReducer.initialState);
    });

    it("When null Id is dispatched to IdOfEditableNote-property, it is saved to reducer state as null ", () => {
        initialState.IdOfEditableNote = null;
        expectedOutput.IdOfEditableNote = null;
        const simulationOutput: INoteSelectingReducer = notesSelectingReducer(initialState, PassEditModeToId(null));
        expect(simulationOutput).toEqual(expectedOutput);
    });

    it('dispatching null to IdOfEditableNote-property, when this property is set to any Id, nulls it. ', () => {
        initialState.IdOfEditableNote = "foobar";
        expectedOutput.IdOfEditableNote = null;

        const simulationOutput: INoteSelectingReducer = notesSelectingReducer(initialState, PassEditModeToId(null));
        expect(simulationOutput).toEqual(expectedOutput);
    });

    it('in state was null. Setting(dispatching) properties to any value saves it properly', () => {

        expectedOutput.IdOfEditableNote = "foobar123";
        initialState.IdOfEditableNote = null;

        const simulationOutput: INoteSelectingReducer = notesSelectingReducer(initialState, PassEditModeToId("foobar123"));
        expect(simulationOutput).toEqual(expectedOutput);
    });

    it('in state was some value. Dispatch changes it to given value, other than null', () => {

        expectedOutput.IdOfEditableNote = "foobar";
        initialState.IdOfEditableNote = "baz";

        const simulationOutput: INoteSelectingReducer = notesSelectingReducer(initialState, PassEditModeToId("foobar"));
        expect(simulationOutput).toEqual(expectedOutput);
    });
})