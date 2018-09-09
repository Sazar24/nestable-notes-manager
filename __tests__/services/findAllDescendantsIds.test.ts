import { INode } from './../../src/models/Node';
import { IGlobalReduxState } from './../../src/reducers/index';
import NodesManager from '../../src/services/NodesManager';

describe("handling NodeManager.findAllDEscendatsIds method:", () => {

    const nodeManager = new NodesManager();
    const simulationlState: IGlobalReduxState = {
        nodes: {
            "parent1-ancestor": { header: "foobar", description: "baz", isDone: false, Id: "parent1-ancestor", parentID: null },
            /**/"child1": { header: "foobar", description: "baz", isDone: false, Id: "child1", parentID: "parent1-ancestor" },
            /**/"child2": { header: "foobar", description: "baz", isDone: false, Id: "child2", parentID: "parent1-ancestor" },
            /**/"child3": { header: "foobar", description: "baz", isDone: false, Id: "child3", parentID: "parent1-ancestor" },
            "parent2-ancestor": { header: "foobar", description: "baz", isDone: false, Id: "parent2-ancestor", parentID: null },
            /**/"child21": { header: "foobar", description: "baz", isDone: false, Id: "child21", parentID: "parent2-ancestor" },
            /**/"child22": { header: "foobar", description: "baz", isDone: false, Id: "child22", parentID: "parent2-ancestor" },
            /**/"child23": { header: "foobar", description: "baz", isDone: false, Id: "child23", parentID: "parent2-ancestor" },
            /**//**/ "sub-child-1": { header: "foobar", description: "baz", isDone: false, Id: "sub-child-1", parentID: "child23" },
            /**//**/ "sub-child-2": { header: "foobar", description: "baz", isDone: false, Id: "sub-child-2", parentID: "child23" },
            /**//**/ "sub-child-3": { header: "foobar", description: "baz", isDone: false, Id: "sub-child-3", parentID: "child23" },
            /**//**/ "sub-child-4": { header: "foobar", description: "baz", isDone: false, Id: "sub-child-4", parentID: "child23" },
            /**//**//**//**//**/
            /**/"noParent1": { header: "foobar", description: "baz", isDone: false, Id: "noParent1", parentID: null },
            /**/"noParent2": { header: "foobar", description: "baz", isDone: false, Id: "noParent2", parentID: null },
            /**//**//**//**//**/
        },
        selectedNodes: { IdOfEditableNode: null }
    }

    it('searching return all children (one level deep - children only, no grandChildren) of top ancestor', () => {

        const simulatedOutput: string[] = nodeManager.findAllDescendantsIds("parent1-ancestor", simulationlState);
        const expectedOutput: string[] = ["child1", "child2", "child3"];

        expect(simulatedOutput).toEqual(expectedOutput);
    });

    it('finding deep nested descendatnts of top ancestor', () => {
        const simulatedOutput: string[] = nodeManager.findAllDescendantsIds("parent2-ancestor", simulationlState);
        const expectedOutput: string[] = ["child21", "child22", "child23", "sub-child-1", "sub-child-2", "sub-child-3", "sub-child-4"];

        expect(simulatedOutput).toEqual(expectedOutput);
    });

    it('for node with no parent and no children returns empty array', () => {
        const simulatedOutput: string[] = nodeManager.findAllDescendantsIds("noParent2", simulationlState);
        const expectedOutput: string[] = [];

        expect(simulatedOutput).toEqual(expectedOutput);
    });

    it('for child, who has its own childs, returns those childs', () => {
        const simulatedOutput: string[] = nodeManager.findAllDescendantsIds("child23", simulationlState);
        const expectedOutput: string[] = ["sub-child-1", "sub-child-2", "sub-child-3", "sub-child-4"];

        expect(simulatedOutput).toEqual(expectedOutput);
    });

})