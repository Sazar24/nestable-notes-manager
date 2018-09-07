import { CreateNewNodeAsChild, DeleteNodeWithId } from './../../src/actions/TaskListActions';
import { nodeListReducer, INodesListReducer } from './../../src/reducers/nodeList';
import { INode } from '../../src/models/Node';
import * as TaskListActions from '../../src/actions/TaskListActions';

describe('handling actionTypes.ADD_NODE: reducer should return proper state when apply the action to previous state;', () => {

    it('Adding-new-node-action returns the previous state enlarged by added node ', () => {

        const initialState: INodesListReducer = {
            "1": { header: "new node", description: "click me, to edit", isDone: false, Id: "1", parentID: null },
        }
        const actionADDNode :any = CreateNewNodeAsChild("2", "1"); // TODO: kill "any"-type
        const simulatedStateOutput = nodeListReducer(initialState, actionADDNode);

        const expectedState: INodesListReducer = {
            "1": { header: "new node", description: "click me, to edit", isDone: false, Id: "1", parentID: null },
            "2": { header: "new node", description: "click me, to edit", isDone: false, Id: "2", parentID: "1" },
        };

        expect(simulatedStateOutput).toEqual(expectedState);
    });

    it('adding subsequent nodes to same state gives state with all of the added nodes', () => {

        const initialState: INodesListReducer = {
            "1": { header: "new node", description: "click me, to edit", isDone: false, Id: "1", parentID: null },
        }

        let simulatedStateOutput: INodesListReducer;
        simulatedStateOutput = nodeListReducer(initialState, CreateNewNodeAsChild("3", "1"));
        simulatedStateOutput = nodeListReducer(simulatedStateOutput, CreateNewNodeAsChild("3", "1"));
        simulatedStateOutput = nodeListReducer(simulatedStateOutput, CreateNewNodeAsChild("4", "1"));
        simulatedStateOutput = nodeListReducer(simulatedStateOutput, CreateNewNodeAsChild("2", "3"));

        const expectedState2: INodesListReducer = {
            "1": { header: "new node", description: "click me, to edit", isDone: false, Id: "1", parentID: null },
            "3": { header: "new node", description: "click me, to edit", isDone: false, Id: "3", parentID: "1" },
            "4": { header: "new node", description: "click me, to edit", isDone: false, Id: "4", parentID: "1" },
            "2": { header: "new node", description: "click me, to edit", isDone: false, Id: "2", parentID: "3" },
        };

        expect(simulatedStateOutput).toEqual(expectedState2);
    });
});

///////////////////////////////////////////////////////

describe("handling actiontypes.DELETE_NODE_WITH_GIVEN_ID", () => {
    it('erase 1 of 3 existing nodes ', () => {
        const initialState: INodesListReducer = {
            "1": { header: "new node", description: "click me, to edit", isDone: false, Id: "1", parentID: null },
            "2": { header: "new node", description: "click me, to edit", isDone: false, Id: "2", parentID: null },
            "3": { header: "new node", description: "click me, to edit", isDone: false, Id: "3", parentID: null },
        };

        const simulatedStateOutput: INodesListReducer = nodeListReducer(initialState, DeleteNodeWithId("3"));
        const expectedState: INodesListReducer = {
            "1": { header: "new node", description: "click me, to edit", isDone: false, Id: "1", parentID: null },
            "2": { header: "new node", description: "click me, to edit", isDone: false, Id: "2", parentID: null },
        };

        expect(simulatedStateOutput).toEqual(expectedState);
    });

    it('erase 1 of 1 - leaves empty state', () => {

        const initialState: INodesListReducer = {
            "3": { header: "new node", description: "click me, to edit", isDone: false, Id: "3", parentID: null },
        };

        const simulatedStateOutput: INodesListReducer = nodeListReducer(initialState, DeleteNodeWithId("3"));
        const expectedState: INodesListReducer = {};

        expect(simulatedStateOutput).toEqual(expectedState);
    });

    it('erasing 1 of 4. Does NOT erasing descentants, but only pointed (parent) node', () => {

        const initialState: INodesListReducer = {
            "1": { header: "new node", description: "click me, to edit", isDone: false, Id: "1", parentID: null },
            "2": { header: "new node", description: "click me, to edit", isDone: false, Id: "2", parentID: "1" },
            "3": { header: "new node", description: "click me, to edit", isDone: false, Id: "3", parentID: "2" },
            "4": { header: "new node", description: "click me, to edit", isDone: false, Id: "4", parentID: "3" },
            "5": { header: "new node", description: "click me, to edit", isDone: false, Id: "5", parentID: null },
        };

        const simulatedStateOutput: INodesListReducer = nodeListReducer(initialState, DeleteNodeWithId("2"));
        const expectedState: INodesListReducer = {
            "1": { header: "new node", description: "click me, to edit", isDone: false, Id: "1", parentID: null },
            "3": { header: "new node", description: "click me, to edit", isDone: false, Id: "3", parentID: "2" },
            "4": { header: "new node", description: "click me, to edit", isDone: false, Id: "4", parentID: "3" },
            "5": { header: "new node", description: "click me, to edit", isDone: false, Id: "5", parentID: null },
        };

        expect(simulatedStateOutput).toEqual(expectedState);
    });
});

///////////////////

describe("handling actionTypes.CHANGE_NODE_CONTENT", () => {
    it('should change header of pointed node ', () => {

        const initialState: INodesListReducer = {
            "1": { header: "new node", description: "click me, to edit", isDone: false, Id: "1", parentID: null },
            "2": { header: "new node", description: "click me, to edit", isDone: false, Id: "2", parentID: "1" },
            "3": { header: "", description: "click me, to edit", isDone: false, Id: "3", parentID: "2" },
            "4": { header: "new node", description: "", isDone: false, Id: "4", parentID: "3" },
            "5": { header: "5555header", description: "555descr", isDone: false, Id: "5", parentID: null },
        };

        const changedNode: INode = { header: "I am changed!", description: "foooooooobaaaaar", isDone: true, Id: "4", parentID: "3" };
        const simulatedStateOutput: INodesListReducer = nodeListReducer(initialState, TaskListActions.ChangeNodeContent(changedNode));

        const expectedState: INodesListReducer = {
            "1": { header: "new node", description: "click me, to edit", isDone: false, Id: "1", parentID: null },
            "2": { header: "new node", description: "click me, to edit", isDone: false, Id: "2", parentID: "1" },
            "3": { header: "", description: "click me, to edit", isDone: false, Id: "3", parentID: "2" },
            "4": { header: "I am changed!", description: "foooooooobaaaaar", isDone: true, Id: "4", parentID: "3" },
            "5": { header: "5555header", description: "555descr", isDone: false, Id: "5", parentID: null },
        };

        expect(simulatedStateOutput).toEqual(expectedState);
    });
    
    it('should change description of pointed node ', () => {

        const initialState: INodesListReducer = {
            "1": { header: "new node", description: "click me, to edit", isDone: false, Id: "1", parentID: null },
            "2": { header: "new node", description: "click me, to edit", isDone: false, Id: "2", parentID: "1" },
        };

        const changedNode: INode = { header: "I am changed!", description: "foooooooobaaaaar", isDone: true, Id: "2", parentID: "3" };
        const simulatedStateOutput: INodesListReducer = nodeListReducer(initialState, TaskListActions.ChangeNodeContent(changedNode));

        const expectedState: INodesListReducer = {
            "1": { header: "new node", description: "click me, to edit", isDone: false, Id: "1", parentID: null },
            "2": { header: "I am changed!", description: "foooooooobaaaaar", isDone: true, Id: "2", parentID: "3" },
        };

        expect(simulatedStateOutput).toEqual(expectedState);
    });
    
    it('cant "change" unexisting node - It leaves state untouched instead.', () => {

        const initialState: INodesListReducer = {
            "1": { header: "new node", description: "click me, to edit", isDone: false, Id: "1", parentID: null },
            "2": { header: "new node", description: "click me, to edit", isDone: false, Id: "2", parentID: "1" },
        };

        const changedNode: INode = { header: "I am changed!", description: "foooooooobaaaaar", isDone: true, Id: "9", parentID: "1" };
        const simulatedStateOutput: INodesListReducer = nodeListReducer(initialState, TaskListActions.ChangeNodeContent(changedNode));

        expect(simulatedStateOutput).toEqual(initialState);
    });
});