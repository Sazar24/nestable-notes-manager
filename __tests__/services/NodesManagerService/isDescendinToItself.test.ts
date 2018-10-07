import { Node } from './../../../src/models/Node';
import { IGlobalReduxState } from '../../../src/reducers/index';
import NodesManager from '../../../src/services/NodesManager';

describe('handling NodeManager.isDescendingToItself(...) method', () => {
    const nodesManager = new NodesManager();

    const stateNodes: Node[] = [
        Node.newEmpty("top1", null),
        /**/Node.newEmpty("top1-kid1", "top1"),
        /****/Node.newEmpty("top1-kid1-kid1", "top1-kid1"),
        /****/Node.newEmpty("top1-kid1-kid2", "top1-kid1"),
        /********/Node.newEmpty("top1-kid1-kid2-kid1", "top1-kid1-kid2"),
        /********/Node.newEmpty("top1-kid1-kid2-kid2", "top1-kid1-kid2"),
        /**/Node.newEmpty("top1-kid1-kid3", "top1-kid1"),
        /**/Node.newEmpty("top1-kid1-kid4", "top1-kid1"),
        /**/Node.newEmpty("top1-kid5", "top1"),
        Node.newEmpty("top2",null)
    ];
    
    it('should return true if destinationID is one of descendant of moving Id ', () => {
        let result: boolean;
        
        result = nodesManager.isDescendingToItself("top1", "top1-kid1", stateNodes);
        expect(result).toBe(true);

        result = nodesManager.isDescendingToItself("top1", "top1-kid1-kid2-kid1", stateNodes);
        expect(result).toBe(true);
    });

    it('returns false, when needed', () => {
        let result: boolean;
        result = nodesManager.isDescendingToItself("top1-kid1","top1",stateNodes);
        expect(result).toBe(false);

        result = nodesManager.isDescendingToItself("top1","top2",stateNodes);
        expect(result).toBe(false);

        result = nodesManager.isDescendingToItself("top1-kid1-kid1","top1-kid1",stateNodes);
        expect(result).toBe(false);
    });
    
    it('returns true, when destinationNode==movingNode', () => {
        let result: boolean;
        
        result = nodesManager.isDescendingToItself("top1","top1",stateNodes);
        expect(result).toBe(true);

        result = nodesManager.isDescendingToItself("top1-kid5","top1-kid5",stateNodes);
        expect(result).toBe(true);
    });

});