import { IGlobalReduxState } from './../reducers/index';

interface IFindingNodesChildren {
    call: (IdOfParentNode: string, reduxState: IGlobalReduxState) => string[];
}

export default class FindNodesChildren implements IFindingNodesChildren {

    call(IdOfParentNode: string, reduxState: IGlobalReduxState): string[] {

        const childrenIDs: string[] = [];

        Object.keys(reduxState.nodes).map((nodeID) => {
            const node = reduxState.nodes[nodeID];
            if (node.parentID === IdOfParentNode) {
                childrenIDs.push(node.Id);
            }
        })
        return childrenIDs;
    }
}