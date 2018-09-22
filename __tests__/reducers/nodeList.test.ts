// import { initialState } from './../../src/reducers/nodeSelecting';
import { CreateNode, DeleteNode } from '../../src/actions/NodesActions';
import { nodeListReducer } from './../../src/reducers/nodeList';
import { INode, Node } from '../../src/models/Node';
import * as TaskListActions from '../../src/actions/NodesActions';

describe('handling actionTypes.ADD_NODE: reducer should return proper state when apply the action to previous state;', () => {

    it('Adding-new-node-action returns the previous state enlarged by added node ', () => {

        const initialState: INode[] = [
            Node.newEmpty("1")
        ]
        const simulatedStateOutput = nodeListReducer(initialState, CreateNode("2", "1"));

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
        const initialState: INode[] = [
            Node.newEmpty("1", null)
        ]

        let simulatedStateOutput: INode[];
        simulatedStateOutput = nodeListReducer(initialState, CreateNode("3", "1"));
        simulatedStateOutput = nodeListReducer(simulatedStateOutput, CreateNode("3", "1"));
        simulatedStateOutput = nodeListReducer(simulatedStateOutput, CreateNode("3", "1"));
        simulatedStateOutput = nodeListReducer(simulatedStateOutput, CreateNode("3", "1"));
        simulatedStateOutput = nodeListReducer(simulatedStateOutput, CreateNode("2", "3"));

        const expectedState2: INode[] = [
            Node.newEmpty("1", null),
            Node.newEmpty("3", "1"),
            Node.newEmpty("2", "3"),
        ];
        expect(simulatedStateOutput).toEqual(expectedState2);
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

describe("handling actionTypes.MOVE_CLOSER_TO_ANCESTOR", () => {
    test('should move child one step closer to its grandparent', () => {
        const initialState: Node[] = [
            Node.newEmpty("grandfather_Id", null),
            Node.newEmpty("parent_Id", "grandfather_Id"),
            Node.newEmpty("transferingNode_TheChild", "parent_Id")
        ];

        const transferingNode: Node = initialState[2];
        const simulatedStateOutput: INode[] = nodeListReducer(initialState, TaskListActions.MoveNodeCloserToAncestor(transferingNode));

        const expectedOutcome: Node[] = [
            Node.newEmpty("grandfather_Id", null),
            Node.newEmpty("parent_Id", "grandfather_Id"),
            Node.newEmpty("transferingNode_TheChild", "grandfather_Id")
        ];

        expect(simulatedStateOutput).toEqual(expectedOutcome);
    });

    test('should move child one step closer to its grandparent, when that grandparent is not the top ancestor', () => {
        const initialState: Node[] = [
            Node.newEmpty("topAncestor_grandGrandFather", null),
            Node.newEmpty("grandfather_Id", "topAncestor_grandGrandFather"),
            Node.newEmpty("parent_Id", "grandfather_Id"),
            Node.newEmpty("transferingNode_TheChild", "parent_Id")
        ];

        const transferingNode: Node = initialState[3];
        const simulatedStateOutput: INode[] = nodeListReducer(initialState, TaskListActions.MoveNodeCloserToAncestor(transferingNode));

        const expectedOutcome: Node[] = [
            Node.newEmpty("topAncestor_grandGrandFather", null),
            Node.newEmpty("grandfather_Id", "topAncestor_grandGrandFather"),
            Node.newEmpty("parent_Id", "grandfather_Id"),
            Node.newEmpty("transferingNode_TheChild", "grandfather_Id")
        ];

        expect(simulatedStateOutput).toEqual(expectedOutcome);
    });

    test('shoudnt move anything when trying to move top-level node', () => {
        const initialState: Node[] = [
            Node.newEmpty("topAncestor_grandGrandFather", null),
            Node.newEmpty("grandfather_Id", "topAncestor_grandGrandFather"),
            Node.newEmpty("parent_Id", "grandfather_Id"),
            Node.newEmpty("transferingNode_TheChild", "parent_Id")
        ];

        const transferingNode: Node = initialState[0];
        const simulatedStateOutput: INode[] = nodeListReducer(initialState, TaskListActions.MoveNodeCloserToAncestor(transferingNode));

        const expectedOutcome: Node[] = [
            Node.newEmpty("topAncestor_grandGrandFather", null),
            Node.newEmpty("grandfather_Id", "topAncestor_grandGrandFather"),
            Node.newEmpty("parent_Id", "grandfather_Id"),
            Node.newEmpty("transferingNode_TheChild", "parent_Id")
        ];

        expect(simulatedStateOutput).toEqual(expectedOutcome);
    });

});