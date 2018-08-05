import { Action, CreateNewNodeAsChild } from './../../src/actions/TaskListActions';
import { nodeListReducer, INodesListReducer } from './../../src/reducers/nodeList';
import { SingleNode } from '../../src/models/Node';

describe('reducer should return proper state when apply the action to previous state;', () => {

    it('>>Adding new node action<< returns the previous state enlarged by added node ', () => {

        const initialState: INodesListReducer = {
            "1": { header: "header", description: "descr", isDone: false, Id: "1", parentID: null },
        }
        const actionADDNode = CreateNewNodeAsChild("1", "2");
        const simulatedStateOutput = nodeListReducer(initialState, actionADDNode);

        const expectedState: INodesListReducer = {
            "1": { header: "header", description: "descr", isDone: false, Id: "1", parentID: null },
            "2": { header: "header", description: "descr", isDone: false, Id: "2", parentID: "1" },
        };

        expect(simulatedStateOutput).toEqual(expectedState);

    });

    it('adding subsequent nodes to same state gives state with all of the added nodes', () => {

        const initialState: INodesListReducer = {
            "1": { header: "header", description: "descr", isDone: false, Id: "1", parentID: null },
        }

        let simulatedStateOutput;
        simulatedStateOutput = nodeListReducer(initialState, CreateNewNodeAsChild("1", "3"));
        simulatedStateOutput = nodeListReducer(simulatedStateOutput, CreateNewNodeAsChild("1", "3"));
        simulatedStateOutput = nodeListReducer(simulatedStateOutput, CreateNewNodeAsChild("1", "4"));
        simulatedStateOutput = nodeListReducer(simulatedStateOutput, CreateNewNodeAsChild("3", "2"));

        const expectedState2: INodesListReducer = {
            "1": { header: "header", description: "descr", isDone: false, Id: "1", parentID: null },
            "3": { header: "header", description: "descr", isDone: false, Id: "3", parentID: "1" },
            "4": { header: "header", description: "descr", isDone: false, Id: "4", parentID: "1" },
            "2": { header: "header", description: "descr", isDone: false, Id: "2", parentID: "3" },
        };

        expect(simulatedStateOutput).toEqual(expectedState2);
    });
});