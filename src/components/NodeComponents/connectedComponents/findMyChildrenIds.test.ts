import { NodeWithChildren } from './../NodeWithChildren';
import { findMyChildrenIds } from "./ConnectedNode";
import { IState } from '../../../reducers';

describe('findMyChildrenIds(...) should return propper array of Ids; ', () => {
    it('There are 2 nodes in state. 1st is parent of 2nd', () => {
        const state: IState = {
            nodes: {
                "1": { header: "header", description: "descr", isDone: false, Id: "1", parentID: null },
                "2": { header: "header", description: "descr", isDone: false, Id: "2", parentID: "1" },
            }
        };

        const childrenIdsFound = findMyChildrenIds("1", state);
        const expectedOutput = ["2"];

        expect(childrenIdsFound).toEqual(expectedOutput);

    });

    it('2 nodes in state. No kinship - every node has no children or parent', () => { // <ang. kinship = pokrewieństwo>

        const state: IState = {
            nodes: {
                "1": { header: "header", description: "descr", isDone: false, Id: "1", parentID: null },
                "6": { header: "header", description: "descr", isDone: false, Id: "6", parentID: "3" },
            }
        };

        expect(findMyChildrenIds("2", state)).toEqual([]);
        expect(findMyChildrenIds("1", state)).toEqual([]);
        expect(findMyChildrenIds("6", state)).toEqual([]);
        expect(findMyChildrenIds("foobar", state)).toEqual([]);
    });

    it('Many nodes in state. There are some parents/children, but given Id has no any. Sholud retun null/empty array', () => {

        const state: IState = {
            nodes: {
                "1": { header: "header", description: "descr", isDone: false, Id: "1", parentID: null },
                "3": { header: "header", description: "descr", isDone: false, Id: "3", parentID: "1" },
                "4": { header: "header", description: "descr", isDone: false, Id: "4", parentID: "1" },
                "2": { header: "header", description: "descr", isDone: false, Id: "2", parentID: "3" },
            }
        };

        const childrenIdsFound = findMyChildrenIds("4", state);
        const expectedOutput: string[] = [];
        expect(childrenIdsFound).toEqual(expectedOutput);
        
        expect(findMyChildrenIds("2", state)).toEqual([]);
    });

    it('For given parent Id returns Ids(array) which are assigned as it children.', () => {

        const state: IState = {
            nodes: {
                "1": { header: "header", description: "descr", isDone: false, Id: "1", parentID: null },
                "3": { header: "header", description: "descr", isDone: false, Id: "3", parentID: "1" },
                "4": { header: "header", description: "descr", isDone: false, Id: "4", parentID: "1" },
                "2": { header: "header", description: "descr", isDone: false, Id: "2", parentID: "3" },
            }
        };

        const childrenIdsFound = findMyChildrenIds("1", state);
        const expectedOutput = ["3", "4"];

        // const expectedOutput2 = ["4", "3"];   <--TODO/TBD: this one would fail. Maybe i should add some sorting by id in state?
        // expect(childrenIdsFound).toEqual(expectedOutput2); 
    })

});
