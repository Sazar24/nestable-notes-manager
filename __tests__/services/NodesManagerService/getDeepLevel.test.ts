import { INode } from './../../../src/models/Node';
import { Node } from '../../../src/models/Node';
import NodesManager from '../../../src/services/NodesManager';

describe('Proof.  testing array.find(...)', () => {
    it('works as expected...', () => {
        const someArray: number[] = [1, 2, 3, 4, 5, 67, 123, 23];
        const result = someArray.find(item => item === 67);
        expect(result).toBe(67);
    });
});


describe('NodesManager.getDeepLevel(...) method', () => {
    const nodesManager = new NodesManager();

    const stateNodes: Node[] = [
        Node.newEmpty("top1", null),   // nesting-level == 0
        /**/Node.newEmpty("top1-kid1", "top1"),   // nesting-level == 1
        /****/Node.newEmpty("top1-kid1-kid1", "top1-kid1"),   // nesting-level == 2
        /****/Node.newEmpty("top1-kid1-kid2", "top1-kid1"),   // nesting-level == 2
        /********/Node.newEmpty("top1-kid1-kid2-kid1", "top1-kid1-kid2"),   // nesting-level == 3
        /********/Node.newEmpty("top1-kid1-kid2-kid2", "top1-kid1-kid2"),   // nesting-level == 3
        /*****************/Node.newEmpty("nest-lvl==4", "top1-kid1-kid2-kid2"),   // nesting-level == 4
        /**/Node.newEmpty("top1-kid1-kid3", "top1-kid1"),   // nesting-level == 2
        /**/Node.newEmpty("top1-kid1-kid4", "top1-kid1"),   // nesting-level == 2
        /**/Node.newEmpty("top1-kid2", "top1"),
        Node.newEmpty("top2", null)
    ];

    it('if testing node is at top (id === null) returns 0 ', () => {
        let result: number;
        let testingNode: INode;

        testingNode = nodesManager.findNode("top1", stateNodes);
        result = nodesManager.getDeepLevel(testingNode, stateNodes);
        expect(result).toBe(0);


        testingNode = nodesManager.findNode("top2", stateNodes);
        result = nodesManager.getDeepLevel(testingNode, stateNodes);
        expect(result).toBe(0);

        testingNode = nodesManager.findNode("top1-kid1", stateNodes);
        result = nodesManager.getDeepLevel(testingNode, stateNodes);
        expect(result).toBeGreaterThan(0);
    });

    it('returns 1, if asked node is a children of top-node', () => {
        let result: number;
        let testingNode: INode;

        testingNode = nodesManager.findNode("top1-kid1", stateNodes);
        result = nodesManager.getDeepLevel(testingNode, stateNodes);
        expect(result).toBe(1);

        testingNode = nodesManager.findNode("top1-kid2", stateNodes);
        result = nodesManager.getDeepLevel(testingNode, stateNodes);
        expect(result).toBe(1);
    });

    it('returns proper values for deeply nested nodes (deepLevel>1)', () => {
        let result: number;
        let testingNode: INode;

        // testingNode = nodesManager.findNode("top1-kid1-kid2-kid1", stateNodes);
        testingNode = nodesManager.findNode("top1-kid1-kid3", stateNodes);
        result = nodesManager.getDeepLevel(testingNode, stateNodes);
        expect(result).toBe(2);

        testingNode = nodesManager.findNode("top1-kid1-kid1", stateNodes);
        result = nodesManager.getDeepLevel(testingNode, stateNodes);
        expect(result).toBe(2);


        testingNode = nodesManager.findNode("top1-kid1-kid2-kid1", stateNodes);
        result = nodesManager.getDeepLevel(testingNode, stateNodes);
        expect(result).toBe(3);

        testingNode = nodesManager.findNode("nest-lvl==4", stateNodes);
        result = nodesManager.getDeepLevel(testingNode, stateNodes);
        expect(result).toBe(4);
    });
});