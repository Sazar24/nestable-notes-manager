import { Node } from './../../src/models/Node';
import NodesManager from '../../src/services/NodesManager';

describe('handling NodesManager.isAlreadyInState method: ', () => {
    test.each([
        // 1 test:
        [
            "1", // <-- testId
            [ Node.newEmpty("1", "55"), Node.newEmpty("2", "1") ],
            true // <--expectedOutput
        ],
        // 2 test:
        [
            "5", // <-- testId
            [ Node.newEmpty("1", null), Node.newEmpty("2", "1"), Node.newEmpty("2", "1lskd") ],
            false // <--expectedOutput
        ],
        // 3 test:
        [
            "findMe", // <-- testId
            [ Node.newEmpty("1", null), Node.newEmpty("findMe", "1"), Node.newEmpty("baz", "fooobar") ],
            true // <--expectedOutput
        ],
    ])
        ('should return proper result', (testId, nodesInState, expectedOutput) => {

            const result: boolean = NodesManager.isAlreadyInState(testId, nodesInState);
            expect(result).toBe(expectedOutput);

        });

});