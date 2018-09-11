import { INode } from './../../src/models/Node';
import { IGlobalReduxState } from '../../src/reducers/index';
import NodesManager from '../../src/services/NodesManager';

describe('findMyChildrenIds(...) should return propper array of Ids; ', () => {
    const nodesManager = new NodesManager();

    it('There are 2 nodes in state. 1st is parent of 2nd', () => {
        const nodesInState: INode[] = [
            { header: "header", description: "descr", isDone: false, Id: "1", parentID: null },
            { header: "header", description: "descr", isDone: false, Id: "2", parentID: "1" },
        ];

        const childrenIdsFound = nodesManager.findChildrensIds("1", nodesInState);
        const expectedOutput = ["2"];

        expect(childrenIdsFound).toEqual(expectedOutput);

    });

    it('2 nodes in state. No kinship - every node has no children or parent', () => { // <ang. kinship = pokrewieństwo>

        const nodesInState: INode[] = [
            { header: "header", description: "descr", isDone: false, Id: "1", parentID: null },
            { header: "header", description: "descr", isDone: false, Id: "6", parentID: "3" },
        ]
        expect(nodesManager.findChildrensIds("2", nodesInState)).toEqual([]);
        expect(nodesManager.findChildrensIds("1", nodesInState)).toEqual([]);
        expect(nodesManager.findChildrensIds("6", nodesInState)).toEqual([]);
        expect(nodesManager.findChildrensIds("foobar", nodesInState)).toEqual([]);
    });

    it('Many nodes in state. There are some parents/children, but given Id has no children. Should return empty array', () => {

        const nodesInState: INode[] = [
            { header: "header", description: "descr", isDone: false, Id: "1", parentID: null },
            { header: "header", description: "descr", isDone: false, Id: "3", parentID: "1" },
            { header: "header", description: "descr", isDone: false, Id: "4", parentID: "1" },
            { header: "header", description: "descr", isDone: false, Id: "2", parentID: "3" },
        ]

        const childrenIdsFound = nodesManager.findChildrensIds("4", nodesInState);
        expect(childrenIdsFound).toEqual([]);

        expect(nodesManager.findChildrensIds("2", nodesInState)).toEqual([]);
    });

    it('For given parent Id returns Ids(array) which are assigned as it children.', () => {

        const nodesInState: INode[] = [
            { header: "header", description: "descr", isDone: false, Id: "1", parentID: null },
            { header: "header", description: "descr", isDone: false, Id: "3", parentID: "1" },
            { header: "header", description: "descr", isDone: false, Id: "4", parentID: "1" },
            { header: "header", description: "descr", isDone: false, Id: "2", parentID: "3" },
        ]
        const childrenIdsFound = nodesManager.findChildrensIds("1", nodesInState);
        const expectedOutput = ["3", "4"];

        // const expectedOutput2 = ["4", "3"];   <--TODO/TBD: this one would fail. Maybe i should add some sorting by id in state?
        // expect(childrenIdsFound).toEqual(expectedOutput2); 
    });

});

describe("nodeManager.findChildren method returns proper array (big state tests) ", () => {
    const nodesManager = new NodesManager();

    const nodesInState = [
        { header: "top-ancestor", description: "descr", isDone: false, Id: "1", parentID: null },
        /**/{ header: "header", description: "descr", isDone: false, Id: "4", parentID: "1" },
        /**/{ header: "header", description: "descr", isDone: false, Id: "3", parentID: "1" },
        /**//**/{ header: "header", description: "descr", isDone: false, Id: "2", parentID: "3" },
        /**//**/{ header: "header", description: "descr", isDone: false, Id: "5", parentID: "3" },
        /**//**//**/{ header: "header", description: "descr", isDone: false, Id: "7", parentID: "5" },
        /**//**//**/{ header: "header", description: "descr", isDone: false, Id: "8", parentID: "5" },
        /**//**//**/{ header: "header", description: "descr", isDone: false, Id: "9", parentID: "5" },
        /**//**//**/{ header: "header", description: "descr", isDone: false, Id: "10", parentID: "5" },
        /**/{ header: "header", description: "descr", isDone: false, Id: "6", parentID: "3" },
        { header: "top-ancestor", description: "descr", isDone: false, Id: "11", parentID: null },

    ]
    it('returns children, no grand-children ', () => {
        expect(nodesManager.findChildrensIds("3", nodesInState)).toEqual(["2", "5", "6"]);
        expect(nodesManager.findChildrensIds("5", nodesInState)).toEqual(["7", "8", "9", "10"]);
        expect(nodesManager.findChildrensIds("1", nodesInState)).toEqual(["4", "3"]);
    });

    it('returns nothing, when there are no children (for given id)', () => {
        expect(nodesManager.findChildrensIds("6", nodesInState)).toEqual([]);
        expect(nodesManager.findChildrensIds("11", nodesInState)).toEqual([]);
        expect(nodesManager.findChildrensIds("2", nodesInState)).toEqual([]);
        expect(nodesManager.findChildrensIds("4", nodesInState)).toEqual([]);
        expect(nodesManager.findChildrensIds("10", nodesInState)).toEqual([]);
    });

    it('returns children for already nested node (which is, in fact, already children', () => {
        expect(nodesManager.findChildrensIds("5", nodesInState)).toEqual(["7", "8", "9", "10"]);
        expect(nodesManager.findChildrensIds("1", nodesInState)).toEqual(["4", "3"]);
    });
});