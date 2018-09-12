import { CreateNode, DeleteNode } from './../../src/actions/TaskListActions';
import { nodeListReducer } from './../../src/reducers/nodeList';
import { INode, Node } from '../../src/models/Node';
import * as TaskListActions from '../../src/actions/TaskListActions';

describe('handling actionTypes.ADD_NODE: reducer should return proper state when apply the action to previous state;', () => {

    it('Adding-new-node-action returns the previous state enlarged by added node ', () => {

        const initialState: INode[] = [
            Node.newEmpty("1")
        ]
        const actionADDNode: any = CreateNode("2", "1"); // TODO: kill "any"-type
        const simulatedStateOutput = nodeListReducer(initialState, actionADDNode);

        const expectedState: INode[] = [
            Node.newEmpty("1", null),
            Node.newEmpty("2", "1")
        ];

        expect(simulatedStateOutput).toEqual(expectedState);
    });

    it('adding subsequent nodes to same state gives state with all of the added nodes', () => {
        const initialState: INode[] = [
            Node.newEmpty("1", null),
        ]

        let simulatedStateOutput: INode[];
        simulatedStateOutput = nodeListReducer(initialState, CreateNode("3", "1"));
        simulatedStateOutput = nodeListReducer(simulatedStateOutput, CreateNode("4", "1"));
        simulatedStateOutput = nodeListReducer(simulatedStateOutput, CreateNode("2", "3"));

        const expectedState2: INode[] = [
            Node.newEmpty("1", null),
            Node.newEmpty("3", "1"),
            Node.newEmpty("4", "1"),
            Node.newEmpty("2", "3"),
        ];

        expect(simulatedStateOutput).toEqual(expectedState2);
    });

    it('cant add (and store) nodes with same Id', () => {
        console.log("TODO!")
        // const initialState: INode[] = [
        //     { header: "new node", description: "click me, to edit", isDone: false, Id: "1", parentID: null },
        // ]

        // let simulatedStateOutput: INode[];
        // simulatedStateOutput = nodeListReducer(initialState, CreateNewNodeAsChild("3", "1"));
        // simulatedStateOutput = nodeListReducer(simulatedStateOutput, CreateNewNodeAsChild("3", "1"));
        // simulatedStateOutput = nodeListReducer(simulatedStateOutput, CreateNewNodeAsChild("2", "3"));

        // const expectedState2: INode[] = [
        //     { header: "new node", description: "click me, to edit", isDone: false, Id: "1", parentID: null },
        //     { header: "new node", description: "click me, to edit", isDone: false, Id: "3", parentID: "1" },
        //     { header: "new node", description: "click me, to edit", isDone: false, Id: "2", parentID: "3" },
        // ];

        // // TODO!!
        // // expect(simulatedStateOutput).toEqual(expectedState2);
    });
});

///////////////////////////////////////////////////////

describe("handling actiontypes.DELETE_NODE_WITH_GIVEN_ID", () => {
    it('erase 1 of 3 existing nodes ', () => {
        const initialState: INode[] = [
            Node.newEmpty("1", null),
            Node.newEmpty("2", null),
            Node.newEmpty("3", null),
        ];

        const simulatedStateOutput: INode[] = nodeListReducer(initialState, DeleteNode("3"));
        const expectedState: INode[] = [
            Node.newEmpty("1", null),
            Node.newEmpty("2", null),
        ];

        expect(simulatedStateOutput).toEqual(expectedState);
    });

    it('erase 1 of 1 - leaves empty state', () => {

        const initialState: INode[] = [
            Node.newEmpty("3", null),
        ];

        const simulatedStateOutput: INode[] = nodeListReducer(initialState, DeleteNode("3"));
        const expectedState: INode[] = [];

        expect(simulatedStateOutput).toEqual(expectedState);
    });

    it('erasing 1 of 4. Does NOT erasing descentants, but only pointed (parent) node', () => {

        const initialState: INode[] = [
            Node.newEmpty("1", null),
            Node.newEmpty("2", "1"),
            Node.newEmpty("3", "2"),
            Node.newEmpty("4", "3"),
            Node.newEmpty("5", null),
        ];

        const simulatedStateOutput: INode[] = nodeListReducer(initialState, DeleteNode("2"));
        const expectedState: INode[] = [
            Node.newEmpty("1", null),
            Node.newEmpty("3", "2"),
            Node.newEmpty("4", "3"),
            Node.newEmpty("5", null),
        ];

        expect(simulatedStateOutput).toEqual(expectedState);
    });
});

///////////////////

describe("handling actionTypes.CHANGE_NODE_CONTENT", () => {
    it('should change header of pointed node ', () => {

        const initialState: INode[] = [

            Node.newEmpty("1", null),
            Node.newEmpty("2", "1"),
            Node.newEmpty("3", "2"),
            Node.newEmpty("4", "3"),
            Node.newEmpty("5", null),
        ];

        const changedNode: INode = { header: "I am changed!", description: "foooooooobaaaaar", isDone: true, Id: "4", parentID: "3" };
        const simulatedStateOutput: INode[] = nodeListReducer(initialState, TaskListActions.ChangeNodeContent(changedNode));

        const expectedState: INode[] = [
            Node.newEmpty("1", null),
            Node.newEmpty("2", "1"),
            Node.newEmpty("3", "2"),
            { header: "I am changed!", description: "foooooooobaaaaar", isDone: true, Id: "4", parentID: "3" },
            Node.newEmpty("5", null),
        ];

        expect(simulatedStateOutput).toEqual(expectedState);
    });

    it('should change description of pointed node ', () => {

        const initialState: INode[] = [
            Node.newEmpty("1", null),
            Node.newEmpty("2", "1"),
        ];

        const changedNode: INode = { header: "I am changed!", description: "foooooooobaaaaar", isDone: true, Id: "2", parentID: "3" };

        const simulatedStateOutput: INode[] = nodeListReducer(initialState, TaskListActions.ChangeNodeContent(changedNode));

        const expectedState: INode[] = [
            Node.newEmpty("1", null),
            { header: "I am changed!", description: "foooooooobaaaaar", isDone: true, Id: "2", parentID: "3" },
        ];

        expect(simulatedStateOutput).toEqual(expectedState);
    });

    it('cant "change" unexisting node - It leaves state untouched instead.', () => {

        const initialState: INode[] = [
            Node.newEmpty("1", null),
            Node.newEmpty("2", "1"),
        ];

        const changedNode: INode = Node.newEmpty("9", "1");
        const simulatedStateOutput: INode[] = nodeListReducer(initialState, TaskListActions.ChangeNodeContent(changedNode));

        expect(simulatedStateOutput).toEqual(initialState);
    });
});