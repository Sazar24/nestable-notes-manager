import { IGlobalReduxState } from '../reducers/index';
import { INodesListReducer } from '../reducers/nodeList';

interface IFindingNodesChildren {
    findChildrensIds(IdOfParentNode: string, reduxState: IGlobalReduxState): string[];
    isAlreadyInState(nodeId: string, state: INodesListReducer): boolean;
}

export default class NodesManager implements IFindingNodesChildren {

    findChildrensIds(IdOfParentNode: string, reduxState: IGlobalReduxState): string[] {

        const childrenIDs: string[] = [];
        Object.keys(reduxState.nodes).map((nodeID) => {
            const node = reduxState.nodes[nodeID];
            if (node.parentID === IdOfParentNode) {
                childrenIDs.push(node.Id);
            }
        })
        return childrenIDs;
    }

    isAlreadyInState(nodeId: string, state: INodesListReducer): boolean {
        if (typeof (state[nodeId]) === "undefined" || typeof (state[nodeId]) === undefined) return false;
        else return true;
    }
}