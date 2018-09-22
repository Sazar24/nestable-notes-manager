// import { initialState } from './../../src/reducers/nodeSelecting';
import * as fromNodeSelectingReducer from './../../src/reducers/nodeSelecting';
import { INodeSelectingReducer, nodeSelectingReducer } from './../../src/reducers/nodeSelecting';
import { PassEditModeToId } from '../../src/actions/NodeSelecing';

describe("nodeSelecting Reducer >> handling ActionTypes.SWITCH_EDIT_MODE_TO_GIVEN_ID_ONLY", () => {
    let initialState: INodeSelectingReducer;
    let expectedOutput: INodeSelectingReducer;

    beforeEach(() => {
        initialState = Object.assign({}, fromNodeSelectingReducer.initialState);
        expectedOutput = Object.assign({}, fromNodeSelectingReducer.initialState);
    });

    it("When null Id is dispatched to IdOfEditableNode-property, it is saved to reducer state as null ", () => {
        initialState.IdOfEditableNode = null;
        expectedOutput.IdOfEditableNode = null;
        const simulationOutput: INodeSelectingReducer = nodeSelectingReducer(initialState, PassEditModeToId(null));
        console.log(`expectedOutput ${expectedOutput}`);
        expect(simulationOutput).toEqual(expectedOutput);
    });

    it('dispatching null to IdOfEditableNode-property, when this property is set to any Id, nulls it. ', () => {
        initialState.IdOfEditableNode = "foobar";
        expectedOutput.IdOfEditableNode = null;

        const simulationOutput: INodeSelectingReducer = nodeSelectingReducer(initialState, PassEditModeToId(null));
        // console.log({ simulatingEmptyOutput });
        // console.log({ expectedOutput });
        expect(simulationOutput).toEqual(expectedOutput);
    });

    it('in state was null. Setting(dispatching) properties to any value saves it properly', () => {

        expectedOutput.IdOfEditableNode = "foobar123";
        initialState.IdOfEditableNode = null;

        const simulationOutput: INodeSelectingReducer = nodeSelectingReducer(initialState, PassEditModeToId("foobar123"));
        expect(simulationOutput).toEqual(expectedOutput);
    });

    it('in state was some value. Dispatch changes it to given value, other than null', () => {

        expectedOutput.IdOfEditableNode = "foobar";
        initialState.IdOfEditableNode = "baz";

        const simulationOutput: INodeSelectingReducer = nodeSelectingReducer(initialState, PassEditModeToId("foobar"));
        expect(simulationOutput).toEqual(expectedOutput);
    });
})