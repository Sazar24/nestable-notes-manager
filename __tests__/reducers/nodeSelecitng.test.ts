test('should ', () => {
   expect(true).toBe(true); 
});

// import { INodeSelectingReducer, nodeSelectingReducer } from './../../src/reducers/nodeSelecting';
// import { PassEditModeToId } from '../../src/actions/NodeSelecing';

// describe("nodeSelecting Reducer: handling ActionTypes.SWITCH_EDIT_MODE_TO_GIVEN_ID_ONLY", () => {
//     it("when null Id is dispatched to IdOfEditableNode-property, it is saved to reducer state as null ", () => {

//         const expectedOutput: INodeSelectingReducer = {
//             IdOfEditableNode: null
//         }
//         const initialState: INodeSelectingReducer = {
//             IdOfEditableNode: null,
//         };

//         const simulatingEmptyOutput: INodeSelectingReducer = nodeSelectingReducer(initialState, PassEditModeToId(null));
//         expect(simulatingEmptyOutput).toEqual(expectedOutput);

//     });
    
//     it('dispatching null to IdOfEditableNode-property, when this property is set to any Id, nulls it. ', () => {
//         const expectedOutput: INodeSelectingReducer = {
//             IdOfEditableNode: null
//         }
//         const initialState: INodeSelectingReducer = {
//             IdOfEditableNode: "foobar",
//         };

//         const simulatingEmptyOutput: INodeSelectingReducer = nodeSelectingReducer(initialState, PassEditModeToId(null));
//         expect(simulatingEmptyOutput).toEqual(expectedOutput);
//     });

//     it('in state was null. Setting(dispatching) properties to any value saves it properly', () => {
        
//         const expectedOutput: INodeSelectingReducer = {
//             IdOfEditableNode: "foobar123"
//         }
//         const initialState: INodeSelectingReducer = {
//             IdOfEditableNode: null
//         };

//         const simulatingEmptyOutput: INodeSelectingReducer = nodeSelectingReducer(initialState, PassEditModeToId("foobar123"));
//         expect(simulatingEmptyOutput).toEqual(expectedOutput);
//     });

//     it('in state was some value. Dispatch changes it to given value, other than null', () => {
        
//         const expectedOutput: INodeSelectingReducer = {
//             IdOfEditableNode: "foobar"
//         }
//         const initialState: INodeSelectingReducer = {
//             IdOfEditableNode: "baz"
//         };

//         const simulatingEmptyOutput: INodeSelectingReducer = nodeSelectingReducer(initialState, PassEditModeToId("foobar"));
//         expect(simulatingEmptyOutput).toEqual(expectedOutput);
//     });
// })