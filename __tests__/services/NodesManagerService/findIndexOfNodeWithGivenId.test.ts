import { INode } from '../../../src/models/Node';
import NodesManager from '../../../src/services/NodesManager';


describe("NodesManager.findIndexOfNodeWithGivenId(...) method tests", () => {
    const nodesManager: NodesManager = new NodesManager();

    const nodesInState :INode[] = [
        { header: "top-ancestor", description: "descr", isDone: false, Id: "1", parentID: null },
        { header: "header", description: "descr", isDone: false, Id: "4", parentID: "1" },
        { header: "header", description: "descr", isDone: false, Id: "3", parentID: "1" },
    ]

    it('should return proper index', () => {

        expect(nodesManager.findIndexOfNodeWithGivenId("1", nodesInState)).toBe(0);
        expect(nodesManager.findIndexOfNodeWithGivenId("3", nodesInState)).toBe(2);
        expect(nodesManager.findIndexOfNodeWithGivenId("4", nodesInState)).toBe(1);

    });
})